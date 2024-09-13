import os
import json
from collections import Counter
import re

def text_processor(directory_path):
    return [f for f in os.listdir(directory_path) if f.endswith('.txt')]

def read_files(file_path):
    with open(file_path, 'r') as file:
        words = file.read().lower().split()
    return set(words)

def extract_rs_values(text):
    rs_pattern = r'rs[\.]?\s*([\d,]+)'
    rs_matches = re.findall(rs_pattern, text.lower())

    rs_values = []
    for value in rs_matches:
        clean_value = value.replace(",", "")
        if clean_value.isdigit():
            rs_values.append(int(clean_value))

    return rs_values

def find_common_words(directory_path):
    text_files = text_processor(directory_path)
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




def rs_processor(directory_path):
    text_files = text_processor(directory_path)

    all_rs_values = []

    for text_file in text_files:
        file_path = os.path.join(directory_path, text_file)
        with open(file_path, 'r') as file:
            text = file.read()

        rs_values = extract_rs_values(text)

        all_rs_values.extend(rs_values)

    return json.dumps(all_rs_values, indent=4)


#Execution Points
directory_path = 'model/data/training'
common_words_json = find_common_words(directory_path)
rs_value = rs_processor(directory_path)
print(rs_value)
print(common_words_json)