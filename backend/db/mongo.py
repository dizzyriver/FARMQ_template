# backend/db/mongo.py
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv, find_dotenv
from pydantic import BaseModel
import os

load_dotenv(find_dotenv())


class MongoDB:
    def __init__(self):
        self.client = AsyncIOMotorClient(os.getenv("MONGO_CONNECTION_STRING"))
        self.db = self.client[os.getenv("DB_NAME")]

    def get_collection(self, name):
        return self.db[name]

    def get_user_collection(self):
        return self.db.users


def build_projection(model: BaseModel) -> dict:
    projection = {
        field.alias if field.alias else name: 1
        for name, field in model.model_fields.items()
    }
    return projection
