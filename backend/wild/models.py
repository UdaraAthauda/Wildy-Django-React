from django.db import models

class Region(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    
    def __str__(self):
        return self.name

class Habitat(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    
    def __str__(self):
        return self.name
    
class Snake(models.Model):
    VENOM_CHOICES = [
        ('venomous', 'Venomous'),
        ('mildly_venomous', 'Mildly Venomous'),
        ('non_venomous', 'Non-Venomous'),
    ]
    
    name = models.CharField(max_length=100)
    scientific_name = models.CharField(max_length=200, unique=True)
    common_names = models.TextField(blank=True, null=True)
    venom_type = models.CharField(max_length=50, choices=VENOM_CHOICES)
    family = models.CharField(max_length=100, blank=True, null=True)
    description = models.TextField()
    description_translation = models.TextField(blank=True, null=True)
    regions = models.ManyToManyField(Region, related_name='snakes')
    habitats = models.ManyToManyField(Habitat, related_name='snakes')
    
    def __str__(self):
        return self.name
    
class SnakeImage(models.Model):
    snake = models.ForeignKey(Snake, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to="snakes/", blank=True, null=True)
    caption = models.CharField(max_length=100, blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.snake.name