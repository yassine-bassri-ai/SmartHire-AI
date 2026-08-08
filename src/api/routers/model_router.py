from fastapi import APIRouter

router = APIRouter(

    prefix="/model",

    tags=["Model"]

)


@router.get("/health")

def health():

    return {

        "status": "running",

        "project": "SmartHire AI"

    }