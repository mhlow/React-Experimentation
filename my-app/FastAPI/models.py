from database import Base
from sqlalchemy import Column, Integer, String, Boolean, Float

class Transaction(Base):
    __tablename__ = 'transactions'

    p_id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    description = Column(String)
    price = Column(Integer)
    source = Column(String)
    is_available = Column(Boolean)
