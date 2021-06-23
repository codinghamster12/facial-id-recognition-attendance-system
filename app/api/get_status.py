import cognitive_face as CF
from global_variables import personGroupId

import os
import urllib3
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

from dotenv import load_dotenv

load_dotenv()

Key = os.getenv('API_KEY')
CF.Key.set(Key)

BASE_URL = os.getenv('BASE_URL')
CF.BaseUrl.set(BASE_URL)

res = CF.person_group.get_status(personGroupId)
print (res)
