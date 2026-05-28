import os
import json
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

# Configure Gemini API
API_KEY = os.getenv("GEMINI_API_KEY")
if API_KEY and API_KEY != "your_gemini_api_key_here":
    genai.configure(api_key=API_KEY)

async def generate_insights(dataset_summary: dict) -> list:
    """
    Generates business insights from a dataset summary using the Gemini API.
    Returns a list of dictionaries with title, description, and type.
    """
    if not API_KEY or API_KEY == "your_gemini_api_key_here":
        # Fallback to mock insights if no API key is provided
        return _generate_mock_insights(dataset_summary)

    prompt = f"""
    Analyze this business dataset summary and generate concise business insights.
    
    Dataset Summary:
    {json.dumps(dataset_summary, indent=2)}

    Focus on:
    - trends
    - anomalies
    - high-performing categories
    - low-performing areas
    - revenue or metric insights
    - distribution patterns

    Generate short, professional business insights.
    
    Return exactly a JSON object in this format, with 3 to 5 insights:
    {{
      "insights": [
        {{
          "title": "Short Title",
          "description": "One concise sentence describing the insight.",
          "type": "positive" // one of: positive, warning, trend, anomaly, recommendation
        }}
      ]
    }}
    
    Do NOT wrap the output in markdown code blocks like ```json ... ```. Just return the raw JSON object.
    """

    try:
        model = genai.GenerativeModel('gemini-2.5-flash')
        response = model.generate_content(prompt)
        text = response.text.strip()
        
        # Remove markdown if present
        if text.startswith('```json'):
            text = text[7:]
        if text.startswith('```'):
            text = text[3:]
        if text.endswith('```'):
            text = text[:-3]
            
        data = json.loads(text.strip())
        return data.get("insights", [])
    except Exception as e:
        print(f"Error generating insights: {e}")
        # Fallback to mock insights if API fails
        return _generate_mock_insights(dataset_summary)

def _generate_mock_insights(summary: dict) -> list:
    """Provides mock insights when API is unavailable or fails."""
    insights = []
    
    insights.append({
        "title": "Dataset Overview",
        "description": f"Analyzed a dataset with {summary.get('rows', 0)} rows and {summary.get('columns', 0)} columns successfully.",
        "type": "positive"
    })
    
    if summary.get('numeric_columns'):
        insights.append({
            "title": "Metric Analysis Available",
            "description": f"Found {len(summary['numeric_columns'])} numeric variables suitable for trend and performance analysis.",
            "type": "trend"
        })
        
    if summary.get('categorical_columns'):
        insights.append({
            "title": "Categorical Distribution",
            "description": f"Detected {len(summary['categorical_columns'])} categories. Consider analyzing performance across these segments.",
            "type": "recommendation"
        })
        
    insights.append({
        "title": "Action Required",
        "description": "Please provide a valid Gemini API key in the server/.env file to generate real AI insights.",
        "type": "warning"
    })
    
    return insights
