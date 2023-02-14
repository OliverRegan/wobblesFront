// React & React components
import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Helmet } from 'react-helmet'

// Components
import TopNav from "../topNav/TopNav"
import Footer from "../footer/Footer"

// Hooks
import useWindowDimensions from '../hooks/getWindowDimensions'


// Css
import 'bootstrap/dist/css/bootstrap.min.css';


const Layout = props => {

    // Top nav menu adjustments 
    // width of page
    let width = useWindowDimensions().width

    // Menu state
    const [menu, setMenu] = useState()

    useEffect(() => {
        if (width > 930) {
            setMenu(true);
        } else if (width < 930) {
            setMenu(false);

        }
    }, [])

    return (
        <div className='bg-dark h-100'>
            <Helmet>
                <title>Wobbly Wheels Skate Lessons</title>
                <meta name='description' content="Rolelr skate lessons around Brisbane." />
                <html className='h-100 bg-dark' />
                <body className='h-100 d-flex flex-column bg-dark' />
            </Helmet>
            <TopNav setMenu={setMenu} menu={menu} loggedIn={props.loggedIn} setLoginType={props.setLoginType} />
            <div className=' bg-dark d-flex flex-column w-100  mb-5 mx-auto' id='outlet'>
                <Outlet />
            </div>
            <div className='my-5'>
                <br />
            </div>
            <Footer />
        </div>
    )
}

export default Layout