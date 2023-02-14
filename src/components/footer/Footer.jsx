// React and other components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faSquareFacebook } from '@fortawesome/free-brands-svg-icons'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'

// Components

// Css
import "./footer.css"

const Footer = () => {
    return (
        <footer className="bg-main w-100" id="footer">

            <div className="container text-center">
                <h4 className="pt-2 text-light text-shadow-orange">&copy; Wobbly Wheels 2021</h4>
                <div className="d-flex justify-content-between mx-auto socials">
                    <a href="https://www.instagram.com/wobblywheels.lessons/"
                        className="h2 text-center text-light-custom text-shadow-orange hover-secondary social-link">
                        <FontAwesomeIcon icon={faInstagram} />
                    </a>
                    <a href="https://www.facebook.com/wobblywheels.lessons"
                        className="h2 text-center text-light-custom text-shadow-orange hover-secondary social-link">
                        <FontAwesomeIcon icon={faSquareFacebook} />
                    </a>
                    <a href="mailto:Wobblywheels.lessons@gmail.com"
                        className="h2 text-center text-light-custom text-shadow-orange hover-secondary social-link">
                        <FontAwesomeIcon icon={faEnvelope} />

                    </a>
                </div>
            </div>
        </footer>
    )
}
export default Footer