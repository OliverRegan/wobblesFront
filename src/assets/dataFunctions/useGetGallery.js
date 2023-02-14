import { useState, useEffect } from "react";

// Get volcanoes based on location and pop distance
export function useGetGallery(type, searchParams) {
    // Set states to be used for loading, data and error
    const [gallery, setGallery] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    let URL;

    URL = "http://localhost:3001/gallery";


    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    useEffect(() => {
        fetch(URL)
            .then((res) => res.json())
            .then((data) => {
                setGallery(data);
            }).catch((error) => {
                setError(error);
            }).finally(() => {
                setLoading(false);
            })

    }, [URL])

    return { gallery, loading, error };

}