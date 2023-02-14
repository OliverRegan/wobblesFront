// React components
import { useEffect } from 'react'
import Feed from "react-instagram-authless-feed"
import { useGetGallery } from '../../assets/dataFunctions/useGetGallery';

import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material';

import "./gallery.css"


const Gallery = props => {

    let { gallery, loading, error } = useGetGallery();
    console.log(gallery)


    return (
        <div>
            <div className="bg-light w-80 mt-4 rounded mx-auto shadow d-flex justify-content-around">
                <p className="card-title-custom text-center px-2"><span className="font-italic"> Some of our favorite action shots of our skaters!
                </span></p>
            </div>
            <div id="meet-the-team-container" className="w-80 justify-content-between mx-auto d-flex flex-xl-wrap flex-lg-wrap ">

                {loading || error ?
                    <div>{loading ? "Loading..." : "Something went wrong"}</div>
                    :
                    gallery.map((post) => {
                        return (
                            <Card sx={{ maxWidth: 345, my: 3 }}>
                                <CardMedia
                                    component="img"
                                    height="500"
                                    image={process.env.REACT_APP_IMAGE_BASE_URL + "gallery/" + post.galleryPictureName}
                                    alt="Post Image"
                                    sx={{
                                        boxShadow: "0px 4px 4px 2px #333"
                                    }}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h6" component="div">
                                        {post.galleryTitle}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {post.galleryDescription == '' ? <></> : <>{post.galleryDescription}</>}
                                    </Typography>
                                </CardContent>
                            </Card>
                            // <div className="bg-light shadow mt-4 rounded post-card-custom mx-2 px-0 " key={post.galleryId}>

                            //     <div className=" w-100 h-auto ">
                            //         <div className="">
                            //             <div className=" justify-content-center">
                            //                 <div className="card-title-wrapper d-flex flex-column">
                            //                     <img src={process.env.REACT_APP_IMAGE_BASE_URL + "gallery/" + post.galleryPictureName} className={"rounded-top w-100 gallery-image"} />
                            //                     <div className='  gallery-image-gradient'>

                            //                     </div>
                            //                 </div>
                            //             </div>
                            //         </div>

                            //         <div className={" gallery-body"}>

                            //             <div className="p-4 w-100 text-white ">
                            //                 <h4 className="mt-3 text-center">{post.galleryTitle}</h4>
                            //                 {post.galleryDescription == '' ? <></> :
                            //                     <>
                            //                         <hr className="hr-tertiary" />
                            //                         <p className="intro-text">{post.galleryDescription}
                            //                         </p>
                            //                     </>}
                            //             </div>
                            //         </div>
                            //     </div>
                            // </div>
                        )
                    })
                }
            </div >
        </div >
    )
}
export default Gallery