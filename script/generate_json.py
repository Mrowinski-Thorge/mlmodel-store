import os
import json

def main():
    """
    Scans the ML_Models directory, finds all .mlmodel files,
    and generates a models.json file with their details,
    automatically using folder names as categories and reading
    descriptions from companion .txt files.
    """
    models_dir = 'ML_Models'
    models_data = {'models': []}

    if not os.path.isdir(models_dir):
        print(f"Directory '{models_dir}' not found. Creating empty models.json.")
        with open('models.json', 'w', encoding='utf-8') as f:
            json.dump(models_data, f, indent=4)
        return

    # Iterate over categories (subdirectories in ML_Models)
    for category in sorted(os.listdir(models_dir)):
        category_path = os.path.join(models_dir, category)
        if os.path.isdir(category_path):
            # Iterate over files in the category directory
            for filename in sorted(os.listdir(category_path)):
                if filename.endswith('.mlmodel'):
                    model_name = os.path.splitext(filename)[0]
                    
                    # Construct the download URL, ensuring forward slashes for web paths
                    download_url = f"{models_dir}/{category}/{filename}"

                    # Find the corresponding description file (.txt)
                    description_path = os.path.join(category_path, f"{model_name}.txt")
                    description = "Für dieses Modell ist keine Beschreibung verfügbar."
                    if os.path.exists(description_path):
                        with open(description_path, 'r', encoding='utf-8') as f:
                            description = f.read().strip()
                    else:
                        print(f"Warning: No description file found for {filename}. Using default description.")


                    model_info = {
                        "name": model_name,
                        "category": category,
                        "description": description,
                        "download_url": download_url
                    }
                    models_data['models'].append(model_info)

    # Write the collected data to models.json
    with open('models.json', 'w', encoding='utf-8') as f:
        json.dump(models_data, f, indent=4, ensure_ascii=False)

    print(f"Successfully generated models.json with {len(models_data['models'])} models.")

if __name__ == "__main__":
    main()
