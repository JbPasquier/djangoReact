from rest_framework import routers

router = routers.DefaultRouter()

from config.models.todo.TodoViewSet import TodoViewSet
router.register(r'todos', TodoViewSet)

from config.models.user.UserViewSet import UserViewSet
router.register(r'users', UserViewSet)
