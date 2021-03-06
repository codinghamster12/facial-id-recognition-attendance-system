import cognitive_face as CF
from global_variables import personGroupId
import sys
from dotenv import load_dotenv
import os
load_dotenv()

Key = os.getenv('API_KEY')
CF.Key.set(Key)

personGroups = CF.person_group.lists()
for personGroup in personGroups:
    if personGroupId == personGroup['personGroupId']:
        print(personGroupId + " already exists.")
        sys.exit()

res = CF.person_group.create(personGroupId)
print(res)