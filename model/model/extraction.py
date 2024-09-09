import os
import json
from collections import Counter

def get_text_files_in_directory(directory_path):
    # Get a list of all text files in the directory
    return [f for f in os.listdir(directory_path) if f.endswith('.txt')]

def read_words_from_file(file_path):
    # Read words from a file, splitting by whitespace and converting to lowercase
    with open(file_path, 'r') as file:
        words = file.read().lower().split()
    return set(words)

def find_common_words(directory_path):
    # Get list of text files in the directory
    text_files = get_text_files_in_directory(directory_path)
    total_files = len(text_files)
    
    if total_files == 0:
        return []

    word_count = Counter()

    # Read and count unique words from each text file
    for text_file in text_files:
        file_path = os.path.join(directory_path, text_file)
        words = read_words_from_file(file_path)
        word_count.update(words)

    # Find words that appear in more than 50% of the files
    common_words = [word for word, count in word_count.items() if count > total_files / 2]

    # Return the common words as a JSON list
    return json.dumps(common_words, indent=4)

#Execution Points
directory_path = 'model/data/training'
common_words_json = find_common_words(directory_path)
print(common_words_json)