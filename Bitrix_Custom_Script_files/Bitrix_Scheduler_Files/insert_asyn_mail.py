from bitrix24 import *
import psycopg2
import smtplib
import json
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

try:
    connection = psycopg2.connect(user="postgres",
                                  password="postgres",
                                  host="localhost",
                                  port="5432",
                                  database="Bitrix")

    bx24 = Bitrix24('https://greenltd.bitrix24.com/rest/60/yl1b02umrcjvl0we/')

    bitrix = bx24.callMethod('lists.element.get',
                             IBLOCK_TYPE_ID='lists',
                             IBLOCK_ID=128,
                             filter={'PROPERTY_896': 'Waiting'})
    cr = connection.cursor()

    for item in bitrix:
        item_id = item['ID']
        module_name = item["NAME"]
        strsubject = item["PROPERTY_886"]
        subject = next(iter(strsubject.values()))

        strsender_name = item["PROPERTY_888"]
        sender_name = next(iter(strsender_name.values()))

        strto_address = item["PROPERTY_890"]
        to_address = next(iter(strto_address.values()))

        strfrom_address = item["PROPERTY_892"]
        from_address = next(iter(strfrom_address.values()))

        strdeal_id = item["PROPERTY_900"]
        deal_id = next(iter(strdeal_id.values()))

        strdeal_title = item["PROPERTY_902"]
        deal_title = next(iter(strdeal_title.values()))

        strmail_content = item["PROPERTY_894"]
        mail_content = next(iter(strmail_content.values()))

        strmail_status = item["PROPERTY_896"]
        mail_status = next(iter(strmail_status.values()))

        created_by = item["CREATED_BY"]
        created_date = item["DATE_CREATE"]
        modified_by = item["MODIFIED_BY"]
        modified_date = item["TIMESTAMP_X"]

        cr.execute("""Select id from asyn_email where id = %s""",(item_id,))
        result = cr.fetchone()

        if result:

            cr.execute("""UPDATE asyn_email SET module_name = %s,subject = %s,sender_name = %s, to_address = %s, from_address = %s, deal_id = %s,
                deal_title = %s, mail_content = %s,mail_status = %s,created_by = %s,created_date = %s,modified_by = %s,modified_date = %s WHERE id = %s""",
                (module_name, subject, sender_name, to_address, from_address, deal_id, deal_title, mail_content,
                 mail_status, created_by, created_date, modified_by, modified_date, item_id))

            connection.commit()
            print("Records updated.")

        else:
            cr.execute("""INSERT INTO asyn_email(id,module_name,subject,sender_name, to_address, from_address, deal_id,deal_title, mail_content,
                mail_status,created_by,created_date,modified_by,modified_date)
                VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s) returning id""",
                (item_id,module_name, subject, sender_name, to_address, from_address, deal_id, deal_title, mail_content,
                 mail_status, created_by, created_date, modified_by, modified_date))

            connection.commit()
            print("Records inserted.")

    cr.close()
    connection.close()

except Exception as e:
    print("Error:", e)
