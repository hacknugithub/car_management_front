import React, { useEffect, useState } from 'react'
import Table from "./Table";
import API from '../api';
import dayjs from "dayjs";
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Link } from 'react-router-dom';

const CarMaintenanceList = () => {
  const [carMaintenances, setCarMaintenances] = useState([]);

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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const parseData = (data) => {
    return data.map((carMaintenance) => {
      return { ...carMaintenance , status: statusType(carMaintenance.status), date:  dayjs(carMaintenance.date).format('DD/MM/YYYY') } 
    })
  }

  useEffect(() => {
    API.get('/car_maintenances')
      .then((res) => {
        const parsedData = parseData(res.data)
        console.log("Parsed data:",  parsedData)
        setCarMaintenances(parsedData)
      })
      .catch((err) => console.error("Failed fetching car maintenances: ", err));
  }, []);

  const columns = [{
    header: 'Description',
    field: 'description'
  },{
    header: 'Status',
    field: 'status'
  }, {
    header: 'Date',
    field: 'date'
  }, {
    header: 'Plate Number',
    field: 'car.plateNumber'
  }];

  const filters = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    description: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    'car.plateNumber': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    date: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
    status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
  }

  return (
    <div className='p-4'>
      <h1 className="text-xl font-bold mb-4">Car Maintenances | <Link className="bg-blue-500 text-white px-2 py-1 rounded" to="/">Go back to Cars</Link></h1>
      <Table columns={columns} values={carMaintenances} filters={filters} />
    </div>
  )
}

export default CarMaintenanceList;
  

