import React, { Component } from "react";
import ReactDOM from "react-dom";

import style from "./button.scss";

const Buttons = (props) =>
{
    
    return(
        
        <div id="moduleB">
            <button onClick={props.addLinear} className="control-button">add linear</button>
            <button onClick={props.addRadial} className="control-button">add radial</button>
            <div className="dropdown">
                <button className="control-button">examples</button>
                <div className="dropdown-content">
                    <button onClick={props.setWeaves}><img src={require("../../../img/weaves.png")}/></button>
                    <button onClick={props.setCarbon}><img src={require("../../../img/carbon.png")}/></button>
                    <button onClick={props.setMicrobial}><img src={require("../../../img/microbial.png")}/></button>
                    <button onClick={props.setShippo}><img src={require("../../../img/shippo.png")}/></button>
                    <button onClick={props.setStairs}><img src={require("../../../img/stairs.png")}/></button>
                    <button onClick={props.setBricks}><img src={require("../../../img/bricks.png")}/></button>
                    <button onClick={props.setHearts}><img src={require("../../../img/hearts.png")}/></button>
                </div>
            </div>
        </div>
    );
}

export {Buttons}