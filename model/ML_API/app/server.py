from fastapi import FastAPI
import joblib
import numpy as np
from fastapi.middleware.cors import CORSMiddleware

model = joblib.load('model.joblib')

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

class_names = np.array(['Fraud', 'Legit'])

# dis = {"features": [190, 2000, 0, 36900, -53700, 10, 1, 2, 1, 630, 630, 5040, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1]}
# print(dis['features'])
# prediction = model.predict(np.array(dis['features']).reshape(1, -1))
# print(prediction)

@app.get('/')
def read_root():
    return {'message': 'Iris model API'}

@app.post('/predict')
def predict(data: dict):
    print(data['features'])
    features = np.array(data['features']).reshape(1, -1)
    prediction = model.predict(features)
    print(prediction)
    return {'predicted_class': prediction[0]}