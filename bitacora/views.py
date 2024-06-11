from rest_framework import viewsets
from .serializer import TaskSerializer
from .models import Task
from rest_framework.schemas import AutoSchema

# Create your views here.
class TaskView(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()
