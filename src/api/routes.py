from src.api.routers.resume_router import router as resume_router
from src.api.routers.job_router import router as job_router
from src.api.routers.prediction_router import router as prediction_router
from src.api.routers.model_router import router as model_router
from src.api.routers.dashboard_router import router as dashboard_router
from src.api.routers.matching_router import router as matching_router
from src.api.routers.analytics import router as analytics_router

def register_routes(app):
    app.include_router(resume_router)
    app.include_router(job_router)
    app.include_router(prediction_router)
    app.include_router(model_router)
    app.include_router(dashboard_router)
    app.include_router(matching_router)
    app.include_router(analytics_router)

    

    
