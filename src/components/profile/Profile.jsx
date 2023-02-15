// React components
import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Modal from 'react-modal';
import { faColumns } from '@fortawesome/free-solid-svg-icons';
import { set, unset } from '../../redux/reducers/editSkater'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import "./profile.css"

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, 0)',
        borderRadius: '1em',
        border: 'none',
        background: "#efefef",
        color: '#333',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',



    },
    overlay: {

        background: 'rgba(108, 108, 108, 0.92)'
    }
};

const Profile = props => {

    // Modal for deleting skater
    const [modalIsOpen, setIsOpen] = useState(false);

    // State for modal type
    const [modalType, setModalType] = useState('')

    const [modalError, setModalError] = useState([false, ''])

    // State for if editing profile
    const [editingProfile, setEditingProfile] = useState(false)

    // Skater data for modal
    const [deleteSkaterInfo, setDeleteSkaterInfo] = useState()

    // Get user data
    const [userData, setUserData] = useState();

    // References
    const username = useRef();
    const email = useRef()
    const contact = useRef();

    // Get token
    const token = useSelector((state) => state.loggedIn.token);

    // Check if user is logged in, otherwise reroute to login
    const loggedIn = useSelector((state) => state.loggedIn.value);

    // Set message array [0] for error staus [1] for the message
    const [message, setMessage] = useState([false, ''])

    const navigate = useNavigate();
    const dispatch = useDispatch()

    let headers = new Headers();
    headers.append('Accept', 'application/json')
    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', token)

    // Check if logged in then reroute
    function checkLogin() {
        if (!loggedIn) {
            navigate('/login');
        }
    }

    // Delete skater function
    function deleteSkater(skater) {
        console.log(skater)
        console.log(headers.keys)

        // Send data to server
        fetch(("http://localhost:3001/users/profile/deleteSkater"), {
            method: "POST",
            headers: headers,
            body: JSON.stringify(skater)
        }).then(res => res.json()
            .then((data) => {
                console.log(data)
                setMessage([data.error, data.message])
                fetchUserData();
            }))

        // Only do this after response from back end
        setIsOpen(false);
    }

    function fetchUserData() {
        // Fetch data
        fetch(("http://localhost:3001/users/profile"), {
            method: 'GET',
            headers: headers
        })
            .then((res) => {
                res.json().then((data) => {
                    if (!data.error) {
                        setUserData(data)
                    }
                    console.log(data)
                    // Split skaters into array
                })
            })
    }


    function openEditInformation(types) {
        setModalType(types)
        setIsOpen(true)
    }

    function editInformation(type, data) {
        console.log(type, data)

        // Create body of fetch request
        let body = {
            type: type,
            data: data
        }

        fetch('http://localhost:3001/users/profile/update', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
        }).then((res) => res.json().then((data) => {
            setMessage([data.error, data.message])
            fetchUserData();
        }))
        setIsOpen(false)
        setModalError([false, ''])
    }

    useEffect(() => {

        // Check login
        checkLogin();

        // Fetch User data
        fetchUserData();


    }, [])

    Modal.setAppElement('body');



    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);

    }


    return (
        <div className="d-flex flex-column justify-content-center big-height my-3 mx-auto w-50">
            <div className="card text-center w-100 mx-auto">
                <div className="card-body">
                    <p className="card-title-custom text-center">
                        <span className="font-italic">
                            Profile
                        </span>
                    </p>
                    <hr className="hr-tertiary w-80 mx-auto" />
                    <div className='my-2'>
                        {message === '' ? '' : <p className={'lead' + (message[0] ? ' text-danger' : ' text-success')}>{message}</p>}
                    </div>
                    {userData == null ?
                        <div>{token === '' ? 'You need to login to view this page' : 'Loading...'}</div>
                        :
                        <div className="w-80 mx-auto">
                            <div className="row">
                                <div className="col-12 d-flex flex-column">
                                    <div className="row justify-content-center">
                                        <p className="col text-start">Username:</p>
                                        <p className="col text-start">{userData.username}</p>
                                        {editingProfile ? <a className={'col-1 text-light'} onClick={() => {
                                            openEditInformation('username')
                                        }}><FontAwesomeIcon icon={faPenToSquare} className="hover-icon-light" /></a> : ''}
                                    </div>
                                    <div className="row justify-content-center">
                                        <p className="col text-start">Email:</p>
                                        <p className="col text-start">{userData.email}</p>
                                        {editingProfile ? <a className={'col-1 text-light'} onClick={() => {
                                            openEditInformation('email')
                                        }}><FontAwesomeIcon icon={faPenToSquare} className="hover-icon-light" /></a> : ''}
                                    </div>
                                    <div className="row justify-content-center">
                                        <p className="col text-start">Contact:</p>
                                        <p className="col text-start">{userData.contact}</p>
                                        {editingProfile ? <a className={'col-1 text-light'} onClick={() => {
                                            openEditInformation('contact')
                                        }}><FontAwesomeIcon icon={faPenToSquare} className="hover-icon-light" /></a> : ''}
                                    </div>
                                    <div className='row w-75 justify-content-center mx-auto'>
                                        {editingProfile ? ''
                                            :
                                            <button className="btn custom-btn my-2 mx-auto col-md-5" onClick={() => {
                                                setEditingProfile(true)
                                            }}>Edit Profile</button>
                                        }

                                        {/* If editting profile, show stop editing button */}
                                        {editingProfile ?
                                            <button className="btn btn-danger my-2 mx-auto col-md-5" onClick={() => {
                                                setEditingProfile(false)
                                                setMessage([false, ''])
                                            }}>Stop Editing Profile</button>
                                            :
                                            ''
                                        }
                                    </div>
                                </div>
                                <ul className="list-group col-12">
                                    <li className="list-group-item bg-main text-light">Current Skaters:</li>
                                    {userData.skaters.map((skater) => {
                                        return <li className="list-group-item text-start">
                                            <div className='row'>
                                                <p className='col-md-5'>Name:</p>
                                                <p className='col-md-5'>{skater.skaterName + " " + skater.skaterLastName}</p>

                                            </div>
                                            <div className='row'>
                                                <p className='col-md-5'>Date of birth:</p>
                                                <p className='col-md-5'>{skater.skaterDOB}</p>

                                            </div>
                                            <div className='row'>
                                                <p className='col-md-5'>Emergency contact number:</p>
                                                <p className='col-md-5'>{skater.skaterEmergencyContact}</p>

                                            </div>
                                            {editingProfile ?
                                                <div className='row justify-content-around'>
                                                    <button className='btn btn-danger col-md-5 my-2' onClick={() => {
                                                        setDeleteSkaterInfo(skater);
                                                        setModalType('deleteSkater')
                                                        setIsOpen(true);
                                                    }}>
                                                        Delete Skater
                                                    </button>
                                                    <button className='btn btn-secondary col-md-5 my-2' onClick={() => {
                                                        dispatch(set(skater))
                                                        console.log(skater)
                                                        navigate('/addSkater', { state: { add: false, edit: true } })
                                                    }}>
                                                        Edit Skater
                                                    </button>
                                                </div>
                                                :
                                                ''
                                            }

                                        </li>
                                    })}
                                    {
                                        editingProfile ?
                                            <li className="list-group-item">

                                                {/* <label htmlFor="addSkater">Add Skater:</label> */}
                                                {/* <input type="text" name="addSkater" className="form-control" /> */}
                                                <button className="btn custom-btn w-100 my-2" onClick={() => {
                                                    navigate('/addSkater', { state: { add: true, edit: false } })
                                                }}>Add new skater</button>

                                            </li>
                                            :
                                            ''
                                    }

                                </ul>

                            </div>
                        </div>
                    }
                    <hr className="hr-tertiary w-80 mx-auto" />
                </div>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Loading..."
                shouldCloseOnOverlayClick={false}
            >
                <div className='h-100 d-flex flex-colum justify-content-center align-items-center '>
                    {/* <div className='flex flex-row-reverse max-w-max'>
                        <button onClick={closeModal} className=""><FontAwesomeIcon icon={closeIcon} className="h-8 text-" /></button>
                    </div> */}


                    {modalType === 'deleteSkater' ?



                        <div className='row justify-content-around my-5'>
                            {deleteSkaterInfo === undefined ? '' : <div className='text-center my-2 lead'>Are you sure you want to delete {deleteSkaterInfo.skaterName + " " + deleteSkaterInfo.skaterLastName}</div>}
                            <button className='btn custom-btn col-5' onClick={() => {
                                deleteSkater(deleteSkaterInfo);
                            }}>Yes</button>
                            <button className='btn btn-danger col-5' onClick={() => {
                                console.log(deleteSkaterInfo)
                                setIsOpen(false)
                            }}>No</button>
                        </div>
                        :
                        ''
                    }
                    {modalType === 'username' ?
                        <div className='row justify-content-center my-3 px-1 mx-auto h-50 top-50'>
                            <div className='col-12 p-0 mb-3 row text-center'>
                                {
                                    modalError[0] === false ?
                                        <label htmlFor="username" className='mb-2'>Please enter your new username:</label>
                                        :
                                        <label htmlFor="username" className='mb-2 text-danger'>{modalError[1]}</label>
                                }

                                <input type="text" name='username' ref={username} placeholder="Username" className="form-control w-100" />
                            </div>
                            <div className="row justify-content-around">
                                <button className='btn custom-btn-any-width col-md-5 mb-2' onClick={() => {
                                    if (username.current.value != '' && username.current.value != userData.username) {
                                        editInformation('username', username.current.value);
                                        setModalError([false, "Information edited"])
                                    } else {
                                        setModalError([true, "Contact cannot be blank"]);
                                    }
                                }}>Confirm</button>
                                <button className='btn btn-danger col-md-5 mb-2  ' onClick={() => {
                                    setIsOpen(false)
                                    setModalError([false, ""])
                                }}>Cancel</button>
                            </div>
                        </div>
                        :
                        ''
                    }
                    {modalType === 'email' ?
                        <div className='row justify-content-center my-3 px-1 mx-auto h-50 top-50'>
                            <div className='col-12 p-0 mb-3 row text-center'>
                                {
                                    modalError[0] === false ?
                                        <label htmlFor="email" className='mb-2'>Please enter your new email:</label>
                                        :
                                        <label htmlFor="email" className='mb-2 text-danger'>{modalError[1]}</label>
                                }

                                <input type="email" name='email' ref={email} placeholder="Email" className="form-control w-100" />
                            </div>
                            <div className="row justify-content-around">
                                <button className='btn custom-btn-any-width col-md-5 mb-2' onClick={() => {
                                    if (email.current.value != '' && email.current.value != userData.email) {
                                        editInformation('email', email.current.value);
                                        setModalError([false, "Information edited"])
                                    } else {
                                        setModalError([true, "Email cannot be blank"]);
                                    }
                                }}>Confirm</button>
                                <button className='btn btn-danger col-md-5 mb-2  ' onClick={() => {
                                    setIsOpen(false)
                                    setModalError([false, ""])
                                }}>Cancel</button>
                            </div>
                        </div>
                        :
                        ''
                    }
                    {modalType === 'contact' ?
                        <div className='row justify-content-center my-3 px-1 mx-auto h-50 top-50'>
                            <div className='col-12 p-0 mb-3 row text-center'>
                                {
                                    modalError[0] === false ?
                                        <label htmlFor="contact" className='mb-2'>Please enter your new contact number:</label>
                                        :
                                        <label htmlFor="contact" className='mb-2 text-danger'>{modalError[1]}</label>
                                }

                                <input type="number" name='contact' ref={contact} placeholder="contact" className="form-control w-100" />
                            </div>
                            <div className="row justify-content-around">
                                <button className='btn custom-btn-any-width col-md-5 mb-2' onClick={() => {
                                    if (contact.current.value != '' && contact.current.value != userData.contact) {
                                        editInformation('contact', contact.current.value);
                                        setModalError([false, "Information edited"])
                                    } else {
                                        setModalError([true, "Contact number cannot be blank"]);
                                    }
                                }}>Confirm</button>
                                <button className='btn btn-danger col-md-5 mb-2  ' onClick={() => {
                                    setIsOpen(false)
                                    setModalError([false, ""])

                                }}>Cancel</button>
                            </div>
                        </div>
                        :
                        ''
                    }


                </div>


            </Modal>
        </div >
    )
}
export default Profile