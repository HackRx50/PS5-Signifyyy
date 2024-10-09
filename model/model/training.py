import pdfplumber
import re
import pandas as pd

with pdfplumber.open('document.pdf') as pdf:
    pages = pdf.pages
    text = ""
    for page in pages:
        text += page.extract_text()

#Extracting CNR No., MACP No., various useful dates, duration, accident information etc.
cnr_no = re.search(r'CNR No\.\s*(\S+)', text)
cnr_no = cnr_no.group(1) if cnr_no else None
macp_no = re.search(r'M\.A\.C\.P\. No\.\s*(\d+/\d+)', text)
macp_no = macp_no.group(1) if macp_no else None
received_on = re.search(r'RECEIVED ON\s*:\s*(\d{2}\.\d{2}\.\d{4})', text)
received_on = received_on.group(1) if received_on else None
registered_on = re.search(r'REGISTERED ON\s*:\s*(\d{2}\.\d{2}\.\d{4})', text)
registered_on = registered_on.group(1) if registered_on else None
decided_on = re.search(r'DECIDED ON\s*:\s*(\d{2}\.\d{2}\.\d{4})', text)
decided_on = decided_on.group(1) if decided_on else None
duration = re.search(r'DURATION\s*:\s*([\dYrs\.Ms\.\dDs]+)', text)
duration = duration.group(1) if duration else None
court_info = re.search(r'BEFORE THE MEMBER, (.+)', text)
court_info = court_info.group(1).strip() if court_info else None
accident_date = re.search(r'accident took place on (\d{2}\.\d{2}\.\d{4})', text)
accident_date = accident_date.group(1) if accident_date else None
claim_amount = re.search(r'Claim of Rs\.\s*([\d,]+)', text)
claim_amount = claim_amount.group(1) if claim_amount else None
applicant_name = re.search(r'Applicant\s*:\s*(Mr\.\s*\w+\s*\w+\s*\w+)', text)
applicant_name = applicant_name.group(1) if applicant_name else None
applicant_age_address = re.search(r'Age\s*:\s*(\d+)\s*years,\s*Occ\s*:\s*(.+)', text)
applicant_age = applicant_age_address.group(1) if applicant_age_address else None
applicant_address = applicant_age_address.group(2).split("R/at")[1].strip() if applicant_age_address else None
opponent_1 = re.search(r'1\s*-\s*(Mr\.\s*\w+\s*\w+\s*\w+)', text)
opponent_1 = opponent_1.group(1) if opponent_1 else None
opponent_2 = re.search(r'2\s*-\s*(M/\s*\S+)', text)
opponent_2 = opponent_2.group(1) if opponent_2 else None
police_case = re.search(r'Crime No\.\s*(\d+/\d{4})', text)
police_case = police_case.group(1) if police_case else None
vehicle_no = re.search(r'bearing No\.\s*(\S+)', text)
vehicle_no = vehicle_no.group(1) if vehicle_no else None
compensation_awarded = re.search(r'compensation of\s*Rs\.\s*([\d,]+)', text)
compensation_awarded = compensation_awarded.group(1) if compensation_awarded else None
interest_rate = re.search(r'rate of interest\s*at\s*(\d+%)', text)
interest_rate = interest_rate.group(1) if interest_rate else None
hospitals = re.findall(r'(Vighnaharta|Sainath|Sahyadri) Hospital', text)
hospitals = ', '.join(set(hospitals)) if hospitals else None
court_fees = re.search(r'Applicant is directed to pay\s*(\S+) court fees', text)
court_fees = court_fees.group(1) if court_fees else None

# now storing those parameters into an object
data = {
    "Parameter": ["CNR No.", "M.A.C.P. No.", "Received On", "Registered On", "Decided On", "Duration", "Court Info",
                  "Accident Date", "Claim Amount", "Applicant Name", "Applicant Age", "Applicant Address",
                  "Opponent 1", "Opponent 2", "Police Case No.", "Vehicle No.", "Compensation Awarded",
                  "Interest Rate", "Hospital Names", "Court Fees"],
    "Details": [cnr_no, macp_no, received_on, registered_on, decided_on, duration, court_info, accident_date,
                claim_amount, applicant_name, applicant_age, applicant_address, opponent_1, opponent_2, police_case,
                vehicle_no, compensation_awarded, interest_rate, hospitals, court_fees]
}

# to dataframe
df = pd.DataFrame(data)

# to csv or xlsx
df.to_csv("extracted_data.csv", index=False)
df.to_excel("extracted_data.xlsx", index=False)

# Display the dataframe (optional)
print(df)