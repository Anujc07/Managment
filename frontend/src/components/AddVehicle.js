import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddComponent.css'; 

const AddVehicle = () => {
  const [vehicleId, setVehicleId] = useState('');
  const [model, setModel] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); 
  const [vehicles, setVehicles] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newVehicle = { vehicle_id: vehicleId, model, owner_name: ownerName };

    try {
      await axios.post('http://localhost:8000/api/vehicles/create/', newVehicle);
      setMessage('Vehicle Added Successfully!');
      setMessageType('success');
      setVehicleId('');
      setModel('');
      setOwnerName('');
      fetchVehicles(); // Refresh the list after adding
    } catch (error) {
      console.error('Error adding vehicle', error);
      setMessage('Failed to add vehicle. Please try again.');
      setMessageType('error'); 
    }
  };

  const fetchVehicles = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/vehicles/');
      setVehicles(response.data);
    } catch (error) {
      console.error('Error fetching vehicles', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/vehicles/${id}/delete/`);
      setMessage('Vehicle Deleted Successfully!');
      setMessageType('success');
      fetchVehicles(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting vehicle', error);
      setMessage('Failed to delete vehicle. Please try again.');
      setMessageType('error');
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  return (
    <div className="container">
      <form onSubmit={handleSubmit} >
        <h2>Add New Vehicle</h2>

        {message && (
          <div className={`message ${messageType}`}>
            {message}
          </div>
        )}

        <input 
          type="text" 
          placeholder="Vehicle ID" 
          value={vehicleId} 
          onChange={(e) => setVehicleId(e.target.value)} 
          required 
          className="form-input"
        />
        <input 
          type="text" 
          placeholder="Model" 
          value={model} 
          onChange={(e) => setModel(e.target.value)} 
          required 
          className="form-input"
        />
        <input 
          type="text" 
          placeholder="Owner Name" 
          value={ownerName} 
          onChange={(e) => setOwnerName(e.target.value)} 
          required 
          className="form-input"
        />
        <button type="submit">Add Vehicle</button>
      </form>
    <div className="component-list">
      <h2>Vehicle List</h2>
      <table >
        <thead>
          <tr>
            <th>Vehicle ID</th>
            <th>Model</th>
            <th>Owner Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle) => (
            <tr key={vehicle.id}>
              <td>{vehicle.vehicle_id}</td>
              <td>{vehicle.model}</td>
              <td>{vehicle.owner_name}</td>
              <td>
                <button onClick={() => handleDelete(vehicle.id)} className="delete-button">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      </div>
    </div>
  );
};

export default AddVehicle;
