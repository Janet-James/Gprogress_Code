from bitrix24 import *




bx24 = Bitrix24('https://greenltd.bitrix24.com/rest/60/287xhbto5y0mfs0b/')

Employee_list = bx24.callMethod('crm.documentgenerator.document.update',
                        id=9226,
                        TITLE= "New_Title")

print(Employee_list)