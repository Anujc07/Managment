import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddComponent.css'; 

const AddComponent = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [message, setMessage] = useState(''); 
  const [messageType, setMessageType] = useState('');  
  const [components, setComponents] = useState([]);  // State for components list

  useEffect(() => {
    fetchComponents();  // Fetch components when the component mounts
  }, []);

  const fetchComponents = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/components/');
      setComponents(response.data);
    } catch (error) {
      console.error('Error fetching components', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newComponent = { name, price };

    try {
      await axios.post('http://localhost:8000/api/components/create/', newComponent);
      setMessage('Component Added Successfully!');
      setMessageType('success');
      setName('');
      setPrice('');
      fetchComponents();  // Refresh the list after adding a new component
    } catch (error) {
      console.error('Error adding component', error);
      setMessage('Failed to add component.');
      setMessageType('error');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/components/${id}/delete/`);
      setMessage('Component Deleted Successfully!');
      setMessageType('success');
      fetchComponents();  // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting component', error);
      setMessage('Failed to delete component.');
      setMessageType('error');
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="add-component-form">
        <h2>Add New Component</h2>

        {message && <div className={`message ${messageType}`}>{message}</div>}

        <input 
          type="text" 
          placeholder="Component Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
          className="form-input"
        />
        <input 
          type="number" 
          placeholder="Component Price" 
          value={price} 
          onChange={(e) => setPrice(e.target.value)} 
          required 
          className="form-input"
        />
        <button type="submit" >Add Component</button>
      </form>

      <div className="component-list">
        <h2>Component List</h2>
        {components.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {components.map(component => (
                <tr key={component.id}>
                  <td>{component.name}</td>
                  <td>Rs: {component.price}</td>
                  <td>
                    <button onClick={() => handleDelete(component.id)} className="delete-button">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No components added yet.</p>
        )}
      </div>
    </div>
  );
};

export default AddComponent;
