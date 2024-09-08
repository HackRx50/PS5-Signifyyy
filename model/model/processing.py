import glob
import os
import shutil
import pymupdf

def get_all_pdfs():

    
    processed_dir = os.path.join("model/data/dataset", "processed")
    os.makedirs(processed_dir, exist_ok=True)
    print(os.getcwd())
    # Use glob to find all pdf files in the directory
    pdf_files = glob.glob(os.path.join("model/data/dataset", "*.pdf"))
    
    
    # Loop through the pdf files and pass their path to the function
    for pdf_file in pdf_files:
        process_pdf(pdf_file, "model/data/training")
        destination = os.path.join(processed_dir, os.path.basename(pdf_file))
        shutil.move(pdf_file, destination)
        print(f"Moved {pdf_file} to {destination}")

def process_pdf(file_path, training_dir):
    # Extract text from the PDF and write it to a .txt file
    try:
        # Open the PDF
        pdf_document = pymupdf.open(file_path)
        
        # Initialize an empty string to store the text
        extracted_text = ""

        # Iterate through all pages and extract text
        for page_num in range(pdf_document.page_count):
            page = pdf_document[page_num]
            extracted_text += page.get_text()

        # Close the PDF after extraction
        pdf_document.close()

        # Create a text file with the same name as the PDF, but with a .txt extension
        txt_filename = os.path.basename(file_path).replace(".pdf", ".txt")
        txt_file_path = os.path.join(training_dir, txt_filename)

        # Write the extracted text to the .txt file
        with open(txt_file_path, 'w', encoding='utf-8') as txt_file:
            txt_file.write(extracted_text)

        print(f"Extracted text and saved to {txt_file_path}")
    except Exception as e:
        print(f"Failed to process {file_path}: {e}")

get_all_pdfs()