import pickle

ilist = [0, 0, 0, 0]

with open('pdf_ind.pkl', 'wb') as f:
    pickle.dump(ilist, f)

print("indexes are saved")