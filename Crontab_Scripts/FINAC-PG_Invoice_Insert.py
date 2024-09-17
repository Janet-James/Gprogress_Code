import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from fast_bitrix24 import Bitrix
from datetime import datetime, timezone
import pytz
import psycopg2
from psycopg2.extras import Json

# --- DataBase Connection ---
db_params = {
    'host': '127.0.0.1',
    'database': 'gprogress',
    'user': 'postgres',
    'password': 'postgres',
}

conn = psycopg2.connect(**db_params)
cursor = conn.cursor()

bx24 = Bitrix('https://greenltd.bitrix24.com/rest/120/i7jh2267ia7wzxtb/')

# Universal List
universal_list = {
    "IBLOCK_TYPE_ID": "lists",
    "IBLOCK_ID": 188,
    "ELEMENT_ID": 14488
}
mail_recipient_response = bx24.get_all('lists.element.get', universal_list)
# company_list
company_params = {
    "select": ["ID","TITLE"]
}
company_list_response = bx24.get_all('crm.company.list', company_params)
company_dict = {}
for comp in company_list_response:
    comp_id = comp['ID']
    comp_name = comp['TITLE']
    company_dict[comp_id] = comp_name
# contact_list
contact_params = {
    "select": ["ID","NAME","LAST_NAME"]
}
contact_list_response = bx24.get_all('crm.contact.list', contact_params)
contact_dict = {}
for contact in contact_list_response:
    contact_person_id = contact['ID']
    contact_person_name = contact['NAME']
    # contact_last_name = contact['LAST_NAME']
    # full_name = ''
    # if contact_person_name:
    #     full_name += contact_person_name
    # if contact_last_name:
    #     if full_name:
    #         full_name += ' '
    #     full_name += contact_last_name
    contact_dict[contact_person_id] = contact_person_name
# Recipient List
cc_persons_email_id_list = []
for uni_list in mail_recipient_response:
    uni_list_cc_persons = uni_list["PROPERTY_1164"]
    for cc_persons_id in uni_list_cc_persons.values():
        cc_person_user_id = int(cc_persons_id)
        cc_users_list = bx24.get_all('user.get',{"ID": cc_person_user_id})
        cc_persons_email_id = cc_users_list[0]['EMAIL']
        cc_persons_email_id_list.append(cc_persons_email_id)
# Get the current date
current_datetime = datetime.now(pytz.utc)
desired_timezone = pytz.timezone('Asia/Dubai')
current_datetime_zone = current_datetime.astimezone(desired_timezone)
filter_current_date = datetime.now()
formated_current_date = filter_current_date.strftime("%Y-%m-%d")
current_date_filter = formated_current_date+' '+'00:00:00'
# DT144_142:UC_NE3TQB - OG
# DT144_142:UC_BKXI09 - TEST
finac_pg_params = {
    "entityTypeId": 144,
    "filter": {"categoryId":142, "stageId": "DT144_142:UC_BKXI09", "<ufCrm8_1698898026": current_date_filter}
}
finac_pg_response = bx24.get_all('crm.item.list', finac_pg_params)
for item in finac_pg_response:
    deal_id = item['id']
    entityTypeId = item['entityTypeId']
    invoice_title = item['title']
    invoice_number = item['ufCrm8_1678689792']
    contact_person_id = str(item['contactId'])
    contact_person_name = contact_dict[contact_person_id]
    contact_to_email = item['ufCrm8_1699530514']
    to_address_list = contact_to_email.split(',') if contact_to_email else []
    contact_cc_email = item['ufCrm8_1699530539']
    cc_address_list = contact_cc_email.split(',') if contact_cc_email else []
    contact_bcc_email = item['ufCrm8_1699530485']
    bcc_address_list = contact_bcc_email.split(',') if contact_bcc_email else []
    my_company_logo = item['ufCrm8_1698919474']
    amount = item['opportunity']
    currency_id = item['currencyId']
    mycompany_id = str(item['mycompanyId'])
    mycompany_name = company_dict[mycompany_id]
    invoice_due_date = item['ufCrm8_1698898026']
    invoice_doc_link = item['ufCrm8_1698988252']
    # salutation = item['ufCrm8_1699270499']
    payment_upload_link = f"https://gprogress.green.com.pg/payment_receipt_upload/{entityTypeId}/{deal_id}/"
    input_date = datetime.fromisoformat(invoice_due_date)
    invoice_overdue_date = input_date.strftime("%B %d, %Y")

    pyment_remaider_data = {
    'my_company_logo': my_company_logo,
    'contact_person_name': contact_person_name,
    'invoice_title': invoice_title,
    'currency_id': currency_id,
    'amount': amount,
    'invoice_overdue_date': invoice_overdue_date,
    'invoice_due_date': invoice_due_date,
    # 'payment_delay_text': html_text,
    'invoice_document_link': invoice_doc_link,
    'payment_upload_link': payment_upload_link,
    'my_company_name': mycompany_name,
    'to_address': to_address_list,
    'cc_address': cc_address_list,
    'bcc_address': bcc_address_list,
    }

    insert_query = "INSERT INTO finac_due_payment_reminder (json_data) VALUES (%s) RETURNING id, json_data;"
    cursor.execute(insert_query, (Json(pyment_remaider_data),))
    inserted_row = cursor.fetchone()
    conn.commit()
    print("Insertion Success!!!")
