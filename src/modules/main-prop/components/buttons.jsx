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
            <button onClick={props.moveUp} className="control-button">move up</button>
            <button onClick={props.moveDown} className="control-button">move down</button>
        </div>
    );
}

export {Buttons}