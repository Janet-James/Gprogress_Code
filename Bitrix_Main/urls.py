
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('bitrix_base_app.urls')),
    path('', include('bitrix_spa.urls')),
    path('', include('Bitrix_custom.urls')),
    path('', include('Website_API.urls')),
    path('', include('Service_Desk.urls')),
    path('', include('Service_Desk_Client_verification.urls')),
    path('', include('Task_Dashboard.urls')),
    path('', include('visa_process.urls')),    
    path('', include('SCM_PG.urls')),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

