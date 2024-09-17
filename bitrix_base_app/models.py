from django.db import models
from django.contrib.auth.models import User

# ----------===============------------- G Solve ---------------===============-------------

class BaseModel(models.Model):
    created_date   = models.DateTimeField(auto_now_add=True,blank=True, null=True)
    created_by     = models.ForeignKey(User,related_name="created_by_%(app_label)s_%(class)s_related",on_delete=models.CASCADE, blank=True, null=True)
    modified_date  = models.DateTimeField(auto_now=True,blank=True, null=True)
    modified_by    = models.ForeignKey(User,related_name="modified_by_%(app_label)s_%(class)s_related",on_delete=models.CASCADE,blank=True, null=True)
    is_active      = models.BooleanField(default=True)
    class Meta:
        abstract = True


class ReferenceItemCategory(BaseModel):
    reference_category       = models.CharField(max_length=200,null=True,blank=True)
    reference_category_code  = models.CharField(max_length=10,null=True,blank=True)
    class Meta:
        db_table = "reference_item_category"


class ReferenceItem(BaseModel):
    reference_item       = models.CharField(max_length=200,null=True,blank=True)
    reference_item_code  = models.CharField(max_length=10,null=True,blank=True)
    reference_category   = models.ForeignKey(ReferenceItemCategory, on_delete = models.CASCADE)
    class Meta:
        db_table = "reference_item"

class Country(BaseModel):
    country_name = models.CharField(max_length=100, blank=True, null=True)
    country_code = models.CharField(max_length=100, blank=True, null=True)
    external_id = models.IntegerField( blank=True, null=True)
    class Meta:
        db_table = "country"

class Province(BaseModel):
    province_name = models.CharField(max_length=100, blank=True, null=True)
    province_code = models.CharField(max_length=100, blank=True, null=True)
    class Meta:
        db_table = "province"



