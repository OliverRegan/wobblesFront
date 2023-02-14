// React components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as outlineStar } from '@fortawesome/free-regular-svg-icons'
import { useState, useEffect, startTransition } from 'react'
import { useSelector } from 'react-redux'
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom'

import CheckLogin from '../../assets/dataFunctions/checkVerification'

// Css
import "./reviews.css"
import { Button, Modal, Box, Typography } from '@mui/material'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: 5
};

const Reviews = props => {

    // Fetch reviews info from back end
    const [reviews, setReviews] = useState([]);
    const [review, setReview] = useState('')
    const [reviewsLoading, setReviewsLoading] = useState(true);
    let reviewText;

    const [msg, setMsg] = useState('')
    const [err, setErr] = useState()
    const [del, setDel] = useState()
    const [modal, setModal] = useState(false)


    const token = useSelector((state) => state.loggedIn.token);
    const user = useSelector((state) => state.loggedIn.user);
    const isAdmin = useSelector((state) => state.loggedIn.isAdmin);
    const isSuperAdmin = useSelector((state) => state.loggedIn.isSuperAdmin);

    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + token)
    headers.append('Content-Type', 'application/json')

    function getReviews() {
        fetch("http://localhost:3001/reviews", {
            method: 'GET',
            headers: headers
        })
            .then((res) => {
                res.json().then((data) => ({
                    data: data,
                    status: res.status
                })).then(response => {
                    setReviews((response.data))

                }).finally(() => {
                    setReviewsLoading(false)
                })
            })
    }

    useEffect(() => {

        getReviews()

    }, [msg])

    console.log(review);

    function handleClose() {
        setModal(false)
    }

    function handleDelete() {

        console.log(del)

        let body = {
            reviewId: del.reviewId,
        }

        fetch("http://localhost:3001/reviews/delete", {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
        }).then((res) => res.json()).then((data) => {
            console.log(data)
            setMsg(data.message)
            setReview("")
            setErr(data.error)
            getReviews();
        }).catch((err) => {
            // setMsg(err.message)
            console.log(err)
            setErr(true)
        })

        setModal(false)

    }


    // Stars function
    function stars(numStars) {
        let empty = 5 - numStars;
        let stars = [];
        for (let i = 0; i < 5; i++) {
            if (i < numStars) {
                stars.push(<FontAwesomeIcon icon={solidStar} />)
            } else {
                stars.push(<FontAwesomeIcon icon={outlineStar} />)
            }
        }
        return stars;
    }

    function changeReviewStars(event, index) {
        let newStars = [{ 'index': 0, 'icon': solidStar }, { 'index': 1, 'icon': solidStar }, { 'index': 2, 'icon': solidStar }, { 'index': 3, 'icon': solidStar }, { 'index': 4, 'icon': solidStar },];
        for (let i = 4; i >= index + 1; i--) {
            newStars[i].icon = outlineStar;
        }
        props.setReviewStars(newStars)

    }

    const handleSubmit = async (event) => {
        document.getElementById("reviewText").value = ""
        console.log()
        event.preventDefault()
        let count = 0;

        // Get number of start
        for (let i = 0; i < props.reviewStars.length; i++) {
            if (props.reviewStars[i].icon === solidStar) {
                count++;
            }
        }
        let body = {
            // Temp
            "user": user,
            "bodyText": review,
            "stars": count
        }

        // Send review data
        // ADD AUTHENTICATION
        fetch("http://localhost:3001/reviews", {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
        }).then((res) =>
            res.json()
        ).then((data) => {
            console.log(data)
            setMsg(data.message)
            setReview("")
            setErr(data.error)
            getReviews()
        }).catch((err) => {
            // setMsg(err.message)
            console.log(err)
            setErr(true)
        })


        console.log(count)
    }


    return (
        <div style={{ "minHeight": "65vh" }} className="my-4">
            <div className="bg-light w-65 rounded mx-auto shadow justify-content-around">
                <p className="card-title-custom text-center"><span className="font-italic"> Why our skaters love coming back <span className='text-main'><FontAwesomeIcon icon={faHeart} /></span>
                </span></p>
            </div>
            {CheckLogin() ?
                <div className="bg-light w-65 rounded mx-auto shadow justify-content-around py-2">
                    <p className="h4 text-center"><span className="font-italic"> Leave a review:
                    </span></p>
                    <hr className="hr-tertiary w-80 mx-auto" />
                    <form className='form-group w-80 mx-auto text-center'>
                        <h4 className={' '}><span className={!err ? "text-success" : "text-danger"}>{msg}</span></h4>
                        <div className='h3 text-center'>
                            {
                                props.reviewStars.map((star) => {
                                    return (
                                        <FontAwesomeIcon icon={star.icon} onClick={(event) => { changeReviewStars(event, star.index) }} className="choose-stars" key={star.index} />
                                    )
                                })
                            }
                        </div>
                        <input type="text" placeholder="Leave your review here!" className='form-control mx-auto' id="reviewText" name="reviewText" onChange={(event) => { setReview(event.target.value) }} />
                        <button className='btn custom-btn w-60 btn-dark mt-4' type="button" onClick={handleSubmit}>Submit</button>
                    </form>
                </div> :
                <div className="bg-light w-65 rounded mx-auto shadow justify-content-around py-2">
                    <p className="h4 text-center">
                        <span className="font-italic">Want to leave a review?</span>
                    </p>
                    <p className='text-center'>Login <Link to="/login" state={{ from: "/reviews" }} >Click here</Link></p>
                    <p className='text-center'>Dont have an account? Sign up and then you can! <Link to="/signUp" state={{ from: "/reviews" }}>Click here</Link></p>


                </div>}
            <div className="w-65 mx-auto row justify-content-center my-3">

                {reviewsLoading ?
                    <div className="bg-light w-65 rounded mx-auto shadow justify-content-around">
                        <p className="card-title-custom text-center"><span className="font-italic"> Loading...
                        </span></p>
                    </div>
                    :
                    reviews.map((review, index) => {
                        return (
                            <div className="review my-1 card col-lg-5 mx-1" key={review.reviewId}>

                                <div className="d-flex flex-column text-center mt-3">


                                    <div className="h4">
                                        {review.reviewUserName}
                                    </div>

                                    <div className="lead">
                                        {review.reviewDate}
                                    </div>
                                    <div className="mt-3 lead text-main">
                                        {stars(review.reviewStars)}
                                    </div>
                                </div>
                                <hr className="hr-tertiary w-80 mx-auto" />
                                <div className="m-3 mt-0 text-center">
                                    {review.reviewText}
                                </div>
                                {isSuperAdmin ? <Button
                                    sx={{
                                        textAlign: 'start',
                                        width: 1 / 6
                                    }}
                                    onClick={() => { setModal(true); setDel(review) }}
                                >
                                    <DeleteIcon sx={{
                                        color: 'red'
                                    }} />
                                </Button> : <></>}

                            </div>

                        )
                    })}
                <Modal
                    open={modal}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"

                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Are you sure you want to delete this review?
                        </Typography>
                        <div className='d-flex justify-content-around mt-3'>
                            <button onClick={() => { handleDelete() }} className={"btn btn-danger w-30"}>Delete</button>
                            <button onClick={() => { setModal(false) }} className={"btn btn-dark w-30"}>Cancel</button>
                        </div>
                    </Box>
                </Modal>
            </div>
        </div >
    )
}
export default Reviews