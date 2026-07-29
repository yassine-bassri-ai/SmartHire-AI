from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware

from src.api.config import settings

from src.api.routes import router

from src.api.exception_handlers import (

    value_error_handler,

    generic_handler

)

app = FastAPI(

    title=settings.APP_NAME,

    version=settings.VERSION,

    description=settings.DESCRIPTION

)

# ------------------------------------
# CORS
# ------------------------------------

app.add_middleware(

    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"]

)

app.add_exception_handler(

    ValueError,

    value_error_handler

)

app.add_exception_handler(

    Exception,

    generic_handler

)

# ------------------------------------
# Routes
# ------------------------------------

app.include_router(router)