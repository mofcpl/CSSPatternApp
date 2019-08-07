import React, { Component } from "react";
import ReactDOM from "react-dom";

import {Linear, Line} from "./components/linear.jsx"
import {Radial, Radius} from "./components/radial.jsx"

import style from "./properties.scss";

const Properties = (props) =>
{
    let card;
    
    switch(props.data.selected.type)
        {
            case "linear": 
                {
                    card = 
                        <div className="card">
                            <Linear handleChange={props.handleChange} data={props.data} index={props.data.selected.index} add={props.addLine}/>
                            <Line handleChange={props.handleChange} data={props.data} index={props.data.selected.index} delete={props.deleteLine}/>
                        </div>
                    break;
                }
            case "radial": 
                {
                    card = 
                        <div className="card">
                            <Radial handleChange={props.handleChange} data={props.data} index={props.data.selected.index} add={props.addRadius}/>
                            <Radius handleChange={props.handleChange} data={props.data} index={props.data.selected.index} delete={props.deleteRadius}/>
                        </div>
                    break;
                }
            case "none":
                {
                    card = <div className="card"></div>;
                    break;
                }
        }
    
    
    return(
        <div className="area" id="prop">
            {card}
        </div>
    );
}

export {Properties}
