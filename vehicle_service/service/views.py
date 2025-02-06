from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Component, Vehicle, Issue
from .serializers import ComponentSerializer, VehicleSerializer, IssueSerializer

# ---- COMPONENT VIEWS ----
# this view return all components from the database.
@api_view(['GET'])
def get_components(request):
    components = Component.objects.all()
    serializer = ComponentSerializer(components, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

# this view for create a component
@api_view(['POST'])
def create_component(request):
    print("===>", request.data)
    serializer = ComponentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# this view return a component from the database.
@api_view(['GET'])
def get_component(request, pk):
    try:
        component = Component.objects.get(pk=pk)
        serializer = ComponentSerializer(component)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Component.DoesNotExist:
        return Response({'error': 'Component not found'}, status=status.HTTP_404_NOT_FOUND)

# this view for update specific component data.
@api_view(['PUT'])
def update_component(request, pk):
    try:
        component = Component.objects.get(pk=pk)
        serializer = ComponentSerializer(component, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Component.DoesNotExist:
        return Response({'error': 'Component not found'}, status=status.HTTP_404_NOT_FOUND)

# this view delete the component.
@api_view(['DELETE'])
def delete_component(request, pk):
    try:
        component = Component.objects.get(pk=pk)
        component.delete()
        return Response({'message': 'Component deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
    except Component.DoesNotExist:
        return Response({'error': 'Component not found'}, status=status.HTTP_404_NOT_FOUND)

# ---- VEHICLE VIEWS ----
# this view return all vechiles data from the database.
@api_view(['GET'])
def get_vehicles(request):
    vehicles = Vehicle.objects.all()
    serializer = VehicleSerializer(vehicles, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

# this view for add vehicle
@api_view(['POST'])
def create_vehicle(request):
    serializer = VehicleSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# this view return specific vehicle data
@api_view(['GET'])
def get_vehicle(request, pk):
    try:
        vehicle = Vehicle.objects.get(pk=pk)
        serializer = VehicleSerializer(vehicle)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Vehicle.DoesNotExist:
        return Response({'error': 'Vehicle not found'}, status=status.HTTP_404_NOT_FOUND)

# this view for update the vehicle data
@api_view(['PUT'])
def update_vehicle(request, pk):
    try:
        vehicle = Vehicle.objects.get(pk=pk)
        serializer = VehicleSerializer(vehicle, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Vehicle.DoesNotExist:
        return Response({'error': 'Vehicle not found'}, status=status.HTTP_404_NOT_FOUND)

# this view for delete the vehicle
@api_view(['DELETE'])
def delete_vehicle(request, pk):
    try:
        vehicle = Vehicle.objects.get(pk=pk)
        vehicle.delete()
        return Response({'message': 'Vehicle deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
    except Vehicle.DoesNotExist:
        return Response({'error': 'Vehicle not found'}, status=status.HTTP_404_NOT_FOUND)

# ---- ISSUE VIEWS ----
# this view for get all the issues
@api_view(['GET'])
def get_issues(request):
    issues = Issue.objects.all()
    serializer = IssueSerializer(issues, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

# this view for add the issue
@api_view(['POST'])
def create_issue(request):
    serializer = IssueSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# this view for get a specific issue 
@api_view(['GET'])
def get_issue(request, pk):
    issues = Issue.objects.filter(vehicle_id=pk)
    if issues.exists():
        serializer = IssueSerializer(issues, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Issue not found'}, status=status.HTTP_404_NOT_FOUND)

# this view for update the issue
@api_view(['PUT'])
def update_issue(request, pk):
    try:
        issue = Issue.objects.get(pk=pk)
        serializer = IssueSerializer(issue, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Issue.DoesNotExist:
        return Response({'error': 'Issue not found'}, status=status.HTTP_404_NOT_FOUND)

# this view for delete the issue
@api_view(['DELETE'])
def delete_issue(request, pk):
    try:
        issue = Issue.objects.get(pk=pk)
        issue.delete()
        return Response({'message': 'Issue deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
    except Issue.DoesNotExist:
        return Response({'error': 'Issue not found'}, status=status.HTTP_404_NOT_FOUND)
