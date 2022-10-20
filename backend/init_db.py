from api import db, app

with app.app_context(): # context is needed so sqlalchemy knows where to create the database
    db.create_all()