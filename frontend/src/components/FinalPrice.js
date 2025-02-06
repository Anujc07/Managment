import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FinalPrice.css';

const FinalPrice = () => {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [finalPrice, setFinalPrice] = useState(0);

  useEffect(() => {
    // Fetch all vehicles
    axios.get('http://localhost:8000/api/vehicles/')
      .then(response => setVehicles(response.data))
      .catch(error => console.error('Error fetching vehicles:', error));
  }, []);

  const handleVehicleChange = (e) => {
    setSelectedVehicle(e.target.value);
  };

  const calculatePrice = () => {
    if (selectedVehicle) {
      axios.get(`http://localhost:8000/api/issues/${selectedVehicle}/`)
        .then(response => {
            console.log(response.data)
          setFinalPrice(response.data[0].total_cost);  // Using total_cost from API response
        })
        .catch(error => {
          console.error('Error fetching issue data:', error);
        });
    } else {
      alert('Please select a vehicle first!');
    }
  };

  return (
    <div className="final-price-container">
      <h2 className="title">Calculate Final Price</h2>

      <label htmlFor="vehicle" className="label">Select Vehicle:</label>
      <select id="vehicle" value={selectedVehicle} onChange={handleVehicleChange} className="dropdown">
        <option value="">-- Select Vehicle --</option>
        {vehicles.map((vehicle) => (
          <option key={vehicle.id} value={vehicle.id}>
            {vehicle.model} ({vehicle.owner_name})
          </option>
        ))}
      </select>

      <button className="calculate-button" onClick={calculatePrice}>Calculate Final Price</button>

      {finalPrice !== 0 && <p className="final-price">Final Price: Rs: {finalPrice}</p>}
    </div>
  );
};

export default FinalPrice;
