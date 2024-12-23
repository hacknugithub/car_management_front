import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import CarMaintenanceForm from './CarMaintenanceForm';
import API from '../api'
import dayjs from "dayjs";

const CarDetail = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null)
  const [carMaintenances, setCarMaintenances] = useState([])
  const [selectedCarMaintenance, setSelectedCarMaintenance] = useState({})

  const statusType = (type) => {
    switch (type) {
      case 'in_progress':
        return 'In Progress'
      case 'completed':
        return 'Completed'
      case 'pending':
        return 'Pending'
      default:
        return 'N/A'
    }
  }

  useEffect(() => {
    API.get(`/cars/${id}`)
      .then((response) => {
        setCar(response.data)
        setCarMaintenances(response.data.carMaintenances)
      })
      .catch((err) => console.error("Failed getting details for car:", err))
  }, [id]);

  const addCarMaintenance = (newCarMaintenance) => {
    console.log("Adding car maintenance", newCarMaintenance)
    setCarMaintenances([...carMaintenances, newCarMaintenance]);
  };
  
  const editCarMaintenance = (editedCarMaintenance) => {
    if(editedCarMaintenance) {
      console.log("Editing a car", editedCarMaintenance);
      const _carMaintenances = carMaintenances.filter(el => el.id !== editedCarMaintenance.id );    
      setCarMaintenances([..._carMaintenances, editedCarMaintenance]);
    }
    setSelectedCarMaintenance({});
  };

  const deleteCarMaintenance = (id) => {
    API.delete(`/car_maintenances/${id}`)
      .then(() => setCarMaintenances(carMaintenances.filter((carMaintenance) => carMaintenance.id !==id)))
      .catch((err) => console.error("Error deleting the selected Car Maintenance: ", err))
  }

  if(!car) return <div>Loading...</div>;

  return (
    <div className='p-4'>
      <div className='py-4'><Link className='rounded bg-blue-500 p-2 text-white' to="/">Go back to Cars</Link></div>
      <h1 className="text-xl font-bold mb-4">
        {car.plateNumber} {car.model} ({car.year})
      </h1>
      <h2 className='text-lg font-bold mb-2'>Maintenance Records</h2>
      {}
      <ul className='space-y-2'>
        {carMaintenances && (carMaintenances.map((maintenance) => (
          <li key={maintenance.id}
              className="flex justify-between items-center bg-gray-100 round p-2 my-4">
                <div>
                  <p>Description: { maintenance.description } </p>
                  <p>Status: {statusType(maintenance.status)} </p>
                  <p>Date: { dayjs(maintenance.date).format("DD/MM/YYYY") }</p>
                </div>
                <div className='space-x-2'>
                <button className='bg-gray-500 text-white px-2 py-1 rounded' onClick={() => setSelectedCarMaintenance(maintenance)}>
                  Edit
                </button>
                <button className='bg-red-500 text-white px-2 py-1 rounded' onClick={() => deleteCarMaintenance(maintenance.id)}>
                  Delete
                </button>
            </div>
          </li>
        )))}
      </ul>
      <div>
      <h1 className="text-xl font-bold my-4"> Add new car maintenance</h1>
        <CarMaintenanceForm onCarMaintenanceAdded={addCarMaintenance} onCarMaintenanceEdited ={editCarMaintenance} selectedCarMaintenance={selectedCarMaintenance} carId={id}/>
      </div>
    </div>
  )
}

export default CarDetail