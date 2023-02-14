// React components
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../redux/reducers/loggedIn'
import { useNavigate } from 'react-router'
import { Link, useLocation } from 'react-router-dom'
// Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'

// Css
import "./topNav.css"
import 'bootstrap/dist/css/bootstrap.min.css';

// Images
import logo from "../../assets/img/branding/Logo/Logo_text_aside.jpg"


const TopNav = props => {


    const location = useLocation();

    const user = useSelector((state) => state.loggedIn.user);

    // Test if logged in
    const loggedIn = useSelector((state) => state.loggedIn.value)
    const isAdmin = useSelector((state) => state.loggedIn.isAdmin)
    const dispatch = useDispatch();

    // useEffect(() => {
    //     console.log(location.pathname.includes("/gallery")
    //     )
    // }, [location])

    function handleResize() {
        if (window.innerWidth > 1000 && !props.menu) {
            props.setMenu(true);
            document.getElementById('nav').classList.remove('d-none')
            document.getElementById('login').classList.add('justify-content-end')
            document.getElementById('login').classList.remove('justify-content-center')
        } else if (window.innerWidth < 1000 && props.menu) {
            props.setMenu(false)
            document.getElementById('nav').classList.add('d-none')
            document.getElementById('login').classList.remove('justify-content-end')
            document.getElementById('login').classList.add('justify-content-center')
        }
    }

    window.addEventListener('resize', handleResize)

    return (
        <div id="header-and-showcase-container">
            <nav className="navbar bg-main sticky-top row justify-content-around w-100 m-0 p-0">

                <div id="brand-bar" className="col-xxl-4 text-center w-100 row justify-content-between">

                    <Link to="/" id="top-brand" className='logo mx-auto mx-lg-0 col-lg-3'>

                        <img src={logo} alt="Logo"
                            id="top-brand" className="desktop-logo"></img>
                    </Link>

                    <div className='col-lg-9'>
                        <div className={"my-3 "}>
                            <div className="row w-100 mx-auto justify-content-end " id='login'>
                                <div className={"  my-auto col-md-2 " + (loggedIn ? "d-none" : "")}>
                                    <Link to="/login" className='text-decoration-none' onClick={() => props.setLoginType('login')}>
                                        <u className="text-shadow-orange w-100 m-0 nav-link-custom hover-secondary">Login</u>
                                    </Link>
                                </div>
                                <div className={"  my-auto col-md-2 " + (loggedIn ? "d-none" : "")}>
                                    <Link to="/SignUp" className='text-decoration-none' onClick={() => props.setLoginType('signUp')}>
                                        <u className="text-shadow-orange w-100 m-0 nav-link-custom hover-secondary">Sign Up</u>
                                    </Link>
                                </div>
                                <div className={"  my-auto col-md-2 " + (loggedIn ? "" : "d-none")}>
                                    <Link to="/" onClick={(event) => { dispatch(logout()) }} className='text-decoration-none'>
                                        <u className="text-shadow-orange w-100 m-0 nav-link-custom hover-secondary">Logout</u>
                                    </Link>
                                </div>
                                <div className={"  my-auto col-md-2 " + (loggedIn ? "" : "d-none")}>
                                    <Link to="/profile" className='text-decoration-none'>
                                        <u className="text-shadow-orange w-100 m-0 nav-link-custom hover-secondary">Profile</u>
                                    </Link>
                                </div>
                                <div className={"  my-auto col-md-2 " + (isAdmin ? "" : "d-none")}>
                                    <Link to="/admin" className={'text-decoration-none ' + (location.pathname.includes("/admin") ? "border-bottom" : "")}>
                                        <u className="text-shadow-orange w-100 m-0 nav-link-custom hover-secondary">Admin</u>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className={"text-center d-flex flex-column justify-content-center my-3 "}>
                            <div className={(props.menu ? "" : "d-none")} id={"nav"}>
                                <div className="mx-auto mt-2 mt-lg-0 w-100 row justify-content-around">

                                    <div className=" col-lg-2 h4 my-auto">
                                        <Link to="/coachesAndLessons" className={'text-decoration-none ' + (location.pathname.includes("/coachesAndLessons") ? "border-bottom" : "")}>
                                            <u className="text-shadow-orange w-100 m-0 nav-link-custom hover-secondary">Lessons</u>
                                        </Link>
                                    </div>
                                    <div className=" col-lg-2 h5 my-auto">
                                        <Link to="/gallery" className={'text-decoration-none ' + (location.pathname.includes("/gallery") ? "border-bottom" : "")}>
                                            <u className="text-shadow-orange w-100 m-0 nav-link-custom hover-secondary">Gallery</u>
                                        </Link>
                                    </div>
                                    <div className=" col-lg-2 h5 my-auto">

                                        <a target="_blank" href="https://wobblywheelsskate.bigcartel.com/?fbclid=IwAR0qH19Ar2Dr-xbV0J3FvKltazyieFsvzuPrL3eM4KPYNrmpb4VCGS9m8ac" className={'text-decoration-none ' + (location.pathname.includes("/merch") ? "border-bottom" : "")}>
                                            <u className="text-shadow-orange w-100 m-0 nav-link-custom hover-secondary">Merch</u>
                                        </a>
                                    </div>
                                    <div className=" col-lg-2 h5 my-auto">
                                        <Link to="/reviews" className={'text-decoration-none ' + (location.pathname.includes("/reviews") ? "border-bottom" : "")}>
                                            <u className="text-shadow-orange w-100 m-0 nav-link-custom hover-secondary">Reviews</u>
                                        </Link>
                                    </div>
                                    <div className=" col-lg-2 h5 my-auto">
                                        <Link to="/about" className={'text-decoration-none ' + (location.pathname.includes("/about") ? "border-bottom" : "")}>
                                            <u className="text-shadow-orange w-100 m-0 nav-link-custom hover-secondary">About Us</u>
                                        </Link>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>
                </div>
                <div className="d-lg-none container justify-content-center">
                    <FontAwesomeIcon icon={props.menu ? faChevronUp : faChevronDown} className="h2 text-light text-shadow-orange hover-secondary nav-link-custom mx-2 px-2 my-0 py-0" onClick={() => {
                        props.setMenu(props.menu ? false : true); console.log(props.menu)
                    }} />
                </div>
                <div className={"w-100 " + (loggedIn ? "d-block" : "d-none")}>
                    <p className="text-shadow-orange w-100 m-0 text-light h4 text-center mb-2">
                        Welcome {user}!
                    </p>
                </div>
            </nav >
        </div >
    );
}
export default TopNav;