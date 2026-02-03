import os
import sys

# Ensure the root server directory is in the path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from fastapi import FastAPI, WebSocket, WebSocketDisconnect, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.services.gemini_service import gemini_service
from app.services.maps_service import maps_service
import json
import asyncio

app = FastAPI(title="RouteLife AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ConnectionManager:
    def __init__(self):
        self.active_connections: list[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)

manager = ConnectionManager()

@app.get("/")
async def root():
    return {"message": "RouteLife AI API is live"}

@app.post("/analyze-traffic")
async def analyze_traffic(route_request: dict):
    # Get directions from Google Maps
    origin = route_request.get("origin", "Bengaluru Palace")
    destination = route_request.get("destination", "Manipal Hospital")
    
    directions = maps_service.get_directions(origin, destination)
    
    # Analyze with Gemini
    analysis_result = await gemini_service.analyze_traffic(
        current_route_data=directions[0],
        alternate_routes=directions[1:] if len(directions) > 1 else []
    )
    
    # Broadcast alert as if it's an emergency
    alert_payload = {
        "type": "EMERGENCY_REROUTE",
        "data": analysis_result,
        "ambulance_id": "AMB-402"
    }
    await manager.broadcast(json.dumps(alert_payload))
    
    return {"analysis": analysis_result, "directions": directions}

@app.websocket("/ws/alerts")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            # Keep connection alive
            await websocket.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(websocket)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
