from fastapi import APIRouter, HTTPException

from src.services.analytics_service import AnalyticsService


router = APIRouter(
    prefix="/analytics",
    tags=["Analytics"]
)

service = AnalyticsService()


@router.get("")
def get_analytics():

    try:

        data = service.get_analytics()

        return {
            "success": True,
            "analytics": data
        }

    except Exception as e:

        print("Analytics error:", e)

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )