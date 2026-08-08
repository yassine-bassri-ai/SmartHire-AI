from pydantic_settings import BaseSettings


class Settings(BaseSettings):

    PROJECT_NAME: str = "SmartHire AI"

    VERSION: str = "1.0.0"

    DESCRIPTION: str = (

        "AI Recruitment Platform powered by NLP, Machine Learning and DistilBERT"

    )

    MYSQL_HOST: str = "localhost"

    MYSQL_USER: str = "smarthire"

    MYSQL_PASSWORD: str = "SmartHire123!"

    MYSQL_DATABASE: str = "smarthire_ai"


settings = Settings()