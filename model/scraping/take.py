from bs4 import BeautifulSoup
import pandas as pd
import os
import re


with open(f"data/st3.html", 'r') as f:
    response = f.read()

# print(response)

soup = BeautifulSoup(response, 'html.parser')

divs = soup.find_all('div', id='CScaseType')

count = len(divs)

print("Number of divs with ID 'CScaseType':", count)


data = {
    "Court_Name": [],
    "District": [],
    "Case_Type": [],
    "Filing_Number": [],
    "Filing_Date": [],
    "Registration_Number": [],
    "Registration_Date": [],
    "CNC_Number": [],
    "First_Hearing_Date": [],
    "Next_Hearing_Date": [],
    "Case_Stage": [],
    "Court_Number_and_Judge": [],
    "Petitioner_and_Advocate": [],
    "Respondent_and_Advocate": [],
    "Under_Acts": [],
    "Under_Sections": [],
}

for div in divs:
    tables = div.find_all('table')
    length_of_tables = len(tables)

    print(length_of_tables)

    h2_tag = soup.find('h2', class_='h4 text-center mb-1')
    text_content = h2_tag.text

    parts = text_content.split(',')

    district_court = parts[0].strip()
    data['Court_Name'].append(district_court)
    city = parts[1].strip()
    data['District'].append(city)

    if not tables:
        continue


# First Table
    table = tables[0]

    rows = table.find_all('tr')

    case_type = rows[0].find_all('td')[1].text.strip()
    data["Case_Type"].append(case_type)

    filing_number = rows[1].find_all('td')[1].text.strip()
    data["Filing_Number"].append(filing_number)

    filing_date = rows[1].find_all('td')[3].text.strip()
    data["Filing_Date"].append(filing_date)

    registration_no = rows[2].find_all('td')[1].text.strip()
    data["Registration_Number"].append(registration_no)

    registration_date = rows[2].find_all('td')[3].text.strip()
    data["Registration_Date"].append(registration_date)

    cnr = rows[3].find_all('td')[1].find('span').text.strip()
    data['CNC_Number'].append(cnr)


# Second Table
    table = tables[1]

    rows = table.find_all('tr')

    first_hearing_date = rows[0].find_all('td')[1].text.strip()
    data["First_Hearing_Date"].append(first_hearing_date)

    next_hearing_date = rows[1].find_all('td')[1].text.strip()
    data["Next_Hearing_Date"].append(next_hearing_date)

    case_stage = rows[2].find_all('td')[1].text.strip()
    data["Case_Stage"].append(case_stage)

    court_number_and_judge = rows[3].find_all('td')[1].text.strip()
    data["Court_Number_and_Judge"].append(court_number_and_judge)

    # print(table)

# Third Table
    table = tables[2]

    # print(table)

    row = table.find('tr')

    text_content = row.text.strip()
    cleaned_text = text_content.replace('\n', ' ')
    cleaned = cleaned_text.replace("\xa0", " ")
    cleaned = cleaned.replace("  ", " ")
    print(cleaned)

    input_str = cleaned
    output_list = re.split(r'\s*\d\)\s*', input_str.strip())[1:]
    output_list = [' '.join(item.split()) for item in output_list]

    data['Petitioner_and_Advocate'].append(output_list)

# Fourth Table

    table = tables[3]

    # print(table)

    row = table.find('tr')

    text_content = row.text.strip()
    cleaned_text = text_content.replace('\n', ' ')
    cleaned = cleaned_text.replace("\xa0", " ")
    cleaned = cleaned.replace("  ", " ")
    print(cleaned)

    input_str = cleaned
    output_list = re.split(r'\s*\d\)\s*', input_str.strip())[1:]
    output_list = [' '.join(item.split()) for item in output_list]  # Clean up extra spaces

    data['Respondent_and_Advocate'].append(output_list)


# Fifth Table

    table = tables[4]

    rows = table.find_all('tr')

    under_acts = []
    under_sections = []

    flag = True

    for row in rows:
        if flag:
            flag = False
            continue
        under_acts.append(row.find_all('td')[0].text.strip())
        under_sections.append(row.find_all('td')[1].text.strip())
        

    data["Under_Acts"].append(under_acts)
    data["Under_Sections"].append(under_sections)




print(data)

# df = pd.DataFrame(data)

# max_len = max(len(x) for x in data.values())  # Find the maximum list length
# for col, values in data.items():
#     data[col] = values + [None] * (max_len - len(values))

# Create DataFrame
# df = pd.DataFrame(data)

# Print DataFrame for verification (optional)
# print(df)

# Save as CSV
# df.to_csv("data.csv", index=False)
