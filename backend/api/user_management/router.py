from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from backend.db.mongo import MongoDB
from .auth import create_access_token, get_current_user, hash_password, verify_password
from .models import UserCreate, UserInDB, UserResponse
from datetime import timedelta

router = APIRouter()


@router.post("/users/", response_model=UserResponse)
async def create_user(user: UserCreate):
    """Create a new user."""
    async with MongoDB() as db:
        users_collection = db.get_user_collection()
        hashed_password = hash_password(user.password)
        user_dict = user.dict()
        user_dict["hashed_password"] = hashed_password
        del user_dict["password"]
        existing_user = await users_collection.find_one({"email": user.email})
        if existing_user:
            raise HTTPException(status_code=400, detail="Email already registered")
        user_inserted = await users_collection.insert_one(user_dict)
        user_dict["id"] = str(user_inserted.inserted_id)
        return UserResponse(**user_dict)


@router.post("/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    """Authenticate user and return a JWT token."""
    async with MongoDB() as db:
        users_collection = db.get_user_collection()
        user = await users_collection.find_one({"username": form_data.username})
        if not user or not verify_password(form_data.password, user["hashed_password"]):
            raise HTTPException(
                status_code=401, detail="Incorrect username or password"
            )

        access_token = create_access_token(
            user["username"], timedelta(minutes=30)
        )  # Token valid for 30 minutes
        return {"access_token": access_token, "token_type": "bearer"}
