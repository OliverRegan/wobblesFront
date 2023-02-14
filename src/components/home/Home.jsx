// React components and other
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'

// Import components
import Updates from "./updates/Updates"

import { Link } from 'react-router-dom';

// Import css
import "../../assets/css/utility.css";
import "./home.css"



const Home = props => {


    useEffect(() => {



    }, [])



    return (
        <div className='home-wrapper align-self-top'>
            <div className="showcase-wrapper">
                <div id="showcase" className="w-100">
                    <div className="showcase-text">
                        <br></br>
                        <h1 >Learn How to Roller Skate</h1>
                        <br></br>
                        <h2 >Private and Group Classes in Graceville Brisbane</h2>
                        <br></br>
                        <div className="d-flex">
                            <Link to="/coachesAndLessons" className="my-3 w-10 btn mx-auto custom-btn"><span
                                className="h4">Book
                                Now</span> </Link>
                        </div>
                        <br></br>
                    </div>
                </div>
            </div>
            <Updates />

        </div>
    )
}
export default Home