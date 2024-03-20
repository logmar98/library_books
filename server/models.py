from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4


db = SQLAlchemy()


def generate_uuid():
    return uuid4().hex


class User(db.Model):
    id = db.Column(db.String(32), primary_key=True, unique=True, default=generate_uuid)
    username = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False, unique=True)
    password = db.Column(db.Text, nullable=False)
    
    
    def tojson(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'password': self.password
        }


class Library(db.Model):
    id = db.Column(db.Integer, primary_key=True, unique=True)
    book_name = db.Column(db.String(100), nullable=False)
    book_id = db.Column(db.String(100), nullable=False)
    status = db.Column(db.String(100), nullable=False)
    library = db.Column(db.String(100), nullable=False)
    create_at = db.Column(db.String(100), nullable=False)
    update_at = db.Column(db.String(100), nullable=False)
    complited_at = db.Column(db.String(100))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user = db.relationship('User', backref=db.backref('libraries', lazy=True))


    def tojson(self):
        return {
            self.id: {
                'book_name': self.book_name,
                'book_id': self.book_id,
                'status': self.status,
                'library': self.library,
                'create_at': self.create_at,
                'update_at': self.update_at,
                'complited_at': self.complited_at,
                'user_id': self.user_id
                }
        }
