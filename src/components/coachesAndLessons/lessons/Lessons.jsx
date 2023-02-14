// React components
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useGetLessons } from "../../../assets/dataFunctions/useGetLessons"
// Css
import "./lessons.css"

const Lessons = props => {
    console.log(process.env.REACT_APP_IMAGE_BASE_URL)
    // Fetch lessons info from back end
    let { lessons, loading } = useGetLessons();



    return (
        <div className="row w-85 mx-auto mx-auto py-3" id="lesson-group-card-holder">
            <div className="bg-light w-100 rounded mx-auto shadow d-flex justify-content-around">
                <p className="card-title-custom text-center"><span className="font-italic">Lessons
                </span></p>
            </div>
            {loading === true ?
                <div className="col-lg-3 lesson-card-shell my-3">Loading...</div>
                :
                <div className="row mx-auto">
                    {lessons.map((lesson) => {
                        console.log(lesson)
                        return (

                            <div className="col-md-3 lesson-card-shell my-3 " key={lesson.lessonId}>

                                <div className="h-100 d-flex flex-column justify-content-end w-100 ">

                                    <img src={process.env.REACT_APP_IMAGE_BASE_URL + "lessons/" + lesson.lessonPictureName} className={"rounded-top img-fluid"} />

                                    <div className="bg-light rounded-bottom py-2 text-dark text-center h-100">
                                        <div className="d-flex flex-column justify-content-end h-100 px-3 pb-1">
                                            <h5 className="card-title lesson-card-title ">{lesson.lessonName}</h5>
                                            <h5 className="card-title lesson-card-price">${lesson.lessonPrice}</h5>
                                            <hr className="hr-tertiary w-80 mx-auto" />
                                            <Link className="btn custom-btn" to={'/booking/' + lesson.lessonId}>Book Now!</Link>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        )
                    })}
                </div>
            }
        </div>
    )

}
export default Lessons