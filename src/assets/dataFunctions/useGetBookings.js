import { useState, useEffect } from "react";

// Get volcanoes based on location and pop distance
export function useGetBookings(type, searchParams) {
    // Set states to be used for loading, data and error
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    let URL;

    URL = "http://localhost:3001/bookings";


    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    useEffect(() => {
        fetch(URL)
            .then((res) => res.json())
            .then((data) => {
                setBookings(data);
            }).catch((error) => {
                setError(error);
            }).finally(() => {
                setLoading(false);
            })

    }, [URL])

    return { bookings, loading, error };

}