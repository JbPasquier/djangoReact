from django.contrib import admin
from django.conf.urls import url, include
from config.routes.index import router

urlpatterns = [
    url(r'^', include('todos.urls')),
    url(r'^api/', include(router.urls)),
    url(r'^admin/', admin.site.urls),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
