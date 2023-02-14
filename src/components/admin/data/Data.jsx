// Import react components and functions
import { useNavigate } from "react-router-dom";
// Ag Grid
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";

// Import custom components and functions
import { useVolcanoes } from "../api/apiVolcanoes";

import '../../css/data.css';


function Data(props) {


    // For the table display
    let columns = [
        { headerName: 'Volcano Name', field: 'name', sortable: true, filter: true },
        { headerName: 'Region', field: 'region' },
        { headerName: 'Subregion', field: 'subregion', sortable: true, filter: true }
    ]


    // Resize columns to fit page
    const onGridReady = params => {
        params.api.sizeColumnsToFit();
    }

    // Assign useNavigat hook to variable
    const nav = useNavigate();

    return (
        <div className="text-light">
            <div className="d-flex justify-content-center">
                <div id="gridContainer" className="ag-theme-alpine-dark col-8" >
                    <AgGridReact
                        onGridReady={onGridReady}
                        defaultColDef={{ resizable: true, }}
                        columnDefs={columns}
                        rowData={volcanoes}
                        pagination={true}
                        paginationPageSize={10}
                        onRowClicked={(row) => { props.idFunc(row.data.id); nav(`/volcano/${row.data.id}`) }}
                    />
                </div>
            </div>
        </div>
    )
}

export default Data;