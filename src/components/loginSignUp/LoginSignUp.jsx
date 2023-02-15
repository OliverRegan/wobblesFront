// React components
import { useRef, useState } from 'react'
import { useNavigate, Link, useSearchParams, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { login, logout } from '../../redux/reducers/loggedIn'
import { set, unset } from '../../redux/reducers/changePassword'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet'


import Footer from '../footer/Footer'

// Takes data from form and sends to back end to sign up user/handle messages
async function signUp(data) {

    // Make body of request
    let body = {
        "username": data.username,
        "firstName": data.firstName,
        "lastName": data.lastName,
        "contact": data.contact,
        "email": data.email,
        "password": data.password
    }

    return fetch("http://112.213.35.198:3001/users/signup", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)

    }).then(res => res.json())

}
async function logIn(data) {
    // Make body of request
    let body = {
        "username": data.username,
        "password": data.password
    }

    return fetch("http://112.213.35.198:3001/users/login", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(res => res.json())

}
async function changePassword(data) {
    // Make body of request
    let body = {
        "username": data.username,
        "email": data.email
    }

    return fetch("http://112.213.35.198:3001/users/changePassword", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(res => res.json())

}
async function changePasswordCheck(data) {
    // Make body of request
    let body = {
        "username": data.username,
        "email": data.email,
        "code": data.code
    }

    return fetch("http://112.213.35.198:3001/users/changePassword/code", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(res => res.json())

}
async function changePasswordFinal(data) {
    // Make body of request
    console.log(data)
    let body = {
        "password": data.password,
        'details': data.details
    }

    return fetch("http://112.213.35.198:3001/users/changePassword/change", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(res => res.json())

}


const LoginSignUp = props => {
    // Use location
    const location = useLocation();
    const [searchParams] = useSearchParams();
    // Set input states
    const [userName, setUserName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [contact, setContact] = useState(0);
    const [email, setEmail] = useState('');
    const [resetCode, setResetCode] = useState(0);
    const [password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState('');
    const [userDetails, setUserDetails] = useState({})
    const [tempDisabled, setTempDisabled] = useState(false);

    // Set message for sign up error/success
    const [response, setResponse] = useState({});
    const [message, setMessage] = useState('');
    const [msgGood, setMsgGood] = useState(true);
    const [changePasswordSent, setChangePasswordSent] = useState()


    // redirect
    let from;
    if (location.state != undefined) {
        from = location.state.from
    }


    // Navigation
    const navigate = useNavigate();

    // Redux
    const dispatch = useDispatch();
    const verified = useSelector(state => state.changePassword.value)




    useEffect(() => {
        // if (props.type === undefined) {
        //     const { type } = location.state
        //     setType(type)
        // } else {
        //     setType(props.type)
        // }
        if (props.type != 'changePassword') {
            setChangePasswordSent(false)
        }

    }, [])

    // Validate form
    function validateForm() {

        // init error JSON
        let errors = {
            error: false,
            messages: []
        }

        // Check username
        if (userName === '' && (props.type === 'signUp' || 'changePassword' || 'changePasswordFinal')) {
            errors.error = true;
            errors.messages.push("A username is required");
            setMsgGood(false);
        }

        // Check first name
        if (firstName === '' && props.type === 'signUp') {
            errors.error = true;
            errors.messages.push("A first name is required");
            setMsgGood(false);
        }
        // Check last name
        if (lastName === '' && props.type === 'signUp') {
            errors.error = true;
            errors.messages.push("A last name is required");
            setMsgGood(false);
        }
        // Check contact
        if (contact === 0 && props.type === 'signUp') {
            errors.error = true;
            errors.messages.push("A contact number is required");
            setMsgGood(false);
        }

        if ((email === '') && props.type != 'login' && props.type != 'changePasswordChange') {
            errors.error = true;
            errors.messages.push("An email address is required");
            setMsgGood(false);
        }

        if (((password === '' && checkPassword === '') || (password === '' || checkPassword === '') || (password !== checkPassword)) && props.type !== 'login' && props.type != 'changePassword' && props.type !== 'changePasswordFinal') {
            errors.error = true;
            errors.messages.push("A password is required and must match");
            setMsgGood(false);
        }

        return errors;
    }


    // Handle submit event
    const handleSubmit = async (event) => {
        console.log(userDetails)
        event.preventDefault();
        let isValid = validateForm(props.type);

        if (isValid.error) {
            let str = '';
            for (let i = 0; i < isValid.messages.length; i++) {
                if (i === 0) {
                    str = isValid.messages[i]
                } else {
                    str = str + ', ' + isValid.messages[i];
                }
            }
            return setMessage(str);
        } else if (props.type === 'signUp') {
            setMsgGood(true);
            // Send request to the sign up and back end
            let data = {
                "username": userName,
                "firstName": firstName,
                "lastName": lastName,
                "contact": contact,
                "email": email,
                "password": password
            }
            signUp(data).then(data => {
                setResponse(data);
                if (!data.error) {
                    setUserName('');
                    setFirstName('');
                    setLastName('');
                    setContact('');
                    setEmail('');
                    setPassword('');
                    setCheckPassword('');
                    setMessage('');
                }


            }).catch((error) => {

            });
        } else if (props.type === 'login') {
            // Login and let backend deal with validation
            let data = {
                'username': userName,
                'password': password
            }
            logIn(data)
                .then(data => {
                    console.log(data)

                    setResponse(data);
                    if (!data.error) {
                        console.log('hello')
                        dispatch(login([data.token, userName, data.isAdmin, data.isSuperAdmin]))
                        console.log(data.isAdmin, data.isSuperAdmin)
                        navigate("/")
                    }
                    if (from != undefined) {
                        navigate(from)
                    }

                });
            // Add page redirect here
        } else if (props.type === 'changePassword') {
            setTempDisabled(true);
            // Type of page is change password
            // Send request
            setMsgGood(false);
            let data = {
                "username": userName,
                "email": email,
            }
            console.log(data)
            changePassword(data).then(data => {
                setResponse(data);
                setTempDisabled(false);
                console.log(data)
                if (!data.error) {
                    setChangePasswordSent(true)
                }
            })

        } else if (props.type === 'changePasswordFinal') {
            // Type of page is change password
            // Send request
            setMsgGood(false);
            let data = {
                "username": userName,
                "email": email,
                "code": resetCode
            }
            console.log(data)
            changePasswordCheck(data).then(data => {
                setResponse(data);
                console.log(data)
                if (!data.error) {
                    console.log(data.details)
                    // Save data saying that code was correct
                    dispatch(set)
                    setMessage('')
                    setUserDetails(data.details)
                }
            })
        }
        else if (props.type === 'changePasswordChange') {
            // Check if has been verified
            if (verified)
                // Type of page is change password
                // Send request
                setMsgGood(false);
            console.log(userDetails)
            let data = {
                "password": password,
                "details": userDetails
            }
            console.log(data)
            changePasswordFinal(data).then(data => {
                setResponse(data);
                console.log(data)
                if (!data.error) {
                    // Save data saying that code was correct
                    setTimeout(() => {
                        navigate('/login')
                    }, 3000);
                }
            })
        }

    }
    return (
        <div className="d-flex flex-column justify-content-center big-height">
            <div className="card text-center w-85 mx-auto">
                <div className="card-body">
                    {!changePasswordSent ? (

                        <div>
                            <div className="card-title display-4">
                                <p className="card-title-custom text-center">
                                    <span className="font-italic">
                                        {props.type === 'signUp' ? 'Sign Up' : ''}
                                        {props.type === 'login' ? 'Login' : ''}
                                        {props.type === 'changePassword' ? 'Change Your Password' : ''}
                                        {props.type === 'changePasswordFinal' ? 'Enter Your Details' : ''}
                                        {props.type === 'changePasswordChange' ? 'Enter Your new Password' : ''}
                                    </span>
                                </p>
                            </div>
                            <div className="lead">
                                {props.type === 'changePassword' ? "An email will be sent to you with a link to reset your password." :
                                    ''
                                }
                                {props.type === 'changePasswordFinal' ? "Enter the code that was sent to your email address along with your details for additional security" :
                                    ''
                                }
                                {props.type === 'login' ? "After signing up and logging in, you can add skaters to your profile in the profile tab" :
                                    ''
                                }
                            </div>
                            <hr className="hr-tertiary w-90 mx-auto" />
                            <div className="card-body">

                                <form onSubmit={handleSubmit} className="form-group row">
                                    <div className='col-5 mx-auto'>
                                        <div className={"mx-auto my-2 " + (msgGood ? 'text-success' : 'text-danger')}>
                                            {message}
                                        </div>
                                        <div className={"mx-auto my-2 " + (!response.error ? 'text-success' : 'text-danger')}>
                                            {response.message}
                                        </div>
                                    </div>

                                    <div className={"row w-75 mx-auto my-2 " + (props.type === 'changePasswordChange' ? 'd-none' : '')}>
                                        <label htmlFor="userName" className="col-md-3 ">Username:</label>
                                        <input type="text" name="userName" className="form-control col" value={userName} onChange={(e) => {
                                            setUserName(e.target.value);
                                        }} />
                                        <label className="col-md-3"></label>

                                    </div>

                                    <div className={"row w-75 mx-auto my-2 " + (props.type === ('signUp' || 'login') ? '' : 'd-none')}>
                                        <label htmlFor="contact" className="col-md-3">FirstName:</label>
                                        <input type="text" name="firstName" className="form-control col" value={firstName} onChange={(e) => { setFirstName(e.target.value) }} />
                                        <label className="col-md-3"></label>

                                    </div>
                                    <div className={"row w-75 mx-auto my-2 " + (props.type === ('signUp' || 'login') ? '' : 'd-none')}>
                                        <label htmlFor="contact" className="col-md-3">LastName:</label>
                                        <input type="text" name="lastName" className="form-control col" value={lastName} onChange={(e) => { setLastName(e.target.value) }} />
                                        <label className="col-md-3"></label>

                                    </div>
                                    <div className={"row w-75 mx-auto my-2 " + (props.type === ('signUp' || 'login') ? '' : 'd-none')}>
                                        <label htmlFor="contact" className="col-md-3">Contact Number:</label>
                                        <input type="number" name="contact" className="form-control col" value={contact} onChange={(e) => { setContact(e.target.value) }} />
                                        <label className="col-md-3"></label>

                                    </div>

                                    <div className={"row w-75 mx-auto my-2 " + (props.type !== 'login' ? '' : 'd-none') + (props.type === 'changePasswordChange' ? 'd-none' : '')}>
                                        <label htmlFor="email" className="col-md-3">Email Address:</label>
                                        <input type="email" name="email" className="form-control col" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                                        <label className="col-md-3"></label>
                                    </div>

                                    <div className={"row w-75 mx-auto my-2 " + (props.type !== 'changePassword' ? '' : 'd-none') + (props.type !== 'changePasswordFinal' ? '' : 'd-none')}>
                                        <label htmlFor="password" className={"col-md-3 "} > Password:</label>
                                        <input type="password" name="password" className={"form-control col " + ((password.length > 0 && password.length < 8) ? 'border-danger' : '')} value={password} onChange={(e) => {
                                            setPassword(e.target.value);
                                        }} />
                                        <label className="col-md-3"></label>
                                        <label htmlFor="password" className={'text-danger  ' + ((password.length > 0 && password.length < 8) ? 'd-block' : 'd-none')} >Password needs to be at least 8 characters.</label>

                                    </div>
                                    <div className={"row w-75 mx-auto my-2 " + (props.type !== 'changePassword' ? '' : 'd-none') + (props.type !== 'login' ? '' : 'd-none') + (props.type !== 'changePasswordFinal' ? '' : 'd-none')}>
                                        <label htmlFor="checkPassword" className="col-md-3">Check Password:</label>
                                        <input type="password" name="checkPassword" value={checkPassword} className={"form-control col " + ((checkPassword !== password && password.length >= 8) ? 'border-danger' : '')} onChange={(e) => { setCheckPassword(e.target.value) }} />
                                        <label className="col-md-3"></label>
                                        <label htmlFor="password" className={'text-danger  ' + ((checkPassword !== password && password.length >= 8) ? 'd-block' : 'd-none')} >Passwords need to match</label>

                                    </div>
                                    <div className={"row w-75 mx-auto my-2 " + (props.type === 'changePasswordFinal' ? '' : 'd-none')}>
                                        <label htmlFor="resetCode" className="col-md-3">Password Reset Code:</label>
                                        <input type="number" name="resetCode" className="form-control col" value={resetCode} onChange={(e) => { setResetCode(e.target.value) }} />
                                        <label className="col-md-3"></label>
                                    </div>
                                    <div className="row w-75 mx-auto my-2">
                                        <button className="btn custom-btn w-50 mx-auto" disabled={tempDisabled} type="submit">Submit</button>
                                    </div>
                                    {
                                        props.type === 'login' ?

                                            <Link to="/changePassword" className='text-decoration-none' >
                                                <u className="text-main text-decoration-none w-100 m-0  hover-secondary">Forgot Your Password?</u>
                                            </Link>
                                            : ''}
                                </form>
                            </div>
                        </div>
                    ) : <h5 className='card-title-custom '>An email to reset your password has been sent! <br /> Click the link and follow the instructions</h5>}

                </div>


            </div >

        </div >
    )
}
export default LoginSignUp