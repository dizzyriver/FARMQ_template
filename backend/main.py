import os
import sys

# Import FastAPI and other required components
from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

# Explicitly add the parent directory of 'backend' to sys.path
backend_parent_path = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
if backend_parent_path not in sys.path:
    sys.path.insert(0, backend_parent_path)

# Debugging statements
print("sys.path:", sys.path)
print("Current working directory:", os.getcwd())
print(f"PYTHONPATH environment variable: {os.getenv('PYTHONPATH')}")

# Load environment variables from the .env file
from dotenv import find_dotenv, load_dotenv

load_dotenv(find_dotenv())


# Import routers after adding the backend path

# Initialize FastAPI app
app = FastAPI()

# CORS configuration
origins = [
    "http://192.168.1.28:3000",
    "http://localhost:3000",  # Allow the frontend origin during development
    "http://172.20.10.4:3000",  # Allow the frontend origin during development
    "http://127.0.0.1:3000",  # Sometimes requests might come from 127.0.0.1
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register the routers


# Mount static directories under a single base path
app.mount("/static/audio", StaticFiles(directory=os.getenv("AUDIO")), name="audio")
app.mount("/static/images", StaticFiles(directory=os.getenv("IMAGES")), name="images")
