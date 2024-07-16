# build_isbndb.py
import asyncio
import os
import sys
from motor.motor_asyncio import AsyncIOMotorClient
import httpx
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

MONGO_CONNECTION_STRING = os.getenv("MONGO_CONNECTION_STRING")
DB_NAME = os.getenv("DB_NAME")
ISBNDB_API_KEY = os.getenv("ISBNDB_API_KEY")
ISBNDB_URL = "http://localhost:8000/isbndb/books"  # Adjust this if your API is running on a different host/port


async def fetch_and_insert_books(start: int, end: int):
    client = AsyncIOMotorClient(MONGO_CONNECTION_STRING)
    db = client[DB_NAME]

    bookpath_titles_collection = db.bookpath_titles
    isbndb_collection = db.isbndb

    cursor = bookpath_titles_collection.find().skip(start).limit(end - start)

    async with httpx.AsyncClient() as http_client:
        async for document in cursor:
            title = document.get("title")
            if not title:
                continue

            params = {"title": title, "page": 1, "pageSize": 20, "column": "title"}
            try:
                response = await http_client.get(ISBNDB_URL, params=params)
                if response.status_code == 200:
                    data = response.json()
                    if "books" in data and len(data["books"]) > 0:
                        first_book = data["books"][0]
                        await isbndb_collection.insert_one(first_book)
                        print(f"Inserted book: {first_book['title']}")
                    else:
                        print(f"No books found for title: {title}")
                else:
                    print(
                        f"Failed to fetch data for title: {title}, status code: {response.status_code}"
                    )
            except Exception as e:
                print(f"Exception occurred while fetching or inserting book: {e}")

    client.close()


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python build_isbndb.py <start> <end>")
        sys.exit(1)

    start = int(sys.argv[1])
    end = int(sys.argv[2])

    asyncio.run(fetch_and_insert_books(start, end))
