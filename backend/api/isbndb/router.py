# backend/api/isbndb/router.py
from fastapi import APIRouter, HTTPException, Query
import httpx
import os
from dotenv import load_dotenv, find_dotenv
from db.mongo import MongoDB  # Import the MongoDB class
from bson import ObjectId

load_dotenv(find_dotenv())
router = APIRouter()

ISBNDB_API_KEY = os.getenv("ISBNDB_API_KEY")

# Initialize MongoDB connection
mongodb = MongoDB()


@router.get("/books")
async def get_books(
    title: str,
    page: int = Query(1, alias="page"),
    pageSize: int = Query(20, alias="pageSize"),
    column: str = Query("title", alias="column"),
):
    url = f"https://api2.isbndb.com/books/{title}"
    headers = {"accept": "application/json", "Authorization": ISBNDB_API_KEY}
    params = {"page": page, "pageSize": pageSize, "column": column}

    async with httpx.AsyncClient() as client:
        response = await client.get(url, headers=headers, params=params)
        if response.status_code != 200:
            raise HTTPException(
                status_code=response.status_code,
                detail="Error fetching data from ISBNdb API",
            )

        data = response.json()

        # Insert the first book into MongoDB collection "isbndb"
        if "books" in data and len(data["books"]) > 0:
            first_book = data["books"][0]
            try:
                collection = mongodb.get_collection("isbndb")
                # Insert the first book into the collection
                result = await collection.insert_one(first_book)
                # Convert the inserted_id to string
                first_book["_id"] = str(result.inserted_id)
                return {"inserted_id": first_book["_id"], "book": first_book}
            except Exception as e:
                raise HTTPException(
                    status_code=500, detail=f"Error inserting data into MongoDB: {e}"
                )

        return data


@router.get("/book")
async def get_book_by_isbn(
    isbn: str,
):
    url = f"https://api2.isbndb.com/book/{isbn}"
    headers = {"accept": "application/json", "Authorization": ISBNDB_API_KEY}

    async with httpx.AsyncClient() as client:
        response = await client.get(url, headers=headers)
        if response.status_code != 200:
            raise HTTPException(
                status_code=response.status_code,
                detail="Error fetching data from ISBNdb API",
            )

        data = response.json()

        # Insert the book into MongoDB collection "isbndb"
        if "book" in data:
            book = data["book"]
            try:
                collection = mongodb.get_collection("isbndb")
                # Insert the book into the collection
                result = await collection.insert_one(book)
                # Convert the inserted_id to string
                book["_id"] = str(result.inserted_id)
                return {"inserted_id": book["_id"], "book": book}
            except Exception as e:
                raise HTTPException(
                    status_code=500, detail=f"Error inserting data into MongoDB: {e}"
                )

        return data
