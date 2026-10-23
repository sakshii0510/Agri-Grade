
# AgriGrade AI Backend

## Requirements
- Python
- pip
- Git (optional)

## Setup

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
Copy-Item .env.example .env
```

## Configuration
Add your OpenWeather API key and Government of India data.gov.in API key
to `.env`. These keys are needed for the weather and mandi-price tabs.
Keep `.env` private; `.env.example` contains placeholders only.

## Run

```powershell
uvicorn main:app --reload --port 8001
```

## API Documentation
http://127.0.0.1:8001/docs

## Endpoints
- `POST /api/predict` — crop image analysis
- `GET /api/market-prices?crop=Tomato` — current mandi prices
- `GET /api/weather?city=New%20Delhi&country_code=IN` — current local weather
- `GET /api/health` — API health check
