import json
import os
import pdfplumber
import shutil
import pandas as pd
import pymongo
from pymongo import MongoClient
from service_AI import chat_session

text = ""  # Define text globally

def extract_pdf_data(pdf_path):
    global text  # Declare text as global to modify the global variable
    # Open the PDF and extract text
    with pdfplumber.open(pdf_path) as pdf:
        for i, page in enumerate(pdf.pages):
            try:
                page_text = page.extract_text()
                if page_text:
                    # Append the extracted page text to the global text variable
                    regex_pattern(page_text)
                else:
                    print(f"Warning: No text found on page {i + 1}")
            except Exception as e:
                print(f"Error on page {i + 1}: {e}")

pages = []

def regex_pattern(page_no):
    global text
    text += page_no
    



def process_pdfs_checking(directory, output_file):
    # Iterate over all PDF files in the given directory
    for filename in os.listdir(directory):
        if filename.endswith(".pdf"):
            file_path = os.path.join(directory, filename)
            print(f"Processing {file_path}...")            
            extract_pdf_data(file_path)  # Call extract_pdf_data function
            os.makedirs(output_file, exist_ok=True)  # Ensure the directory exists
            shutil.move(file_path, os.path.join(output_file, os.path.basename(file_path)))
    

# List of fields to extract
temp = [
    "CNR No.",
    "M.A.C.P. No." ,
    "Received On",
    "Registered On",
    "Decided On",
    "Duration",
    "Court Info",
    "Accident Date",
    "Claim Amount",
    "Applicant Name",
    "Applicant Age",
    "Applicant Address",
    "Applicant Occupation",
    "Applicant vehicle No.",
    "The Petition in short, is as under",
    "Opponent 1",
    "Opponent 2",
    "Police Case No.",
    "Vehicle No.",
    "Compensation Awarded",
    "Interest Rate",
    "Hospital Names",
    "Court Fees",
    "Collision type",
    "Accident Type",
    "Accident Severity",
    "Vehicles Involved",
    "Witness"
]

def to_mongo(data):
    client = MongoClient('mongodb://localhost:27017/') 
    db = client['Hackrx']
    collection = db['uploadedPDF'] 
    result = collection.insert_one(data)
    print("Document inserted with ID:", result.inserted_id)


json_mylist = json.dumps(temp)

# Define the dataset directory and output file
dataset_directory = os.path.join("d:/Learn MERN/HackRx/model/data/data")
processed = os.path.join("d:/Learn MERN/HackRx/model/data/data", "processed")

process_pdfs_checking(dataset_directory,processed)


# print()
response = text + json_mylist + " fill all these data fields and then give me data is json format only nothing else"
result = chat_session.send_message(response).text

to_mongo(json.loads(result))
print(result)