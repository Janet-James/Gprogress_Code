from django.urls import path
from django.conf.urls.static import static
from django.conf import settings
from unicodedata import name
from .views import *
from django.urls import path
from . import views


urlpatterns = [
    path('tasks/info/view/', views.IndexView.as_view(), name="TasksInfo"),
    path('tasks/tasklist/view/', views.Task_list.as_view(), name="TasksList"),
    path('task/deadline/', views.task_info, name="Task_deadline_info"),
    path('task/main_project_list/', views.main_task, name="get_project_list"),
    path('task/child_project_list/', views.child_task, name="get_project_list"),
    path('task/sequence_update/', views.taskSequenceUpdate, name="taskSequenceUpdate"),
    path('tasks/report/view/', views.TaskReport.as_view(), name="TaskReport"),
    path('task/employee_task_list/', views.EmployeeTaskList, name="EmployeeTaskList"),

]