from django.db import models

class Component(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name

class Vehicle(models.Model):
    vehicle_id = models.CharField(max_length=50, unique=True)
    model = models.CharField(max_length=100)
    owner_name = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.model} - {self.vehicle_id}"

class Issue(models.Model):
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE)
    description = models.TextField()
    components = models.ManyToManyField(Component, blank=True)
    labor_cost = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)  
    def total_cost(self):
        component_cost = sum(component.price for component in self.components.all())
        return component_cost + self.labor_cost