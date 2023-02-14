// Material UI
import {
    Typography,
    TextField,
    Box,
    Button
} from '@mui/material'


import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { useGetCoaches } from "../../assets/dataFunctions/useGetCoaches"
import { useGetSkaters } from "../../assets/dataFunctions/useGetSkaters"
import { useGetLessons } from "../../assets/dataFunctions/useGetLessons"
import { useGetUsers } from "../../assets/dataFunctions/useGetUsers"
import { useGetBookings } from "../../assets/dataFunctions/useGetBookings"


// Ag Grid
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";

import "./admin.css"
import { Formik, Form } from 'formik';

const Admin = () => {

    // What tab/type is active
    const [typeActive, setTypeActive] = useState('');

    // Column state - starts on skaters tab
    const [columns, setColumns] = useState([
        { headerName: 'Skater Id', field: 'skaterId', sortable: true, filter: true, resizable: true, flex: 1 },
        { headerName: 'Skater First Name', field: 'skaterName', sortable: true, filter: true, resizable: true, flex: 1 },
        { headerName: 'Skater Last Name', field: 'skaterLastName', sortable: true, filter: true, resizable: true, flex: 1 },
        { headerName: 'Skater User Name', field: 'userName', sortable: true, filter: true, resizable: true, flex: 1 },
        { headerName: 'Skater Associated User Id', field: 'skaterEmergencyContact', sortable: true, filter: true, resizable: true, flex: 1 },

    ]);


    let { coaches, coachLoading, coachError } = useGetCoaches();
    let { skaters, skatersLoading, skatersError } = useGetSkaters();
    let { lessons, lessonLoading, lessonError } = useGetLessons();
    let { users, usersLoading, usersError } = useGetUsers();
    let { bookings, bookingsLoading, bookingsError } = useGetBookings();

    // States for which tab is selected. 0 = null, 1 = skaters .... 5 = merch
    const [tab, setTab] = useState(0);
    const [data, setData] = useState(() => skaters);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    const location = useLocation();
    let page = location.state != undefined ? location.state.page : 'search'



    useEffect(() => {

        if (page === 'coaches' || page === 'lessons' || page === 'gallery') {

        } else {


            // Get data if on data tab
            if (tab === 1) {
                setData(skaters)
                setLoading(skatersLoading)
                setError(skatersError)
                // Set columns          
                setColumns([
                    { headerName: 'Skater Id', field: 'skaterId', sortable: true, filter: true, resizable: true, flex: 1 },
                    { headerName: 'Skater First Name', field: 'skaterName', sortable: true, filter: true, resizable: true, flex: 1 },
                    { headerName: 'Skater Last Name', field: 'skaterLastName', sortable: true, filter: true, resizable: true, flex: 1 },
                    { headerName: 'Skater User Name', field: 'userName', sortable: true, filter: true, resizable: true, flex: 1 },
                    { headerName: 'Skater Associated User Id', field: 'skaterEmergencyContact', sortable: true, filter: true, resizable: true, flex: 1 },

                ]);
            }
            else if (tab === 2) {

                setData(lessons)
                setLoading(lessonLoading)
                setError(lessonError)

                // Day comes from db as int value, need to convert to string for readability

                // Set columns          
                setColumns([
                    { headerName: 'Lesson Id', field: 'lessonId', sortable: true, filter: true, resizable: true, flex: 1 },
                    { headerName: 'Lesson Name', field: 'lessonName', sortable: true, filter: true, resizable: true, flex: 1 },
                    { headerName: 'Lesson Coach A', field: 'coachNameA', sortable: true, filter: true, resizable: true, flex: 1 },
                    // { headerName: 'Lesson Coach B', field: 'coachNameB', sortable: true, filter: true, resizable: true, flex: 1 },
                    { headerName: 'Lesson Day', field: 'lessonDay', sortable: true, filter: true, resizable: true, flex: 1 },
                    { headerName: 'Lesson Time', field: 'lessonTime', sortable: true, filter: true, resizable: true, flex: 1 },
                    { headerName: 'Lesson Location', field: 'lessonLocationA', sortable: true, filter: true, resizable: true, flex: 1 },
                    { headerName: 'Lesson Capacity', field: 'lessonCapacity', sortable: true, filter: true, resizable: true, flex: 1 },

                ]);
            }
            else if (tab === 3) {

                setData(users)
                setLoading(usersLoading)
                setError(usersError)
                // Set columns          
                setColumns([
                    { headerName: 'User Id', field: 'userId', sortable: true, filter: true, resizable: true, flex: 1 },
                    { headerName: 'User Name', field: 'userName', sortable: true, filter: true, resizable: true, flex: 1 },
                    { headerName: 'User First Name', field: 'userFirstName', sortable: true, filter: true, resizable: true, flex: 1 },
                    { headerName: 'User Last Name', field: 'userLastName', sortable: true, filter: true, resizable: true, flex: 1 },
                    { headerName: 'Email', field: 'userEmail', sortable: true, filter: true, resizable: true, flex: 1 },
                    { headerName: 'Contact Number', field: 'userContact', sortable: true, filter: true, resizable: true, flex: 1 },


                ]);
            }
            else if (tab === 4) {

                setData(coaches)
                setLoading(coachLoading)
                setError(coachError)

                // Set columns          
                setColumns([
                    { headerName: 'Coach Id', field: 'coachId', sortable: true, filter: true, resizable: true, flex: 1 },
                    { headerName: 'Coach Name', field: 'coachName', sortable: true, filter: true, resizable: true, flex: 1 },
                    { headerName: 'Coach Position', field: 'coachPosition', sortable: true, filter: true, resizable: true, flex: 1 },

                ]);
            }
            else if (tab === 5) {

                setData(bookings)
                setLoading(bookingsLoading)
                setError(bookingsError)

                // Set columns          
                setColumns([
                    { headerName: 'Booking Id', field: 'bookingId', sortable: true, filter: true, resizable: true, flex: 1 },
                    { headerName: 'Skater Name', field: 'bookingName', sortable: true, filter: true, resizable: true, flex: 1 },
                    { headerName: 'User First Name', field: 'userFirstName', sortable: true, filter: true, resizable: true, flex: 1 },
                    { headerName: 'User Last Name', field: 'userLastName', sortable: true, filter: true, resizable: true, flex: 1 },
                    { headerName: 'Booking Time', field: 'bookingTime', sortable: true, filter: true, resizable: true, flex: 1 },
                    { headerName: 'Booking Date', field: 'bookingDate', sortable: true, filter: true, resizable: true, flex: 1 },

                ]);
            }
        }
    }, [tab])



    const handleSearch = (values, tab) => {
        // Do search based off tab and values
        if (tab === 1) {
            //Searches: fName, lName, pName
            if ((values.firstName === '' && values.lastName === "" && values.parentName === "")) {
                setData(() => skaters)
            } else {

                let arr = skaters.filter((obj) => {
                    return (obj.skaterName.toLowerCase().includes(values.firstName.toLowerCase()) && obj.skaterLastName.toLowerCase().includes(values.lastName.toLowerCase()) && obj.userName.toLowerCase().includes(values.parentName.toLowerCase()))
                })
                setData(arr)
            }

        } else if (tab === 2) {

            //Searches: fName, lName, pName
            if ((values.lessonDay === '' && values.lessonTime === "" && values.firstName === '')) {
                setData(() => lessons)
            } else {

                let arr = lessons.filter((obj) => {
                    if (obj.lessonDay == null) {
                        obj.lessonDay = '';
                    }
                    return (
                        obj.lessonDay.toLowerCase().includes(values.lessonDay.toLowerCase())
                        && obj.lessonTime.includes(values.lessonTime.toLowerCase())
                        &&
                        (obj.coachNameA.toLowerCase().includes(values.firstName.toLowerCase())))
                })
                setData(arr)
            }

        } else if (tab === 3) {

            //Searches: fName, lName, pName
            if ((values.firstName === '' && values.lastName === "" && values.email === "")) {
                setData(() => users)
            } else {

                let arr = users.filter((obj) => {
                    if (obj.userFirstName == null) {
                        obj.userFirstName = '';
                    } else if (obj.userLastName == null) {
                        obj.userLastName = '';
                    }
                    return (
                        obj.userFirstName.toLowerCase().includes(values.firstName.toLowerCase())
                        &&
                        obj.userLastName.toLowerCase().includes(values.lastName.toLowerCase())
                        &&
                        obj.userEmail.toLowerCase().includes(values.email.toLowerCase())
                    )
                })
                setData(arr)
            }


        } else if (tab === 4) {

            // atm do nothing - add search features for coaches down the track

        } else if (tab === 5) {

            //Searches: fName, lName, pName
            if ((values.firstName === '' && values.lastName === "" && values.parentName === "" && values.lessonDay === '' && values.lessonTime === "")) {
                setData(() => bookings)
            } else {

                let arr = bookings.filter((obj) => {
                    if (obj.userFirstName == null) {
                        obj.userFirstName = '';
                    } else if (obj.userLastName == null) {
                        obj.userLastName = '';
                    }
                    return (
                        obj.bookingName.toLowerCase().includes(values.firstName.toLowerCase())
                        &&
                        obj.bookingName.toLowerCase().includes(values.lastName.toLowerCase())
                        &&
                        obj.userFirstName.toLowerCase().includes(values.parentName.toLowerCase())
                        &&
                        obj.bookingTime.toLowerCase().includes(values.lessonTime.toLowerCase())
                        &&
                        obj.bookingDate.toLowerCase().includes(values.lessonDay.toLowerCase())
                    )
                })
                setData(arr)
            }


        }
    }

    // tbd
    const handleRowClick = () => {

    };


    return (
        <div className='row w-100 justify-content-center px-3 mx-auto'>
            <div className='col-xl-3'>
                <div className='col-xl-12 py-3'>
                    <div className="bg-main rounded-top mx-auto shadow d-flex justify-content-around mx-4">
                        <p className="card-title-custom text-center text-light text-shadow-orange"><span className="font-italic">Create, Update, Delete
                        </span></p>
                    </div>
                    <div className="bg-light w-100 rounded-bottom mx-auto shadow justify-content-around py-2">
                        <div className='col-xl-12 justify-content-center text-center'>
                            <Link to={"/admin/lessons"} state={{ page: "lessons" }} className={"text-decoration-none btn btn-dark col-7 my-2"}><p className='lead p-0 my-2'>Lessons</p></Link>
                        </div>
                        <div className='col-xl-12 justify-content-center text-center'>
                            <Link to={"/admin/coaches"} state={{ page: "coaches" }} className={"text-decoration-none btn btn-dark col-7 my-2"}><p className='lead p-0 my-2'>Coaches</p></Link>
                        </div>
                        <div className='col-xl-12 justify-content-center text-center'>
                            <Link to={"/admin/gallery"} state={{ page: "gallery" }} className={"text-decoration-none btn btn-dark col-7 my-2"}><p className='lead p-0 my-2'>Gallery</p></Link>
                        </div>
                        <div className='col-xl-12 justify-content-center text-center'>
                            <Link to={"/admin/updates"} state={{ page: "update" }} className={"text-decoration-none btn btn-dark col-7 my-2"}><p className='lead p-0 my-2'>Updates</p></Link>
                        </div>
                    </div>
                </div>
                <div className='col-xl-12 py-3'>
                    <div className="bg-main rounded-top mx-auto shadow d-flex justify-content-around mx-4">
                        <p className="card-title-custom text-center text-light text-shadow-orange">
                            <span className="font-italic">
                                Search
                            </span>
                        </p>
                    </div>
                    <div className="bg-light w-100 rounded-bottom mx-auto shadow justify-content-around py-2">
                        <div className='col-xl-12 justify-content-center text-center'>
                            <Link to={"/admin"} state={{ page: "search" }} className={"text-decoration-none btn btn-dark col-7 my-2"}><p className='lead p-0 my-2'>Search Database</p></Link>
                        </div>
                    </div>
                </div>

            </div>
            <div className="col-xl-9 mx-auto py-3 px-2">
                <div className="bg-main w-100 rounded-top mx-auto shadow d-flex justify-content-around">
                    <p className="card-title-custom text-center text-light text-shadow-orange"><span className="font-italic">Admin
                    </span></p>
                </div>
                {
                    page === 'search' ?

                        <div className="bg-light w-100 rounded-bottom mx-auto shadow justify-content-around">
                            <div className="">
                                {/* Buttons to change display */}
                                <ul className="w-100 p-0 d-flex justify-content-around pt-4 pb-1 list-unstyled px-4">
                                    <li className={(tab === 1 ? "bg-main" : "bg-dark") + " text-light w-100 rounded cursor-pointer text-center py-2 mx-2"} role='button' onClick={() => { setTab(1); }}>
                                        Skaters
                                    </li>
                                    <li className={(tab === 2 ? "bg-main" : "bg-dark") + " text-light w-100 rounded cursor-pointer text-center py-2 mx-2"} role='button' onClick={() => { setTab(2); }}>
                                        Lessons
                                    </li>
                                    <li className={(tab === 3 ? "bg-main" : "bg-dark") + " text-light w-100 rounded cursor-pointer text-center py-2 mx-2"} role='button' onClick={() => { setTab(3); }}>
                                        Users
                                    </li>
                                    <li className={(tab === 4 ? "bg-main" : "bg-dark") + " text-light w-100 rounded cursor-pointer text-center py-2 mx-2"} role='button' onClick={() => { setTab(4); }}>
                                        Coaches
                                    </li>
                                    <li className={(tab === 5 ? "bg-main" : "bg-dark") + " text-light w-100 rounded cursor-pointer text-center py-2 mx-2"} role='button' onClick={() => { setTab(5); }}>
                                        Bookings
                                    </li>
                                </ul>
                                {/* Search Bar */}
                                <div className="row w-85 mx-auto mx-auto py-3" id="lesson-group-card-holder">
                                    <div className="bg-light">
                                        {/* Skater Search options */}
                                        <Formik
                                            initialValues={
                                                {
                                                    firstName: "",
                                                    lastName: "",
                                                    parentName: "",
                                                    lessonDay: "",
                                                    lessonTime: "",
                                                    email: ''
                                                }
                                            }
                                            onSubmit={(values, { resetForm }) => {
                                                console.log(values == {
                                                    email: '',
                                                    firstName: "",
                                                    lastName: "",
                                                    lessonDay: "",
                                                    lessonTime: "",
                                                    parentName: ""

                                                }, values)



                                                handleSearch(values, tab);
                                            }}
                                        >
                                            {props => (
                                                <Form
                                                >
                                                    <Box sx={{
                                                        display: 'flex',
                                                        width: 1,
                                                        gap: 2,
                                                        mx: "auto",
                                                        justifyContent: "space-around"
                                                    }}>


                                                        <TextField
                                                            sx={{
                                                                display: (tab === 4) ? "none" : "inline-block",
                                                                width: 1
                                                            }}
                                                            size={"small"}
                                                            name={"firstName"}
                                                            label={"First Name"}
                                                            onChange={props.handleChange}
                                                            onBlur={props.handleBlur}
                                                            value={props.values.firstName}
                                                        />

                                                        <TextField
                                                            sx={{
                                                                display: (tab === 2 || tab === 4) ? "none" : "inline-block",
                                                                width: 1
                                                            }}
                                                            size={"small"}
                                                            name={"lastName"}
                                                            label={"Last Name"}
                                                            onChange={props.handleChange}
                                                            onBlur={props.handleBlur}
                                                            value={props.values.lastName}
                                                        />

                                                        <TextField
                                                            sx={{
                                                                display: (tab === 2 || tab === 3 || tab === 4) ? "none" : "inline-block",
                                                                width: 1
                                                            }}
                                                            size={"small"}
                                                            name={"parentName"}
                                                            label={tab === 5 ? "Parent First Name" : "Parent Name"}
                                                            onChange={props.handleChange}
                                                            onBlur={props.handleBlur}
                                                            value={props.values.parentName}
                                                        />
                                                        <TextField
                                                            sx={{
                                                                display: (tab === 3) ? "inline-block" : "none",
                                                                width: 1
                                                            }}
                                                            size={"small"}
                                                            name={"email"}
                                                            label={"Email"}
                                                            onChange={props.handleChange}
                                                            onBlur={props.handleBlur}
                                                            value={props.values.email}
                                                        />
                                                        <TextField
                                                            sx={{
                                                                display: (tab === 2 || tab === 5) ? "inline-block" : "none",
                                                                width: 1
                                                            }}
                                                            size={"small"}
                                                            name={"lessonDay"}
                                                            label={"Day"}
                                                            onChange={props.handleChange}
                                                            onBlur={props.handleBlur}
                                                            value={props.values.lessonDay}
                                                        />
                                                        <TextField
                                                            sx={{
                                                                display: (tab === 2 || tab === 5) ? "inline-block" : "none",
                                                                width: 1
                                                            }}
                                                            size={"small"}
                                                            name={"lessonTime"}
                                                            label={"Time"}
                                                            onChange={props.handleChange}
                                                            onBlur={props.handleBlur}
                                                            value={props.values.lessonTime}
                                                        />
                                                        <Button
                                                            type="submit"
                                                            onClick={props.handleSubmit}

                                                            sx={{
                                                                display: tab === 4 ? "none" : "inline-block",
                                                                backgroundColor: "#8BC2A1",
                                                                color: "white",
                                                                "&:hover": {
                                                                    backgroundColor: "#8BC2F1",
                                                                },
                                                                width: 1

                                                            }}>Search</Button>
                                                    </Box>
                                                </Form>
                                            )}
                                        </Formik>


                                    </div>
                                </div>

                            </div>

                        </div>
                        :
                        <Outlet />
                }

                {/* Admin Nav Bar */}
                {
                    page === 'search' ?
                        <div className="w-100 d-flex justify-content-center p-0 my-4">
                            <div id="gridContainer" className="ag-theme-alpine-dark w-100" >
                                <AgGridReact
                                    onGridReady={(params) => {
                                        params.api.sizeColumnsToFit();
                                        params.api.setQuickFilter();
                                    }}
                                    defaultColDef={{ resizable: true, autosize: true }}
                                    columnDefs={columns}
                                    domLayout={'autoHeight'}
                                    rowData={data}
                                    pagination={true}
                                    paginationPageSize={10}
                                    filter={true}
                                    onRowClicked={(row) => { handleRowClick(); /*props.idFunc(row.data.id); nav(`/volcano/${row.data.id}`)*/ }}
                                />
                            </div>
                        </div>
                        :
                        <></>
                }
            </div>
        </div>
    )

}

export default Admin;