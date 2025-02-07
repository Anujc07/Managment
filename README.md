# Vehicle Service Management System

A full-stack web application to manage vehicle services, repairs, components, pricing, and revenue calculation. The system provides functionalities such as registering new components, managing vehicle repairs, calculating prices, and visualizing revenue graphs.

## Features

1. **Component Registration & Pricing Management**
   - Register new components and set pricing for repairs or purchases.
2. **Vehicle Repair Tracking**
   - Manage vehicle repairs by tracking vehicle details, issues, and repair requirements.
3. **Issue Reporting & Component Selection**
   - Add issues related to vehicles and choose components (new or repaired).
4. **Final Price Calculation & Payment Simulation**
   - Calculate the final price for repairs or services based on selected parts, labor, and charges.
5. **Revenue Graphs**
   - Visualize daily revenue using charts (Recharts or other libraries).

## Tech Stack

- **Backend**: Django (for API and server-side logic)
- **Frontend**: React.js (responsive user interfaces)
- **Database**: SQLite (default database for quick setup)
- **Charts Library**: Recharts or Chart.js for visualizing revenue data

## Installation Instructions

### 1. Clone the Repository

```bash
git clone vehicle-service-management.git
cd vehicle-service-management
```

### 2. Install Backend Dependencies

```bash
pip install -r requirements.txt
```

### 3. Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 4. Configure Database

- **SQLite**: By default, the project uses SQLite. If you'd like to use PostgreSQL or another database, modify the `DATABASES` setting in `vehicle_service/settings.py`.

### 5. Run Migrations (vehicle_service)

```bash
python manage.py migrate
```

### 6. Run the Development Servers

- **Backend**:  
  ```bash
  python manage.py runserver
  ```
  The backend will run at `http://127.0.0.1:8000`.

- **Frontend**:  
  ```bash
  cd frontend
  npm start
  ```
  The frontend will run at `http://localhost:3000`.

### 7. Access the Application

Once both the frontend and backend are running, you can access the system by opening `http://localhost:3000` in your browser.

## Endpoints

### Vehicle Management API

- `GET /api/vehicles/` - Get a list of all vehicles
- `POST /api/vehicles/` - Add a new vehicle
- `GET /api/vehicles/{id}/` - Get details of a specific vehicle
- `PUT /api/vehicles/{id}/` - Update vehicle details
- `DELETE /api/vehicles/{id}/` - Delete a vehicle

### Component Management API

- `GET /api/components/` - Get a list of all components
- `POST /api/components/` - Add a new component
- `GET /api/components/{id}/` - Get details of a specific component
- `PUT /api/components/{id}/` - Update component details
- `DELETE /api/components/{id}/` - Delete a component

### Issue Management API

- `GET /api/issues/` - Get a list of all issues
- `POST /api/issues/` - Add a new issue
- `GET /api/issues/{id}/` - Get details of a specific issue
- `PUT /api/issues/{id}/` - Update issue details
- `DELETE /api/issues/{id}/` - Delete an issue
