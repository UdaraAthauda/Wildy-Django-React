from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone
from wild.models import Snake

User = get_user_model()

class BlogCategory(models.Model):
    name = models.CharField(max_length=100, unique=True)
    
    class Meta:
        verbose_name_plural = "Blog Categories"
        
    def __str__(self):
        return self.name
    

class Blog(models.Model):
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('published', 'Published'),
    ]
    
    title = models.CharField(max_length=200)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='blogs')
    snake = models.ForeignKey(Snake, on_delete=models.SET_NULL, null=True, related_name='blogs')
    category = models.ForeignKey(BlogCategory, on_delete=models.SET_NULL, null=True, blank=True, related_name='blogs')
    content = models.TextField()
    featured_image = models.ImageField(upload_to='blog_images/', blank=True, null=True)
    status = models.CharField(max_length=15, choices=STATUS_CHOICES, default='draft')
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        
    def __str__(self):
        return self.title
