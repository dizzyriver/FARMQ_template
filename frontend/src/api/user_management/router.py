from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from backend.db.mongo import MongoDB
from .auth import create_access_token, get_current_user, hash_password, verify_password
from .models import UserCreate, UserInDB
from datetime import timedelta

router = APIRouter()


@router.post("/users/")
async def create_user(user: UserCreate):
    db = MongoDB().get_collection("users")
    hashed_password = hash_password(user.password)
    user_dict = user.dict()
    user_dict["hashed_password"] = hashed_password
    del user_dict["password"]
    existing_user = await db.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    await db.insert_one(user_dict)
    return {"username": user.username, "email": user.email}


@router.post("/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    db = MongoDB().get_collection("users")
    user = await db.find_one({"username": form_data.username})
    if not user or not verify_password(form_data.password, user["hashed_password"]):
        raise HTTPException(status_code=401, detail="Incorrect username or password")

    access_token = create_access_token(
        user["username"], timedelta(minutes=30)
    )  # Token valid for 30 minutes
    return {"access_token": access_token, "token_type": "bearer"}
