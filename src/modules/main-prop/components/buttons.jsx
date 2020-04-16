import React, { Component } from "react";
import ReactDOM from "react-dom";

import style from "./button.scss";

const Buttons = (props) =>
{
    
    return(
        
        <div id="moduleB">
            <button onClick={props.addLinear} className="control-button">add linear</button>
            <button onClick={props.addRadial} className="control-button">add radial</button>
            <button onClick={props.clone} className="control-button">clone</button>
        </div>
    );
}

export {Buttons}