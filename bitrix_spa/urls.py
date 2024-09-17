from django.urls import path
from bitrix_spa import views

urlpatterns = [

    # finac pg
    path('spa_item_view/', views.IndexView.as_view(), name="GeneralInfo"),
    path('get_spa_list/', views.get_spa_list_items, name="get_spa_list"),
    path('get_filter_pipeline/', views.get_filter_pipeline, name="get_filter_pipeline"),
    path('add_finac_pg_items/', views.add_finac_pg_items, name="add_finac_pg_items"),
    
    # finac in
    path('add_finac_in_items/', views.add_finac_in_items, name="add_finac_in_items"),
    path('add_scm_pg_items/', views.add_scm_pg_items, name="add_scm_pg_items"),

    path('payment_receipt_upload/<str:entityTypeId>/<str:deal_id>/',views.PaymentReceipt_IndexView.as_view(), name="payment_receipt_upload"),
    path('finac_pg/payment_receipt_file_upload/',views.payment_receipt_file_upload, name="payment_receipt_file_upload"),
]
