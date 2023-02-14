import { useState, useEffect } from "react";

// Get volcanoes based on location and pop distance
export function useGetLessons(id, searchParams) {
    // Set states to be used for loading, data and error
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    let URL;

    URL = "http://localhost:3001/lessons";

    if (id) {
        URL += "/" + id;
    }

    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    useEffect(() => {
        fetch(URL)
            .then((res) => res.json())
            .then((data) => {
                setLessons(data);
            }).catch((error) => {
                setError(error);
            }).finally(() => {
                setLoading(false);
            })

    }, [URL])

    return { lessons, loading, error };

}