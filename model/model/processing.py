import glob
import os
import shutil
import pymupdf

def get_all_pdfs():

    
    processed_dir = os.path.join("model/data/dataset", "processed")
    os.makedirs(processed_dir, exist_ok=True)
    print(os.getcwd())
    pdf_files = glob.glob(os.path.join("model/data/dataset", "*.pdf"))
    
    
    for pdf_file in pdf_files:
        process_pdf(pdf_file, "model/data/training")
        destination = os.path.join(processed_dir, os.path.basename(pdf_file))
        shutil.move(pdf_file, destination)
        print(f"Moved {pdf_file} to {destination}")

def process_pdf(file_path, training_dir):
    try:
        pdf_document = pymupdf.open(file_path)
        
        extracted_text = ""

        for page_num in range(pdf_document.page_count):
            page = pdf_document[page_num]
            extracted_text += page.get_text()

        pdf_document.close()

        txt_filename = os.path.basename(file_path).replace(".pdf", ".txt")
        txt_file_path = os.path.join(training_dir, txt_filename)

        with open(txt_file_path, 'w', encoding='utf-8') as txt_file:
            txt_file.write(extracted_text)

        print(f"Extracted text and saved to {txt_file_path}")
    except Exception as e:
        print(f"Failed to process {file_path}: {e}")

get_all_pdfs()