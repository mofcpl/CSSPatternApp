import React, { Component } from "react";
import ReactDOM from "react-dom";

const Radius = (props) =>
{
    
    const radius = props.data.radials[props.index].rays;
    
    
    const items = props.data.radials[props.index].rays.map((value,index) => 
    <div className="control-module" key={index}>
        <div className="control-triger">
            <div className="control-name">position</div>
            <input onChange={ (e) => props.handleChange("radial",props.index,index,"position",e)} value={radius[index].position} type="number" min="0" />
        </div>
        
        <div className="control-triger">
            <div className="control-name">size</div>
            <input onChange={ (e) => props.handleChange("radial",props.index,index,"size",e)} value={radius[index].size} type="number" min="1" />
        </div>
        
        <div className="control-triger">                                  
            <div className="control-name">color</div>
            <input onChange={ (e) => props.handleChange("radial",props.index,index,"color",e)} value={radius[index].color} type="color" />
        </div>

        <div className="control-triger">                                  
            <div className="control-name">opacity</div>
            <input onChange={ (e) => props.handleChange("radial",props.index,index,"opacity",e)} value={radius[index].opacity}  type="number" min="0" max="100" />
        </div>

        <div className="control-triger">                                  
            <div className="control-name">blur</div>
            <input onChange={ (e) => props.handleChange("radial",props.index,index,"blur",e)} value={radius[index].blur}  type="number" min="0" />
        </div>
                                          
        <button onClick={ () => props.delete(props.index,index)}  className="control-button">delete</button>
    </div>);
    
    return items;
}

const Radial = (props) =>
{  
    const index = props.index;
    const radials = props.data.radials;
    const width = props.data.width;
    const height = props.data.height;

    return(
            <div className="control-module">
                                                
                <div className="control-triger">
                    <div className="control-name">shape</div>
                    <select  type="text" list="types" value={radials[index].shape} onChange={ (e) => props.handleChange("radial",index,0,"shape",e)}>
                        <option value="ellipse ">ellipse</option>
                        <option value="circle">circle</option>
                    </select>
                </div>

                <div className="control-triger">
                    <div className="control-name">auto-size</div>
                    <input type="checkbox" onChange={ (e) => props.handleChange("radial",index,0,"auto-size",e)} checked={radials[index].autoSize}/>
                </div>

                <div className="control-triger">
                    <div className="control-name">width</div>

                    <input min="2" type="number" onChange={ (e) => props.handleChange("radial",index,0,"width",e)} value={radials[index].width} disabled = {(radials[index].autoSize == true)? "disabled" : ""}/>
                </div>
                <div className="control-triger">
                    <div className="control-name">height</div>

                    <input min="2" type="number" onChange={ (e) => props.handleChange("radial",index,0,"height",e)} value={radials[index].height} disabled = {(radials[index].autoSize == true)? "disabled" : ""}/>
                </div>
                                         
                <div className="control-triger">
                    <div className="control-name">size</div>
                        <select  type="text" list="types" value={radials[index].size} onChange={ (e) => props.handleChange("radial",index,0,"extent",e)}>
                            <option value="farthest-corner">farthest corner</option>
                            <option value="closest-side">closest side</option>
                            <option value="closest-corner">closest corner</option>
                            <option value="farthest-side">farthest side</option>
                        </select>
                    </div>
                                         
                <div className="control-triger">    
                    <div className="control-name">pos x</div>
                    <input onChange={ (e) => props.handleChange("radial",index,0,"posx",e)} value={radials[index].posx} type="number" min={0-width} max={width} />
                </div>
                        
                <div className="control-triger">    
                    <div className="control-name">pos y</div>
                    <input onChange={ (e) => props.handleChange("radial",index,0,"posy",e)} value={radials[index].posy} type="number" min={0-width} max={width} />
                </div>
                                         
                <div className="control-triger">    
                    <div className="control-name">vertical shift(px)</div>
                    <input onChange={ (e) => props.handleChange("radial",index,0,"vertical",e)} value={radials[index].vertical} type="number" min={0-width} max={width} />
                </div>

                <div className="control-triger">
                    <div className="control-name">horizontal shift(px)</div>
                    <input onChange={ (e) => props.handleChange("radial",index,0,"horizontal",e)} value={radials[index].horizontal} type="number" min={0-height} max={height}/>
                </div>
                    <button onClick={ () => props.add(index) } className="control-button">add radius</button>
            
            </div>
 
        )
}
    
    
export {Radial, Radius}