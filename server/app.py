from flask import Flask, make_response, request, session, abort, jsonify, render_template
from flask_restful import Api, Resource
from config import db, app, Api
from models import User, Group, GroupUser, Request, Friendship
from werkzeug.exceptions import NotFound, Unauthorized

@app.route('/')
@app.route('/<int:id>')
@app.route('/authentication')
@app.route('/groups')
@app.route('/editgroups')
@app.route('/addrequest')
@app.route('/addremoveusers')
@app.route('/addremoveusers/<int:id>')
@app.route('/friendsusers')
def index(id=0):
    return render_template("index.html")


# @app.route('/')
# def index():
#     return '<h1>ToooopppherEEEEmmmmbbbyyy</h1>'

api = Api(app)

class Users(Resource):
    def get(self):
        users_list = [u.to_dict() for u in User.query.all()]
        response = make_response(
            users_list,
            200
        )
        return response
api.add_resource(Users, '/dbusers') 

class Groups(Resource):
    def get(self):
        # groups_list = [g.to_dict() for g in Group.query.filter_by(user_id=session['user_id'])]
        groups_list = [g.to_dict() for g in Group.query.all()]
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
api.add_resource(Groups, '/dbgroups')

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
api.add_resource(GroupByID, '/dbgroup/<int:id>')

class EditGroups(Resource):
    def get(self):
        groups_list = [g.to_dict() for g in Group.query.filter_by(user_id=session['user_id'])]
        response = make_response(
            groups_list,
             200
        )
        return response
api.add_resource(EditGroups, '/dbeditgroups')

class GroupUsers(Resource):
    def get(self):
        groupusers_list = [gu.to_dict() for gu in GroupUser.query.all()]
        response = make_response(
            groupusers_list,
            200
        )
        return response
    def post(self):
        data = request.get_json()
        new_request = GroupUser(
            group_id = data['group_id'],
            user_id = data['user_id']
        )
        db.session.add(new_request)
        db.session.commit()
        response = make_response(
            new_request.to_dict(),
            201
        )
        return response
    def delete(self):
        data = request.get_json()
        groupuser = GroupUser.query.filter_by(group_id=data['group_id'], user_id=data['user_id']).first()
        if not data:
            return make_response({
                "errors": "User not found"
            }, 404)
        db.session.delete(groupuser)
        db.session.commit()
        return make_response('deleted', 200)
api.add_resource(GroupUsers, '/dbgroupusers') 

class DeleteRequest(Resource):
    def delete(self):
        data = request.get_json()
        bleg = Request.query.filter_by(id=data['id']).first()
        if not data:
            return make_response({
                "errors": "Request not found"
            }, 404)
        db.session.delete(bleg)
        db.session.commit()
        return make_response('deleted', 200)
api.add_resource(DeleteRequest, '/dbdeleterequest') 


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
api.add_resource(AddUser, '/dbadduser')

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
        except Exception as e:
            print(str(e))
            abort(401, "Incorrect Username or Password")
api.add_resource(Login, '/dblogin')

class Logout(Resource):
    def delete(self):
        session['user_id'] = None
        response = make_response('', 204)
        return response
api.add_resource(Logout, '/dblogout')

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
api.add_resource(AuthorizedSession, '/dbauthorized')

class Requests(Resource):
    def post(self):
        data = request.get_json()
        new_request = Request(
            name = data['name'],
            type = data['type'],
            quality = data['quality'],
            group_id = data['group_id'],
            user_id = session['user_id'],
            imdb_id = data['imdb_id']
        )
        db.session.add(new_request)
        db.session.commit()
        response = make_response(
            new_request.to_dict(),
            201
        )
        return response
api.add_resource(Requests, '/dbaddrequest')
    

class RequestsByID(Resource):
    def get(self, id):
        requests = [r.to_dict() for r in Request.query.filter_by(group_id=id)]
        # print(requests)
        response = make_response(
            requests,
            200
        )
        return response
api.add_resource(RequestsByID, '/dbgroups/<int:id>/requests')

class Friendships(Resource):
    def get(self):
        try:
            friendships = [f.to_dict(rules=('friend_id',)) for f in Friendship.query.all()]
            return make_response(friendships, 200)
        except Exception as e:
            abort(404, [e.__str__()])
    def post(self):
        data = request.get_json()
        friendship = Friendship(
            user_id = data['user_id'],
            friend_id = data['friend_id']
        )
        friendship_reverse = Friendship(
            user_id = data['friend_id'],
            friend_id = data['user_id']
        )
        db.session.add(friendship)
        db.session.add(friendship_reverse)
        db.session.commit()
        response = make_response(friendship.to_dict(), 201)
        return response
    def delete(self):
        data = request.get_json()
        friendship = Friendship.query.filter_by(
            user_id = data['user_id'],
            friend_id = data['friend_id']
        ).first()
        friendship_reverse = Friendship.query.filter_by(
            user_id = data['friend_id'],
            friend_id = data['user_id']
        ).first()
        db.session.delete(friendship)
        db.session.delete(friendship_reverse)
        db.session.commit()
        return make_response('', 204)
api.add_resource(Friendships, '/dbfriendships')

if __name__ == '__main__':
    app.run(port=5555, debug=True)