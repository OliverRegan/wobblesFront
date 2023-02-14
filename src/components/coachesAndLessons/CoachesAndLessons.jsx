// React components


// Components
import Coaches from "./coaches/Coaches"
import Lessons from "./lessons/Lessons"

// Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faD, faDownload } from '@fortawesome/free-solid-svg-icons'


// Files
import safetyImage from "../../assets/img/branding/Other/Piggy&Layla.jpg"

// Css
import './coachesAndLessons.css'


const CoachesAndLessons = props => {


    return (
        <div>
            <div className="justify-content-center my-4" id="meet-the-team">
                <Coaches />
            </div>
            <div className="justify-content-center my-4" id="meet-the-team">
                <Lessons />
            </div>
            <div className="mx-auto w-85 justify-content-between">
                <div className="bg-light shadow  mt-4 rounded ">
                    <p className="card-title-custom text-center"><span className="font-italic"> The Importance of Wearing
                        Protective
                        Gear
                    </span></p>
                    <div className="">

                        <div className="card-content d-flex">
                            <div className='row col-lg-10 mx-auto justify-content-around'>


                                <div className=" text-bigger row justify-content-around col-xl-4">
                                    <div className="row justify-content-center text-center">
                                        <p className="intro-text my-0 py-0">We take safety very seriously as the occasional fall in
                                            inevitable. Accidents happen
                                            and it's best to be safe than sorry. Everyone attending must bring their own helmet
                                            and we strongly recommend wearing padding and guards. We do provide spare protective
                                            pads for those that need it but it is not guaranteed. If you're unsure where to buy
                                            the best gear to keep you safe, we can point you in the right direction. </p>
                                        {/* <div className="img-desktop text-center w-50">
                                        <img src={safetyImage} className="img-fluid overflow-hidden rounded" height={"100%"} />

                                    </div> */}

                                        <p className="intro-text w-80 mx-auto">Download and read through our waiver, it will need to be signed
                                            and
                                            acknowledged
                                            before your
                                            lesson. We look forward to seeing you there!</p>
                                        <br /><br />

                                    </div>
                                </div>
                                <div className="px-3 text-center col-xl-6 mb-2 pb-2 safety-image">
                                    <img src={safetyImage} className="img-fluid overflow-hidden rounded" height={""} />
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="container d-flex justify-content-center w-90">
                        <a href={require("./Wobbly Wheels Consent Waiver.pdf")}
                            className="w-50 btn custom-btn mb-4 book-btn " download><FontAwesomeIcon icon={faDownload} className="mx-3" />
                            Download</a>
                    </div>
                </div>

            </div>


        </div >
    );
}

export default CoachesAndLessons