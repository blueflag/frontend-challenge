import React, { SetStateAction, useEffect, useState } from "react";

const useFetch = (
  urlPath: string,
  initialState: any,
  setLoading?: SetStateAction<any>
) => {
  const [data, setData] = useState<any>(initialState);
  useEffect(() => {
    setLoading && setLoading(true);
    fetch(`http://localhost:3000/${urlPath}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading && setLoading(false);
      });
  }, []);
  return data;
};

export default useFetch;
