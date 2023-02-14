// React components
import { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { unset } from '../../../redux/reducers/editSkater'



async function createUpdateSkater(data, token, isEdit) {

    // Make body of request


    if (isEdit) {
        console.log(data)
        let body = {
            'id': data.id,
            'associatedUserId': data.associatedUserId,
            "firstName": data.firstName,
            "contact": data.contact,
            "lastName": data.lastName,
            "dob": data.dob
        }

        console.log(body)
        return fetch("http://127.0.0.1:3001/users/profile/updateSkater", {
            method: "POST",
            headers: {
                'Authorization': token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)

        }).then(res => res.json())
    } else {

        let body = {
            "firstName": data.firstName,
            "contact": data.contact,
            "lastName": data.lastName,
            "dob": data.dob
        }

        return fetch("http://127.0.0.1:3001/users/profile/addSkater", {
            method: "POST",
            headers: {
                'Authorization': token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)

        }).then(res => res.json())
    }

}


const AddSkater = props => {

    // Type of page, add or edit
    const { state } = useLocation();
    const { add, edit } = state;

    console.log(add, edit)
    // Set input states
    const [firstName, setFirstName] = useState('');
    const [id, setId] = useState(0);
    const [associatedUserId, setAssociatedUserId] = useState(0);
    const [lastName, setLastName] = useState('');
    const [dob, setDob] = useState();
    const [contact, setContact] = useState(0);
    const [msgGood, setMsgGood] = useState(true);
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState({});

    // Check if it is an edit
    const [isEdit, setIsEdit] = useState(false)

    const firstNameInput = useRef('');
    const lastNameInput = useRef('');
    const DOBInput = useRef();
    const emergencyInput = useRef('');

    const nav = useNavigate();
    const dispatch = useDispatch()

    // Get token
    const token = useSelector((state) => state.loggedIn);
    console.log(token.value)


    // Check if user is logged in, otherwise reroute to login
    const loggedIn = useSelector((state) => state.loggedIn.value);


    function checkLogin() {
        if (!loggedIn) {
            nav('/login');
        }
    }

    // Get edit skater if there is one
    let editSkater = useSelector((state) => state.editSkater);


    useEffect(() => {
        checkLogin();

        console.log(editSkater)
        // Check if is an update
        if (!editSkater.value) {
            console.log('this is a testing thing')
        } else {
            setIsEdit(true)
            firstNameInput.current.value = editSkater.firstName
            setFirstName(editSkater.firstName)
            lastNameInput.current.value = editSkater.lastName
            setLastName(editSkater.lastName)
            DOBInput.current.value = editSkater.DOB
            setDob(editSkater.DOB)
            emergencyInput.current.value = editSkater.emergencyContact
            setContact(editSkater.emergencyContact)
            setId(editSkater.id)
            setAssociatedUserId(editSkater.associatedUserId)
        }
    }, [])


    function validateForm() {

        // init error JSON
        let errors = {
            error: false,
            messages: []
        }

        // Check username
        if (firstName === '') {
            errors.error = true;
            errors.messages.push("A username is required");
            setMsgGood(false);

        }

        // Check contact
        if (contact === 0) {
            errors.error = true;
            errors.messages.push("A contact number is required");
            setMsgGood(false);

        }

        if (lastName === '') {
            errors.error = true;
            errors.messages.push("A last name is required");
            setMsgGood(false);

        }

        if (dob === undefined) {
            errors.error = true;
            errors.messages.push("A date of birth is required");
            setMsgGood(false);

        }

        return errors;
    }
    function handleSubmit(event) {
        event.preventDefault();

        console.log(token.value)
        if (token.value) {
            // Validate the form
            const isValid = validateForm();

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
            } else {
                // No errors, proceed
                let data = {
                    'id': id,
                    "associatedUserId": associatedUserId,
                    'firstName': firstName,
                    'lastName': lastName,
                    'contact': contact,
                    'dob': dob
                }


                createUpdateSkater(data, token.token, isEdit).then(data => {
                    setResponse(data);
                    console.log(data);
                    document.getElementById('mainForm').reset();
                    nav('/profile')
                });

            }

        } else {
            // Navigate to login page if somehow manage to submit and unauthorized
            nav("/login")
        }
    }

    return (
        <div className="d-flex flex-column justify-content-center big-height">
            <div className="card text-center w-85 mx-auto">
                <div className="card-body">
                    <p className="card-title-custom text-center">
                        <span className="font-italic">
                            {add ? 'Add a new skater' : 'Edit a skater'}
                        </span>
                    </p>
                    <hr className="hr-tertiary w-80 mx-auto" />
                    <div>{token === '' ? 'You need to login to view this page'
                        :
                        <div className="w-80 mx-auto">
                            <div className="row">
                                <form onSubmit={handleSubmit} className="col-6 mx-auto" id={'mainForm'}>
                                    <div className='col-12 text-center mx-auto'>
                                        <div className={"mx-auto my-2 " + (msgGood ? 'text-success' : 'text-danger')}>
                                            {message}
                                        </div>
                                        {/* <div className={"mx-auto my-2 " + (!response.error == {} ? 'text-success' : 'text-danger')}>
                                            {response.message}
                                        </div> */}
                                    </div>
                                    <div className='col-md-12 my-4 row'>
                                        <label htmlFor="firstName" className=''>
                                            First Name:
                                        </label>
                                        <input type="text" name="firstName" className='form-control col-md-4' onChange={event => setFirstName(event.target.value)} ref={firstNameInput} />
                                    </div>
                                    <div className='col-md-12 my-4 row'>
                                        <label htmlFor="firstName" className=''>
                                            Last Name:
                                        </label>
                                        <input type="text" name="lastName" className='form-control col-md-4' onChange={event => setLastName(event.target.value)} ref={lastNameInput} />
                                    </div>
                                    <div className='col-md-12 my-4 row'>
                                        <label htmlFor="firstName" className=''>
                                            Date of Birth:
                                        </label>
                                        <input type="date" name="DOB" className='form-control col-md-4' onChange={event => setDob(event.target.value)} ref={DOBInput} />
                                    </div>
                                    <div className='col-md-12 my-4 row'>
                                        <label htmlFor="firstName" className=''>
                                            Emergency Contact Number:
                                        </label>
                                        <input type="number" name="contact" className='form-control col-md-4' onChange={event => setContact(event.target.value)} ref={emergencyInput} />
                                    </div>
                                    <div className='col-md-12 my-4 row justify-content-center'>
                                        <button className='custom-btn-any-width btn col-lg-3 my-2 mx-2'>Submit</button>
                                        <Link to="/profile" className='btn btn-secondary col-lg-3 my-2 mx-2' onClick={(e) => {
                                            dispatch(unset())
                                        }}>
                                            <u className="text-decoration-none">Back</u>
                                        </Link>
                                    </div>
                                    <div className='col-md-5 my-4'>
                                    </div>

                                </form>
                            </div>
                        </div>
                    }</div>

                    <hr className="hr-tertiary w-80 mx-auto" />
                </div>
            </div>
        </div >
    )
}
export default AddSkater