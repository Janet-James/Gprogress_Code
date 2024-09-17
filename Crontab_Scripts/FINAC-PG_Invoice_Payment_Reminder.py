import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import psycopg2
from psycopg2.extras import Json
from datetime import datetime, timezone
import pytz

db_params = {
    'host': '127.0.0.1',
    'database': 'gprogress',
    'user': 'postgres',
    'password': 'postgres',
}

# Get the current date
current_datetime = datetime.now(pytz.utc)
desired_timezone = pytz.timezone('Asia/Dubai')
current_datetime_zone = current_datetime.astimezone(desired_timezone)

select_query = "SELECT id, json_data FROM finac_due_payment_reminder"
try:
    conn = psycopg2.connect(**db_params)
    cursor = conn.cursor()
    cursor.execute(select_query)
    results = cursor.fetchall()
    # Sending emails
    for result in results:
        id, json_data = result
        amount = json_data['amount']
        my_company_logo_link = json_data['my_company_logo']
        currency_id = json_data['currency_id']
        invoice_title = json_data['invoice_title']
        invoice_due_date = json_data['invoice_due_date']
        invoice_dt_object = datetime.fromisoformat(invoice_due_date)
        date_difference = current_datetime_zone - invoice_dt_object
        payment_delay_days = date_difference.days
        if payment_delay_days == 1:
            html_text = "Day"
        else:
            html_text = "Days"
        contact_person_name = json_data['contact_person_name']
        invoice_overdue_date = json_data['invoice_overdue_date']
        invoice_doc_link = json_data['invoice_document_link']
        payment_upload_link = json_data['payment_upload_link']
        mycompany_name = json_data['my_company_name']
        to_address_list = json_data['to_address']
        cc_address_list = json_data['cc_address'] 
        bcc_address_list = json_data['bcc_address']
        html_body = f"""
        <html>
        <body style="font-family: sans-serif;">
        <div style="background-color: #f6faff; width: 100%; padding: 25px;">
        <div style="max-width: 800px; margin-left: auto; margin-right: auto;">
        <table style="width: 100%; text-align: right;">
        <tr>
        <td>
        <img src="{my_company_logo_link}" width="250" style="margin-bottom: 20px;"/>
        </td>
        </tr>
        </table>
        <div style="background-color: #fff; margin-left: auto; margin-right: auto; border-radius: 0;">
        <div style="margin-left: auto; margin-right: auto; border-radius: 0; padding: 15px;">
        <p style="margin-top: 10px; margin-bottom: 5px; font-size: 16px; font-weight: bold; font-family: sans-serif;">Dear {contact_person_name},</p>
        <p style="margin-top: 10px; font-size: 14px; font-family: sans-serif;">We’re following up on the overdue invoice <b>{invoice_title}</b> for the amount of <b>{currency_id} {amount}</b>, which was due on <b>{invoice_overdue_date}</b>, and has gone unpaid for <b>{payment_delay_days} {html_text}</b>. We are enclosing a <a href="{invoice_doc_link}">Copy of the Invoice</a> for your reference.</p>
        <p style="margin-top: 10px; font-size: 14px; margin-bottom: 10px; font-family: sans-serif;">To avoid further late payment costs, please make a payment via direct transfer to the bank account indicated on the invoice.</p>
        <p style="margin-top: 10px; margin-bottom: 0; font-size: 14px; font-family: sans-serif;">If you have any questions regarding the invoice or how to pay it,</p>
        <ul style="margin-top: 10px; margin-bottom: 10px; padding-left: 20px; font-size: 14px; font-family: sans-serif;">
        <li>Email us at <a href="mailto:finac@green.com.pg">finac@green.com.pg</a> for clarification.</li>
        <li>Visit us at Section 405, Lot 4, Waigani Drive, NCD.</li>
        </ul>
        <p style="margin-top: 10px; font-size: 14px; font-family: sans-serif;">Thanks,</p>
        <p style="margin-top: 10px; font-size: 14px; font-family: sans-serif;">Finance and Accounts</p>
        <p style="margin-top: 10px; font-size: 14px; font-family: sans-serif;"><b>GREEN Limited</b></p>
        <p style="margin-top: 10px; font-size: 13px; font-family: sans-serif;">Note: This is a system-generated message. If the invoice has already been paid, <a href="{payment_upload_link}">please upload the payment to this link</a>. After verification, the payment records will be updated, and this reminder email will be terminated.</p>
        </div>
        <div style="background-color: #fbfbfb; margin-left: auto; margin-right: auto; border-radius: 0; padding: 10px;">
        <p style="text-align: center; font-size: 9px; margin-top: 0; color: #646464; letter-spacing: 0.5px;">{mycompany_name}</p>
        </div>
        </div>
        </div>
        </div>
        </body>
        </html>
        """
        sender_email = 'digitaladmin@green.com.pg'
        sender_password = 'WinGREEN2024*'        # Recipient email addresses
        to_address = to_address_list
        cc_address = cc_address_list
        bcc_address = bcc_address_list
        #sender_email = 'digitaladmin@green.com.pg'
        #sender_password = 'Win@dmin2022'
       # to_address = ['vijith.vijayan@nexttechnosolutions.co.in']
       # cc_address = ['janet.james@nexttechnosolutions.co.in']
       # bcc_address = ['vijithv644@gmail.com', 'sandhiyavalli23@gmail.com']
        subject = f'{payment_delay_days} {html_text} Pending, Past due payment reminder for Invoice #{invoice_title}'
        message = MIMEMultipart()
        message['From'] = "GREEN Finance & Accounts"
        message['To'] = ",".join(to_address)
        message['Cc'] = ",".join(cc_address)
        message['Bcc'] = ",".join(bcc_address)
        message['Subject'] = subject
        for bcc_email in bcc_address:
            message['Bcc'] = bcc_email
        try:
            body = MIMEText(html_body, 'html')
            message.attach(body)
            server = smtplib.SMTP('smtp.gmail.com', 587)
            server.starttls()
            server.login(sender_email, sender_password)
            server.send_message(message)
            server.quit()
            print("Email sent successfully!")
            html_body = ''
        except Exception as e:
            print("Email could not be sent. Error:", str(e))
   
except Exception as e:
    print(f"Error connecting to the database: {e}")
