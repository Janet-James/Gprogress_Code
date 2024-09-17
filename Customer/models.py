from django.db import models
from bitrix_base_app.models import BaseModel,Province,ReferenceItem

# Create your models here.
class Customer(BaseModel):
    customer_name = models.CharField(max_length=500,blank=True,null=True)
    class Meta:
        db_table = "customer"

class Customer_Contact(BaseModel):
    contact_name = models.CharField(max_length=500,blank=True,null=True)
    customer_company = models.ForeignKey(Customer, related_name="customer_contact_relation", blank=True, null=True, on_delete = models.DO_NOTHING)
    class Meta:
        db_table = "customer_contact"
