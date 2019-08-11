import React, { Component } from "react";
import ReactDOM from "react-dom";

import style from "./controls.scss";

const Controls = (props) =>
{
    
    const backgroundColor = props.data.backgroundColor;
    const width = props.data.width;
    const height = props.data.height;
    const grid = props.data.grid;
    const repeat = props.data.repeat;
    const positioning = props.data.positioning;
    const zoom = props.data.zoom;
    
    return(
        <div id="moduleA">
            <div className="control-triger">
                <div className="control-name">background</div>
                <input 
                    type="color"
                    value={backgroundColor}
                    onChange={props.handleChange}
                    placeholder="HTML code..."/>
            </div>
            <div className="control-triger">
                <div className="control-name">width(px)</div>

                <input min="2" type="number" value={width} onChange={props.handleChangeWidth}/>
            </div>
            <div className="control-triger">
                <div className="control-name">height(px)</div>

                <input min="2" type="number" value={height} onChange={props.handleChangeHeight}/>
            </div>
            <div className="control-triger">
                <div className="control-name">grid</div>

                <input type="checkbox" checked={grid} onChange={props.handleGrid}/>
            </div>
            <div className="control-triger">
                <div className="control-name">repeat</div>

                <input type="checkbox" checked={repeat} onChange={props.handleRepeat}/>
            </div>
            <div className="control-triger">
                <div className="control-name">position</div>
                <select value={positioning} onChange={props.handlePositioning} type="text" list="types">
                    <option value="%">%</option>
                    <option value="px">px</option>
                </select>
            </div>
            <div className="control-triger">
                <div className="control-name">zoom</div>

                <input value={zoom} onChange={props.handleZoom} type="range"  min="0.5" max="2.5" step="0.05" />
            </div>
        
        </div>
        );  
};

export {Controls}