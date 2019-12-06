import React, {useEffect, useState} from "react";
import axios from "axios";

const Home = () => {

    useEffect(() => {
        axios
        .get('http://localhost:4000/api/projects')
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        })
    })

    return(
        <h2>I am home</h2>
    )
}

export default Home;