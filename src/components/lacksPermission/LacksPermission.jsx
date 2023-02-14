
import { Link } from "react-router-dom";


const LacksPermission = () => {


    return (
        <div className="row w-85 mx-auto mx-auto py-3" id="lesson-group-card-holder">
            <div className="bg-light w-100 rounded-top mx-auto shadow d-flex justify-content-around">
                <p className="card-title-custom text-center"><span className="font-italic">You Do Not Have Permission.
                </span></p>
            </div>
            <div className="bg-light w-100 rounded-bottom mx-auto shadow d-flex justify-content-around">
                <Link to={'/'}>Home</Link>
            </div>

        </div>
    )

}

export default LacksPermission;