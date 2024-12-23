import React, { useState, useEffect } from 'react';
import API from "../api";

const CarForm = ({onCarAdded, onCarEdited, selectedCar}) => {
  const [plateNumber, setPlateNumber] = useState("")
  const [model, setModel] = useState("")
  const [year, setYear] = useState("")

  const [isEdit, setIsEdit] = useState(false)

  useEffect(() => {
    if(selectedCar){
      setPlateNumber(selectedCar.plateNumber)
      setModel(selectedCar.model)
      setYear(selectedCar.year)
      
    }
    if(Object.keys(selectedCar).length !== 0) {
      setIsEdit(true);
    }
  }, [selectedCar, isEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(Object.keys(selectedCar).length === 0) {
      API.post("/cars", { car: { plateNumber,  model, year }})
        .then((response) => {
          setPlateNumber("")
          setModel("")
          setYear("")
          setIsEdit(false);
          onCarAdded(response.data);
        })
        .catch((error) => console.error("Error creating car:", error));
    } else {
      API.put(`/cars/${selectedCar.id}`, { car: { plateNumber,  model, year }})
        .then((response) => {
          setPlateNumber("")
          setModel("")
          setYear("")
          setIsEdit(false);
          onCarEdited(response.data);
        })
        .catch((error) => console.error("Error creating car:", error));
    }
  };

  const onCancelEdit = () => {
    setPlateNumber("")
    setModel("")
    setYear("")
    setIsEdit(false);
    onCarEdited();
  };
  

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded">
    <div className="mb-2">
      <label className="block font-bold mb-1">Plate Number:</label>
      <input
        type="text"
        value={plateNumber}
        onChange={(e) => setPlateNumber(e.target.value)}
        className="w-full p-2 border rounded"
      />
    </div>
    <div className="mb-2">
      <label className="block font-bold mb-1">Model:</label>
      <input
        type="text"
        value={model}
        onChange={(e) => setModel(e.target.value)}
        className="w-full p-2 border rounded"
      />
    </div>
    <div className="mb-2">
      <label className="block font-bold mb-1">Year:</label>
      <input
        type="number"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        className="w-full p-2 border rounded"
      />
    </div>
    <button type="submit" className={`${isEdit ? "bg-green-500" : "bg-blue-500"} text-white px-4 py-2 rounded`} >
      { isEdit ? 'Edit Car' : 'Add Car' }
    </button>
    { isEdit && (
      <button type="submit" className={"bg-red-500 text-white px-4 py-2 mx-2 rounded"} onClick={() => onCancelEdit()} >
        Cancel
      </button>
    )}
  </form>
  )
}

export default CarForm