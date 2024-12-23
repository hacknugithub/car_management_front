import React, {useState} from 'react'
import CarList from "../components/CarList";
import CarForm from "../components/CarForm";



const Index = () => {
  const [cars, setCars] = useState([])
  const [selectedCar, setSelectedCar] = useState({})

  const addCar = (newCar) => {
    console.log("Adding car", newCar)
    setCars([...cars, newCar]);
    window.location.reload(true);
  };
  
  const editCar = (editedCar) => {
    console.log("Editing a car", editedCar)
    setSelectedCar({});
    window.location.reload(true);
  };

  return (
    <>
      <CarForm onCarAdded={addCar} onCarEdited={editCar} selectedCar={selectedCar} />
      <CarList onEditCar={setSelectedCar} cars={cars} />
    </>
  )
}

export default Index