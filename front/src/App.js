import React from "react";
import { Route, Routes } from "react-router-dom";
import './App.css';
import Index from "./pages/index";
import CarDetail from "./components/CarDetail"

const App = () => {

  return (
    <div className='p-8'>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/cars/:id" element={<CarDetail />} />
      </Routes>
    </div>
  )
}

export default App;
