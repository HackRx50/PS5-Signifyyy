import pickle


loaded_list = []

with open('saved_list.pkl', 'rb') as f:
    loaded_list = pickle.load(f)


print("This index was there", loaded_list)