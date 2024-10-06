from django.contrib import admin
from suggestions import models

admin.site.register(models.Feedback)
admin.site.register(models.UpvoteAction)
admin.site.register(models.Comment)

