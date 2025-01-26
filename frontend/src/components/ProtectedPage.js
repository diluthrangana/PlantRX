import React, { useEffect, useState } from "react";
import axios from "../axios";

const ProtectedPage = () => {
    const [data, setData] = useState("");

    useEffect(() => {
        axios.get("/protected")
            .then((response) => setData(response.data))
            .catch((err) => alert(err.response.data));
    }, []);

    return <div>{data ? data : "Loading..."}</div>;
};

export default ProtectedPage;
