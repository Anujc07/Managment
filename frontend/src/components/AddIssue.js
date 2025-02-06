import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddIssue.css';

const AddIssue = () => {
  const [vehicleId, setVehicleId] = useState('');
  const [description, setDescription] = useState('');
  const [components, setComponents] = useState([]);
  const [selectedComponents, setSelectedComponents] = useState([]);
  const [laborCost, setLaborCost] = useState(0);
  const [vehicles, setVehicles] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/api/components/')
      .then(response => setComponents(response.data))
      .catch(error => console.error('Error fetching components', error));

    axios.get('http://localhost:8000/api/vehicles/')
      .then(response => setVehicles(response.data))
      .catch(error => console.error('Error fetching vehicles', error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const issueData = { 
      vehicle: vehicleId,
      description, 
      components: selectedComponents,
      labor_cost: laborCost 
    };

    try {
      await axios.post('http://localhost:8000/api/issues/create/', issueData);
      
      setVehicleId('');
      setDescription('');
      setSelectedComponents([]);
      setLaborCost(0);

      setMessage('Issue reported successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error reporting issue', error);
      setMessage('Failed to report issue. Please try again.');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="issue-form">
      <h2>Report Issue</h2>

      {message && <p className="message">{message}</p>}

      <label htmlFor="vehicleId">Select Vehicle</label>
      <select 
        id="vehicleId" 
        value={vehicleId} 
        onChange={(e) => setVehicleId(e.target.value)} 
        required 
        className="form-select"
      >
        <option value="" disabled>Select a vehicle</option>
        {vehicles.map((vehicle) => (
          <option key={vehicle.vehicle_id} value={vehicle.id}>
            {vehicle.model} ({vehicle.owner_name})
          </option>
        ))}
      </select>

      <label htmlFor="description">Issue Description</label>
      <textarea 
        id="description"
        placeholder="Issue Description" 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
        required 
        className="form-textarea"
      />

      <label htmlFor="components">Components</label>
      <select 
        id="components"
        multiple 
        onChange={(e) => setSelectedComponents([...e.target.selectedOptions].map(option => option.value))}
        className="form-select"
      >
        {components.map((component) => (
          <option key={component.id} value={component.id}>
            {component.name} - Rs:- {component.price}
          </option>
        ))}
      </select>

      <label htmlFor="laborCost">Labor Cost</label>
      <input 
        id="laborCost"
        type="number" 
        placeholder="Labor Cost" 
        value={laborCost} 
        onChange={(e) => setLaborCost(e.target.value)} 
        className="form-input"
      />

      <button type="submit">Add Issue</button>
    </form>
  );
};

export default AddIssue;
