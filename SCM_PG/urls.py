from unicodedata import name
from django.urls import path
from . import views,shipment_process
from .views import *


urlpatterns = [
    path('Shipment_Product_Detail_Retrieval/', shipment_process.ShipmentProductDetailRetrieval, name="ShipmentProductDetailRetrieval"),
    path('Shipment_Packing_Label_Generation/', shipment_process.ShipmentPackingLabelGeneration, name="ShipmentPackingLabelGeneration"),
    path('Shipment_Packing_List_Generation/', shipment_process.ShipmentPackingListGeneration, name="ShipmentPackingListGeneration"),
    path('Shipment_Process/<int:item_id>/<str:scm_type>/', shipment_process.ShipmentProcess, name="ShipmentProcess"),
    path('Shipment_Process/<int:item_id>/', shipment_process.Supplier_ShipmentProcess, name="Supplier_ShipmentProcess")

]
