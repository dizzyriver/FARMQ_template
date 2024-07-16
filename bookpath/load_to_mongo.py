import sys
import os
import json
import asyncio

# Add the project root directory to the system path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from backend.db.mongo import MongoDB


async def load_data_to_mongo(file_path):
    # Initialize MongoDB client
    async with MongoDB() as mongo:
        collection = mongo.get_collection("bookpath_titles")

        # Load data from JSON file
        with open(file_path, "r", encoding="utf-8") as file:
            books = json.load(file)

        # Insert data into MongoDB
        for book in books:
            book["bookpath_category"] = file_path.split(".")[0]
            await collection.insert_one(book)
            print(f"Inserted book: {book['title']}")


if __name__ == "__main__":
    # Path to the JSON files
    file_paths = [
        "anthropistikes-epistimes.json",
        "businessmanagement.json",
        "koinonikes-epistimes.json",
        "nomika.json",
        "oikonomika.json",
        "smart_thinking.json",
        "thetikes-epistimes.json",
        "ygia-aftoveltiosi.json",
    ]
    for file_path in file_paths:
        # Run the async function to load data into MongoDB
        asyncio.run(load_data_to_mongo(file_path))
