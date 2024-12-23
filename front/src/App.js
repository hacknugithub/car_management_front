import React from "react";
import { Route, Routes } from "react-router-dom";
import './App.css';
import { PrimeReactProvider } from 'primereact/api';
import Index from "./pages/index";
import CarDetail from "./components/CarDetail";
import CarMaintenanceList from "./components/CarMaintenanceList";

const App = () => {

  return (
    <div className='p-8'>
      <PrimeReactProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/cars/:id" element={<CarDetail />} />
          <Route path="/car_maintenances" element={<CarMaintenanceList />} />
        </Routes>
      </PrimeReactProvider>
    </div>
  )
}

export default App;
