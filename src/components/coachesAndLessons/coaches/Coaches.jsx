// React components
import { useEffect, useState } from "react"
import { useGetCoaches } from "../../../assets/dataFunctions/useGetCoaches"

// Css
import "./coaches.css"

const Coaches = props => {

    // Fetch coach info from back end
    let { coaches, loading, error } = useGetCoaches();



    return (
        <div>
            <div className="bg-light w-80 rounded mx-auto shadow d-flex justify-content-around">
                <p className="card-title-custom text-center"><span className="font-italic"> Our enthusiastic coaches dedicated
                    to
                    helping you achieve your goals.
                </span></p>
            </div>
            <div id="meet-the-team-container" className="w-80 justify-content-between mx-auto d-flex flex-xl-wrap flex-lg-wrap ">

                {loading || error ?
                    <div>{loading ? "Loading..." : "Something went wrong"}</div>
                    :
                    coaches.map((coach) => {
                        return (
                            <div className="bg-light shadow d-flex mt-4 rounded coach-card-custom mx-0 px-0" key={coach.coachId}>

                                <div className="card-content w-100 d-flex flex-column justify-content-between">
                                    <div className="flex-1">
                                        <div className="card-header-wrapper justify-content-center">
                                            <div className="card-title-wrapper d-flex flex-column">
                                                <img src={process.env.REACT_APP_IMAGE_BASE_URL + "coaches/" + coach.coachPictureName} className={"rounded w-100"} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <div className="p-4 w-100">
                                            <h3 className="mt-3 text-center">{coach.coachName}</h3>
                                            <hr className="hr-tertiary" />
                                            <p className="intro-text">{coach.coachBio}

                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>)
                    })
                }
            </div >
        </div >
    )

}
export default Coaches;