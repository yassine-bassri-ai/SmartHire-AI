from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware

from src.api.routes import register_routes

from src.api.exception_handlers import register_exception_handlers

from src.api.config import settings



app = FastAPI(

    title=settings.PROJECT_NAME,

    version=settings.VERSION,

    description=settings.DESCRIPTION

)

# Allow the Vite dev server (and any local client) to call the API.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
    ],
    allow_origin_regex="http://(localhost|127\\.0\\.0\\.1):\\d+.*",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

register_routes(app)

register_exception_handlers(app)


