import React, { Component } from "react";
import ReactDOM from "react-dom";

const Line = (props) =>
{
    
    const line = props.data.linears[props.index].lines;
    
    
    const items = props.data.linears[props.index].lines.map((value,index) => 
    <div className="control-module" key={index}>
        <div className="control-triger">
            <div className="control-name">position</div>
            <input onChange={ (e) => props.handleChange("linear",props.index,index,"position",e)} value={line[index].position} type="number" min="0" />
        </div>
        
        <div className="control-triger">
            <div className="control-name">size</div>
            <input onChange={ (e) => props.handleChange("linear",props.index,index,"size",e)} value={line[index].size} type="number" min="1" />
        </div>
        
        <div className="control-triger">                                  
            <div className="control-name">color</div>
            <input onChange={ (e) => props.handleChange("linear",props.index,index,"color",e)} value={line[index].color} type="color" />
        </div>

        <div className="control-triger">                                  
            <div className="control-name">opacity</div>
            <input onChange={ (e) => props.handleChange("linear",props.index,index,"opacity",e)} value={line[index].opacity}  type="number" min="0" max="100" />
        </div>

        <div className="control-triger">                                  
            <div className="control-name">blur</div>
            <input onChange={ (e) => props.handleChange("linear",props.index,index,"blur",e)} value={line[index].blur}  type="number" min="0" />
        </div>
                                          
        <button onClick={ () => props.delete(props.index,index)}  className="control-button">delete</button>
    </div>);
    
    return items;
}

const Linear = (props) =>
{  
    const index = props.index;
    const linears = props.data.linears;
    const width = props.data.width;
    const height = props.data.height;
    
    return(
        <div className="control-module">
            
                <div className="control-triger">    
                    <div className="control-name">direction</div>
                    <input type="number" onChange={ (e) => props.handleChange("linear",index,0,"direction",e)} value={linears[index].direction}  min="0" max="360"/>
                </div>

                <div className="control-triger">
                    <div className="control-name">auto-size</div>
                    <input type="checkbox" onChange={ (e) => props.handleChange("linear",index,0,"auto-size",e)} checked={linears[index].autoSize}/>
                </div>

                <div className="control-triger">
                    <div className="control-name">width</div>

                    <input min="2" type="number" onChange={ (e) => props.handleChange("linear",index,0,"width",e)} value={linears[index].width} disabled = {(linears[index].autoSize == true)? "disabled" : ""}/>
                </div>
                <div className="control-triger">
                    <div className="control-name">height</div>

                    <input min="2" type="number" onChange={ (e) => props.handleChange("linear",index,0,"height",e)} value={linears[index].height} disabled = {(linears[index].autoSize == true)? "disabled" : ""}/>
                </div>

                <div className="control-triger">    
                    <div className="control-name">vertical shift(px)</div>
                    <input onChange={ (e) => props.handleChange("linear",index,0,"vertical",e)} value={linears[index].vertical} type="number" min={0-width} max={width} />
                </div>

                <div className="control-triger">
                    <div className="control-name">horizontal shift(px)</div>
                    <input onChange={ (e) => props.handleChange("linear",index,0,"horizontal",e)} value={linears[index].horizontal} type="number" min={0-height} max={height}/>
                </div>
                <button onClick={ () => props.add(index) } className="control-button">add line</button>
                                                                                   
                               
        </div>
    );
}
    

export {Linear, Line}