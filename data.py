from lib2to3.pgen2.token import OP
import sqlite3


#TODO add coments to code

def run_sql_file(con, file):
    cur = con.cursor()
    with open(file, 'r') as f:
        sql_file = f.read()
    commands = sql_file.split(";")
    for command in commands:
        try:
            cur.execute(command)
        except sqlite3.OperationalError as msg:
            print("Command skipepd: ", command)
            print(msg)

def create_user(con, username, email):
    cur = con.cursor()
    sql = "INSERT INTO USER(user_id, email, username) VALUES(?, ?, ?);"
    import random
    user_id = random.randint(0,2**16)
    data = (user_id, email, username)
    
    try:
        cur.execute(sql, data)
    except sqlite3.OperationalError as msg:
            print("Command Failed: ", sql, "\n", data)
            print(msg)
    con.commit()
    return user_id
    #return cur.lastrowid
            
def create_closet(con, user_id, closet_name=None):
    cur = con.cursor()
    sql = "INSERT INTO closet(user_id, closet_id, closet_name) VALUES(?, ?, ?);"
    import random
    closet_id = random.randint(0,2**16)
    data = (user_id, closet_id, closet_name)# TODO chnage random.randint(0, 2**16) so we dont just pray id insnt taken
    try:
        cur.execute(sql, data)
    except sqlite3.OperationalError as msg:
            print("Command Failed: ", sql, "\n", data)
            print(msg)
    con.commit()
    return closet_id
    #return cur.lastrowid
            
def create_clothing(con, closet_id, item_name=None, picture_id=None, item_type=None, item_sub_type=None, attributes=None):
    cur = con.cursor()
    attributes = str(attributes)# convert attributes array into string and later convert back to array. wont be needed with postgres
    sql = "INSERT INTO clothing_item(item_id, closet_id, item_name, picture_id, item_type, item_sub_type, attributes) VALUES (?, ?, ?, ?, ?, ?, ?)"
    import random
    item_id = random.randint(0,2**16)
    data = (item_id, closet_id, item_name, picture_id, item_type, item_sub_type, attributes)# TODO chnage random.randint(0, 2**16) so we dont just pray id insnt taken
    try:
        cur.execute(sql, data)
    except sqlite3.OperationalError as msg:
            print("Command Failed: ", sql, "\n", data)
            print(msg)
    con.commit()
    return item_id
    #return cur.lastrowid
#dont rerun database creattion if it exists
from os.path import exists
if exists("alpha.db"):
    con = sqlite3.connect("alpha.db")
else:
    con = sqlite3.connect("alpha.db")
    run_sql_file(con, "init.sql")

if __name__ == '__main__':
    
    bob = create_user(con, "bob", "bob@gmail.com")
    c_id = create_closet(con, bob, "bobs clothes")
    create_clothing(con, c_id, item_name = "shirt", attributes = ['top'])
    cur = con.cursor()
    res = cur.execute("SELECT * FROM user")
    print(res.fetchall())
    res = cur.execute("SELECT * FROM closet")
    print(res.fetchall())
    res = cur.execute("SELECT * FROM clothing_item")
    print(res.fetchall())