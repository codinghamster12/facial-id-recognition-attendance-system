
import pandas as pd
import time
import sqlite3
import smtplib,ssl



currentDate = time.strftime("%d_%m_%y")

def email(obj):
   
    print(obj)
    emails=[]

  
  
    conn = sqlite3.connect('./db.sqlite3')
    c = conn.cursor()

    for i in obj:
        c.execute("SELECT email from users_student us where us.user_id= %s"%i.student_id_id)
        a = c.fetchone()
        
        emails.append(a[0])

    print(emails)

    port = 465  # For SSL
    smtp_server = "smtp.gmail.com"
    sender_email = "bushraakram128@gmail.com"  # Enter your address
    # receiver_email = "bushraakram128@gmail.com"  # Enter receiver address
    password = 'codinggg1234$'
    message = """\
    Subject: Marked absent


    Your child was not present today."""

    context = ssl.create_default_context()

    with smtplib.SMTP_SSL(smtp_server, port, context=context) as server:
        server.login(sender_email, password)
        for reciever in emails:
            server.sendmail(sender_email, reciever, message)
    