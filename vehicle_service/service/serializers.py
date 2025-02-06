from rest_framework import serializers
from .models import Component, Vehicle, Issue

class ComponentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Component
        fields = '__all__'

class VehicleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehicle
        fields = '__all__'

class IssueSerializer(serializers.ModelSerializer):
    total_cost = serializers.SerializerMethodField()

    class Meta:
        model = Issue
        fields = '__all__'

    def get_total_cost(self, obj):
        return obj.total_cost()
