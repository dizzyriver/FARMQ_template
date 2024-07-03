from pydantic import BaseModel, EmailStr
from typing import List


class UserBase(BaseModel):
    username: str
    email: EmailStr


class UserCreate(UserBase):
    password: str


class UserInDB(UserBase):
    hashed_password: str
    achievements: List[str] = []
