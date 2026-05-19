# 🔥 AI Forest Fire & Smoke Detection System

An end-to-end AI-powered full-stack system for predicting forest fire and smoke risk using machine learning, interactive analytics, and a modern climate-tech dashboard.

This project combines **Machine Learning + FastAPI + React + Data Visualization** to create a real-world environmental monitoring solution for wildfire prediction and smoke risk awareness.

---

## 📌 Project Overview

Forest fires are one of the most dangerous environmental disasters, causing large-scale destruction to ecosystems, wildlife, human settlements, and air quality.

This project aims to predict **forest fire / smoke detection probability** using machine learning models trained on environmental factors and provides a complete web-based dashboard for risk monitoring and insights.

The system includes:

- ML-based smoke/fire prediction
- FastAPI backend for inference
- React climate-tech dashboard frontend
- Risk visualization charts
- Historical prediction analysis
- Dataset organization and model serving

---

# 🚀 Features

## 🧠 Machine Learning
- Forest fire & smoke risk prediction
- Trained ML model deployment
- Real-time inference support
- Feature-based prediction pipeline

## ⚙️ Backend (FastAPI)
- REST API integration
- Model loading using `.pkl`
- Health-check endpoint
- Swagger API docs
- Prediction handling

## 🎨 Frontend (React + Vite)
- Climate-tech styled dashboard
- Interactive UI
- Prediction history tracking
- Risk trend visualization
- Feature importance charts
- Reusable components

## 📊 Data Visualization
- Confusion Matrix
- ROC Curve
- Heatmap
- Risk Trend Charts
- Historical Predictions
- Radar-style Risk Monitoring

---

# 🏗️ Tech Stack

## Machine Learning
- Python
- Pandas
- NumPy
- Scikit-learn
- Matplotlib
- Jupyter Notebook

## Backend
- FastAPI
- Uvicorn
- Pydantic

## Frontend
- React
- Vite
- TypeScript
- Tailwind CSS
- Recharts

## Version Control
- Git
- GitHub

---

# 📂 Project Structure

```bash
AI-Forest-Fire-Smoke-Detection/
│
├── backend/
│   ├── app.py
│   ├── forest_fire_model.pkl
│   └── .gitignore
│
├── frontend/
│   └── Premium AI Climate-Tech Dashboard/
│       ├── src/
│       ├── package.json
│       └── vite.config.ts
│
├── dataset/
│   └── Forest Fire Smoke Dataset - Sheet1 (1).csv
│
├── images/
│   ├── confusion matrix.png
│   ├── hm.png
│   ├── roc_curve_visual.png
│   └── roccurve.png
│
├── notebooks/
│   └── AI_Based_Forest_Fire_Smoke_Detection_Capstone.ipynb
│
├── .gitignore
└── README.md
```

---

# 🧠 ML Workflow

The machine learning pipeline follows:

1. Data collection
2. Data cleaning
3. Feature engineering
4. Exploratory Data Analysis
5. Model training
6. Evaluation
7. Confusion matrix analysis
8. ROC curve analysis
9. Model serialization (`.pkl`)
10. Deployment via FastAPI

---

# 📈 Model Evaluation

The model performance was analyzed using:

- Accuracy score
- Confusion Matrix
- ROC Curve
- Heatmap Visualization
- Classification behavior insights

---

# 🔌 API Endpoints

## Health Check
```http
GET /health
```

Used to verify backend availability.

---

## Predict Fire/Smoke Risk
```http
POST /predict
```

Used for model inference.

---

## Swagger Docs
```http
GET /docs
```

Interactive API documentation.

---

# 🖥️ Local Setup

## 1) Clone Repository

```bash
git clone https://github.com/Charan666-one/AI-Forest-Fire-Smoke-Detection.git
cd AI-Forest-Fire-Smoke-Detection
```

---

# ⚙️ Backend Setup

Navigate:

```bash
cd backend
```

Create / activate virtual env:

```bash
python -m venv .venv
source .venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run backend:

```bash
uvicorn app:app --reload
```

Backend runs on:

```bash
http://127.0.0.1:8000
```

Swagger docs:

```bash
http://127.0.0.1:8000/docs
```

---

# 🎨 Frontend Setup

Open new terminal:

```bash
cd frontend/"Premium AI Climate-Tech Dashboard"
```

Install packages:

```bash
npm install
```

Run frontend:

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# 🔄 Full Execution Flow

User → Frontend Dashboard  
⬇  
React sends API request  
⬇  
FastAPI backend receives data  
⬇  
ML model performs prediction  
⬇  
Prediction returned  
⬇  
Dashboard visualizes result

---

# 📸 Visual Assets

Project includes:

- Confusion Matrix
- Heatmap
- ROC Curve
- Risk Monitoring UI
- Trend Charts

Stored inside:

```bash
/images
```

---

# 🌍 Real-World Applications

This system can be extended for:

- Wildfire early warning systems
- Environmental risk monitoring
- Smart forestry systems
- Climate-tech dashboards
- Disaster management support
- IoT-based fire detection integration
- Air quality & smoke monitoring systems

---
## 📸 Project Screenshots

### Dashboard UI
<img width="100%" src="https://github.com/Charan666-one/AI-Forest-Fire-Smoke-Detection/blob/main/PHOTO-2026-05-19-18-42-14.jpg?raw=true" />

### Risk Analysis View
<img width="100%" src="https://github.com/Charan666-one/AI-Forest-Fire-Smoke-Detection/blob/main/PHOTO-2026-05-19-18-41-50.jpg?raw=true" />

### Prediction Visualization
<img width="100%" src="https://github.com/Charan666-one/AI-Forest-Fire-Smoke-Detection/blob/main/PHOTO-2026-05-19-18-41-29.jpg?raw=true" />

# 🔮 Future Improvements

Possible upgrades:

- Live weather API integration
- Satellite data support
- Real-time anomaly alerts
- IoT sensor connectivity
- Geospatial wildfire mapping
- Model retraining pipeline
- Cloud deployment
- Docker containerization
- CI/CD automation

---

# 👨‍💻 Author

**P. Sri Sai Charan**  
B.Tech AIML | Vardhaman College of Engineering  
Passionate about AI/ML, Full-Stack Systems, and Real-World Intelligent Solutions

GitHub:
https://github.com/Charan666-one

LinkedIn:
https://linkedin.com/in/pedaboini-sri-sai-charan-27389a27a

---
