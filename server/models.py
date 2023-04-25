from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from config import db, bcrypt
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.ext.associationproxy import association_proxy

class Friendship(db.Model, SerializerMixin):
    __tablename__ = 'friendships'

    serialize_rules = ('-friend_id', '-user', '-friend')

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    friend_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    # user = db.relationship('User', foreign_keys='Friendship.user_id', back_populates='friendships')
    # friend = db.relationship('User', foreign_keys='Friendship.friend_id')

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ('-groupuser', '-friendships', 'friends')
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    email = db.Column(db.String)
    _password_hash = db.Column(db.String)

    groupuser = db.relationship('GroupUser', back_populates='users')
    # friendships = db.relationship('Friendship', foreign_keys='Friendship.friend_id', back_populates='user')
    # friends = db.relationship('User', secondary='friendships', primaryjoin='Friendship.user_id == User.id', secondaryjoin='Friendship.friend_id == User.id', backref='friend_of')

    friendships = db.relationship('Friendship', foreign_keys='Friendship.friend_id', backref='user', cascade='all, delete, delete-orphan')
    friend_ids = association_proxy('friendships', 'user_id')

    @hybrid_property
    def password_hash(self):
        return self._password_hash

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))

    @property
    def friends(self):
        result = []
        friend_dict = [f.to_dict() for f in self.friendships]
        for fd in friend_dict:
            user = User.query.filter_by(id=fd['user_id']).first()
            result.append({
                'id': user.id,
                'name': user.name,
                'email': user.email
            })
        return result


class Group(db.Model, SerializerMixin):
    __tablename__ = 'groups'
    # serialize_rules = ('-groupuser.users',)
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    name = db.Column(db.String)

    # groupuser = db.relationship('GroupUser', back_populates='groups', cascade='all, delete, delete-orphan')
    groupuser = db.relationship('GroupUser', back_populates='groups')

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
    imdb_id = db.Column(db.String)