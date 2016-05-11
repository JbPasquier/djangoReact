from django.db import models

# Create your models here.


class Todo(models.Model):
    description = models.TextField(max_length=64)
