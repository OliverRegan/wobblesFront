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

const AdminCoach = () => {

    // Form type
    const [type, setType] = useState('')
    // Update ID
    const [update, setUpdate] = useState('');
    const [objDelete, setObjDelete] = useState('');



    // Get token
    const token = useSelector((state) => state.loggedIn.token);


    let headers = new Headers();
    // headers.append("Content-Type", "multipart/form-data")
    headers.append('Authorization', token)

    const [coaches, setCoaches] = useState([]);
    const [err, setErr] = useState('')

    let coachURL = "http://localhost:3001/coaches";

    const [msg, setMsg] = useState('')
    const [file, setFile] = useState(null);
    const [fileDataURL, setFileDataURL] = useState(null);


    const dayjs = require('dayjs')

    useEffect(() => {
        fetch(coachURL)
            .then((res) => res.json())
            .then((data) => {
                setCoaches(data);
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
        formik.setFieldValue('coachPicture', file)
        formik.setFieldValue('coachPictureName', file.name)
    }

    let days = ["Negotiable", 'Sunday', "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]



    const validationSchema =
        yup.object().shape({
            coachName: yup.string().required("Coach name is required"),
            coachBio: yup.string().required("Coach bio is required"),
            coachPosition: yup.string().required("Coach position is required"),
            coachPicture: yup
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
        coachId: '',
        coachName: '',
        coachBio: '',
        coachPosition: '',
        coachPicture: '',
        coachPictureName: '',
    }
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema,
        onSubmit: values => {
            const formData = new FormData()
            for (let key in formik.values) {
                formData.append(key, formik.values[key]);
            }
            fetch('http://localhost:3001/coaches/save', {
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
                        handleClear('Coach saved!');
                    }

                }).catch((err) => {
                    setErr("Something went wrong, there could be an issue with the server.")
                })
        },
    });

    function handleSelectUpdate(val, formikProps) {
        setUpdate(val);
        // get lesson data from lessons
        coaches.forEach((coach) => {
            if (coach.coachId == val) {
                console.log(coach)
                // assign vals to formik
                formik.setFieldValue('coachId', val);
                formik.setFieldValue('coachName', coach.coachName);
                formik.setFieldValue('coachBio', coach.coachBio);
                formik.setFieldValue('coachPosition', coach.coachPosition);
                formik.setFieldValue('coachPicture', coach.coachPicture);
                formik.setFieldValue('coachPictureName', coach.coachPictureName);
            }
        })
        formik.setFieldValue('coachId', val)
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
            "coachId": objDelete
        }
        fetch('http://localhost:3001/coaches/delete', {
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
                    handleClear('Coach deleted!');

                }
            }).catch((err) => {
                setErr("Something went wrong, there could be an issue with the server.")
            })

    }

    function reset() {
        setType('')
    }
    return (
        <div className="bg-light w-100 rounded-bottom shadow justify-content-around py-5">
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
                                <p className="lead py-2 my-0">Create new coach</p>
                            </Button>
                        </div>
                        <div className="my-2 w-100">
                            <Button className="col-xl-4 my-2 w-100" color="warning" variant="contained" onClick={() => setType('update')}>
                                <p className="lead py-2 my-0">Update a coach</p>
                            </Button>
                        </div>
                        <div className="my-2 w-100">
                            <Button className="col-xl-4 my-2 w-100 bg-danger" variant="contained" onClick={() => setType('delete')}>
                                <p className="lead py-2 my-0">Delete a coach</p>
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
                                            label="Select coach"
                                            value={update}
                                            onChange={(e) => handleSelectUpdate(e.target.value, formik)}
                                        >
                                            {coaches.map((coach) => {
                                                return (
                                                    <MenuItem value={coach.coachId} key={coach.coachId}>
                                                        {coach.coachName}
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
                                                    <TextField
                                                        select
                                                        sx={{
                                                            width: "100%"
                                                        }}
                                                        label="Select coach"
                                                        value={objDelete}
                                                        onChange={(e) => { setObjDelete(e.target.value) }}
                                                    >
                                                        {coaches.map((coach) => {
                                                            return (
                                                                <MenuItem value={coach.coachId} key={coach.coachId}>
                                                                    {coach.coachName}
                                                                </MenuItem>
                                                            )
                                                        })}

                                                    </TextField>
                                                </div>
                                                <div className="row justify-content-center w-50 mx-auto p-0">
                                                    <div className="mx-auto my-2 col-lg-6">
                                                        <Button className="col-xl-4 my-2 w-100 bg-danger" variant="contained" onClick={handleDelete} disabled={!objDelete}>
                                                            <p className="lead py-1 my-0">Delete coach</p>
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
                                                    <h3 className="display-5">{formik.values.coachName == "" ? type === 'update' ? "Updating Coach" : "Create Coach" : formik.values.coachName}</h3>
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
                                                            label={"Coach Name"}
                                                            name="coachName"
                                                            value={formik.values.coachName}
                                                            onBlur={formik.handleBlur}
                                                            onChange={formik.handleChange}
                                                            error={formik.errors.coachName && formik.touched.coachName} />
                                                        {
                                                            formik.errors.coachName && formik.touched.coachName ?
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
                                                            label={"Coach Position"}
                                                            name="coachPosition"
                                                            value={formik.values.coachPosition}
                                                            onBlur={formik.handleBlur}
                                                            onChange={formik.handleChange}
                                                            error={formik.errors.coachPosition && formik.touched.coachPosition}
                                                        />
                                                        {
                                                            formik.errors.coachPosition && formik.touched.coachPosition ?
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
                                                            label={"Coach Bio"}
                                                            name="coachBio"
                                                            multiline
                                                            value={formik.values.coachBio}
                                                            onBlur={formik.handleBlur}
                                                            onChange={formik.handleChange}
                                                            error={formik.errors.coachBio && formik.touched.coachBio}
                                                        />
                                                        {
                                                            formik.errors.coachBio && formik.touched.coachBio ?
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
                                                    <div className="col-md-10 mx-auto shadow mt-5 text-center">
                                                        <input
                                                            type="file"
                                                            hidden
                                                            id='coachPicture'
                                                            name="coachPicture"
                                                            accept='image/*'
                                                            class="custom-file-upload"
                                                            onChange={(e) => { changeHandler(e); }}
                                                        />
                                                        <div className="row">
                                                            <div className="col-md-5 p-2 m-0 mx-auto">
                                                                <label htmlFor="coachPicture" class="w-100 custom-file-upload mt-3 p-2 btn btn-primary border-0 shadow">
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
                                                            fileDataURL || formik.values.coachPicture != '' ?
                                                                <p className="img-preview-wrapper">
                                                                    {
                                                                        <img className="border img-fluid" src={fileDataURL ? fileDataURL : "http://localhost:3001/images/uploads/coaches/" + formik.values.coachPictureName} width="400" height="600" alt="preview" />
                                                                    }
                                                                </p>
                                                                :
                                                                null
                                                        }
                                                        {
                                                            formik.errors.coachPicture && formik.touched.coachPicture ?
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
                                                                    {formik.values.coachPictureName != '' ? "FileName: " + formik.values.coachPictureName : ""}
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

export default AdminCoach