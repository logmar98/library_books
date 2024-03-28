from flask import Flask, request, jsonify, session
import requests
from flask_bcrypt import Bcrypt
from flask_cors import CORS, cross_origin
from flask_session import Session
from config import ApplicationConfig
from models import db, User, Library

app = Flask(__name__)
app.config.from_object(ApplicationConfig)

bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True)
server_session = Session(app)
db.init_app(app)

with app.app_context():
    db.create_all()

@app.route("/@me")
def get_current_user():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401
    
    user = User.query.filter_by(id=user_id).first()
    return jsonify({
        "id": user.id,
        "username": user.username,
        "email": user.email
    }) 

@app.route("/register", methods=["POST"])
def register_user():
    username = request.json["username"]
    email = request.json["email"]
    password = request.json["password"]

    user_exists = User.query.filter_by(email=email).first() is not None

    if user_exists:
        return jsonify({"error": "User already exists"}), 409

    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(email=email, password=hashed_password ,username=username)
    db.session.add(new_user)
    db.session.commit()
    
    session["user_id"] = new_user.id

    return jsonify({
        "id": new_user.id,
        "email": new_user.email
    })

@app.route("/login", methods=["POST"])
def login_user():
    email = request.json["email"]
    password = request.json["password"]

    user = User.query.filter_by(email=email).first()

    if user is None:
        return jsonify({"error": "Unauthorized"}), 401

    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Unauthorized"}), 401
    
    session["user_id"] = user.id

    return jsonify({
        "id": user.id,
        "email": user.email
    })

@app.route("/logout", methods=["POST"])
def logout_user():
    session.pop("user_id")
    return "200"

@app.route("/library", methods=["GET"])
def get_library():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    user = User.query.filter_by(id=user_id).first()
    return jsonify({
        "libraries": [library.tojson() for library in user.libraries]
    })

@app.route("/new_book", methods=["PUT"])
def add_book():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    user = User.query.filter_by(id=user_id).first()
    book_name = request.json["book_name"]
    book_id = request.json["book_id"]
    img = request.json["img"]
    color = request.json["color"]
    status = request.json["status"]
    library = request.json["library"]
    create_at = request.json["create_at"]
    update_at = request.json["update_at"]
    complited_at = request.json["complited_at"]

    new_book = Library(
        book_name=book_name,
        book_id=book_id,
        img=img,
        color=color,
        status=status,
        library=library,
        create_at=create_at,
        update_at=update_at,
        complited_at=complited_at,
        user_id=user.id
    )

    db.session.add(new_book)
    db.session.commit()

    return jsonify(new_book.tojson())

@app.route("/update_book", methods=["PATCH"])
def update_book():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    user = User.query.filter_by(id=user_id).first()
    book_id = request.json["book_id"]
    status = request.json["status"]
    library = request.json["library"]
    update_at = request.json["update_at"]

    book = Library.query.filter_by(book_id=book_id).first()
    book.status = status
    book.library = library
    book.update_at = update_at

    db.session.commit()

    return jsonify(book.tojson())

@app.route("/delete_book", methods=["DELETE"])
def delete_book():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    user = User.query.filter_by(id=user_id).first()
    book_id = request.json["book_id"]

    book = Library.query.filter_by(book_id=book_id).first()
    db.session.delete(book)
    db.session.commit()

    return jsonify({"message": "Book deleted"})

@app.route("/delete_all_books", methods=["DELETE"])
def delete_all_books():
    user_id = session.get("user_id")
    
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401
    
    user = User.query.filter_by(id=user_id).first()
    books = Library.query.filter_by(user_id=user.id).all()
    
    for book in books:
        db.session.delete(book)
    db.session.commit()
    
    return jsonify({"message": "All books deleted"})

if __name__ == "__main__":
    app.run(debug=True)