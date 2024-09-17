#!/bin/sh
python3 /var/www/gpros/GProgress/Crontab_Scripts/FINAC-PG_Invoice_Payment_Reminder.py > /var/www/gpros/GProgress/Crontab_Scripts/log/FINAC-PG_Invoice_Payment_Reminder.log  2>&1  &
