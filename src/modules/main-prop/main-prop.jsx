import React, { Component } from "react";
import ReactDOM from "react-dom";

import {Controls} from "./components/controls.jsx"
import {Buttons} from "./components/buttons.jsx"

import style from "./main-prop.scss";

const MainProp = (props) =>
{
    return(   
        <div className="area" id="main-prop">
            <div className="card">
                    <Controls 
                        data={props.data} 
                        handleChangeWidth={props.pointer.handleWidthInput} 
                        handleChangeHeight={props.pointer.handleHeightInput} 
                        handleChange={props.pointer.handleBackgroundInput} 
                        handleRepeat={props.pointer.handleRepeat} 
                        handleGrid={props.pointer.handleGrid} 
                        handlePositioning={props.pointer.handlePositioning} 
                        handleZoom={props.pointer.handleZoom} 
                    />
                        
                    <Buttons 
                        addLinear={props.pointer.handleAddLinear} 
                        addRadial={props.pointer.handleAddRadial}
                        clone={props.pointer.handleClone}
                    />
            </div>
        </div>
    );
}

export {MainProp}