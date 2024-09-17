# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from bitrix_base_app.models import BaseModel,Country,Province,ReferenceItem
from django.contrib.auth.models import User
from Customer.models import Customer,Customer_Contact
from Deals.models import Deals
from Project_Management.models import Project_Site
from django.contrib.postgres.fields import ArrayField
#from visa_process import Country
# Create your models here.

class SiteAssessment(BaseModel):
    deal = models.ForeignKey(Deals, related_name="site_checklist_deals_relation", blank=True, null=True, on_delete=models.DO_NOTHING)
    assessed_date = models.DateField(blank=True, null=True)
    customer_company = models.ForeignKey(Customer, related_name="site_assessment_customer_company_relation", blank=True, null=True, on_delete=models.DO_NOTHING)
    customer_contact = models.ForeignKey(Customer_Contact, related_name="site_assessment_customer_contact_relation", blank=True, null=True, on_delete=models.DO_NOTHING)
    sec_customer_contact = models.ForeignKey(Customer_Contact, related_name="secondary_customer_contact_relation", blank=True, null=True, on_delete=models.DO_NOTHING)
    project = models.ForeignKey(Project_Site, related_name="customer_relation", blank=True, null=True, on_delete=models.DO_NOTHING)
    address=models.TextField(blank=True, null=True)
    postal_code= models.CharField(max_length=100,blank=True, null=True)
    city= models.CharField(max_length=300,blank=True, null=True)
    province= models.ForeignKey(Province, related_name="province_relation", blank=True, null=True,on_delete=models.DO_NOTHING)
    country= models.ForeignKey(Country, related_name="country_relation", blank=True, null=True, on_delete=models.DO_NOTHING)
    gps_coordinates_lat= models.CharField(max_length=80,blank=True, null=True)
    gps_coordinates_long= models.CharField(max_length=80,blank=True, null=True)
    client_motivation= models.TextField(blank=True, null=True)
    interested_solution_type = ArrayField(models.IntegerField(), blank=True, null=True)# Foreign key integers of ReferenceItem
    solar_pv_install_type = models.ForeignKey(ReferenceItem, related_name="solar_pv_install_relation", blank=True, null=True, on_delete=models.DO_NOTHING)
    roof_condition= models.ForeignKey(ReferenceItem, related_name="roof_condition_relation", blank=True, null=True, on_delete=models.DO_NOTHING)
    building_storey= models.ForeignKey(ReferenceItem, related_name="building_storey_relation", blank=True, null=True, on_delete=models.DO_NOTHING)
    building_storey_other= models.CharField(max_length=80,blank=True, null=True)
    rafter_size= models.ForeignKey(ReferenceItem, related_name="rafter_size_relation", blank=True, null=True, on_delete=models.DO_NOTHING)
    rafter_size_other= models.CharField(max_length=80,blank=True, null=True)
    purlin_size= models.ForeignKey(ReferenceItem, related_name="purlin_size_relation", blank=True, null=True, on_delete=models.DO_NOTHING)
    purlin_size_other= models.CharField(max_length=80,blank=True, null=True)
    rafter_spacing= models.ForeignKey(ReferenceItem, related_name="rafter_spacing_relation", blank=True, null=True, on_delete=models.DO_NOTHING)
    rafter_spacing_other= models.CharField(max_length=80,blank=True, null=True)
    purling_spacing= models.ForeignKey(ReferenceItem, related_name="purling_spacing_relation", blank=True, null=True, on_delete=models.DO_NOTHING)
    purling_spacing_other= models.CharField(max_length=80,blank=True, null=True)
    soil_type= models.ForeignKey(ReferenceItem, related_name="soil_type_relation", blank=True, null=True, on_delete=models.DO_NOTHING)
    level_graded_surface= models.BooleanField()
    water_near_surface= models.CharField(max_length=10,blank=True, null=True)
    corrosive_environment=models.CharField(max_length=10,blank=True, null=True)
    #Azimuth array field missing
    roof_orientation= models.ForeignKey(ReferenceItem, related_name="roof_orientation_relation", blank=True, null=True, on_delete=models.DO_NOTHING)
    roof_age = models.IntegerField(blank=True,null=True)
    adjacent_shadow= models.ForeignKey(ReferenceItem, related_name="adjacent_shadow_relation", blank=True, null=True, on_delete=models.DO_NOTHING)
    adjacent_shadow_other= models.CharField(max_length=80,blank=True, null=True)
    site_photo_checklist = ArrayField(models.IntegerField(), blank=True, null=True)# Foreign key integers of ReferenceItem
    inverter_mounting_type = models.ForeignKey(ReferenceItem, related_name="inverter_mounting_type_relation", blank=True, null=True, on_delete=models.DO_NOTHING)
    ventilated_room_availability = models.BooleanField()
    dc_cable = models.IntegerField(blank=True, null=True)
    dc_cable_run = models.CharField(max_length=10,blank=True, null=True)
    ac_cable = models.IntegerField(blank=True, null=True)
    ac_cable_run = models.CharField(max_length=10,blank=True, null=True)
    #Length of wire-run from each array to proposed location to Combiner Box ------->missing    
    building_cad_drawing=models.BooleanField()
    building_electrical_drawing=models.BooleanField()
    electricity_provider = models.CharField(max_length=200, blank=True, null=True)
    building_rooms= models.CharField(max_length=200, blank=True, null=True)
    service= models.ForeignKey(ReferenceItem, related_name="service_relation", blank=True, null=True, on_delete=models.DO_NOTHING)
    service_other=models.CharField(max_length=200, blank=True, null=True)
    voltage= models.ForeignKey(ReferenceItem, related_name="voltage_relation", blank=True, null=True, on_delete=models.DO_NOTHING)
    phase = models.ForeignKey(ReferenceItem, related_name="phase_relation", blank=True, null=True, on_delete=models.DO_NOTHING)
    breaker_space_availability= models.BooleanField()
    breaker_space_availability_count=  models.IntegerField(blank=True, null=True)
    electrical_room_availability= models.BooleanField()
    electrical_room_availability_detail= models.TextField(blank=True, null=True)
    cable_routing= models.ForeignKey(ReferenceItem, related_name="cable_routing_relation", blank=True, null=True, on_delete=models.DO_NOTHING)
    elec_room_roof_cable_length=  models.IntegerField(blank=True, null=True)
    backup_generator_status= models.BooleanField()
    generator_backup_make=models.CharField(max_length=200,blank=True, null=True)
    kva_capacity= models.CharField(max_length=200,blank=True, null=True)
    electrical_phase= models.ForeignKey(ReferenceItem, related_name="electrical_phase_relation", blank=True, null=True, on_delete=models.DO_NOTHING)
    auto_start_option=  models.BooleanField()
    daily_operation_hours=  models.CharField(max_length=100,blank=True, null=True)
    switch_rating_change= models.CharField(max_length=200,blank=True, null=True)
    earthing_pit_visibility= models.BooleanField()
    earthing_pit_visibility_detail= models.CharField(max_length=200,blank=True, null=True)
    roof_access=models.BooleanField()
    roof_access_detail= models.CharField(max_length=200,blank=True, null=True)
    scaffolding_need=models.BooleanField()
    scaffolding_need_detail= models.CharField(max_length=200,blank=True, null=True)
    site_welding_facility=models.BooleanField()
    site_welding_facility_detail= models.CharField(max_length=200,blank=True, null=True)
    crane_service_availibility=models.BooleanField()
    crane_service_availibility_detail= models.CharField(max_length=200,blank=True, null=True)
    ladder_facility_availibility=models.BooleanField()
    ladder_facility_availibility_detail= models.CharField(max_length=200,blank=True, null=True)
    building_electrician_availibility=models.BooleanField()
    building_electrician_availibility_detail= models.CharField(max_length=200,blank=True, null=True)
    class Meta:
        db_table = "site_assessment"
        
class SiteAssessmentAttachments(BaseModel):
    site_assessment =  models.ForeignKey(SiteAssessment, related_name="site_assessment_attachement_relation", blank=True, null=True, on_delete=models.DO_NOTHING)
    site_attachment = models.FileField(null=True,blank=True,upload_to='site_survey_checklist')
    attachment_path = models.CharField(max_length=500,blank=True,null=True)
    attachment_type = models.CharField(max_length=100,blank=True,null=True)
    class Meta:
        db_table = "site_assessment_attachment"
        
class SiteAssessmentBuildingRoom(BaseModel):
    site_assessment =  models.ForeignKey(SiteAssessment, related_name="site_survey_checklist_relation", blank=True, null=True, on_delete=models.DO_NOTHING)
    room_name= models.CharField(max_length=200,blank=True,null=True)
    equipment= models.ForeignKey(ReferenceItem, related_name="equipment_relation", blank=True, null=True, on_delete=models.DO_NOTHING)
    type= models.CharField(max_length=200,blank=True,null=True)
    wattage= models.CharField(max_length=200,blank=True,null=True)
    quantity =models.IntegerField(blank=True,null=True)
    class Meta:
        db_table = "site_assessment_building_room"
    
