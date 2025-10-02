from rest_framework import serializers
from .models import *

class RegionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Region
        fields = '__all__'
        

class HabitatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Habitat
        fields = '__all__'
        

class SnakeImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = SnakeImage
        fields = '__all__'
        

class SnakeDetailSerializer(serializers.ModelSerializer):
    regions = RegionSerializer(many=True, read_only=True)
    habitats = HabitatSerializer(many=True, read_only=True)
    images = SnakeImageSerializer(many=True, read_only=True)
    
    class Meta:
        model = Snake
        fields = '__all__'
        