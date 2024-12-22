import React, { useEffect, useState } from 'react'
import API from '../api';
import { Link } from 'react-router-dom';

export const CarList = ({onEditCar}) => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    API.get('/cars')
      .then((res) => {
        setCars(res.data.sort((a,b) => a.year - b.year))
      })
      .catch((err) => console.error("Failed fetching cars: ", err));
  }, [])

  // delete Car

  const deleteCar = (id) => {
    API.delete(`/cars/${id}`)
      .then(() => setCars(cars.filter((car) => car.id !==id)))
      .catch((err) => console.error("Error deleting the selected car: ", err))
  }

  const setSelectedCar = (car) => {
    onEditCar(car);
  }

  
  return (
    <div className='p-4'>
      <h1 className="text-xl font-bold mb-4">Car List</h1>
      <ul className="space-y-2">
        {cars.map((car) => (
          <Link to={`/cars/${car.id}`}>
          <li key={`${car.plate_number}-${car.id}`} className="flex justify-between items-center bg-gray-100 round p-2 my-4">
            <span>{car.plateNumber} | {car.model} ( {car.year} )</span>
            <div className='space-x-2'>
              <button className='bg-gray-500 text-white px-2 py-1 rounded' onClick={() => setSelectedCar(car)}>
                Edit
              </button>
              <button className='bg-red-500 text-white px-2 py-1 rounded' onClick={() => deleteCar(car.id)}>
                Delete
              </button>
            </div>
          </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default CarList;
