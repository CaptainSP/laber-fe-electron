from flask import Flask, request, jsonify
import cv2
import imageio
import time
import threading
from moviepy.editor import VideoFileClip, concatenate_videoclips, AudioFileClip, ImageClip, vfx
from moviepy.audio.fx.all import audio_loop

app = Flask(__name__)

# Global variables to handle interrupt
recording_interrupted = threading.Event()
recording_thread = None


def record_webcam(output_video_path, fps, duration):
    cap = cv2.VideoCapture(0)

    if not cap.isOpened():
        raise Exception("Could not open webcam")
    # Set the resolution to 720p
    cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1280)
    cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 720)

    frame_count = int(fps * duration)
    writer = imageio.get_writer(
        output_video_path, fps=fps, macro_block_size=None)

    try:
        for i in range(frame_count):
            if recording_interrupted.is_set():
                break

            ret, frame = cap.read()
            if not ret:
                raise Exception(
                    "Can't receive frame (stream end?). Exiting ...")
            frame = cv2.resize(frame, (1280, 720))

            frame = cv2.rotate(frame, cv2.ROTATE_90_CLOCKWISE)

            writer.append_data(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))
            time.sleep(1 / fps)

    except Exception as e:
        writer.close()
        cap.release()
        raise e

    cap.release()
    writer.close()

    return output_video_path


def concatenate_videos(input_video_path, output_video_path, final_output_path, music_path, transition_duration, photo_path=None):

    # Ensure all clips are resized to 720x1280
    input_video = vfx.resize(VideoFileClip(input_video_path), height=1280)
    blank_clip = VideoFileClip("./blank_input.mp4").resize((720, 1280))

    recorded_video = vfx.resize(VideoFileClip(output_video_path), height=1280)

    if input_video.duration > 10:
        input_video = input_video.subclip(-10)
    if recorded_video.duration > 10:
        recorded_video = recorded_video.subclip(-10)

    input_video = input_video.crossfadeout(transition_duration)
    recorded_video = recorded_video.crossfadein(transition_duration)

    video_clips = [blank_clip, input_video, recorded_video]

    if photo_path:
        photo_clip = ImageClip(photo_path, duration=5).resize((720, 1280))
        video_clips.append(photo_clip)

    final_video = concatenate_videoclips(video_clips, method="compose")

    # Make the video speed 1.5 times faster
    final_video = final_video.fx(vfx.speedx, 1.5)

    background_music = AudioFileClip(music_path)
    video_duration = final_video.duration

    # If the background music is shorter than the video, loop the music
    if background_music.duration < video_duration:
        background_music = audio_loop(
            background_music, duration=video_duration)
    else:
        # Trim background music to video duration if it's longer
        background_music = background_music.subclip(0, video_duration)

    final_video = final_video.set_audio(background_music)

    final_video.write_videofile(
        final_output_path, codec='libx264', fps=20.0)

    return final_output_path


@app.route('/start_video', methods=['POST'])
def process_video():
    required_params = ['output']
    for param in required_params:
        if param not in request.json:
            return jsonify({"error": f"Missing parameter: {param}"}), 400
    # input_video_path = request.json['input']
    output_video_path = request.json['output']
    # final_output_path = request.json['final']
    # music_path = request.json['music']
    fps = request.json.get('fps', 20.0)
    duration = request.json.get('duration', 10)
    # transition_duration = request.json.get('transition_duration', 1.0)

    global recording_thread
    recording_interrupted.clear()

    try:
        recording_thread = threading.Thread(
            target=record_webcam, args=(output_video_path, fps, duration))
        recording_thread.start()
        return jsonify({"message": "Recording started successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/merge_videos', methods=['POST'])
def interrupt_recording_and_merge():
    required_params = ['output', 'final', 'music']
    for param in required_params:
        if param not in request.json:
            return jsonify({"error": f"Missing parameter: {param}"}), 400
    input_video_path = request.json.get('input', "./blank_input.mp4")
    output_video_path = request.json['output']
    final_output_path = request.json['final']
    music_path = request.json['music']
    photo_path = request.json.get('photo', None)
    transition_duration = request.json.get('transition_duration', 1.0)

    global recording_thread
    recording_interrupted.set()

    if recording_thread is not None:
        recording_thread.join()

    try:
        concatenate_videos(input_video_path, output_video_path,
                           final_output_path, music_path, transition_duration, photo_path)
        return jsonify({"message": "Recording interrupted and video processed successfully", "final_output_path": final_output_path}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/stop_recording', methods=['GET'])
def interrupt_recording():

    global recording_thread
    recording_interrupted.set()

    if recording_thread is not None:
        recording_thread.join()
    return jsonify({"message": "Recording interrupted "}), 200


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
