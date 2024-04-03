# Flask Server

# Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Usage](#usage)
  - [Running the Server](#running-the-server)
- [Database](#database)
  - [User](#user)
  - [Library](#library)
- [Endpoints](#endpoints)
  - [/me](#me)
  - [/register](#register)
  - [/login](#login)
  - [/logout](#logout)
  - [/library](#library-1)
  - [/find_book](#find-book)
  - [/new_book](#new-book)
  - [/update_book](#update-book)
  - [/delete_book](#delete-bookid)
  - [/delete_all_books](#delete-all-books)

## Overview

this server that handle all request that needed for the front end side from authentication to library books and handle all the CRUD (Create, Read, Update, Delete) logic

## **Installation**

[Include instructions on how to install and set up your Flask server locally.]

1. Clone this repository: **`git clone https://github.com/logmar98/library_books.git`**
2. Navigate to the project directory: **`cd library_books`**
3. Install dependencies: **`pip install -r requirements.txt`**

## **Usage**

to run the server in your local machine.

1. Run the server: **`python app.py`**

## Database

all database structure is on (models.py) file.

### User

```json
{
    "id": "value_of_self.id",
    "username": "value_of_self.username",
    "email": "value_of_self.email",
    "password": "value_of_self.password"
}

```

### library

```json
{
    "id": "value_of_self.id",
    "book_name": "value_of_self.book_name",
    "book_id": "value_of_self.book_id",
    "color": "value_of_self.color",
    "img": "value_of_self.img",
    "status": "value_of_self.status",
    "library": "value_of_self.library",
    "create_at": "value_of_self.create_at",
    "update_at": "value_of_self.update_at",
    "complited_at": "value_of_self.complited_at",
    "user_id": "value_of_self.user_id"
}

```

## **Endpoints**

all endpoints is on ([app.py](http://app.py)) file.

### /@me

information about the currently authenticated user.

### /register

to make new user account.

### /login

to login with your account.

### /logout

to logout from the section.

### /library

show all books that you have in your database.

### /find_book

return a book from the library by id.

### /new_book

add a new book to your library.

### /update_book

update a book status by id.

### /delete_book/<string:id>

delete a specific by id.

### /delete_all_books

delete all books in the library.