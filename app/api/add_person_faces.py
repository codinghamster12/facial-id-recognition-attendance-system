import sys
import os, time
import cognitive_face as CF
from global_variables import personGroupId
import urllib
import sqlite3

from dotenv import load_dotenv

load_dotenv()

Key = os.getenv('API_KEY')
CF.Key.set(Key)

BASE_URL = os.getenv('BASE_URL')
CF.BaseUrl.set(BASE_URL)

import urllib3
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
def get_person_id():
	person_id = ''
	extractId = str(sys.argv[1])[-5:]
	connect = sqlite3.connect("../db.sqlite3")
	c = connect.cursor()
	cmd = "SELECT * FROM users_student WHERE registration_no = " + extractId
	c.execute(cmd)
	row = c.fetchone()
	person_id = row[4]
    
	connect.close()
	return person_id


if len(sys.argv) is not 1:
    currentDir = os.path.dirname(os.path.abspath(__file__)).replace('\\', '/')
    imageFolder = os.path.join(currentDir, "dataset/" + str(sys.argv[1])).replace('\\', '/')
    person_id = get_person_id()
    for filename in os.listdir(imageFolder):
        if filename.endswith(".jpg"):
            print (filename)
            imgurl = os.path.join(imageFolder, filename)
            # print(imgurl)
            res = CF.face.detect(imgurl)
            time.sleep(6)
            if len(res) != 1:
                print ("No face detected in image")
            else:
                res = CF.person.add_face(imgurl, personGroupId, person_id)
                print (res)

