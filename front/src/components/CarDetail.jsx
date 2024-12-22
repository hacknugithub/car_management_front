import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import CarMaintenanceForm from './CarMaintenanceForm';
import API from '../api'
import dayjs from "dayjs";

const CarDetail = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null)
  const [carMaintenances, setCarMaintenances] = useState([])
  const [selectedCarMaintenance, setSelectedCarMaintenance] = useState({})

  useEffect(() => {
    API.get(`/cars/${id}`)
      .then((response) => {
        // debugger;
        setCar(response.data)
        setCarMaintenances(response.data.carMaintenances)
      })
      .catch((err) => console.error("Failed getting details for car:", err))
  }, [id]);

  const addCarMaintenance = (newCarMaintenance) => {
    console.log("Adding car maintenance", newCarMaintenance)
    setCarMaintenances([...carMaintenances, newCarMaintenance]);
    window.location.reload(true);
  };
  
  const editCarMaintenance = (editedCarMaintenance) => {
    console.log("Editing a car", editedCarMaintenance)
    window.location.reload(true);
  };

  if(!car) return <div>Loading...</div>;

  return (
    <div className='p-4'>
      <h1 className="text-xl font-bold mb-4">
        {car.plateNumber} {car.model} ({car.year})
      </h1>
      <h2 className='text-lg font-bold mb-2'>Maintenance Records</h2>
      {}
      <ul className='space-y-2'>
        {carMaintenances.map((maintenance) => (
          <li key={maintenance.id}
              className="bg-gray-100 p-2 rounded" onClick={() => setSelectedCarMaintenance(maintenance)}>
                <p>Description: { maintenance.description } </p>
                <p>Status: {maintenance.status} </p>
                <p>Date: { dayjs(maintenance.date).format("DD/MM/YYYY") }</p>
          </li>
        ))}
      </ul>
      <div>
      <h1 className="text-xl font-bold my-4"> Add new car maintenance</h1>
        <CarMaintenanceForm onCarMaintenanceAdded={addCarMaintenance} onCarMaintenanceEdited ={editCarMaintenance} selectedCarMaintenance={selectedCarMaintenance} carId={id}/>
      </div>
    </div>
  )
}

export default CarDetail