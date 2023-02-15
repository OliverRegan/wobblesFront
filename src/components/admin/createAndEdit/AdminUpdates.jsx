import { useState } from "react"
import { useEffect } from "react"


import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { Formik, Form, useFormik } from "formik"

import * as yup from 'yup';

import { useSelector } from "react-redux";

import { Button, MenuItem, TextField, InputAdornment, IconButton, Typography, FormControlLabel, Checkbox } from "@mui/material"
import { PhotoCamera } from "@mui/icons-material";
import { useGetLessons } from "../../../assets/dataFunctions/useGetLessons"

import "./createAndEdit.css"

const imageMimeType = /image\/(png|jpg|jpeg)/i;


const AdminUpdates = () => {

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

    const [updates, setUpdates] = useState([]);
    const [err, setErr] = useState('')

    let updateURL = "http://localhost:3001/updates";

    const [msg, setMsg] = useState('')
    const [file, setFile] = useState(null);
    const [fileDataURL, setFileDataURL] = useState(null);


    const dayjs = require('dayjs')

    useEffect(() => {
        fetch(updateURL)
            .then((res) => res.json())
            .then((data) => {
                setUpdates(data);
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
        formik.setFieldValue('updatePicture', file)
        formik.setFieldValue('updatePictureName', file.name)
    }

    let days = ["Negotiable", 'Sunday', "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]



    const validationSchema =
        yup.object().shape({
            updateName: yup.string().required("Update name is required"),
            updateDescription: yup.string().required("Update description is required"),
            updatePicture: yup
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
        updateId: '',
        updateName: '',
        updateDescription: '',
        updatePicture: '',
        updateBookButton: 0,
        updatePictureName: '',
    }
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema,
        onSubmit: values => {
            const formData = new FormData()
            for (let key in formik.values) {
                formData.append(key, formik.values[key]);
            }
            fetch('http://localhost:3001/updates/save', {
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
                        handleClear('Update saved!');
                    }
                    console.log('err')

                }).catch((err) => {
                    console.log(err)
                    setErr("Something went wrong, there could be an issue with the server.")
                })
        },
    });

    function handleSelectUpdate(val, formikProps) {
        setUpdate(val);
        // get lesson data from lessons
        updates.forEach((update) => {
            if (update.updateId == val) {
                console.log(update)
                // assign vals to formik
                formik.setFieldValue('updateId', val);
                formik.setFieldValue('updateName', update.updateName);
                formik.setFieldValue('updateDescription', update.updateDescription);
                formik.setFieldValue('updateBookButton', update.updateBookButton);
                formik.setFieldValue('updatePicture', update.updatePicture);
                formik.setFieldValue('updatePictureName', update.updatePictureName);
            }
        })
        formik.setFieldValue('updateId', val)
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
            "updateId": objDelete
        }
        fetch('http://localhost:3001/updates/delete', {
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
                    handleClear('Update deleted!');

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
                                <p className="lead py-2 my-0">Create update</p>
                            </Button>
                        </div>
                        <div className="my-2 w-100">
                            <Button className="col-xl-4 my-2 w-100 bg-danger" variant="contained" onClick={() => setType('delete')}>
                                <p className="lead py-2 my-0">Delete update</p>
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
                                            label="Select Update"
                                            value={update}
                                            onChange={(e) => handleSelectUpdate(e.target.value, formik)}
                                        >
                                            {updates.map((update) => {
                                                return (
                                                    <MenuItem value={update.updateId} key={update.updateId}>
                                                        {update.updateName}
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
                                                        label="Select update"
                                                        value={objDelete}
                                                        onChange={(e) => { setObjDelete(e.target.value) }}
                                                    >
                                                        {updates.map((update) => {
                                                            return (
                                                                <MenuItem value={update.updateId} key={update.updateId}>
                                                                    {update.updateName}
                                                                </MenuItem>
                                                            )
                                                        })}

                                                    </TextField>
                                                </div>
                                                <div className="row justify-content-center w-50 mx-auto p-0">
                                                    <div className="mx-auto my-2 col-lg-6">
                                                        <Button className="col-xl-4 my-2 w-100 bg-danger" variant="contained" onClick={handleDelete} disabled={!objDelete}>
                                                            <p className="lead py-1 my-0">Delete update</p>
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
                                                    <h3 className="display-5">{formik.values.updateName == "" ? type === 'update' ? "Updating update" : "Create update" : formik.values.updateName}</h3>
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
                                                    <div className="col-md-8">
                                                        <TextField
                                                            sx={{
                                                                my: 1,
                                                                width: 1
                                                            }}
                                                            label={"Update Name"}
                                                            name="updateName"
                                                            value={formik.values.updateName}
                                                            onBlur={formik.handleBlur}
                                                            onChange={formik.handleChange}
                                                            error={formik.errors.updateName && formik.touched.updateName} />
                                                        {
                                                            formik.errors.updateName && formik.touched.updateName ?
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
                                                    <div className="col-md-4 mx-auto">
                                                        <FormControlLabel sx={{
                                                            mx: 'auto',
                                                            width: 1,
                                                            justifyContent: 'center',
                                                            mt: 1
                                                        }} control={<Checkbox onClick={
                                                            (event) => {
                                                                formik.setFieldValue('updateBookButton', event.target.checked ? 1 : 0)
                                                            }}
                                                            value={formik.values.updateBookButton == 0 ? false : true}
                                                        />

                                                        } label="Book now button" />
                                                    </div>
                                                    <div className="col-md-12">
                                                        <TextField
                                                            sx={{
                                                                my: 1,
                                                                width: 1
                                                            }}
                                                            label={"Update Description"}
                                                            name="updateDescription"
                                                            multiline
                                                            value={formik.values.updateDescription}
                                                            onBlur={formik.handleBlur}
                                                            onChange={formik.handleChange}
                                                            error={formik.errors.updateDescription && formik.touched.updateDescription}
                                                        />
                                                        {
                                                            formik.errors.updateDescription && formik.touched.updateDescription ?
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
                                                            id='updatePicture'
                                                            name="updatePicture"
                                                            accept='image/*'
                                                            class="custom-file-upload"
                                                            onChange={(e) => { changeHandler(e); }}
                                                        />
                                                        <div className="row">
                                                            <div className="col-md-5 p-2 m-0 mx-auto">
                                                                <label htmlFor="updatePicture" class="w-100 custom-file-upload mt-3 p-2 btn btn-primary border-0 shadow">
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
                                                            fileDataURL || formik.values.updatePicture != '' ?
                                                                <p className="img-preview-wrapper">
                                                                    {
                                                                        <img className="border img-fluid" src={fileDataURL ? fileDataURL : "http://localhost:3001/images/uploads/updates/" + formik.values.updatePictureName} width="400" height="600" alt="preview" />
                                                                    }
                                                                </p>
                                                                :
                                                                null
                                                        }
                                                        {
                                                            formik.errors.updatePicture && formik.touched.updatePicture ?
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
                                                                    {formik.values.updatePictureName != '' ? "FileName: " + formik.values.updatePictureName : ""}
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

export default AdminUpdates