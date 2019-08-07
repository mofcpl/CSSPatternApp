import React, { Component } from "react";
import ReactDOM from "react-dom";

import hexToRgb from "../hex-to-rgb.js"

import style from "./canvas.scss";

const Canvas = (props) =>
{
    let linearGrid = "";
    let backgroundImageCode = "";
    let backgroundPosCode = "";
    let backgroundSizeCode = "";
    const posType = props.data.positioning;
    
//LINEAR
    if(props.data.linears.length > 0)
    {
        props.data.linears.map( (linear, linearindex) =>
        {
            backgroundImageCode += "linear-gradient("+linear.direction+"deg, ";
            linear.lines.map( (line, lineIndex) => 
            {
                const colorArray = hexToRgb(line.color);
                const rgbString = "rgba("+colorArray[0]+", "+colorArray[1]+", "+colorArray[2]+", "+line.opacity/100+")";
                
                const vacancyLeft = "transparent "+(+line.position - +line.blur)+posType;
                const colorLeft = rgbString+" "+line.position+posType;
                const colorRight = rgbString+" "+(+line.position + +line.size)+posType;
                const vacancyRight = "transparent "+(+line.position + +line.size + +line.blur)+posType;
                
                backgroundImageCode += vacancyLeft+", "+colorLeft+", "+colorRight+", "+vacancyRight;
                if(lineIndex < (linear.lines.length-1))
                {
                    backgroundImageCode += ", ";
                }
                else
                {
                    backgroundImageCode += ") ";
                }

            })
         
            backgroundPosCode += linear.vertical+"px "+linear.horizontal+"px";
            backgroundSizeCode += (linear.autoSize == true)? props.data.width+"px "+props.data.height+"px" : linear.width+"px "+linear.height+"px";
            
            if(linearindex < (props.data.linears.length-1))
            {
                backgroundImageCode += ", ";
                backgroundPosCode += ", ";
                backgroundSizeCode += ", ";
            }

        })
    }
    
//RADIALS
    
    if(props.data.radials.length > 0)
    {
        
        if(backgroundImageCode != "") backgroundImageCode += ", ";

        props.data.radials.map( (radial, radialIndex) =>
        {
            backgroundImageCode += "radial-gradient("+radial.shape+" "+radial.size+" at "+radial.posx+posType+" "+radial.posy+posType+", ";       

            radial.rays.map( (radius, radiusIndex) => 
            {
                const color = hexToRgb(radius.color);
                const rgbString = "rgba("+color[0]+", "+color[1]+", "+color[2]+", "+radius.opacity/100+")";

                const vacancyLeft = "transparent "+(+radius.position - +1 - +radius.blur)+posType;
                const colorLeft = rgbString+" "+radius.position+posType;
                const colorRight = rgbString+" "+(+radius.position - +1 + +radius.size)+posType;
                const vacancyRight = "transparent "+(+radius.position + +radius.size + +radius.blur)+posType;

                backgroundImageCode += vacancyLeft+", "+colorLeft+", "+colorRight+", "+vacancyRight;

                if(radiusIndex < (radial.rays.length-1))
                {
                    backgroundImageCode += ", ";
                }
                else
                {
                    backgroundImageCode += ") ";
                }              
            })
            
            backgroundPosCode += radial.vertical+"px "+radial.horizontal+"px";
            backgroundSizeCode += (radial.autoSize == true)? props.data.width+"px "+props.data.height+"px" : radial.width+"px "+radial.height+"px";

            if(radialIndex < (props.data.radials.length-1))
            {
                backgroundImageCode += ", ";
                backgroundPosCode += ", ";
                backgroundSizeCode += ", ";
            }

        })
    }
    
    
    let repeat = true;
    
    if(props.data.repeat == true)
    {
        repeat = "repeat";
    }
    else
    {
        repeat = "no-repeat";
    }
    
    let CanvasStyle = {backgroundImage: backgroundImageCode, backgroundPosition: backgroundPosCode, backgroundColor: props.data.bacgroundColor, backgroundSize: backgroundSizeCode, backgroundRepeat: repeat};
    
    return(<div id="code-div" style={CanvasStyle}></div>);
}


export {Canvas}