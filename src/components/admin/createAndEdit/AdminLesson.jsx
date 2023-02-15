import { useState } from "react"
import { useEffect } from "react"


import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { Formik, Form, useFormik } from "formik"

import * as yup from 'yup';

import { useSelector } from "react-redux";

import { Button, MenuItem, TextField, InputAdornment, IconButton, Typography } from "@mui/material"
import { PhotoCamera } from "@mui/icons-material";
import { useGetLessons } from "../../../assets/dataFunctions/useGetLessons"
import { useGetCoaches } from "../../../assets/dataFunctions/useGetCoaches"

import "./createAndEdit.css"

const imageMimeType = /image\/(png|jpg|jpeg)/i;

const AdminLesson = () => {

    // Form type
    const [type, setType] = useState('')
    // Update ID
    const [update, setUpdate] = useState('');
    const [objDelete, setObjDelete] = useState('');
    const [err, setErr] = useState('');


    // Get token
    const token = useSelector((state) => state.loggedIn.token);


    let headers = new Headers();
    // headers.append("Content-Type", "multipart/form-data")
    headers.append('Authorization', token)

    const [lessons, setLessons] = useState([]);
    const [coaches, setCoaches] = useState([]);
    const [error, setError] = useState('')

    let coachURL = "http://112.213.35.198:3001/coaches";

    let lessonURL = "http://112.213.35.198:3001/lessons";


    const [msg, setMsg] = useState('')
    const [file, setFile] = useState(null);
    const [fileDataURL, setFileDataURL] = useState(null);


    const dayjs = require('dayjs')

    useEffect(() => {
        fetch(coachURL)
            .then((res) => res.json())
            .then((data) => {
                setCoaches(data);
            }).catch((error) => {
                setError(error);
            }).catch((err) => {
                setErr("Something went wrong, there could be an issue with the server.")
            })
        fetch(lessonURL)
            .then((res) => res.json())
            .then((data) => {
                setLessons(data);
            }).catch((error) => {
                setError(error);
            }).catch((err) => {
                setErr("Something went wrong, there could be an issue with the server.")
            })
        let fileReader, isCancel = false;
        if (file) {
            fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e.target;
                if (result && !isCancel) {
                    setFileDataURL(result)
                }
            }
            fileReader.readAsDataURL(file);
        }
        return () => {
            isCancel = true;
            if (fileReader && fileReader.readyState === 1) {
                fileReader.abort();
            }
        }

    }, [file, msg])

    const changeHandler = (e) => {
        const file = e.target.files[0];

        if (!file.type.match(imageMimeType)) {
            alert("Image mime type is not valid");
            return;
        }
        setFile(file);
        formik.setFieldValue('lessonPicture', file)
        formik.setFieldValue('lessonPictureName', file.name)
    }

    let days = ["Negotiable", 'Sunday', "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]



    const validationSchema =
        yup.object().shape({
            lessonName: yup.string().required("Lesson name is required"),
            lessonPrice: yup.number().required("Price is required"),
            lessonDescription: yup.string().required("Lesson description is required"),
            lessonDay: yup.string().required("Lesson day is required"),
            lessonTime: yup.string().required("Lesson time is required"),
            lessonCapacity: yup.string().required("Lesson capacity is required"),
            lessonCoachA: yup.string().required("Coach A is required"),
            lessonCoachB: yup.string(),
            lessonLocationA: yup.string().required("Lesson location is required"),
            lessonLocationB: yup.string(),
            lessonPicture: yup
                .mixed()
                .required("A file is required")
                .test(
                    "fileSize",
                    "File too large",
                    value => value
                )
                .test(
                    "fileFormat",
                    "Unsupported Format",
                    value => value
                )
        }
        );

    const initialValues = {
        lessonId: '',
        lessonName: '',
        lessonPrice: '',
        lessonDescription: '',
        lessonDay: "",
        lessonTime: '',
        lessonCapacity: '',
        lessonCoachA: '',
        lessonCoachB: '',
        lessonLocationA: '',
        lessonLocationB: '',
        lessonPicture: '',
        lessonPictureName: ''
    }
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema,
        onSubmit: values => {
            const formData = new FormData()
            for (let key in formik.values) {
                formData.append(key, formik.values[key]);
            }
            fetch('http://112.213.35.198:3001/lessons/save', {
                method: 'POST',
                headers: headers,
                body: formData
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.error) {
                        setMsg(data.message);
                    } else {
                        // Submit and set msg
                        handleClear('Lesson saved!');
                    }

                }).catch((err) => {
                    setErr("Something went wrong, there could be an issue with the server.")
                })
        },
    });

    function handleSelectUpdate(val, formikProps) {
        setUpdate(val);
        // get lesson data from lessons
        lessons.forEach((lesson) => {
            if (lesson.lessonId == val) {
                console.log(lesson)
                // assign vals to formik
                formik.setFieldValue('lessonId', val);
                formik.setFieldValue('lessonName', lesson.lessonName);
                formik.setFieldValue('lessonPrice', lesson.lessonPrice);
                formik.setFieldValue('lessonDescription', lesson.lessonDescription);
                formik.setFieldValue('lessonDay', days.indexOf(lesson.lessonDay));
                formik.setFieldValue('lessonTime', lesson.lessonTime);
                formik.setFieldValue('lessonCapacity', lesson.lessonCapacity);
                formik.setFieldValue('lessonCoachA', lesson.lessonCoachA);
                formik.setFieldValue('lessonCoachB', lesson.lessonCoachB ? lesson.lessonCoachB : '');
                formik.setFieldValue('lessonLocationA', lesson.lessonLocationA);
                formik.setFieldValue('lessonLocationB', lesson.lessonLocationB ? lesson.lessonLocationB : '');
                formik.setFieldValue('lessonPicture', lesson.lessonPicture);
                formik.setFieldValue('lessonPictureName', lesson.lessonPictureName);
                console.log(lesson.lessonPicture)
            }
        })
        formik.setFieldValue('lessonId', val)


    }

    function handleClear(msg) {
        formik.resetForm()
        setFile(null)
        setFileDataURL(null)
        setUpdate('')
        setType('')
        setMsg(msg);
        setTimeout(() => {
            setMsg('')
        }, 3000);

    }

    function handleDelete() {

        let delBody = {
            "lessonId": objDelete
        }
        console.log(delBody)
        fetch('http://112.213.35.198:3001/lessons/delete', {
            method: 'POST',
            headers: {
                "Authorization": token,
                "Content-type": "application/json"
            },
            body: JSON.stringify(delBody)
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    setMsg(data.message)
                } else {
                    handleClear('Lesson deleted!');

                }
            }).catch((err) => {
                setErr("Something went wrong, there could be an issue with the server.")
            })

    }

    function reset() {
        setType('')
    }
    return (
        <div className="bg-light w-100 rounded-bottom mx-auto shadow justify-content-around py-5">
            {
                type === '' ?
                    <div className="row w-60 mx-auto justify-content-around py-5">
                        <div className="w-100 text-center">
                            {msg != '' ?
                                <Typography
                                    sx={{
                                        fontSize: 25,
                                        color: 'green'
                                    }}>
                                    {msg}
                                </Typography>
                                :
                                <></>
                            }
                        </div>
                        <div className="my-2 w-100">
                            <Button className="col-xl-4 my-2 w-100" color="success" variant="contained" onClick={() => setType('create')}>
                                <p className="lead py-2 my-0">Create new lesson</p>
                            </Button>
                        </div>
                        <div className="my-2 w-100">
                            <Button className="col-xl-4 my-2 w-100" color="warning" variant="contained" onClick={() => setType('update')}>
                                <p className="lead py-2 my-0">Update a lesson</p>
                            </Button>
                        </div>
                        <div className="my-2 w-100">
                            <Button className="col-xl-4 my-2 w-100 bg-danger" variant="contained" onClick={() => setType('delete')}>
                                <p className="lead py-2 my-0">Delete a lesson</p>
                            </Button>
                        </div>

                    </div>
                    :
                    <form onSubmit={formik.handleSubmit}>
                        {
                            update === '' && type === 'update' ?
                                <>
                                    <div className="row justify-content-center">
                                        <TextField
                                            select
                                            sx={{
                                                width: "40%",
                                                mx: 'auto',
                                                textAlign: 'center'
                                            }}
                                            label="Select lesson"
                                            value={update}
                                            onChange={(e) => handleSelectUpdate(e.target.value, formik)}
                                        >
                                            {lessons.map((lesson) => {
                                                return (
                                                    <MenuItem value={lesson.lessonId} key={lesson.lessonId}>
                                                        {lesson.lessonName} - <span className="text-decoration-underline">{lesson.lessonDay != null ? lesson.lessonDay : "No specific day"}</span>
                                                    </MenuItem>
                                                )
                                            })}

                                        </TextField>


                                    </div>
                                    <div className="my-2 w-40 mx-auto">
                                        <Button className="col-xl-4 my-2 w-100 bg-secondary" variant="contained" onClick={() => reset()}>
                                            <p className="lead py-1 my-0">Back</p>
                                        </Button>
                                    </div>
                                </>
                                :
                                <>
                                    {
                                        type === 'delete' ?
                                            <div className="w-100 justify-content-center">
                                                <div className="row mx-auto my-2 w-40">
                                                    <Typography
                                                        sx={{
                                                            textAlign: 'center',
                                                            mb: 3,
                                                            fontSize: 20
                                                        }}>
                                                        Associated bookings will also be deleted
                                                    </Typography>
                                                    <TextField
                                                        select
                                                        sx={{
                                                            width: "100%"
                                                        }}
                                                        label="Select lesson"
                                                        value={objDelete}
                                                        onChange={(e) => { setObjDelete(e.target.value) }}
                                                    >
                                                        {lessons.map((lesson) => {
                                                            return (
                                                                <MenuItem value={lesson.lessonId} key={lesson.lessonId}>
                                                                    {lesson.lessonName} - <span className="text-decoration-underline">{lesson.lessonDay != null ? lesson.lessonDay : "No specific day"}</span>
                                                                </MenuItem>
                                                            )
                                                        })}

                                                    </TextField>
                                                </div>
                                                <div className="row justify-content-center w-50 mx-auto p-0">
                                                    <div className="mx-auto my-2 col-lg-6">
                                                        <Button className="col-xl-4 my-2 w-100 bg-danger" variant="contained" onClick={handleDelete} disabled={!objDelete}>
                                                            <p className="lead py-1 my-0">Delete lesson</p>
                                                        </Button>
                                                    </div>
                                                    <div className="my-2 col-lg-6 mx-auto">
                                                        <Button className="col-xl-4 my-2 w-100 bg-secondary" variant="contained" onClick={() => reset()}>
                                                            <p className="lead py-1 my-0">Back</p>
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                            :
                                            <div className="row w-80 mx-auto justify-content-around">
                                                <div className="text-center mb-3">
                                                    <h3 className="display-5">{formik.values.lessonName == "" ? type === 'update' ? "Updating Lesson" : "Create Lesson" : formik.values.lessonName}</h3>
                                                </div>
                                                <div className="row justify-content-around">
                                                    <div className="col-md-8 my-3">
                                                        <Typography
                                                            sx={{
                                                                color: 'red',
                                                                textAlign: 'center'
                                                            }}
                                                        >
                                                            {err}
                                                        </Typography>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <TextField
                                                            sx={{
                                                                my: 1,
                                                                width: 1
                                                            }}
                                                            label={"Lesson Name"}
                                                            name="lessonName"
                                                            value={formik.values.lessonName}
                                                            onBlur={formik.handleBlur}
                                                            onChange={formik.handleChange}
                                                            error={formik.errors.lessonName && formik.touched.lessonName} />
                                                        {
                                                            formik.errors.lessonName && formik.touched.lessonName ?
                                                                <Typography
                                                                    sx={{
                                                                        color: 'red',
                                                                        textAlign: 'center'
                                                                    }}
                                                                >

                                                                    This is a required field
                                                                </Typography>
                                                                :
                                                                <></>
                                                        }
                                                    </div>
                                                    <div className="col-md-6">
                                                        <TextField
                                                            sx={{
                                                                my: 1,
                                                                width: 1
                                                            }}
                                                            label={"Lesson Price"}
                                                            name="lessonPrice"
                                                            value={formik.values.lessonPrice}
                                                            onBlur={formik.handleBlur}
                                                            onChange={formik.handleChange}
                                                            InputProps={{
                                                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                                            }}
                                                            error={formik.errors.lessonPrice && formik.touched.lessonPrice}
                                                        />
                                                        {
                                                            formik.errors.lessonPrice && formik.touched.lessonPrice ?
                                                                <Typography
                                                                    sx={{
                                                                        color: 'red',
                                                                        textAlign: 'center'
                                                                    }}
                                                                >

                                                                    This is a required field
                                                                </Typography>
                                                                :
                                                                <></>
                                                        }
                                                    </div>
                                                    <div className="col-md-12">
                                                        <TextField
                                                            sx={{
                                                                my: 1,
                                                                width: 1
                                                            }}
                                                            label={"Lesson Description"}
                                                            name="lessonDescription"
                                                            multiline
                                                            value={formik.values.lessonDescription}
                                                            onBlur={formik.handleBlur}
                                                            onChange={formik.handleChange}
                                                            error={formik.errors.lessonDescription && formik.touched.lessonDescription}
                                                        />
                                                        {
                                                            formik.errors.lessonDescription && formik.touched.lessonDescription ?
                                                                <Typography
                                                                    sx={{
                                                                        color: 'red',
                                                                        textAlign: 'center'
                                                                    }}
                                                                >

                                                                    This is a required field
                                                                </Typography>
                                                                :
                                                                <></>
                                                        }
                                                    </div>
                                                    <div className="col-md-6">
                                                        <TextField
                                                            sx={{
                                                                my: 1,
                                                                width: 1
                                                            }}
                                                            label={"Lesson Day"}
                                                            select
                                                            name="lessonDay"
                                                            value={formik.values.lessonDay}
                                                            onBlur={formik.handleBlur}
                                                            onChange={formik.handleChange}
                                                            error={formik.errors.lessonDay && formik.touched.lessonDay}
                                                        >
                                                            {
                                                                days.map((day, index) => {
                                                                    return (
                                                                        <MenuItem value={index}>
                                                                            {day}
                                                                        </MenuItem>
                                                                    )
                                                                })
                                                            }

                                                        </TextField>
                                                        {
                                                            formik.errors.lessonDay && formik.touched.lessonDay ?
                                                                <Typography
                                                                    sx={{
                                                                        color: 'red',
                                                                        textAlign: 'center'
                                                                    }}
                                                                >

                                                                    This is a required field
                                                                </Typography>
                                                                :
                                                                <></>
                                                        }
                                                    </div>
                                                    <div className="col-md-6">
                                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                            <TextField
                                                                sx={{
                                                                    my: 1,
                                                                    width: 1
                                                                }}
                                                                type="time"
                                                                label={"Lesson Time"}
                                                                name="lessonTime"
                                                                InputLabelProps={{
                                                                    shrink: true,
                                                                }}
                                                                value={formik.values.lessonTime}
                                                                onBlur={formik.handleBlur}
                                                                onChange={formik.handleChange}
                                                                error={formik.errors.lessonTime && formik.touched.lessonTime}
                                                            />
                                                            {
                                                                formik.errors.lessonTime && formik.touched.lessonTime ?
                                                                    <Typography
                                                                        sx={{
                                                                            color: 'red',
                                                                            textAlign: 'center'
                                                                        }}
                                                                    >

                                                                        This is a required field
                                                                    </Typography>
                                                                    :
                                                                    <></>
                                                            }
                                                        </LocalizationProvider>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <TextField
                                                            sx={{
                                                                my: 1,
                                                                width: 1
                                                            }}
                                                            label={"Capacity"}
                                                            name="lessonCapacity"
                                                            type={"number"}
                                                            value={formik.values.lessonCapacity}
                                                            onBlur={formik.handleBlur}
                                                            onChange={formik.handleChange}
                                                            error={formik.errors.lessonCapacity && formik.touched.lessonCapacity}
                                                        />
                                                        {
                                                            formik.errors.lessonCapacity && formik.touched.lessonCapacity ?
                                                                <Typography
                                                                    sx={{
                                                                        color: 'red',
                                                                        textAlign: 'center'
                                                                    }}
                                                                >

                                                                    This is a required field
                                                                </Typography>
                                                                :
                                                                <></>
                                                        }
                                                    </div>
                                                    <div className="col-md-9">
                                                        <TextField
                                                            sx={{
                                                                my: 1,
                                                                width: 1
                                                            }}
                                                            label={"Lesson Location"}
                                                            name="lessonLocationA"
                                                            value={formik.values.lessonLocationA}
                                                            onBlur={formik.handleBlur}
                                                            onChange={formik.handleChange}
                                                            error={formik.errors.lessonLocationA && formik.touched.lessonLocationA}
                                                        />
                                                        {
                                                            formik.errors.lessonLocationA && formik.touched.lessonLocationA ?
                                                                <Typography
                                                                    sx={{
                                                                        color: 'red',
                                                                        textAlign: 'center'
                                                                    }}
                                                                >

                                                                    This is a required field
                                                                </Typography>
                                                                :
                                                                <></>
                                                        }

                                                    </div>
                                                    <div className="col-md-12">
                                                        <TextField
                                                            sx={{
                                                                my: 1,
                                                                width: 1
                                                            }}
                                                            label={"Rainy Weather Location"}
                                                            name="lessonLocationB"
                                                            value={formik.values.lessonLocationB}
                                                            onBlur={formik.handleBlur}
                                                            onChange={formik.handleChange}
                                                        />

                                                    </div>
                                                    <div className="col-md-6">
                                                        <TextField
                                                            sx={{
                                                                my: 1,
                                                                width: 1
                                                            }}
                                                            label={"Coach A"}
                                                            name="lessonCoachA"
                                                            select
                                                            value={formik.values.lessonCoachA}
                                                            onBlur={formik.handleBlur}
                                                            onChange={formik.handleChange}
                                                            error={formik.errors.lessonCoachA && formik.touched.lessonCoachA}
                                                        >
                                                            {
                                                                coaches.map((coach) => {
                                                                    if (coach.coachId != formik.values.lessonCoachB) {
                                                                        return (
                                                                            <MenuItem value={coach.coachId} key={coach.coachId}>
                                                                                {coach.coachName}
                                                                            </MenuItem>
                                                                        )
                                                                    }
                                                                })
                                                            }

                                                        </TextField>
                                                        {
                                                            formik.errors.lessonCoachA && formik.touched.lessonCoachA ?
                                                                <Typography
                                                                    sx={{
                                                                        color: 'red',
                                                                        textAlign: 'center'
                                                                    }}
                                                                >

                                                                    This is a required field
                                                                </Typography>
                                                                :
                                                                <></>
                                                        }
                                                    </div>
                                                    <div className="col-md-6">

                                                        <TextField
                                                            sx={{
                                                                my: 1,
                                                                width: 1
                                                            }}
                                                            label={"Coach B"}
                                                            name="lessonCoachB"
                                                            select
                                                            value={formik.values.lessonCoachB ? formik.values.lessonCoachB : ''}
                                                            onBlur={formik.handleBlur}
                                                            onChange={formik.handleChange}
                                                        >
                                                            {
                                                                coaches.map((coach) => {
                                                                    if (coach.coachId != formik.values.lessonCoachA) {
                                                                        return (
                                                                            <MenuItem value={coach.coachId} key={coach.coachId}>
                                                                                {coach.coachName}
                                                                            </MenuItem>
                                                                        )
                                                                    }
                                                                })
                                                            }

                                                        </TextField>


                                                    </div>
                                                    <div className="col-md-10 mx-auto shadow mt-5 text-center">
                                                        <input
                                                            type="file"
                                                            hidden
                                                            id='lessonPicture'
                                                            name="lessonPicture"
                                                            value={formik.values.lessonPicture}
                                                            accept='image/*'
                                                            class="custom-file-upload"
                                                            onChange={(e) => { changeHandler(e); }}
                                                        />
                                                        <div className="row">
                                                            <div className="col-md-5 p-2 m-0 mx-auto">
                                                                <label htmlFor="lessonPicture" class="w-100 custom-file-upload mt-3 p-2 btn btn-primary border-0 shadow">
                                                                    Upload new image
                                                                </label>
                                                            </div>
                                                            <div className="col-md-8 mx-auto my-2 p-2">
                                                                <Typography>
                                                                    White space in the border is an accurate representation of how the image will look.
                                                                </Typography>
                                                                {msg ?
                                                                    <Typography sx={{
                                                                        color: 'red',
                                                                        fontSize: 23
                                                                    }}>
                                                                        Image name already exists
                                                                    </Typography> :
                                                                    <></>}
                                                            </div>
                                                        </div>

                                                        {
                                                            fileDataURL || formik.values.lessonPicture != '' ?
                                                                <p className="img-preview-wrapper">
                                                                    {
                                                                        <img className="border img-fluid" src={fileDataURL ? fileDataURL : "http://112.213.35.198:3001/images/uploads/lessons/" + formik.values.lessonPictureName} width="400" height="600" alt="preview" />
                                                                    }
                                                                </p>
                                                                :
                                                                null
                                                        }
                                                        {
                                                            formik.errors.lessonPicture && formik.touched.lessonPicture ?
                                                                <Typography
                                                                    sx={{
                                                                        color: 'red',
                                                                        textAlign: 'center'
                                                                    }}
                                                                >

                                                                    This is a required field
                                                                </Typography>
                                                                :
                                                                <Typography
                                                                    sx={{ mb: 2 }}>
                                                                    {formik.values.lessonPictureName != '' ? "FileName: " + formik.values.lessonPictureName : ""}
                                                                    {/* {formik.values.lessonPicture != '' ? "FileName: " + formik.values.lessonPictureName : ""} */}
                                                                </Typography>
                                                        }
                                                    </div>

                                                </div>
                                                <div className="col-md-10 mx-auto mt-5 text-center">
                                                    <div className="container text-center">
                                                        <button type="submit" className="btn custom-btn w-40 mx-3" onClick={console.log(formik.values)}>
                                                            Submit
                                                        </button>


                                                        {
                                                            Object.keys(formik.touched).length != 0 ?
                                                                <button type="button" className="btn btn-danger w-40 mx-3" onClick={() => handleClear("")}>
                                                                    Reset Form
                                                                </button>
                                                                :
                                                                <></>

                                                        }

                                                    </div>
                                                    <div className="container text-center my-2 mx-auto">
                                                        <button type="button" style={{ minWidth: 10 + "rem" }} className="btn btn-secondary w-40 mx-3" onClick={() => handleClear("")}>
                                                            Back
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                    }
                                </>
                        }
                    </form>
            }
        </div >
    )

}

export default AdminLesson