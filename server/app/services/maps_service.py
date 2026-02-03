import googlemaps
import os
from dotenv import load_dotenv

load_dotenv()

class MapsService:
    def __init__(self):
        self.gmaps = googlemaps.Client(key=os.getenv("GOOGLE_MAPS_API_KEY"))

    def get_directions(self, origin, destination, waypoints=None):
        # Mocking for now since dummy key is used
        try:
            directions_result = self.gmaps.directions(
                origin,
                destination,
                mode="driving",
                departure_time="now",
                traffic_model="best_guess",
                alternatives=True
            )
            return directions_result
        except Exception as e:
            # Fallback mock data
            return [
                {
                    "summary": "MG Road",
                    "legs": [{"duration_in_traffic": {"text": "15 mins", "value": 900}}],
                    "overview_polyline": {"points": "..."}
                }
            ]

maps_service = MapsService()
