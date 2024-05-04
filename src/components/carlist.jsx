import { useEffect, useState } from "react";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import AddCar from  "./AddCar";

import Button from "@mui/material/Button";
import EditCar from "./EditCar";
import{ getCars, addCar, updateCar, deleteCar} from "../carapi";

function Carlist() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetchCars();
  }, []);

  const [colDefs, setColDefs] = useState([
    { field: "brand", filter: true },
    { field: "model", filter: true, width: 200 },
    { field: "color", filter: true, width: 100 },
    { field: "fuel", filter: true, width: 100 },
    { field: "modelYear", filter: true, width: 150 },
    { field: "price", filter: true },

    {
      cellRenderer: params => <EditCar data={params.data} updateCar={handleUpdateCar}/>,
      width: 120,
    },
    {
      cellRenderer: (params) => (
        <Button
          size="small"
          color="error"
          onClick={() => handleDeleteCar(params.data._links.car.href)}
        >
          Delete
        </Button>
      ),
      width: 150,
    },
  ]);
  const fetchCars = () => {
    
    getCars()
      .then((data) => setCars(data._embedded.cars))
      .catch((err) => console.error(err));
  };

  const handleDeleteCar = (url) => {
    if (window.confirm("Are you sure to delete this car?")) {
      deleteCar(url)
        .then(() => fetchCars())
        .catch((err) => console.error(err));

    }
  };

  const handleAddCar = (newCar) => {
    addCar(newCar)

.then(()=> fetchCars())
    .catch ((err) => console.error(err));
  };

  const handleUpdateCar = (url, updatedCar) => {
    updateCar(url, updatedCar)

    .then(() => fetchCars())
    .catch((err) => console.error(err));
};
  return (
    <>
    <AddCar addCar ={handleAddCar} />
    <div className="ag-theme-material" style={{ height: 600 }}>
      <AgGridReact
        rowData={cars}
        columnDefs={colDefs}
        pagination={true}
        paginationAutoPageSize={true} />
    </div>
    </>
  );
}

export default Carlist;