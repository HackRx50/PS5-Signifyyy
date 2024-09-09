import os
import json
from collections import Counter

def text_files(directory_path):
    return [f for f in os.listdir(directory_path) if f.endswith('.txt')]

def read_files(file_path):
    with open(file_path, 'r') as file:
        words = file.read().lower().split()
    return set(words)

def find_common_words(directory_path):
    text_files = text_files(directory_path)
    total_files = len(text_files)
    
    if total_files == 0:
        return []

    word_count = Counter()

    for text_file in text_files:
        file_path = os.path.join(directory_path, text_file)
        words = read_files(file_path)
        word_count.update(words)

    common_words = [word for word, count in word_count.items() if count > total_files / 2]

    # Return the common words as a JSON list
    return json.dumps(common_words, indent=4)

#Execution Points
directory_path = 'model/data/training'
common_words_json = find_common_words(directory_path)
print(common_words_json)