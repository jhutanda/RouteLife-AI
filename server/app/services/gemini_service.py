import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

class GeminiService:
    def __init__(self):
        self.model = genai.GenerativeModel('gemini-1.5-flash')

    async def analyze_traffic(self, current_route_data: dict, alternate_routes: list):
        prompt = f"""
        Analyze the following traffic data for an ambulance route in Bengaluru.
        
        Current Route Data: {current_route_data}
        Alternate Routes: {alternate_routes}
        
        Tasks:
        1. Predict congestion in the next 10-15 minutes.
        2. Decide if rerouting is necessary.
        3. Generate a human-readable alert message in English and Kannada.
        4. Provide a reasoning for the best route selection based on ETA, traffic density, and road width.
        
        Output format (JSON):
        {{
            "reroute_recommended": boolean,
            "recommended_route_id": string,
            "alert_en": "string",
            "alert_kn": "string",
            "reasoning": "string"
        }}
        """
        
        response = self.model.generate_content(prompt)
        return response.text

gemini_service = GeminiService()
