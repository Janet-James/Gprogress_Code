from fast_bitrix24 import Bitrix
from bitrix24 import *
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import secrets
import hashlib
import random


def generate_password():
    # Generate a random 3-digit number
    random_number = secrets.randbelow(900) + 100  # Ensures a 3-digit number

    # Combine the random number and additional characters
    gen_password = f'UrValue{random_number}'

    return gen_password



solar_id=2   
company_id=14
    
bx24 = Bitrix('https://greenltd.bitrix24.com/rest/42/30l8a6jk1mmvr1r9/')
params = {
    "entityTypeId": 177,
    "filter":{"id": solar_id,"companyId":company_id}        
}
solar_project_list = bx24.get_all('crm.item.list', params)
for project in solar_project_list:
    project_id=project['id']
    project_name=project['title']
    project_company_id=project['companyId']
    print("project_company_id",project_company_id)
    company_list_params = {"ID":project_company_id}
    company_list_response = bx24.get_all('crm.company.contact.items.get', company_list_params)
    for company in company_list_response:
        company_contact_id=int(company['CONTACT_ID'])
        company_contact_list_params={"filter":{"ID":company_contact_id},"select": ["ID","NAME","LAST_NAME","EMAIL","HONORIFIC","UF_CRM_1707795488198"]}
        company_contact_list_response = bx24.get_all('crm.contact.list', company_contact_list_params)
        print("company_contact_list_response",company_contact_list_response)
        for contact in company_contact_list_response:
            contact_id=contact['ID']
            contact_first_name=contact['NAME']
            contact_last_name=contact['LAST_NAME']
            contact_email_address=contact['EMAIL'][0]['VALUE']
            contact_salutation=contact['HONORIFIC']
            if contact_salutation == 'HNR_EN_1':
                contact_salutation = 'Mr.'
            elif contact_salutation == 'HNR_EN_2':
                contact_salutation = 'Mrs.'
            elif contact_salutation == 'HNR_EN_3':
                contact_salutation = 'Ms.'
            elif contact_salutation == 'HNR_EN_4':
                contact_salutation = 'Dr.'
            random_generated_password = generate_password()
            print("random_generated_password",random_generated_password)
            contact_params = {"id": contact_id,
                 "fields":{
                     "UF_CRM_1707795488198": random_generated_password
                 }}
            contact_password_update = bx24.get_all('crm.contact.update', contact_params)
            if contact_password_update:
                #client_password=random_generated_password
                client_password=random_generated_password
        
                html_body = f"""
                <html>
                            <body style="font-family: sans-serif;">
                            <div style="background-color: #f6faff;width: 100%;/* padding: 25px; */">
                            <div style="max-width: 800px; margin-left: auto; margin-right: auto;">
                            <table style="width: 100%; text-align: right;">
                            <tr>
                            <td>
                            <img src="https://bitrix24public.com/greenltd.bitrix24.com/docs/pub/dea9dcf43c07fbdbccd66e0e22b6a8bd/showFile/?&token=kk8c9bspjicc" width="250" style="margin-bottom: 20px;" />
                            </td>
                            </tr>
                            </table>
                            <div style="background-color: #fff; margin-left: auto; margin-right: auto; border-radius: 0;">
                            <div style="margin-left: auto; margin-right: auto; border-radius: 0; padding: 15px;">
                            <p style="margin-top: 10px; margin-bottom: 5px; font-size: 16px; font-weight: bold; font-family: sans-serif;">Dear {contact_salutation}{contact_last_name},</p>
                            <p style="margin-top: 10px; font-size: 14px; font-family: sans-serif;text-align:justify">We GREEN Ltd a front-runner in Renewable Energy engineering and Solution Delivery in Papua New Guinea, pleased to be associated with your organization and delivered RE Power solutions {project_name}.</p>
                            <p style="margin-top: 10px; font-size: 14px; font-family: sans-serif;text-align:justify">Your commitment to sustainability and environmental responsibility is commendable. We feel honored to assist with establishing solar energy solutions at {project_name}. We appreciate this opportunity.</p>
                            <p style="margin-top: 10px; font-size: 14px; font-family: sans-serif;text-align:justify">Enhancing value across the entire project is the objective of value engineering. After World War II, GE developed value engineering, which benefits numerous industries and enterprises. Prototyping design iterations and evaluating multiple functions in an effort to increase the value of the system employs a methodical approach.</p>
                            <p style="margin-top: 10px; font-size: 14px; font-family: sans-serif;text-align:justify">GREEN has effectively implemented value engineering within the solar industry. In this instance, value engineering encompasses the procurement of materials, the implementation of wiring and components, and the design of the engineering for solution delivery layout of the system.</p>
                            <p style="margin-top: 10px; font-size: 14px; font-family: sans-serif;text-align:justify">Furthermore, GREEN is distinguished by its financial value return following implementation, sustainability, service consistency, and environmental impact resulting from value engineering.</p>
                            <p style="margin-top: 10px; font-size: 14px; font-family: sans-serif;text-align:justify">Please Click below to view your Solar Power Plant's Value Engineering</p>
                            <a href="https://green.com.pg/client-partner-login.html" style="background-color: #23b14d;padding: 8px 25px;margin-left: auto;margin-right: auto;display: table;border: 0;color: #fff;font-size: 15px;letter-spacing: 0.5px;font-weight: bold;border-radius: 5px;text-decoration: none;">Access to Your Value Yields</a>
                            <p style="margin-top: 10px;font-size: 14px;font-family: sans-serif;text-align: center;">The password is <span style="font-size: 14px; color: #23b14d; font-weight: bold;letter-spacing: 1px;">{client_password}</span></p>
                            <p style="margin-top: 10px; font-size: 14px; font-family: sans-serif;text-align:justify">I'm glad to be working with you on this significant undertaking again. We anticipate to bring additional value as we progress.</p>
                            <p style="margin-top: 30px; font-size: 14px; font-family: sans-serif;text-align:justify">Warm Regards</p>
                            <p style="margin-top: 8px; font-size: 14px; font-family: sans-serif;text-align:justify"><b>Bernard George</b></p>
                            <p style="margin-top: -11px; font-size: 14px; font-family: sans-serif;text-align:justify"><b>Chief Executive Officer</b></p>
                            </div>
                            <div style="background-color: #fbfbfb; margin-left: auto; margin-right: auto; border-radius: 0; padding: 10px;">
                            <p style="text-align: center; font-size: 9px; margin-top: 0; color: #646464; letter-spacing: 0.5px;"><a href="https://green.com.pg/" style="text-decoration: none; color:#646464;">GREEN Limited</a></p>
                            </div>
                            </div>
                            </div>
                            </div>
                            </body>
                            </html>"""
                sender_email = 'digitaladmin@green.com.pg'
                sender_password = 'WinGREEN2024*'
                to_address =[contact_email_address]
                #to_address = ['janet.james@nexttechnosolutions.co.in']
                #cc_address=['vijith.vijayan@nexttechnosolutions.co.in']
                #bcc_address = ["janet.james@nexttechnosolutions.co.in, bernard@green.com.pg, sobhan.kumar@green.com.pg"]
                #bcc_address = ["sandhiya.arjunan@nexttechnosolutions.co.in, vijith.vijayan@nexttechnosolutions.co.in"]
                subject = f'Introducing GREEN’s Value Engineering! A step ahead for your Value Yields with Energy Augmentation.!'
                message = MIMEMultipart()
                message['From'] = "GREEN Value Engineering"
                message['To'] = ",".join(to_address)
                #message['Cc']=",".join(cc_address)
                #message['Bcc'] = ",".join(bcc_address)
                message['Subject'] = subject
                #for bcc_email in bcc_address:
                 #   message['Bcc'] = bcc_email
                # Send the email
                try:
                    body = MIMEText(html_body, 'html')
                    message.attach(body)
                    server = smtplib.SMTP('smtp.gmail.com', 587)
                    server.starttls()
                    server.login(sender_email, sender_password)
                    server.send_message(message)
                    server.quit()
                    html_body = ''
                    print("Email sent successfully!")
                    html_body = ''
                except Exception as e:
                    print("Email could not be sent. Error:", str(e))    
