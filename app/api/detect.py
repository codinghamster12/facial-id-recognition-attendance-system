import cv2
import dlib
import os


import urllib3
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
from pathlib import Path

#cam = cv2.VideoCapture(1)
detector = dlib.get_frontal_face_detector()
path  = Path(__file__).resolve().parent.parent
new= os.path.join(path,'api')

def detectImage(fileName):
    img = cv2.imread(f'./uploads/{fileName}')
    dets = detector(img, 1)
    if not os.path.exists(str(new)+'/Cropped_faces'):
        os.makedirs(str(new)+'/Cropped_faces')
    print ("detected = " + str(len(dets)))
    for i, d in enumerate(dets):
        cv2.imwrite(str(new)+'/Cropped_faces/face' + str(i + 1) + '.jpg', img[d.top():d.bottom(), d.left():d.right()])




