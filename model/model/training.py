import os
import shutil
import pdfplumber
import re
import pandas as pd

def extract_pdf_data(pdf_path):
    # Open the PDF and extract text
    with pdfplumber.open(pdf_path) as pdf:
        text = ""
        for page in pdf.pages:
            text += page.extract_text()

    # Define regex patterns and extract information with fallback to 'NA' if not found
    cnr_no = re.search(r'CNR No\.\s*(\S+)', text)
    cnr_no = cnr_no.group(1) if cnr_no else 'NA'

    macp_no = re.search(r'M\.A\.C\.P\. No\.\s*(\d+/\d+)', text)
    macp_no = macp_no.group(1) if macp_no else 'NA'

    received_on = re.search(r'RECEIVED ON\s*:\s*(\d{2}\.\d{2}\.\d{4})', text)
    received_on = received_on.group(1) if received_on else 'NA'

    registered_on = re.search(r'REGISTERED ON\s*:\s*(\d{2}\.\d{2}\.\d{4})', text)
    registered_on = registered_on.group(1) if registered_on else 'NA'

    decided_on = re.search(r'DECIDED ON\s*:\s*(\d{2}\.\d{2}\.\d{4})', text)
    decided_on = decided_on.group(1) if decided_on else 'NA'

    duration = re.search(r'DURATION\s*:\s*([\dYrs\.Ms\.\dDs]+)', text)
    duration = duration.group(1) if duration else 'NA'

    court_info = re.search(r'BEFORE THE MEMBER, (.+)', text)
    court_info = court_info.group(1).strip() if court_info else 'NA'

    accident_date = re.search(r'accident took place on (\d{2}\.\d{2}\.\d{4})', text)
    accident_date = accident_date.group(1) if accident_date else 'NA'

    claim_amount = re.search(r'Claim of Rs\.\s*([\d,]+)', text)
    claim_amount = claim_amount.group(1) if claim_amount else 'NA'

    applicant_name = re.search(r'Applicant\s*:\s*(Mr\.\s*\w+\s*\w+\s*\w+)', text)
    applicant_name = applicant_name.group(1) if applicant_name else 'NA'

    applicant_age_address = re.search(r'Age\s*:\s*(\d+)\s*years,\s*Occ\s*:\s*(.+)', text)
    applicant_age = applicant_age_address.group(1) if applicant_age_address else 'NA'
    applicant_address = applicant_age_address.group(2).split("R/at")[1].strip() if applicant_age_address else 'NA'

    opponent_1 = re.search(r'1\s*-\s*(Mr\.\s*\w+\s*\w+\s*\w+)', text)
    opponent_1 = opponent_1.group(1) if opponent_1 else 'NA'

    opponent_2 = re.search(r'2\s*-\s*(M/\s*\S+)', text)
    opponent_2 = opponent_2.group(1) if opponent_2 else 'NA'

    police_case = re.search(r'Crime No\.\s*(\d+/\d{4})', text)
    police_case = police_case.group(1) if police_case else 'NA'

    vehicle_no = re.search(r'bearing No\.\s*(\S+)', text)
    vehicle_no = vehicle_no.group(1) if vehicle_no else 'NA'

    compensation_awarded = re.search(r'compensation of\s*Rs\.\s*([\d,]+)', text)
    compensation_awarded = compensation_awarded.group(1) if compensation_awarded else 'NA'

    interest_rate = re.search(r'rate of interest\s*at\s*(\d+%)', text)
    interest_rate = interest_rate.group(1) if interest_rate else 'NA'

    hospitals = re.findall(r'(Vighnaharta|Sainath|Sahyadri) Hospital', text)
    hospitals = ', '.join(set(hospitals)) if hospitals else 'NA'

    court_fees = re.search(r'Applicant is directed to pay\s*(\S+) court fees', text)
    court_fees = court_fees.group(1) if court_fees else 'NA'

    # Store extracted data in a dictionary
    data = {
        "CNR No.": cnr_no,
        "M.A.C.P. No.": macp_no,
        "Received On": received_on,
        "Registered On": registered_on,
        "Decided On": decided_on,
        "Duration": duration,
        "Court Info": court_info,
        "Accident Date": accident_date,
        "Claim Amount": claim_amount,
        "Applicant Name": applicant_name,
        "Applicant Age": applicant_age,
        "Applicant Address": applicant_address,
        "Opponent 1": opponent_1,
        "Opponent 2": opponent_2,
        "Police Case No.": police_case,
        "Vehicle No.": vehicle_no,
        "Compensation Awarded": compensation_awarded,
        "Interest Rate": interest_rate,
        "Hospital Names": hospitals,
        "Court Fees": court_fees
    }

    return data

def append_data_to_csv_excel(data, output_file):
    # Check if the CSV or Excel file exists
    csv_exists = os.path.isfile(f"{output_file}.csv")
    excel_exists = os.path.isfile(f"{output_file}.xlsx")

    df = pd.DataFrame([data])
    df.to_csv(f"{output_file}.csv", mode='a', header=not csv_exists, index=False)
    with pd.ExcelWriter(f"{output_file}.xlsx", mode='a', if_sheet_exists='overlay', engine='openpyxl') as writer:
        df.to_excel(writer, index=False, header=not excel_exists)

def move_pdf_to_processed(pdf_path, processed_dir):
    os.makedirs(processed_dir, exist_ok=True) 
    shutil.move(pdf_path, os.path.join(processed_dir, os.path.basename(pdf_path)))

def process_pdfs(directory, output_file, processed_dir):
    # Iterate over all PDF files in the given directory
    for filename in os.listdir(directory):
        if filename.endswith(".pdf"):
            file_path = os.path.join(directory, filename)
            print(f"Processing {file_path}...")            
            pdf_data = extract_pdf_data(file_path)
            append_data_to_csv_excel(pdf_data, output_file)
            move_pdf_to_processed(file_path, processed_dir)

    print(f"All PDFs processed and data saved to {output_file}.csv and {output_file}.xlsx")


# Define the dataset directory, processed directory, and output file
dataset_directory = os.path.join("model/data/dataset")
processed_directory = os.path.join("model/data/dataset", "processed")
output_file_name = "extracted_pdf_data"

# Call the function to process all PDFs in the directory and move them to 'processed'
process_pdfs(dataset_directory, output_file_name, processed_directory)