from django.contrib import admin
from .models import *

@admin.register(Snake)
class SnakeAdmin(admin.ModelAdmin):
    list_display = ['name', 'common_names', 'venom_type']
    search_fields = ['name', 'scientific_name', 'common_names', 'venom_type']
        
admin.site.register(Region)
admin.site.register(Habitat)
admin.site.register(SnakeImage)