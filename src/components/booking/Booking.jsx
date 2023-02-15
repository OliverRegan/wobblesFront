// React components
import { useEffect, useState, useRef } from 'react'
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { useParams, useNavigate, Navigate } from 'react-router'
import { Link } from 'react-router-dom';

import CheckLogin from '../../assets/dataFunctions/checkVerification';

// Image
import lessonImg from "../../assets/img/lessons/Beginner-Court-Lesson.jpg"

const Booking = props => {

    // Get token
    const token = useSelector((state) => state.loggedIn.token);


    let headers = new Headers();
    headers.append('Accept', 'application/json')
    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', token)

    const { id } = useParams();

    // Get user
    const user = useSelector((state) => state.loggedIn.user);


    // form data
    const [data, setData] = useState();
    const bookingDay = useRef();
    const bookingDate = useRef();
    const bookingTime = useRef();
    const bookingSkaters = useRef();

    // Booking data
    const [numBookings, setNumBookings] = useState();

    // lesson data
    const [lessonLoading, setLessonLoading] = useState(true)
    const [lesson, setLesson] = useState([])

    // user data
    const [userLoading, setUserLoading] = useState(true)
    const [userSkaters, setUserSkaters] = useState()
    const [selectedSkaterNames, setSelectedSkaterNames] = useState([])

    // Errors
    const [error, setError] = useState([false, ''])

    const selector = useSelector;
    const navigate = useNavigate();

    const loggedIn = selector((state) => state.loggedIn.value);

    // Fetch ID data for user
    useEffect(() => {

        // Get lesson data
        function getData() {
            fetch(("http://112.213.35.198:3001/lessons/" + id), {
                method: 'GET',
                headers: headers
            })
                .then((res) => {
                    res.json().then((data) => ({
                        data: data[0],
                        status: res.status
                    })).then(response => {
                        setLesson(response.data)
                    }).finally(() => {
                        setLessonLoading(false)
                    }).catch((error) => {
                        console.log(error);
                    })
                })

            // Get skaters
            fetch("http://localhost:3001/users/getSkaters", {
                method: 'GET',
                headers: headers
            })
                .then((res) => {
                    res.json().then((data) => ({
                        data: data,
                        status: res.status
                    })).then(response => {
                        setUserSkaters(response.data)
                    }).finally(() => {
                        setUserLoading(false)
                    }).catch((error) => {
                        console.log(error)
                    })
                })

        }

        getData();

    }, [])



    const removeSkaters = (event) => {
        event.preventDefault();
        setSelectedSkaterNames([]);
        bookingSkaters.current.value = 'Select Skater...';

        // also remove errors
        setError([false, ''])
    }

    // on Submit
    const handleSubmit = async (event) => {

        event.preventDefault();

        // Check for errors before submitting
        // Check there are skaters
        if (selectedSkaterNames.length === 0) {
            setError([true, 'You must select skaters before booking']);
            return;
        }
        // Check that date and time have been selected
        if (bookingDate.current.value == undefined || bookingTime.current.value == undefined || bookingDate.current.value == 'Select a date...' || bookingTime.current.value == 'Select a time...') {
            setError([true, 'You must select a date and time to book a lesson'])
            return
        }
        // Check that the lesson isn't full
        if ((lesson.lessonCapacity - numBookings) < selectedSkaterNames.length) {
            setError([true, "There aren't enough spaces in the lesson for all of the skaters you have selected"])
            return
        }
        // 

        // Get form data for submission
        let body = {
            "skaters": JSON.stringify(selectedSkaterNames),
            "user": user,
            "time": bookingTime.current.value,
            "date": bookingDate.current.value
        }

        fetch("http://112.213.35.198:3001/bookings/" + id, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
        })
            .then((res) => {
                res.json().then((data) => {
                    if (res.status === 406) {
                        console.log(data.message)
                        setError([true, data.message])
                        console.log(error)
                    } else {
                        console.log(data)
                        // Send message to user
                        setError([false, data.message])

                    }
                })
            })
    }

    function handleSkaterSelect(e) {
        let tmp = [];
        selectedSkaterNames.forEach((skater) => {
            tmp.push(skater);
        })
        if (!selectedSkaterNames.includes(e.target.value) && e.target.value != "Select Skater...") {
            tmp.push(e.target.value)
            setSelectedSkaterNames(tmp)
        }
    }

    // Handle select of date and time
    function handleSelect(e) {
        console.log(e.target.value)
        if (bookingDate.current.value != undefined && bookingTime.current.value != undefined && bookingDate.current.value != 'Select a date...' && bookingTime.current.value != 'Select a time...') {
            // Then a valid selection and get booking numbers for that day
            getNumBookings();
            if ((lesson.lessonCapacity - numBookings) < selectedSkaterNames.length) {
                setError([true, "There aren't enough spaces in the lesson for all of the skaters you have selected"])
            }
        } else {
            setNumBookings();
        }
    }

    function getNumBookings() {
        // Get booking numbers for specific lesson
        fetch("http://localhost:3001/booking/numbers/" + id, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                date: bookingDate.current.value,
                time: bookingTime.current.value
            })
        }).then((res) => {
            res.json().then((data) => {
                setNumBookings(lesson.lessonCapacity - data.bookings)
            })
        })
    }

    // Get days of lesson for 3 weeks
    function getDays(dayVal) {
        const d = new Date();
        d.setDate(d.getDate() + ((7 - d.getDay()) % 7 + dayVal) % 7)
        let days = [d, new Date(new Date().setDate(d.getDate() + 7)), new Date(new Date().setDate(d.getDate() + 14))]
        days.map(day => {
            return day.setHours(0, 0, 0, 0);
        })
        return days
    }


    return (
        <div className="my-4 big-height">
            {loggedIn ?
                <></>
                :
                <Navigate to="/login" state={{ from: "/booking/" + id }} />}
            <div className="card text-center w-60 mx-auto">
                <div className="card-body">
                    <div className="w-65 rounded mx-auto  justify-content-around">
                        <p className="card-title-custom text-center">
                            <span className="font-italic">
                                Booking
                            </span>
                        </p>
                    </div>
                    <hr className="hr-tertiary w-80 mx-auto" />
                    <ul className="list-group list-group-flush w-60 mx-auto">
                        <li className="row">

                            <div className="">
                                {lessonLoading ?
                                    (<div className='display-1'>Loading</div>)
                                    :
                                    (<form onSubmit={(event) => handleSubmit(event)} className="row h-100 justify-content-center">
                                        <h1 className="col-12 h3">{lesson.lessonName}</h1>
                                        <div className='col-10'>{lesson.lessonDescription}</div>
                                        {/* Error space */}
                                        {error[1] === '' ? '' : <div className='col-10 mx-auto mt-3'>
                                            <p className={error[0] ? "text-danger" : 'text-success'}>{error[1]}</p>
                                        </div>}
                                        <div className="col-10 my-3 h3 text-main">Price:<br /> ${lesson.lessonPrice}</div>
                                        {numBookings === undefined ? <div className="col-10 my-3 text-main">Please select a date and time to see available bookings</div> : <div className="col-10 my-3 h3 text-main">Spaces remaining:<br />{numBookings + "/" + lesson.lessonCapacity}</div>}


                                        <div className="col-md-9 my-3">
                                            <label htmlFor="time">Choose a Time:</label>
                                            <select className='form-control' name="time" ref={bookingTime} onChange={(e) => handleSelect(e)}>
                                                <option>Select a time...</option>
                                                <option value={lesson.lessonTime} className="text-center">{lesson.lessonTime}</option>
                                            </select>
                                        </div>
                                        <div className="col-md-9 my-3">
                                            {/* Change to a react date picker */}
                                            {/* <input type="date" className='form-control' name="bookingDate" ref={bookingDate} /> */}
                                            <label htmlFor="date">Choose a Date:</label>
                                            <select className='form-control' name="date" ref={bookingDate} onChange={(e) => handleSelect(e)}>
                                                <option>Select a date...</option>
                                                {getDays(lesson.lessonDay - 1).map(option => {
                                                    return <option value={option}>{option.toDateString()}</option>
                                                })}
                                            </select>
                                        </div>
                                        <div className="col-md-9 text-start">
                                            <p><h3 className='lead text-center'>Selected Skaters</h3><ul className='list-group'>{JSON.stringify(selectedSkaterNames) === JSON.stringify([]) ? <li className='list-group-item text-center text-danger'>No skaters selected yet...</li> : selectedSkaterNames.map((skater) => {
                                                return <li key={skater.skaterId} className="list-group-item text-center">{skater}</li>
                                            })}</ul></p>
                                            {JSON.stringify(selectedSkaterNames) === JSON.stringify([]) ? "" : <a href="#" onClick={(event) => {
                                                removeSkaters(event);
                                            }} className='text-light text-decoration-none btn btn-danger mx-auto w-100'>Clear Skaters</a>}
                                        </div>
                                        <div className="col-md-9 my-3">
                                            {userSkaters == undefined ?
                                                <input type="text" className='form-control' disabled placeholder="No skaters on Your profile " />
                                                :
                                                <select className='form-control' name="skaters" ref={bookingSkaters} onChange={(e) => handleSkaterSelect(e)}>
                                                    <option>Select Skater...</option>
                                                    {userSkaters.skaters.map((skater) => {
                                                        {
                                                            if (selectedSkaterNames.length === 0) {
                                                                return <option value={skater.skaterName + " " + skater.skaterLastName} key={skater.skaterId} className={selectedSkaterNames.includes(skater) ? "d-none" : "d-block"}>{skater.skaterName + " " + skater.skaterLastName}
                                                                </option>
                                                            } else {
                                                                for (let i = 0; i < selectedSkaterNames.length; i++) {

                                                                    return <option value={skater.skaterName + " " + skater.skaterLastName} key={skater.skaterId} className={selectedSkaterNames.includes(skater) ? "d-none" : "d-block"}>{skater.skaterName + " " + skater.skaterLastName}
                                                                    </option>


                                                                }
                                                            }

                                                        }
                                                    })}
                                                </select>
                                            }
                                        </div>
                                        {selectedSkaterNames.length * lesson.lessonPrice === 0 ? '' : <div className="col-5 my-3 h3 text-main">Total Cost: ${selectedSkaterNames.length * lesson.lessonPrice}</div>
                                        }
                                        <div className="col-8 justify-content-around my-3 row">
                                            <button className="btn custom-btn col-5 my-2">Book</button>
                                            <Link className="btn btn-secondary custom-btn-no-colour col-5 my-2" to={'/coachesAndLessons'}>Cancel</Link>
                                        </div>
                                        {/* TEMPORARY */}
                                        <div className='lead'>At the moment we aren't taking payments online, but they are coming soon!</div>

                                    </form>)}
                            </div>
                            <hr className="mx-auto mt-3" />
                        </li>
                    </ul>
                </div>
            </div>
        </div >
    )
}
export default Booking