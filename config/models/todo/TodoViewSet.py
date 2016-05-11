
from rest_framework import viewsets
from todos.models import Todo
from .TodoSerializer import TodoSerializer
from rest_framework.permissions import IsAdminUser


class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    permission_classes = (IsAdminUser,)
