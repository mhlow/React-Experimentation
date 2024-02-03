from database import Base
from sqlalchemy import Column, Integer, String, Boolean, Float

class Product(Base):
    __tablename__ = 'Products'

    p_id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    description = Column(String)
    price = Column(Integer) # wher decimal type
    source = Column(String)
    is_available = Column(Boolean)
