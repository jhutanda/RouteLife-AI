# RouteLife AI - Emergency Traffic Management System

RouteLife AI is a production-ready emergency ambulance routing system designed for Bengaluru city. It leverages Google Maps Traffic Layer and Gemini AI to predict congestion and suggest the fastest routes for life-critical transport.

## Features
- **Real-time Traffic Detection**: Deep integration with Google Maps JS SDK and Traffic Layer.
- **AI-Powered Rerouting**: Gemini 1.5 Flash analyzes traffic patterns and predicts congestion.
- **Glassmorphism Dashboard**: A premium, modern dark-mode UI for dispatchers and drivers.
- **Live Alerts**: WebSockets push emergency reroute instructions to drivers and traffic police.
- **Emergency Contacts**: One-click access to the nearest police stations and hospital ERs.

## Tech Stack
- **Frontend**: React, TypeScript, Vite, Tailwind CSS, Lucide React.
- **Backend**: FastAPI (Python 3.10+), WebSockets.
- **AI**: Google Gemini API.
- **Mapping**: Google Maps Directions, Roads, and Traffic APIs.

## Setup Instructions

### Environment Variables
Create a `.env` file in the root directory:
```env
GEMINI_API_KEY=your_gemini_api_key
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

### Backend Setup
1. `cd server`
2. `pip install -r requirements.txt`
3. `python app/main.py`

### Frontend Setup
1. `cd client`
2. `npm install`
3. `npm run dev`

## Deployment Guide
- **Backend**: Deploy on AWS App Runner or Google Cloud Run.
- **Frontend**: Deploy on Vercel or Netlify.
- **Security**: Enable API key restrictions in Google Cloud Console.

## Multi-Language Support
Current version supports:
- English
- Kannada (AI-generated alerts)

---
*Built with priority on reliability and speed for emergency response.*
