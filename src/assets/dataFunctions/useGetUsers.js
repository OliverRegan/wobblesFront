import { useState, useEffect } from "react";

// Get volcanoes based on location and pop distance
export function useGetUsers(type, searchParams) {
    // Set states to be used for loading, data and error
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(true);

    let URL;

    URL = "http://localhost:3001/users";


    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    useEffect(() => {
        fetch(URL)
            .then((res) => res.json())
            .then((data) => {
                setUsers(data);
            }).catch((error) => {
                setError(error);
            }).finally(() => {
                setLoading(false);
            })

    }, [URL])

    return { users, loading, error };

}