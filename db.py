import os

from sqlalchemy import create_engine, Column, Integer, String, Float
from sqlalchemy.orm import declarative_base, sessionmaker


URL = os.environ["DATABASE_URL"]


engine = create_engine(URL)

Session = sessionmaker(bind=engine)

Base = declarative_base()


class Exchange(Base):
    __tablename__ = "exchanges"

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False, unique=True)
    api_url = Column(String, nullable=False)
    websocket_url = Column(String)


Base.metadata.create_all(engine)
