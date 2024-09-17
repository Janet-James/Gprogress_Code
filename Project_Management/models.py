# Create your models here.
from django.db import models
from bitrix_base_app.models import BaseModel,Province,ReferenceItem
from Customer.models import Customer,Customer_Contact

# Create your models here.
class Project_Site(BaseModel):
    project_name = models.CharField(max_length=500,blank=True,null=True)
    customer_company = models.ForeignKey(Customer, related_name="project_customer_company_relation", blank=True, null=True, on_delete=models.CASCADE)
    customer_contact = models.ForeignKey(Customer_Contact, related_name="project_customer_contact_relation", blank=True, null=True, on_delete=models.CASCADE)
    class Meta:
        db_table = "project_site"
