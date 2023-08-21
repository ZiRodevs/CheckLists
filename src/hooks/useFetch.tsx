import React, { useEffect, useState } from 'react';

const useFetch = (url: string) => {
  // const { url, config } = props;
  // console.log(props);
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getData = async (url: string): Promise<any> => {
      try {
        setIsLoading(true);
        const response = await fetch(url);
        const resJson = await response.json();
        setData(resJson.users);
      } catch (err: any) {
        console.log(err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    getData(url);
  }, [url]);

  return { data, error, isLoading };
};

export default useFetch;
