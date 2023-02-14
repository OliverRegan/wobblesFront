// React components
import { Link } from 'react-router-dom'

// Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faD, faDownload } from '@fortawesome/free-solid-svg-icons'

// css
import "./about.css"


const About = props => {

    return (
        <div>
            <div className="bg-light mx-auto shadow w-85 d-flex justify-content-around py-4 my-4 rounded">

                <div className="card-content p-4">
                    <p className="card-title-custom text-center"><span className="font-italic"> Become a roller rink star, learn new
                        skills
                        every lesson, overcome your fear of falling and make new friends!
                    </span></p>
                    <br />
                    <div className="d-flex flex-row mx-3">

                        <div className="d-flex flex-column justify-content-center">
                            <div className="d-flex">
                                <p className="intro-text">
                                    Whether you just got your first pair of skates, have dreams of gliding effortlessly around
                                    the
                                    rink,
                                    skated as a child and want to get back into it, or are looking for a fun, outdoor activity
                                    to
                                    enjoy
                                    with your children – Wobbly Wheels has a class for you! Our passionate roller skate coaches
                                    teach
                                    from 5 years old to 60+, proving that skating is fun, exciting and healthy for everyone!
                                </p>
                            </div>
                            <div className="px-3 img-mobile">
                                <img src={require("../../assets/img/branding/Other/Learn-How-To-Roller-Skate.jpg")} className="img-fluid overflow-hidden rounded" height={"100%"} />
                            </div>
                            <p className="intro-text">
                                You will learn how to skate safely, the fundamentals to becoming a confident skater,
                                impressive
                                new
                                skills to show off at the rink, and conquer the fear of falling. Our lessons are tailored to
                                the
                                skill level of each individual ensuring that everyone is progressing; from simply skating
                                forwards
                                to spins, jumps and dance skating.
                            </p>
                            <div className="px-3 img-mobile">
                                <img src={require("../../assets/img/branding/Other/Roller-Skating-Lessons.jpg")} className="img-fluid overflow-hidden rounded" height={"100%"} />
                            </div>
                            <p className="intro-text">
                                Our classes are hosted at the freshly paved Graceville Netball Courts where you enjoy an
                                hour
                                class
                                that combines a variety of skate drills, skill progressions, fun games and music. If our
                                class
                                times
                                don’t fit into your schedule or you don’t like being in a group class, we can provide
                                private
                                one-on-one classes and can travel to a location convenient for you.
                            </p>
                        </div>

                    </div>
                    <div className="row">
                        <div className="mx-auto img-desktop col-md-5">
                            <img src={require("../../assets/img/branding/Other/Learn-How-To-Roller-Skate.jpg")} className="img-fluid overflow-hidden rounded" height={"100%"} />
                        </div>
                        <div className="mx-auto img-desktop col-md-5">
                            <img src={require("../../assets/img/branding/Other/Roller-Skating-Lessons.jpg")} className="img-fluid overflow-hidden rounded" height={"100%"} />
                        </div>
                    </div>

                </div>

            </div>

            <div class="mx-auto w-85 justify-content-between">
                <div class="bg-light shadow  p-2  my-4 rounded">
                    <div class="card-content px-4">

                        <div class="p-4 text-center">
                            <img src={require("../../assets/img/branding/Other/Sportscover Insurance.png")} class="mx-auto align-center img-fluid" />
                        </div>
                        <div class="my-5 text-bigger mx-auto w-85 text-center">
                            <div class="container justify-content-center mx-auto">
                                <div>
                                    <p class="intro-text">We are now fully insured with Sportscover Australia! Just in case any
                                        bumps or
                                        bruises do happen, there's nothing to worry about.</p>
                                </div>
                                <div className="container d-flex justify-content-center w-75">
                                    <a href={require("./Wobbly Wheels Certificate of Currency.pdf")}
                                        class="w-75 btn custom-btn mb-4 book-btn" download><FontAwesomeIcon icon={faDownload} className="mx-3" />
                                        Insurance Certificate</a>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default About