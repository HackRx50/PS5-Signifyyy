import json
import os
import pdfplumber
import shutil
import pandas as pd
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
    



def process_pdfs(directory, output_file, filename):
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

def csv_excel(data, output_file):
    csv_exists = os.path.isfile(f"{output_file}.csv")    
    df = pd.DataFrame([data])    
    df.to_csv(f"{output_file}.csv", mode='a', header=not csv_exists, index=False)

json_mylist = json.dumps(temp)

# Define the dataset directory and output file
dataset_directory = os.path.join("model/data/dataset")
processed = os.path.join("model/data/dataset", "processed")
oname = "D:\\Learn MERN\\HackRx\\model\\model\\data_pdf2.csv"

process_pdfs(dataset_directory,processed, oname)


# print()
response = text + json_mylist + " fill all these data fields and then give me data is json format only nothing else"
result = chat_session.send_message(response).text
print(result)


data = {
    'CNR No.': [],
    'M.A.C.P. No.':[],
    'Received On':[],
    'Registered On':[],
    'Decided On':[],
    'Duration':[],
    'Court Info':[],
    'Accident Date':[],
    'Claim Amount':[],
    'Applicant Name':[],
    'Applicant Age':[],
    'Applicant Address':[],
    'Applicant Occupation':[],
    'Applicant vehicle No.':[],
    'The Petition in short, is as under':[],
    'Opponent 1':[],
    'Opponent 2':[],
    'Police Case No.':[],
    'Vehicle No.':[],
    'Compensation Awarded':[],
    "Interest Rate": [],
    "Hospital Names": [],
    "Court Fees":[]
}

temp_data = []
for ele in json.loads(result):
    temp_data.append(ele)


for d in temp_data:
    for key,value in d.items():
        if key in data:
            data[key].append(value)


print(data)

df = pd.DataFrame(data)

# df.to_csv("data2.csv")
df.to_csv(oname)


# print(temp_data)
# csv_excel(temp_data,oname)


# Now the text will be properly populated across all pages
# You can pass this text to chat_session or any further processing.
