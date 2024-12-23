import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import API from "../api";
import dayjs from "dayjs";

const CarMaintenanceForm = ({onCarMaintenanceAdded, onCarMaintenanceEdited, selectedCarMaintenance, carId}) => {
  const statusOptions = [
    { value: "", label: "Select a status" },
    { value: "in_progress", label: "In Progress" },
    { value: "completed", label: "Completed" },
    { value: "pending", label: "Pending" }
];
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState(statusOptions[0])
  const [date, setDate] = useState("")

  const [isEdit, setIsEdit] = useState(false)


  useEffect(() => {
    if(selectedCarMaintenance){
      setDescription(selectedCarMaintenance.description)
      setStatus(statusOptions.find(el => el.value === selectedCarMaintenance.status))
      setDate(dayjs(selectedCarMaintenance.date).format("YYYY-MM-DD"))
      
    }
    if(Object.keys(selectedCarMaintenance).length !== 0) {
      setIsEdit(true);
    }
  }, [selectedCarMaintenance, isEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(Object.keys(selectedCarMaintenance).length === 0) {
      API.post("/car_maintenances", { carMaintenance: { carId, description, status: status.value, date }})
        .then((response) => {
          setDescription("")
          setStatus(statusOptions[0])
          setDate("")
          setIsEdit(false);
          onCarMaintenanceAdded(response.data);
        })
        .catch((error) => console.error("Error creating car:", error));
    } else {
      API.put(`/car_maintenances/${selectedCarMaintenance.id}`, { carMaintenance: { carId, description,  status: status.value, date }})
        .then((response) => {
          setDescription("")
          setStatus(statusOptions[0])
          setDate("")
          setIsEdit(false);
          onCarMaintenanceEdited(response.data);
        })
        .catch((error) => console.error("Error creating car:", error));
    }
  };

  const onCancelEdit = () => {
    setDescription("")
    setStatus(statusOptions[0])
    setDate("")
    setIsEdit(false);
    onCarMaintenanceEdited();
  }
  

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded">
    <div className="mb-2">
      <label className="block font-bold mb-1">Description:</label>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border rounded"
      />
    </div>
    <div className="mb-2">
      <label className="block font-bold mb-1">Status:</label>
      {/* <input
        type="text"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="w-full p-2 border rounded"
      /> */}
      <Select
        value={status}
        onChange={(e) => setStatus(e)}
        options={statusOptions}
      />
    </div>
    <div className="mb-2">
      <label className="block font-bold mb-1">Date:</label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full p-2 border rounded"
      />
    </div>
    <button type="submit" className={`${isEdit ? "bg-green-500" : "bg-blue-500"} text-white px-4 py-2 rounded`} >
      { isEdit ? 'Edit Car Maintenance' : 'Add Car Maintenance' }
    </button>  
    { isEdit && (
      <button type="" className={" bg-red-500 text-white mx-2 px-4 py-2 rounded"} onClick={() => onCancelEdit()}>
        Cancel
      </button>
    )}
  </form>
  )
}

export default CarMaintenanceForm