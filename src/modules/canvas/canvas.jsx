import React, { Component } from "react";
import ReactDOM from "react-dom";

import hexToRgb from "../hex-to-rgb.js"

import style from "./canvas.scss";

const Canvas = (props) =>
{
    let backgroundImageCode = "";
    let backgroundPosCode = "";
    let backgroundSizeCode = "";
    const posType = props.data.positioning;
    let sameBackgroundSize = true;
    let prevBackgroundSize = "";
    
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
                
                const vacancyLeftPos = +line.position - +line.blur;
                const vacancyLeft = (vacancyLeftPos <= 0) ? "" : "transparent "+vacancyLeftPos+posType+", ";

                const colorLeftPos = line.position;
                const colorLeft = (colorLeftPos <=0) ? "" : rgbString+" "+colorLeftPos+posType+", ";

                const colorRightPos =  +line.position + +line.size
                const colorRight = rgbString+" "+colorRightPos+posType+", ";

                const vacancyRightPos = +line.position + +line.size + +line.blur;
                const vacancyRight = "transparent "+vacancyRightPos+posType;
                
                backgroundImageCode += vacancyLeft+colorLeft+colorRight+vacancyRight;
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
            
            const backgroundSize = (linear.autoSize == true)? props.data.width+"px "+props.data.height+"px" : linear.width+"px "+linear.height+"px";
            backgroundSizeCode += backgroundSize;

            //background-size code optimization (if all values are the same the code will contain one position)
            if(sameBackgroundSize && prevBackgroundSize === "")
            {
                prevBackgroundSize = backgroundSize;
            }
            else if(backgroundSize !== prevBackgroundSize) sameBackgroundSize = false;

            
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

                const vacancyLeftPos = +radius.position - +1 - +radius.blur
                const vacancyLeft = (vacancyLeftPos <= 0) ? "" : "transparent "+vacancyLeftPos+posType+", ";

                const colorLeftPos = radius.position;
                const colorLeft = (colorLeftPos <= 0) ? "" : rgbString+" "+colorLeftPos+posType+", ";

                const colorRightPos = +radius.position - +1 + +radius.size;
                const colorRight =  rgbString+" "+colorRightPos+posType;

                const vacancyRightPos = +radius.position + +radius.size + +radius.blur 
                const vacancyRight = "transparent "+vacancyRightPos+posType;

                backgroundImageCode += vacancyLeft+colorLeft+colorRight+vacancyRight;

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
            
            const backgroundSize = (radial.autoSize == true)? props.data.width+"px "+props.data.height+"px" : radial.width+"px "+radial.height+"px";
            backgroundSizeCode += backgroundSize;

            //background-size code optimization
            if(sameBackgroundSize && prevBackgroundSize === "")
            {
                prevBackgroundSize = backgroundSize;
            }
            else if(backgroundSize !== prevBackgroundSize) sameBackgroundSize = false;

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
      //repeat = "repeat";
        repeat = ""; //optimization
    }
    else
    {
        repeat = "no-repeat";
    }

    //background-size code optimization
    const tempBackgroundSizeCode = (sameBackgroundSize) ? prevBackgroundSize : backgroundSizeCode;
    
    let CanvasStyle = {backgroundImage: backgroundImageCode, backgroundPosition: backgroundPosCode, backgroundColor: props.data.backgroundColor, backgroundSize: tempBackgroundSizeCode, backgroundRepeat: repeat};
    
    return(<div id="code-div" style={CanvasStyle}></div>);
}


export {Canvas}