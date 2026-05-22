from fastapi import APIRouter, UploadFile, File
from app.services.csv_service import process_csv

router = APIRouter()

@router.post("/upload")
async def upload_dataset(file: UploadFile = File(...)):
    result = await process_csv(file)
    return result
