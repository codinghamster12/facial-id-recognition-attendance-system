import os
import cv2
import time
from .detect import detectImage
from .identify import openSheet




def take_snaps(class_id,token):
    capture = cv2.VideoCapture(0, cv2.CAP_DSHOW)
    capture.set(3, 640)
    capture.set(4, 480)
    img_counter = 0
    frame_set = []
    start_time = time.time()
    while True:
    
        ret,frame = capture.read()
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        cv2.imshow('frame', gray)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
        if time.time() - start_time >= 5: #<---- Check if 5 sec passed
            img_name = "opencv_frame_{}.png".format(img_counter)
            path= 'C:/Users/bisma/Documents/fyp/app/uploads'
            img_path= os.path.join(path, img_name)
            cv2.imwrite(img_path, frame)
            print("{} written!".format(img_counter))
            start_time = time.time()
            detectImage(img_name)
            openSheet(class_id,token)
            img_counter += 1
        
        if(img_counter == 3):
            break
    
    capture.release()
    cv2.destroyAllWindows()






