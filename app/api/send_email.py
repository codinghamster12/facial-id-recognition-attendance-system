import smtplib, ssl
import pandas as pd
import time
import sqlite3


currentDate = time.strftime("%d_%m_%y")

def email(filename):
    df = pd.read_excel(filename)
    print(df)
    reg=[]
    emails=[]

    col = df[currentDate]

    for i,row in col.iteritems():
        if row==0:
            reg.append(df['Registration_No'][i])
            print(df['Registration_No'][i])

    conn = sqlite3.connect('./db.sqlite3')
    c = conn.cursor()

    for r in reg:
        c.execute("SELECT email from users_student us where us.registration_no= %s"%r)
        a = c.fetchone()
        
        emails.append(a[0])


    port = 465  # For SSL
    smtp_server = "smtp.gmail.com"
    sender_email = "bushraakram128@gmail.com"  # Enter your address
    # receiver_email = "bushraakram128@gmail.com"  # Enter receiver address
    password = 'codinggg1234$'
    message = """\
    Subject: Hi there

    Your child was not present today."""

    context = ssl.create_default_context()

    with smtplib.SMTP_SSL(smtp_server, port, context=context) as server:
        server.login(sender_email, password)
        for reciever in emails:
            server.sendmail(sender_email, reciever, message)