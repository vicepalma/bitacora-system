from django.contrib import admin
from .models import Page
from .models import Task

# Register your models here.
admin.site.register(Page)
admin.site.register(Task)