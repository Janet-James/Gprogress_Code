from django.urls import path
from . import views
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    # --------------------------------login---------------------------
    path('', views.home, name="home"),
    path('CheckUsernameView/', views.checkusername, name="checkusername"),
    path('login/', views.login, name="login"),
    path('GSolve/logout/', views.logout, name="logout"),

    # --------------------------------dashboard----------------------
    path('GSolve/Dashboard/', views.GSolveDashboard.as_view(), name="dashboard"),
    
]   
