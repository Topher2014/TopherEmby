from flask import Flask, make_response, request, session, abort, jsonify
from flask_restful import Api, Resource
from config import db, app, Api
from models import User, Group, GroupUser, Request
from werkzeug.exceptions import NotFound, Unauthorized

@app.route('/')
def index():
    return '<h1>ToooopppherEEEEmmmmbbbyyy</h1>'

api = Api(app)

# class Index(Resource):
#     def get(self):
#         response = make_response(
#             {'message': 'blah blah blah'},
#             200
#         )
#         return response
# api.add_resource(Index, '/')

class Users(Resource):
    def get(self):
        users_list = [u.to_dict() for u in User.query.all()]
        response = make_response(
            users_list,
            200
        )
        return response
api.add_resource(Users, '/users') 

class Groups(Resource):
    def get(self):
        groups_list = [g.to_dict() for g in Group.query.filter_by(user_id=session['user_id'])]
        response = make_response(
            groups_list,
             200
        )
        return response
    def post(self):
        data = request.get_json()
        new_group = Group(
            name = data['name'],
            user_id = session['user_id']
        )
        db.session.add(new_group)
        db.session.commit()
        response = make_response(
            new_group.to_dict(),
            201
        )
        return response
api.add_resource(Groups, '/groups')

class GroupByID(Resource):
    def delete(self, id):
        group = Group.query.filter_by(id=id).first()
        if not group:
            return make_response({
                "errors": "Group not found"
            }, 404)
        db.session.delete(group)
        db.session.commit()
        return make_response('deleted', 200)
api.add_resource(GroupByID, '/group/<int:id>')

class EditGroups(Resource):
    def get(self):
        groups_list = [g.to_dict() for g in Group.query.filter_by(user_id=session['user_id'])]
        response = make_response(
            groups_list,
             200
        )
        return response
api.add_resource(EditGroups, '/editgroups')

class GroupUsers(Resource):
    def get(self):
        groupusers_list = [gu.to_dict() for gu in GroupUser.query.all()]
        response = make_response(
            groupusers_list,
            200
        )
        return response
api.add_resource(GroupUsers, '/groupusers') 

class AddUser(Resource):
    def post(self):
        form_json = request.get_json()
        new_user = User(name=form_json['name'], email=form_json['email'])
        new_user.password_hash = form_json['password']
        db.session.add(new_user)
        db.session.commit()
        session['user_id'] = new_user.id
        response = make_response(
            new_user.to_dict(),
            201
        )
        return response
api.add_resource(AddUser, '/adduser')

class Login(Resource):
    def post(self):
        try: 
            user = User.query.filter_by(name=request.get_json()['name']).first()
            if user.authenticate(request.get_json()['password']):
                session['user_id'] = user.id
                response = make_response(
                    user.to_dict(),
                    200
                )
                return response
        except:
            abort(401, "Incorrect Username or Password")
api.add_resource(Login, '/login')

class Logout(Resource):
    def delete(self):
        session['user_id'] = None
        response = make_response('', 204)
        return response
api.add_resource(Logout, '/logout')

class AuthorizedSession(Resource):
    def get(self):
        try:
            user = User.query.filter_by(id=session['user_id']).first()
            response = make_response(
                user.to_dict(),
                200
            )
            return response
        except:
            abort(401, 'Unauthorized')
api.add_resource(AuthorizedSession, '/authorized')

class RequestsByID(Resource):
    def get(self, id):
        requests = [r.to_dict() for r in Request.query.filter_by(group_id=id)]
        print(requests)
        response = make_response(
            requests,
            200
        )
        return response
api.add_resource(RequestsByID, '/groups/<int:id>/requests')


if __name__ == '__main__':
    app.run(port=5555, debug=True)