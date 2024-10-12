import pickle


loaded_list = []

with open('pdf_ind.pkl', 'rb') as f:
    loaded_list = pickle.load(f)


print("This index was there", loaded_list)