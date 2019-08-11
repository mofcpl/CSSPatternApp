import React, { Component } from "react";
import ReactDOM from "react-dom";

import style from "./list.scss";

const List = (props) =>
{
    const linears = props.data.linears;
    const radials = props.data.radials;
    const activeType = props.data.selected.type;
    const activeIndex = props.data.selected.index;
    
    const itemsLinears = linears.map((value,index) => 
            <div key={index} className={(activeType == "linear" && activeIndex == index) ? "list-item-active" : "list-item-inactive"}>
                <button 
                    onClick={ (e) => props.handleChangeLayer("linear",index)} 
                    className="text">Linear {index}
                </button>
                <button onClick={ (e) => props.handleVisibility("linear",index)}  className={(value.visible == true) ? "eye-icon-active" : "eye-icon"}><i className="icon-eye"></i></button>
                <button onClick={ (e) => props.handleGrid("linear",index)}  className={(value.grid == true) ? "grid-icon-active" : "grid-icon"}><i className="icon-grid"></i></button>
            </div>
    );

    const itemsRadials = radials.map((value,index) => 
        <div key={index} className={(activeType == "radial" && activeIndex == index) ? "list-item-active" : "list-item-inactive"}>
            <button 
                onClick={ (e) => props.handleChangeLayer("radial",index)} 
                className="text">Radial {index}
            </button>
            <button onClick={ (e) => props.handleVisibility("radial",index)} className={(value.visible == true) ? "eye-icon-active" : "eye-icon"}><i className="icon-eye"></i></button>
            <button onClick={ (e) => props.handleGrid("radial",index)} className={(value.grid == true) ? "grid-icon-active" : "grid-icon"}><i className="icon-grid"></i></button>
        </div>
    );
    
    return(
    <div className="area" id="list">
        <div className="card">
            {itemsLinears}
            {itemsRadials}
        </div>
    </div>
    );
}

export {List}

