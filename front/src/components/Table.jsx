import React,{ useState } from 'react'
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';

const Table = ({columns, values, filters }) => {
  const [currentFilters, setCurrentFilters] = useState(filters);
  const [globalFilterValue, setGlobalFilterValue] = useState('');

  const initFilters = () => {
    setCurrentFilters(filters);
    setGlobalFilterValue('');
  };

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...currentFilters };

    _filters['global'].value = value;

    setCurrentFilters(_filters);
    setGlobalFilterValue(value);
};

  const renderHeader = () => {
    return (
        <div className="flex justify-between items-center">
            <Button type="button" icon="pi pi-filter-slash rounded bg-blue-500" label="Clear" outlined onClick={clearFilter} />
            <IconField iconPosition="left">
                <InputIcon className="pi pi-search" />
                <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
            </IconField>
        </div>
    );
  };

  const clearFilter = () => {
    initFilters();
  };

  const header = renderHeader();

  return (
    <DataTable
      dataKey="id"
      value={values} 
      stripedRows 
      paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} 
      tableStyle={{minWidth: '50rem'}}
      filters={currentFilters}
      globalFilterFields={['description', 'status', 'date', 'car.plateNumber']}
      header={header}
      emptyMessage="No customers found." 
      onFilter={(e) => setCurrentFilters(e.filters)}
    >
      {columns.map((column) => <Column key={column.field} field={column.field} header={column.header} /> )}
    </DataTable>
  )
}

export default Table