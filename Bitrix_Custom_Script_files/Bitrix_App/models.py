from django.db import models

# Create your models here.

class AsynchronousEmail(models.Model):
    module_name = models.TextField(null=True)
    subject = models.TextField(null=True)
    sender_name= models.TextField(null=True)
    to_address = models.TextField(null=True)
    from_address = models.TextField(null=True)
    deal_id = models.TextField(null=True)
    deal_title = models.TextField(null=True)
    mail_content = models.TextField(null=True)
    mail_status = models.TextField(null=True)
    created_by = models.IntegerField(null=True)
    created_date = models.TextField(null=True)
    modified_by = models.IntegerField(null=True)
    modified_date = models.TextField(null=True)

    class Meta:
        db_table = 'asyn_email'

class vendor_List(models.Model):
    list_id = models.IntegerField(null=True)
    vendor_id = models.IntegerField(null=True)
    company_name = models.TextField(null=True)
    email = models.TextField(null=True)
    website = models.TextField(null=True)
    code = models.TextField(null=True)
    address = models.TextField(null=True)
    phone = models.TextField(null=True)
    telephone = models.TextField(null=True)
    account_no = models.TextField(null=True)
    bank_and_branch = models.TextField(null=True)
    bank_name = models.TextField(null=True)
    bank_address = models.TextField(null=True)
    swift_code = models.TextField(null=True)

    class Meta:
        db_table = 'vendor_list'