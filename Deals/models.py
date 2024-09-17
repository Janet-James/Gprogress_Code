# Create your models here.
from django.db import models
from bitrix_base_app.models import BaseModel,Province,ReferenceItem
from Customer.models import Customer,Customer_Contact

# Create your models here.
class Deals(BaseModel):
    deal_name = models.CharField(max_length=500,blank=True,null=True)
    customer_company = models.ForeignKey(Customer, related_name="deals_customer_company_relation", blank=True, null=True, on_delete=models.DO_NOTHING)
    customer_contact = models.ForeignKey(Customer_Contact, related_name="deals_customer_contact_relation", blank=True, null=True, on_delete=models.DO_NOTHING)
    class Meta:
        db_table = "deals"
