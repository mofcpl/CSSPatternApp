import React, { Component } from "react";
import ReactDOM from "react-dom";

import style from "./management.scss";

const Management = (props) =>
{

    let buttonA, buttonB;

    if(!props.isLogged)
    {
        buttonA = <a onClick = { () => {props.handleChange("SIGNIN")}}>Sign in</a>;
        buttonB = <a onClick = { () => {props.handleChange("SIGNUP")}}>Sign up</a>;
    }
    else
    {
        buttonA = <a onClick = {props.handleSignOut}>Sign out</a>;
        buttonB = <a onClick = { () => {props.handleChange("ACCOUNT")}}>{props.name}</a>;
    }
    
    return(   
        <div className="area" id="management">
            <a onClick = { () => {props.handleChange("EXPLORE")}}>Explore projects</a>
            <a onClick = { () => {props.handleChange("PUBLISH")}}>Publish project</a>
            {buttonA}
            {buttonB}
        </div>
    );
}


export {Management}