from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from config import db, bcrypt
from sqlalchemy.ext.hybrid import hybrid_property

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ('-groupuser',)
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    email = db.Column(db.String)
    _password_hash = db.Column(db.String)

    groupuser = db.relationship('GroupUser', back_populates='users')

    @hybrid_property
    def password_hash(self):
        return self._password_hash

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))

class Group(db.Model, SerializerMixin):
    __tablename__ = 'groups'
    # serialize_rules = ('-groupuser.users',)
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    name = db.Column(db.String)

    groupuser = db.relationship('GroupUser', back_populates='groups', cascade='all, delete, delete-orphan')

class GroupUser(db.Model, SerializerMixin):
    __tablename__ = 'groupusers'
    serialize_rules = ('-users.groupuser', '-groups.groupuser')
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    group_id = db.Column(db.Integer, db.ForeignKey('groups.id'))

    users = db.relationship('User', back_populates='groupuser')
    groups = db.relationship('Group', back_populates='groupuser')

class Request(db.Model, SerializerMixin):
    __tablename__ = 'requests'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    group_id = db.Column(db.Integer)
    name = db.Column(db.String)
    type = db.Column(db.String)
    quality = db.Column(db.String)
    imdb_id = db.Column(db.Integer)