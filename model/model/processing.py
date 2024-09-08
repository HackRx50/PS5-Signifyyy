import glob
import os
import shutil
import pymupdf
#processing 20 pdf files here
# file = open("")

text = os   #for saving pdfs into text files for feature extraction
raw = os    #for pdfs processing


raw.chdir("D:\Learn MERN\HackRx\model\data\\dataset")

raw_data_files = raw.listdir()
    


# for raw_files in raw_data_files:
#     file_s = open("")

def get_all_pdfs():

    processed_dir = os.path.join("../data/dataset", "processed")
    os.makedirs(processed_dir, exist_ok=True)

    
    # Use glob to find all pdf files in the directory
    pdf_files = glob.glob(os.path.join("../data/dataset", "*.pdf"))
    
    
    # Loop through the pdf files and pass their path to the function
    for pdf_file in pdf_files:
        pdf_to_text(pdf_file)
        destination = os.path.join(processed_dir, os.path.basename(pdf_file))
        shutil.move(pdf_file, destination)
        print(f"Moved {pdf_file} to {destination}")





def pdf_to_text(loc, fileloc):
    doc = pymupdf.open(loc)
    for i in doc.page_count:
        file = open(fileloc, "+a")
        file.open(doc[i].get_text())
        file.close()


    









# #now starting the processing of 20 pdf files here
# file = open(str(file_name), "w")

# for 
# doc = pymupdf.open()

# print(type(file_name))
# 
# 
# text.chdir("D:\Learn MERN\HackRx\model\data\\training")

# text_train_files = text.listdir()

# file_name = str(int(text[len(text)-1]) + 1)

