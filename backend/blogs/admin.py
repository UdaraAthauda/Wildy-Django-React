from django.contrib import admin
from .models import *

@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'status', 'created_at')
    search_fields = ('title', 'content')
    list_filter = ['status']
    
admin.site.register(BlogCategory)