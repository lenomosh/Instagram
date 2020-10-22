// import Axios from "axios";
// import apiUrls from "./environment";
// import React from "react";

export const processError =err =>{
    let errors=[]
    if (err.status === 400){
        errors = err.response.errors
    }
    if (err.status === 422){
        errors.push(err.response.message)
    }
    if (err.status === 500){
        errors.push("Internal Server Error")
    }
    if (err.status === 503){
        errors.push("System Under Maintenance")
    }
    return errors
}


