from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
import joblib
import numpy as np
from typing import List
import os

# =====================================================
# App Configuration
# =====================================================

app = FastAPI(
    title="AI Forest Fire & Smoke Detection API",
    description="Predict forest fire and smoke risk using aerial-image extracted spatial features.",
    version="1.0.0"
)
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =====================================================
# Load Model
# =====================================================

MODEL_PATH = "forest_fire_model.pkl"

if not os.path.exists(MODEL_PATH):
    raise FileNotFoundError(
        "forest_fire_model.pkl not found inside backend folder."
    )

model = joblib.load(MODEL_PATH)

# =====================================================
# Input Schema
# =====================================================

class FireData(BaseModel):
    mean_red: float = Field(..., description="Mean red intensity")
    mean_green: float = Field(..., description="Mean green intensity")
    mean_blue: float = Field(..., description="Mean blue intensity")
    red_blue_ratio: float = Field(..., description="Red to Blue color ratio")
    intensity_std: float = Field(..., description="Intensity standard deviation")
    edge_density: float = Field(..., description="Texture edge density")
    smoke_whiteness: float = Field(..., description="Smoke whiteness level")
    haze_index: float = Field(..., description="Atmospheric haze level")
    hot_pixel_fraction: float = Field(..., description="Fraction of hot pixels")
    local_contrast: float = Field(..., description="Local contrast measure")

class BatchFireData(BaseModel):
    samples: List[FireData]

# =====================================================
# Helper Function
# =====================================================

def get_risk_level(probability: float):
    if probability < 0.30:
        return "Low"
    elif probability < 0.60:
        return "Moderate"
    elif probability < 0.85:
        return "High"
    else:
        return "Critical"

# =====================================================
# Root Route
# =====================================================

@app.get("/")
def home():
    return {
        "project": "AI-Based Forest Fire & Smoke Detection",
        "status": "API Running",
        "author": "Sri Sai Charan",
        "model": "Random Forest Classifier",
        "features": 10
    }

# =====================================================
# Health Check
# =====================================================

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "model_loaded": True
    }

# =====================================================
# Single Prediction
# =====================================================

@app.post("/predict")
def predict(data: FireData):
    try:
        features = np.array([[
            data.mean_red,
            data.mean_green,
            data.mean_blue,
            data.red_blue_ratio,
            data.intensity_std,
            data.edge_density,
            data.smoke_whiteness,
            data.haze_index,
            data.hot_pixel_fraction,
            data.local_contrast
        ]])

        prediction = int(model.predict(features)[0])
        probability = float(model.predict_proba(features)[0][1])

        return {
            "fire_detected": prediction,
            "fire_probability": round(probability, 4),
            "risk_level": get_risk_level(probability),
            "message": (
                "Potential fire/smoke region detected"
                if prediction == 1
                else "No fire risk detected"
            )
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Prediction error: {str(e)}"
        )

# =====================================================
# Batch Prediction
# =====================================================

@app.post("/predict-batch")
def predict_batch(batch: BatchFireData):
    try:
        feature_list = []

        for item in batch.samples:
            feature_list.append([
                item.mean_red,
                item.mean_green,
                item.mean_blue,
                item.red_blue_ratio,
                item.intensity_std,
                item.edge_density,
                item.smoke_whiteness,
                item.haze_index,
                item.hot_pixel_fraction,
                item.local_contrast
            ])

        features = np.array(feature_list)

        predictions = model.predict(features)
        probabilities = model.predict_proba(features)[:, 1]

        results = []

        for pred, prob in zip(predictions, probabilities):
            results.append({
                "fire_detected": int(pred),
                "fire_probability": round(float(prob), 4),
                "risk_level": get_risk_level(float(prob))
            })

        return {
            "total_samples": len(results),
            "results": results
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Batch prediction error: {str(e)}"
        )

# =====================================================
# Model Info
# =====================================================

@app.get("/model-info")
def model_info():
    return {
        "algorithm": "Random Forest Classifier",
        "use_case": "Drone-based wildfire & smoke detection",
        "input_features": [
            "mean_red",
            "mean_green",
            "mean_blue",
            "red_blue_ratio",
            "intensity_std",
            "edge_density",
            "smoke_whiteness",
            "haze_index",
            "hot_pixel_fraction",
            "local_contrast"
        ],
        "output": "Binary Fire Classification"
    }