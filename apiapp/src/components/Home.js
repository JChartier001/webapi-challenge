import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

const Home =() =>{

    const[project, setProject] = useState([]);
    useEffect(() =>{
        axios
        .get('http://localhost:4000/api/projects')
        .then(response => {
            console.log(response);
            setProject(response.data);
            
        })
        .catch(error => {
            console.dir(error)
        })
    }, [])
    console.log(project);
    return(
        
        project && project.length > 0 ? project.map(project => {
            return(
                <>
                <h3>{project.name}</h3>
                <Link to={`/${project.name}`}>See More</Link>
                </>
            )
        }) : null
    )
}
    



export default Home;