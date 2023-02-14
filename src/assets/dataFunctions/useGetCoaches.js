import { useState, useEffect } from "react";

// Get volcanoes based on location and pop distance
export function useGetCoaches(id, searchParams) {
    // Set states to be used for loading, data and error
    const [coaches, setCoaches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    let URL;

    URL = "http://localhost:3001/coaches";

    if (id != null) {
        URL += "/" + id;
    }


    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    useEffect(() => {
        fetch(URL)
            .then((res) => res.json())
            .then((data) => {
                setCoaches(data);
            }).catch((error) => {
                setError(error);
            }).finally(() => {
                setLoading(false);
            })

    }, [URL])

    return { "coaches": coaches, "loading": loading, "error": error };

}