import pickle

ilist = [32, 17, 36, 0]

with open('saved_list.pkl', 'wb') as f:
    pickle.dump(ilist, f)

print("indexes are saved")