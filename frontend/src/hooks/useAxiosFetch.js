import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';

const useAxiosFetch = (dataUrl) => {
    const [data, setData] = useState([]);
    const [fetchError, setFetcherror] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        let isMounted = true;
        const source = axios.CancelToken.source();

        const fetchdata = async (url) => {
            setIsLoading(true);
            try {
                const response = await axios.get(url, {
                    cancelToken: source.token
                });

                if (isMounted) {
                    setData(response.data);
                    setFetcherror(null);
                }
            } catch (err) {
                if (isMounted) {
                    setFetcherror(err.message);
                    setData([]);
                }
            } finally {
                isMounted && setTimeout(() => setIsLoading(false), 1500);
            }
        };
        fetchdata(dataUrl);

        const cleanup = () => {
            isMounted = false;
            source.cancel();
        };

        return cleanup;
    }, [dataUrl]);

    return { data, fetchError, isLoading };
};

export default useAxiosFetch;
