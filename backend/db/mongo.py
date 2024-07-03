from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv, find_dotenv
from pydantic import BaseModel
import os
import logging

# Load environment variables from a .env file
load_dotenv(find_dotenv())


class MongoDB:
    def __init__(self):
        try:
            # Establish a connection to the MongoDB server
            self.client = AsyncIOMotorClient(os.getenv("MONGO_CONNECTION_STRING"))
            self.db = self.client[os.getenv("DB_NAME")]
            logging.info("Connected to MongoDB")
        except Exception as e:
            logging.error(f"Failed to connect to MongoDB: {e}")
            raise

    def get_collection(self, name):
        """Get a collection by name."""
        return self.db[name]

    def get_user_collection(self):
        """Get the user collection."""
        return self.db.users

    async def __aenter__(self):
        return self

    async def __aexit__(self, exc_type, exc_val, exc_tb):
        self.client.close()
        logging.info("MongoDB connection closed")


def build_projection(model: BaseModel) -> dict:
    """Build a projection dictionary for MongoDB queries based on a Pydantic model."""
    projection = {
        field.alias if field.alias else name: 1
        for name, field in model.__fields__.items()
    }
    return projection
