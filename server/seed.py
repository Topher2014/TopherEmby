from app import app
from models import db, User, Group, GroupUser, Request, Friendship

with app.app_context():
    
    User.query.delete()
    Group.query.delete()
    GroupUser.query.delete()
    Request.query.delete()
    Friendship.query.delete()

    users = []
    u0 = User(name='topher', email='blah@gmail.com')
    u0.password_hash='1'
    users.append(u0)
    u1 = User(name='Sam', email='sam@blah.com' )
    users.append(u1)
    u2 = User(name='Nick', email='nick@blah.com' )
    users.append(u2)
    u3 = User(name='Billy', email='billy@blah.com' )
    users.append(u3)
    u4 = User(name='Kyle', email='kyle@blah.com' )
    users.append(u4)
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
    r1 = Request(user_id=1, group_id=1, type='Movie', name='Annihilation', quality='1080', imdb_id=300668 )
    requests.append(r1)
    r2 = Request(user_id=1, group_id=1, type='Movie', name='Avengers', quality='4k', imdb_id=24428 )
    requests.append(r2)
    r3 = Request(user_id=1, group_id=2, type='Show', name='Veep', quality='1080', imdb_id=2947 )
    requests.append(r3)
    r4 = Request(user_id=2, group_id=3, type='Show', name='Mandalorian', quality='1080', imdb_id=82856 )
    requests.append(r4)
    r5 = Request(user_id=2, group_id=2, type='Show', name='Succession', quality='1080', imdb_id=76331 )
    requests.append(r5)
    db.session.add_all(requests)

    print('Creating shitty friendships...')
    friendships = [
        Friendship(user_id=1, friend_id=2),
        Friendship(user_id=2, friend_id=1),

        Friendship(user_id=1, friend_id=3),
        Friendship(user_id=3, friend_id=1),

        Friendship(user_id=1, friend_id=4),
        Friendship(user_id=4, friend_id=1),

        # Friendship(user_id=1, friend_id=5),
        # Friendship(user_id=5, friend_id=1)

    ]
    db.session.add_all(friendships)

    db.session.commit()