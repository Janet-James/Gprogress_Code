from bitrix24 import *
import psycopg2
import smtplib
import json
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

# try:
connection = psycopg2.connect(user="postgres",
                                password="postgres",
                                host="localhost",
                                port="5432",
                                database="Bitrix")

bx24 = Bitrix24('https://greenltd.bitrix24.com/rest/58/gdmofi6qro8hnzku/')

bitrix = bx24.callMethod('crm.item.list',
            entityTypeId=163,
            filter={'STAGE_ID': 'DT163_116:CLIENT'})

cr = connection.cursor()

for item in bitrix['items']:

    item_id = item['id']
    name = item['title']
    your_company_details = item['companyId']
    voucher_type = item['ufCrm40_1678958112148']
    finally_paid_amount = item['opportunity']
    financial_year = item['ufCrm40_1681103293165']
    voucher_date = item['ufCrm40_1678950209058']
    selected_vendor = item['ufCrm40_1678433789']
    po_contract_no = item['ufCrm40_1678434078']
    stage = item['stageId']
    budget_code = item['ufCrm40_1678433726']
    project = item['ufCrm40_1678433690']
    tax_invoice = item['ufCrm40_1678434353674']
    check_by = item['ufCrm40_1678435899']
    approver = item['ufCrm40_1678435944']
    authorizer = item['ufCrm40_1678436017']
    paid_for = item['ufCrm40_1678433626']
    payment_no = item['ufCrm40_1678434205']
    amount_in_words = item['ufCrm40_1678435486337']
    entitytypeid = item['entityTypeId']
    currency_id = item['currencyId']
    part_percentage = item['ufCrm40_1678434322897']
    estimated_cost = item['ufCrm40_1678962641574']

    # select query
    cr.execute("SELECT id FROM finac_in_expense_approval WHERE id = %s", (item_id,))
    result = cr.fetchone()
    
    print(item_id)
    print(type(item_id))

    if result:
        # Update existing record
        cr.execute("""UPDATE finac_in_expense_approval SET name = %s,your_company_details = %s,voucher_type = %s,finally_paid_amount = %s,financial_year = %s,voucher_date = %s,
        selected_vendor = %s, po_contract_no = %s, stage = %s,budget_code = %s,project = %s,tax_invoice = %s,check_by = %s,approver = %s,authorizer = %s,paid_for = %s,payment_no = %s,
        amount_in_words = %s,entitytypeid = %s,currency_id = %s,part_percentage = %s,estimated_cost = %s WHERE id = %s""",
        (name,your_company_details,voucher_type,finally_paid_amount,financial_year,voucher_date,selected_vendor,po_contract_no,
        stage,budget_code,project,tax_invoice,check_by,approver,authorizer,paid_for,payment_no,amount_in_words,entitytypeid,currency_id,
        part_percentage,estimated_cost,item_id))

        connection.commit()
        print("Record updated.")
        
    else:
        cr.execute("""INSERT INTO finac_in_expense_approval(id,name,your_company_details,voucher_type,finally_paid_amount,financial_year,voucher_date,selected_vendor, po_contract_no,
        stage,budget_code,project,tax_invoice,check_by,approver,authorizer,paid_for,payment_no,amount_in_words,entitytypeid,currency_id,part_percentage,estimated_cost)
        VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s) returning id""",
        (item_id,name,your_company_details,voucher_type,finally_paid_amount,financial_year,voucher_date,selected_vendor,po_contract_no,
        stage,budget_code,project,tax_invoice,check_by,approver,authorizer,paid_for,payment_no,amount_in_words,entitytypeid,currency_id,
        part_percentage,estimated_cost))

        connection.commit()
        print("Records inserted.")

# except Exception as e:
    # print("Error:", e)
