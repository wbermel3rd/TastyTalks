from flask_login import UserMixin
from . import db

class User(UserMixin, db.model):
    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255))
    full_name = db.Column(db.String(255))
    password = db.Column(db.String(1000))


    