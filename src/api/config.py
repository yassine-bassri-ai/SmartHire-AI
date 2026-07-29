from pydantic import BaseModel


class Settings(BaseModel):

    APP_NAME: str = "SmartHire AI API"

    VERSION: str = "1.0.0"

    DESCRIPTION: str = (
        "AI Recruitment Platform REST API"
    )

    HOST: str = "127.0.0.1"

    PORT: int = 8000


settings = Settings()