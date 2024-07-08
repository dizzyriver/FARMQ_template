# /backend/api/user_management/models.py
from pydantic import BaseModel, EmailStr
from typing import List
from pydantic import Field


class UserBase(BaseModel):
    firstName: str
    lastName: str
    email: EmailStr


class UserCreate(UserBase):
    password: str


class UserInDB(UserBase):
    hashed_password: str
    achievements: List[str] = []


class UserResponse(UserBase):
    id: str = Field(default_factory=str)
