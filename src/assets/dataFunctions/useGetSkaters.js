import { useState, useEffect } from "react";

// Get volcanoes based on location and pop distance
export function useGetSkaters(id, searchParams) {
    // Set states to be used for loading, data and error
    const [skaters, setSkaters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    let URL;

    URL = "http://localhost:3001/skaters";

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
                setSkaters(data);
            }).catch((error) => {
                setError(error);
            }).finally(() => {
                setLoading(false);
            })

    }, [URL])

    console.log(skaters)
    return { skaters, loading, error };

}