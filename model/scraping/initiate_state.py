import pickle

ilist = [1, 11, 36, 0]

with open('pdf_ind.pkl', 'wb') as f:
    pickle.dump(ilist, f)

print("indexes are saved")