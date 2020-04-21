import React, { Component } from "react";
import ReactDOM from "react-dom";

import style from "./management.scss";

const Management = (props) =>
{

    const dupa ="";

    return(   
        <div className="area" id="management">
            <a onClick = { () => {props.handleChange("EXPLORE")}}>Explore projects</a>
            <a onClick = { () => {props.handleChange("PUBLISH")}}>Publish project</a>
            <a onClick = { () => {props.handleChange("SIGNUP")}}>Sign up</a>
            <a onClick = { () => {props.handleChange("SIGNIN")}}>Sign in</a>
            <a onClick = { () => {props.handleChange("ACCOUNT")}}>Account</a>
        </div>
    );
}


export {Management}