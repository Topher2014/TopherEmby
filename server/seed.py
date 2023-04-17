from app import app
from models import db, User, Group, GroupUser, Request

with app.app_context():
    
    # User.query.delete()
    Group.query.delete()
    GroupUser.query.delete()
    Request.query.delete()

    users = []
    u1 = User(name='Sam')
    users.append(u1)
    u2 = User(name='Nick')
    users.append(u2)
    db.session.add_all(users)

    groups = []
    g1 = Group(user_id=1, name='group 1')
    groups.append(g1)
    g2 = Group(user_id=1, name='group 2')
    groups.append(g2)
    g3 = Group(user_id=2, name='group 3')
    groups.append(g3)
    g4 = Group(user_id=1, name='group 4')
    groups.append(g4)
    db.session.add_all(groups)

    groupusers = []
    gu1 = GroupUser(user_id=1, group_id=1)
    groupusers.append(gu1)
    gu2 = GroupUser(user_id=1, group_id=2)
    groupusers.append(gu2)
    gu3 = GroupUser(user_id=2, group_id=1)
    groupusers.append(gu3)
    gu4 = GroupUser(user_id=2, group_id=3)
    groupusers.append(gu4)
    gu5 = GroupUser(user_id=1, group_id=4)
    groupusers.append(gu5)
    db.session.add_all(groupusers)

    requests = []
    r1 = Request(user_id=1, group_id=1, type='Movie', name='Annihilation', quality='1080')
    requests.append(r1)
    r2 = Request(user_id=1, group_id=1, type='Movie', name='Avengers', quality='4k')
    requests.append(r2)
    r3 = Request(user_id=1, group_id=2, type='Show', name='Veep', quality='1080')
    requests.append(r3)
    r4 = Request(user_id=2, group_id=3, type='Show', name='Mandalorian', quality='1080')
    requests.append(r4)
    r5 = Request(user_id=2, group_id=2, type='Show', name='Succession', quality='1080')
    requests.append(r5)
    db.session.add_all(requests)

    db.session.commit()