import React, { Component } from "react";
import ReactDOM from "react-dom";

import hexToRgb from "../hex-to-rgb.js"

import style from "./preview.scss";

const Preview = (props) =>
{

    const posType = props.data.positioning;
    let Layers = [];
    
    
//LINEARS    
    if(props.data.linears.length > 0)
    {
        props.data.linears.map( (linear, linearindex) =>
        {
            let backgroundImageCode = "";

            
            backgroundImageCode = "linear-gradient("+linear.direction+"deg, ";
            linear.lines.map( (line, lineIndex) => 
            {
                const colorArray = hexToRgb(line.color);
                const rgbString = "rgba("+colorArray[0]+", "+colorArray[1]+", "+colorArray[2]+", "+line.opacity/100+")";
                
                if(props.data.positioning == "%") 
                {        
                    const vacancyLeft = "transparent "+(+line.position - +line.blur)+posType;
                    const colorLeft = rgbString+" "+line.position+posType;
                    const colorRight = rgbString+" "+(+line.position + +line.size)+posType;
                    const vacancyRight = "transparent "+(+line.position + +line.size + +line.blur)+posType;
                    
                    backgroundImageCode += vacancyLeft+", "+colorLeft+", "+colorRight+", "+vacancyRight;
                }
                else if(props.data.positioning == "px")
                {
                    const position = line.position * props.data.zoom;
                    const size = line.size * props.data.zoom;
                    
                    const vacancyLeft = "transparent "+(+position - +line.blur)+posType;
                    const colorLeft = rgbString+" "+position+posType;
                    const colorRight = rgbString+" "+(+position + +size)+posType;
                    const vacancyRight = "transparent "+(+position + +size + +line.blur)+posType;
                    
                    backgroundImageCode += vacancyLeft+", "+colorLeft+", "+colorRight+", "+vacancyRight;
                }
                backgroundImageCode += (lineIndex < (linear.lines.length-1)) ? ", " : ") ";

            })
            
            const autoWidth = props.data.width * props.data.zoom;
            const autoHeight = props.data.height * props.data.zoom;
            const width = linear.width * props.data.zoom;
            const height = linear.height * props.data.zoom;
            
            let backgroundPosCode = (+linear.vertical * +props.data.zoom)+"px "+ (+linear.horizontal * +props.data.zoom)+"px";
            let backgroundWidthCode = (linear.autoSize == true)? autoWidth : width;
            let backgroundHeightCode = (linear.autoSize == true)? autoHeight : height;
            
            const visibility = (linear.visible == true) ? "visible" : "hidden";
            const grid = linear.grid;
            
            
            const tempLayer = {image: backgroundImageCode, position: backgroundPosCode, isVisible: visibility, isGrid: grid, width: backgroundWidthCode, height: backgroundHeightCode};
            Layers.push(tempLayer);
            
        })
    }
    
//RADIALS    
    if(props.data.radials.length > 0)
    {
        props.data.radials.map( (radial, radialIndex) =>
        {
            
            let backgroundImageCode = "";
            
            if(props.data.positioning == "%")
            {
                backgroundImageCode += "radial-gradient("+radial.shape+" "+radial.size+" at "+radial.posx+posType+" "+radial.posy+posType+", ";    
            }
            else if(props.data.positioning == "px")
            {
                const posx = radial.posx * props.data.zoom;
                const posy = radial.posy * props.data.zoom;
                backgroundImageCode += "radial-gradient("+radial.shape+" "+radial.size+" at "+posx+posType+" "+posy+posType+", ";  
            }
            
            radial.rays.map( (radius, radiusIndex) => 
            {
                const color = hexToRgb(radius.color);
                const rgbString = "rgba("+color[0]+", "+color[1]+", "+color[2]+", "+radius.opacity/100+")";
                
                
                if(props.data.positioning == "%")
                {
                    const vacancyLeft = "transparent "+(+radius.position - +1 - +radius.blur)+posType;
                    const colorLeft = rgbString+" "+radius.position+posType;
                    const colorRight = rgbString+" "+(+radius.position - +1 + +radius.size)+posType;
                    const vacancyRight = "transparent "+(+radius.position + +radius.size + +radius.blur)+posType;
                    
                    backgroundImageCode += vacancyLeft+", "+colorLeft+", "+colorRight+", "+vacancyRight;
                }
                else if(props.data.positioning == "px") 
                {
                    const position = radius.position * props.data.zoom;
                    const size = radius.size * props.data.zoom;
                    
                    const vacancyLeft = "transparent "+(+position - +1 - +radius.blur)+posType;
                    const colorLeft = rgbString+" "+position+posType;
                    const colorRight = rgbString+" "+(+position - +1 + +size)+posType;
                    const vacancyRight = "transparent "+(+position + +size + +radius.blur)+posType;
                    
                    backgroundImageCode += vacancyLeft+", "+colorLeft+", "+colorRight+", "+vacancyRight;
                }
                if(radiusIndex < (radial.rays.length-1))
                {
                    backgroundImageCode += ", ";
                }
                else
                {
                    backgroundImageCode += ") ";
                }

            })
            
            const autoWidth = props.data.width * props.data.zoom;
            const autoHeight = props.data.height * props.data.zoom;
            const width = radial.width * props.data.zoom;
            const height = radial.height * props.data.zoom;

            let backgroundPosCode = (+radial.vertical * +props.data.zoom)+"px "+ (+radial.horizontal * +props.data.zoom)+"px";
            let backgroundWidthCode = (radial.autoSize == true)? autoWidth : width;
            let backgroundHeightCode = (radial.autoSize == true)? autoHeight : height;
            
            const visibility = (radial.visible == true) ? "visible" : "hidden";
            const grid = radial.grid;
            
            const tempLayer = {image: backgroundImageCode, position: backgroundPosCode, isVisible: visibility, isGrid: grid, width: backgroundWidthCode, height: backgroundHeightCode};
            Layers.push(tempLayer);

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
    
    const length = Layers.length;
    
    const LayerDivs = Layers.map((value, index) =>
    { 
        const CanvasStyle = {backgroundImage: Layers[length-index-1].image, backgroundSize: Layers[length-index-1].width+"px "+Layers[length-index-1].height+"px", backgroundPosition: Layers[length-index-1].position, backgroundRepeat: repeat, visibility: Layers[length-index-1].isVisible};    
    
        let layerGridStyle;
        
        if (Layers[length-index-1].isGrid == true)
        {  
            const color = hexToRgb(props.data.bacgroundColor);  
            const gridColor = (color[0]+color[1]+color[2] < 382) ? "rgb(255,255,255)" : "rgb(0,0,0)";
            
            layerGridStyle = 
            { 
                backgroundImage: 
                "linear-gradient(90deg,transparent "+((+Layers[length-index-1].width * +props.data.zoom) - 1)+"px, "+gridColor+" "+((+Layers[length-index-1].width * +props.data.zoom) - 1)+"px, "+gridColor+" "+(+Layers[length-index-1].width * +props.data.zoom)+"px), linear-gradient(180deg,transparent "+(+Layers[length-index-1].height * +props.data.zoom - 1)+"px, "+gridColor+" "+(+Layers[length-index-1].height * +props.data.zoom - 1)+"px, "+gridColor+" "+(+Layers[length-index-1].height * +props.data.zoom)+"px)",
                backgroundSize: (+Layers[length-index-1].width * +props.data.zoom)+"px "+ (+Layers[length-index-1].height * +props.data.zoom)+"px", backgroundPosition: Layers[length-index-1].position

            }; 
            
            console.log(layerGridStyle.backgroundImage);

        }
        else 
        {
            layerGridStyle = 
            { 
                backgroundImage: ""
            }
        }
        
        
        return(
        <div className="layer" style={CanvasStyle} key={index}>    
            <div className="grid" style={layerGridStyle}>
            </div>
        </div>
        )
    }
    );
        
    

    let areaStyle = {backgroundColor: props.data.bacgroundColor};
    let canvasGridStyle;
    
    
    if ((props.data.width > 0 && props.data.height > 0) && props.data.grid == true)
    {  
        
        const color = hexToRgb(props.data.bacgroundColor);  
        const gridColor = (color[0]+color[1]+color[2] < 382) ? "rgb(255,255,255)" : "rgb(0,0,0)";
        
        canvasGridStyle = 
        { 
            backgroundImage: 
            "linear-gradient(90deg,transparent "+(+props.data.width * +props.data.zoom - 1)+"px, "+gridColor+" "+(+props.data.width * +props.data.zoom - 1)+"px, "+gridColor+" "+(+props.data.width * +props.data.zoom)+"px),"
            +"linear-gradient(180deg,transparent "+(+props.data.height * +props.data.zoom - 1)+"px, "+gridColor+" "+(+props.data.width * +props.data.zoom -1)+"px, "+gridColor+" "+(+props.data.height * +props.data.zoom)+"px)",
            
            backgroundSize: (+props.data.width * +props.data.zoom)+"px "+ (+props.data.height * +props.data.zoom)+"px"
 
        }; 
        

        
    }
    else 
    {
        canvasGridStyle = 
        { 
            backgroundImage: ""
        }
    }
    
    
    
    
    
        return(
        <div id="canvas" style={areaStyle}>
            {LayerDivs}
            <div className="grid" style={canvasGridStyle}></div>
        </div>
        );
}


export {Preview}