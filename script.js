import {Logo, Links, Ads, Footer} from "./visuals.jsx"


//https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb/5624139
function hexToRgb(hex) 
{
      // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) 
    {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    const r = parseInt(result[1], 16);
    const g = parseInt(result[2], 16);
    const b = parseInt(result[3], 16);

    const rgb = [r,g,b];

    return rgb;
    
}



////////////////////////////////////////////////////////////////////////MAIN CONTROL/////////////////////////////////////////////////////////////////////////

const Controls = (props) =>
{
    
    const bacgroundColor = props.data.bacgroundColor;
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
                    value={bacgroundColor}
                    onChange={props.handleChange}
                    placeholder="HTML code..."/>
            </div>
            <div className="control-triger">
                <div className="control-name">width</div>

                <input min="2" type="number" value={width} onChange={props.handleChangeWidth}/>
            </div>
            <div className="control-triger">
                <div className="control-name">height</div>

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





const Buttons = (props) =>
{
    
    return(
        
        <div id="moduleB">
            <button onClick={props.addLinear} className="control-button">add linear</button>
            <button onClick={props.addRadial} className="control-button">add radial</button>
            <div className="dropdown">
                <button className="control-button">examples</button>
                <div className="dropdown-content">
                    <button onClick={props.setWeaves}><img src="weaves.png"/></button>
                    <button onClick={props.setCarbon}><img src="carbon.png"/></button>
                    <button onClick={props.setMicrobial}><img src="microbial.png"/></button>
                    <button onClick={props.setShippo}><img src="shippo.png"/></button>
                    <button onClick={props.setStairs}><img src="stairs.png"/></button>
                    <button onClick={props.setBricks}><img src="bricks.png"/></button>
                    <button onClick={props.setHearts}><img src="hearts.png"/></button>
                </div>
            </div>
        </div>
    );
}

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
                        handleGrid={props.pointer.handleShowGrid} 
                        handlePositioning={props.pointer.handlePositioning} 
                        handleZoom={props.pointer.handleZoom} 
                    />
                        
                    <Buttons 
                        addLinear={props.pointer.handleAddLinear} 
                        addRadial={props.pointer.handleAddRadial} 
                        setHearts={props.pointer.handleSetHearts} 
                        setBricks={props.pointer.handleSetBricks} 
                        setStairs={props.pointer.handleSetStairs} 
                        setShippo={props.pointer.handleSetShippo} 
                        setMicrobial={props.pointer.handleSetMicrobial} 
                        setWeaves={props.pointer.handleSetWeaves} 
                        setCarbon={props.pointer.handleSetCarbon}
                    />
            </div>
        </div>
    );
}

////////////////////////////////////////////////////////////////////////LIST/////////////////////////////////////////////////////////////////////////////////

const List = (props) =>
{
    
    const linears = props.data.linears;
    const radials = props.data.radials;
    const activeType = props.data.selected.type;
    const activeIndex = props.data.selected.index;
    
    const itemsLinears = linears.map((value,index) => 
            <div key={index} className={(activeType == "linear" && activeIndex == index) ? "list-item-active" : "list-item"}>
                <button 
                    onClick={ (e) => props.handleChangeLayer("linear",index)} 
                    className="text">Linear {index}
                </button>
                <button onClick={ (e) => props.handleVisibility("linear",index)}  className={(value.visible == true) ? "eye-icon-active" : "eye-icon"}><i className="icon-eye"></i></button>
                <button onClick={ (e) => props.handleGrid("linear",index)}  className={(value.grid == true) ? "grid-icon-active" : "grid-icon"}><i className="icon-grid"></i></button>
            </div>
    );

    const itemsRadials = radials.map((value,index) => 
        <div key={index} className={(activeType == "radial" && activeIndex == index) ? "list-item-active" : "list-item"}>
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

////////////////////////////////////////////////////////////////////////LINEARS//////////////////////////////////////////////////////////////////////////////

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

////////////////////////////////////////////////////////////////////////RADIALS//////////////////////////////////////////////////////////////////////////////

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

////////////////////////////////////////////////////////////////////////PROPERTIES///////////////////////////////////////////////////////////////////////////

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

////////////////////////////////////////////////////////////////////////GENERATED CODE///////////////////////////////////////////////////////////////////////        

const Code = (props) =>
{  
    return(
        <div className="area" id="code">
            <div className="card">
                <div id="codeButton">
                    <button onClick={props.handle} >Generate CSS</button>
                </div>
                <div id="codeText">
                    <textarea id="code-output" value={props.code} readOnly>
                        
                    </textarea>    
                </div>
            </div>
        </div>
    );
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////MAIN COMPONENT/////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class App extends React.Component
{
    constructor()
    {
        super();
        
        this.state = 
        {
            bacgroundColor: "#ffffff",
            width: 100,
            height: 100,
            zoom: 1.0,
            code: "press button to generate...",
            grid: true,
            repeat: true,
            positioning: "%",
            linears: [],
            radials: [],
            selected:
            {
                type: "none",
                index: 0
            }
        }
        
        //PATTERN EDITION
        this.handleAddLinear = this.handleAddLinear.bind(this);
        this.handleAddLine = this.handleAddLine.bind(this);
        this.handleDeleteLine = this.handleDeleteLine.bind(this);
        
        this.handleAddRadial = this.handleAddRadial.bind(this);
        this.handleAddRadius = this.handleAddRadius.bind(this);
        this.handleDeleteRadius = this.handleDeleteRadius.bind(this);
        
        //LIST
        this.handleChangeLayer = this.handleChangeLayer.bind(this);
        this.handleSetVisibility = this.handleSetVisibility.bind(this);
        this.handleSetGrid = this.handleSetGrid.bind(this);
        
        //MAIN CONTROL
        this.handleBackgroundInput = this.handleBackgroundInput.bind(this);
        this.handleWidthInput = this.handleWidthInput.bind(this);
        this.handleHeightInput = this.handleHeightInput.bind(this);
        this.handleShowGrid = this.handleShowGrid.bind(this);
        this.handleRepeat = this.handleRepeat.bind(this);
        this.handlePositioning = this.handlePositioning.bind(this);
        this.handleZoom = this.handleZoom.bind(this);
        
        //INPUT HANDLE
        this.handleChangeInput = this.handleChangeInput.bind(this);
        
        //EXAMPLES
        this.handleSetHearts = this.handleSetHearts.bind(this);
        this.handleSetBricks = this.handleSetBricks.bind(this);
        this.handleSetStairs = this.handleSetStairs.bind(this);
        this.handleSetMicrobial = this.handleSetMicrobial.bind(this);
        this.handleSetWeaves = this.handleSetWeaves.bind(this);
        this.handleSetCarbon = this.handleSetCarbon.bind(this);
        this.handleSetShippo = this.handleSetShippo.bind(this);
        
        //GENERATE BUTTON
        this.handleGenerateButton = this.handleGenerateButton.bind(this);
        
        
    }
    
////////////////////////////////////////////////////////////////////////PATTERN EDITION////////////////////////////////////////////////////////////////////////    
    
//////LINEARS
    handleAddLinear()
    {
        let tempLine = {};
        let tempLinear = {};
        tempLine = {position: 0, color: "#000000", size: 5, opacity: 100, blur: 0};
        
        if(this.state.linears.length == 0)
        {
            
            tempLinear = {direction: 90, width: 0, height: 0, autoSize: true, vertical: 0, horizontal: 0, visible: true, grid: "false", lines: []};
            tempLinear.lines.push(tempLine);
        }
        else
        {
            const length =  this.state.linears.length;
            tempLinear = JSON.parse(JSON.stringify(this.state.linears[length-1]));

        }
        
        
        this.setState({linears: [...this.state.linears, tempLinear]});
        
    }
    
    handleAddLine(LinearIndex)
    {
        
        const length = this.state.linears[LinearIndex].lines.length;
        let tempLine = {};
        Object.assign(tempLine,this.state.linears[LinearIndex].lines[length-1]);
        
        this.setState( () =>
        {
            let linears = this.state.linears;
            linears[LinearIndex].lines = [...this.state.linears[LinearIndex].lines, tempLine];
            return{linears,};      
        }
        );
        
    }
    
    handleDeleteLine(LinearIndex,LineIndex)
    {
        
        this.setState(() => 
        {              

                        let linears = this.state.linears;
                        linears[LinearIndex].lines.splice(LineIndex,1);
                        if(linears[LinearIndex].lines.length == 0)
                            {
                                linears.splice(LinearIndex,1);
                                let selected = this.state.selected;
                                if(linears.length>0)
                                {
                                    if(selected.index>0) selected.index -= 1;   
                                }
                                else
                                {
                                    selected.type = "none";
                                }
                                return{linears,selected};
                            }
                        return{linears};         
               
        });
         
    }
    
////RADIALS
    
    handleAddRadial()
    {
        let tempRadius = {};
        let tempRadial = {};
        tempRadius = {position: "0", color: "#000000", size: 5, opacity: 100, blur: 0};
        
        if(this.state.radials.length == 0)
        {
            
            tempRadial = {shape: "ellipse ", autoSize: true, size: "farthest-corner", posx: 50, posy: 50, vertical: 0, horizontal: 0, visible: true, grid: false, rays: []};
            tempRadial.rays.push(tempRadius);
        }
        else
        {
            const length =  this.state.radials.length;
            tempRadial = JSON.parse(JSON.stringify(this.state.radials[length-1]));

        }
        
        
        this.setState({radials: [...this.state.radials, tempRadial]});
    }
    
    handleAddRadius(RadialIndex)
    {
        const length = this.state.radials[RadialIndex].rays.length;
        let tempRadius = {};
        Object.assign(tempRadius,this.state.radials[RadialIndex].rays[length-1]);
        
        this.setState( () =>
        {
            let radials = this.state.radials;
            radials[RadialIndex].rays = [...this.state.radials[RadialIndex].rays, tempRadius];
            return{radials,};      
        }
        );
    }
    
    handleDeleteRadius(radialIndex,radiusIndex)
    {
        this.setState(() => 
        {              

                        let radials = this.state.radials;
                        radials[radialIndex].rays.splice(radiusIndex,1);
                        if(radials[radialIndex].rays.length == 0)
                            {
                                radials.splice(radialIndex,1);
                                let selected = this.state.selected;
                                if(radials.length>0)
                                {
                                    if(selected.index>0) selected.index -= 1;
                                }
                                else
                                {
                                    selected.type = "none";
                                }
                                return{radials,selected};
                            }
                        return{radials};         
               
        });
    }

////////////////////////////////////////////////////////////////////////LIST///////////////////////////////////////////////////////////////////////////////////
    
    handleChangeLayer(type,index)
    {
        
        const newSelected = {type: type, index: index};
        this.setState({selected: newSelected});
    }
    
    handleSetVisibility(type, index)
    {
        switch(type)
            {
                case "linear":
                    {
                        const newLinears = this.state.linears;
                        if(this.state.linears[index].visible == true) 
                            {
                                newLinears[index].visible = false;
                            }
                        else
                            {
                                newLinears[index].visible = true;
                            }
                        this.setState({linears: newLinears});
                        break;
                    }
                case "radial":
                    {
                        const newRadials = this.state.radials;
                        if(this.state.radials[index].visible == true) 
                            {
                                newRadials[index].visible = false;
                            }
                        else
                            {
                                newRadials[index].visible = true;
                            }
                        this.setState({radials: newRadials});
                        break;
                    }
            }
    }
    
    handleSetGrid(type, index)
    {
        switch(type)
            {
                case "linear":
                    {
                        const newLinears = this.state.linears;
                        if(this.state.linears[index].grid == true) 
                            {
                                newLinears[index].grid = false;
                            }
                        else
                            {
                                newLinears[index].grid = true;
                            }
                        this.setState({linears: newLinears});
                        break;
                    }
                case "radial":
                    {
                        const newRadials = this.state.radials;
                        if(this.state.radials[index].grid == true) 
                            {
                                newRadials[index].grid = false;
                            }
                        else
                            {
                                newRadials[index].grid = true;
                            }
                        this.setState({radials: newRadials});
                        break;
                    }
            }
    }
    
////////////////////////////////////////////////////////////////////////MAIN CONTROL///////////////////////////////////////////////////////////////////////////
    
    handleShowGrid()
    {
        switch(this.state.grid)
            {
                case false:
                    {
                        this.setState({grid: true});
                        break;
                    }
                case true:
                    {
                        this.setState({grid: false});
                        break;
                    }
            }
    }
    
    handleRepeat()
    {
        switch(this.state.repeat)
            {
                case false:
                    {
                        this.setState({repeat: true});
                        break;
                    }
                case true:
                    {
                        this.setState({repeat: false});
                        break;
                    }
            }
    }
    
    handleZoom(event)
    {
        this.setState({zoom: event.target.value});
    }
    
    handleWidthInput(event)
    {
        this.setState({width: event.target.value});
        
    }
    
    handleHeightInput(event)
    {
        this.setState({height: event.target.value});
    }
    
    handleBackgroundInput(event)
    {
        this.setState({bacgroundColor: event.target.value});
    }
    
    handlePositioning(event)
    {
        this.setState({positioning: event.target.value});
    }
    
////////////////////////////////////////////////////////////////////////INPUT HANDLE///////////////////////////////////////////////////////////////////////////
    
    handleChangeInput(type,firstIndex,secondIndex,inputName)
    {
        let newLinears = this.state.linears;
        let newRadials = this.state.radials;
        const value = event.target.value;
        
        switch(type)
        {
            case "linear":
                {
                    switch(inputName)
                    {
                        //LINEAR PROPERTIES
                        case "direction": 
                            {
                                if(value >= 0 && value <= 360)
                                {
                                    newLinears[firstIndex].direction = value;   
                                } 
                                break;
                            }
                        case "vertical": 
                            {
                                if(value >= 0 - +this.state.width && value <= +this.state.width)
                                {
                                    newLinears[firstIndex].vertical= value;
                                }
                                break;
                            }
                        case "horizontal": 
                            {
                                if(value >= 0 - +this.state.height && value <= +this.state.height)
                                {
                                    newLinears[firstIndex].horizontal= value;
                                } 
                                break;
                            }
                        case "auto-size":
                            {
                                if(this.state.linears[firstIndex].autoSize == true)
                                {
                                    newLinears[firstIndex].width = this.state.width;
                                    newLinears[firstIndex].height = this.state.height;
                                    newLinears[firstIndex].autoSize = false;
                                }
                                else
                                {
                                    newLinears[firstIndex].autoSize = true;           
                                }
                                break;
                            }
                        case "width":
                            {
                                if(value >= 2)
                                {
                                    newLinears[firstIndex].width = value;
                                }
                                break;
                            }
                        case "height":
                            {
                                if(value >= 2)
                                {
                                    newLinears[firstIndex].height = value;
                                }
                                break;
                            }


                        //LINE PROPERTIES
                        case "position": 
                            {
                                if(value >= 0)
                                {
                                    newLinears[firstIndex].lines[secondIndex].position = value;
                                } 
                                break;
                            }
                        case "size": 
                            {
                                if(value > 0)
                                {
                                    newLinears[firstIndex].lines[secondIndex].size = value;
                                }
                                break;
                            }
                        case "color": 
                            {
                                newLinears[firstIndex].lines[secondIndex].color = value; 
                                break;
                            }
                        case "opacity": 
                            {
                                if(value >=0 && value <=100)
                                {
                                    newLinears[firstIndex].lines[secondIndex].opacity = value;
                                }
                                break;
                            }
                        case "blur": 
                            {
                                if(value >= 0)
                                {
                                    newLinears[firstIndex].lines[secondIndex].blur = event.target.value;
                                } 
                                break;
                            }
                    }
                    break;
                }
            case "radial":
            {
                switch(inputName)
                    {
                        //LINEAR PROPERTIES
                        case "shape":
                            {
                                newRadials[firstIndex].shape = value; 
                                break;    
                            }
                        case "extent":
                            {
                                newRadials[firstIndex].size = value;
                                break;
                            }
                        case "posx":
                            {
                                newRadials[firstIndex].posx = value;
                                break;
                            }
                        case "posy":
                            {
                                newRadials[firstIndex].posy = value;
                                break;
                            }
                        case "vertical": 
                            {
                                newRadials[firstIndex].vertical = value;
                                break;
                            }
                        case "horizontal": 
                            {
                                newRadials[firstIndex].horizontal = value;
                                break;
                            }
                        case "auto-size":
                            {
                                if(this.state.radials[firstIndex].autoSize == true)
                                {
                                    newRadials[firstIndex].width = this.state.width;
                                    newRadials[firstIndex].height = this.state.height;
                                    newRadials[firstIndex].autoSize = false;
                                }
                                else
                                {
                                    newRadials[firstIndex].autoSize = true;           
                                }
                                break;
                            }
                        case "width":
                            {
                                if(value >= 2)
                                {
                                    newRadials[firstIndex].width = value;
                                }
                                break;
                            }
                        case "height":
                            {
                                if(value >= 2)
                                {
                                    newRadials[firstIndex].height = value;
                                }
                                break;
                            }
                            
                        //LINE PROPERTIES
                        case "position": 
                            {
                                newRadials[firstIndex].rays[secondIndex].position = value;
                                break;
                            }
                        case "size": 
                            {
                                newRadials[firstIndex].rays[secondIndex].size = value;
                                break;
                            }
                        case "color": 
                            {
                                newRadials[firstIndex].rays[secondIndex].color = value;
                                break;
                            }
                        case "opacity": 
                            {
                                newRadials[firstIndex].rays[secondIndex].opacity = value;
                                break;
                            }
                        case "blur": 
                            {
                                newRadials[firstIndex].rays[secondIndex].blur = value;
                                break;
                            }
                    }
                break;
            }
        }
        
        this.setState({linears: newLinears});
    }
    
////////////////////////////////////////////////////////////////////////EXAMPLES///////////////////////////////////////////////////////////////////////////////
    
    handleSetHearts()
    {
        const tempRadials = [{
            shape: "circle",
            size: "closest-side",
            posx: 60,
            posy: 43,
            vertical: 50,
            horizontal: 50,
            visible: true, 
            grid: false,
            autoSize: true,
            rays: [{
                position: 0,
                color: "#bb0033",
                size: 26,
                opacity: 100,
                blur: 1
            }]
        },
        {
            shape: "circle",
            size: "closest-side",
            posx: 40,
            posy: 43,
            vertical: 50,
            horizontal: 50,
            visible: true, 
            grid: false,
            autoSize: true,
            rays: [{
                position: 0,
                color: "#bb0033",
                size: 26,
                opacity: 100,
                blur: 1
            }]
        },
        {
            shape: "circle",
            size: "closest-side",
            posx: 40,
            posy: 22,
            vertical: 50,
            horizontal: 50,
            visible: true, 
            grid: false,
            autoSize: true,
            rays: [{
                position: 0,
                color: "#dd3355",
                size: 45,
                opacity: 100,
                blur: 1
            }]
        },
        {
            shape: "circle",
            size: "closest-side",
            posx: 60,
            posy: 22,
            vertical: 50,
            horizontal: 50,
            visible: true, 
            grid: false,
            autoSize: true,
            rays: [{
                position: 0,
                color: "#dd3355",
                size: 45,
                opacity: 100,
                blur: 1
            }]
        },
        {
            shape: "circle",
            size: "closest-side",
            posx: 50,
            posy: 35,
            vertical: 50,
            horizontal: 50,
            visible: true, 
            grid: false,
            autoSize: true,
            rays: [{
                position: 0,
                color: "#dd3355",
                size: 30,
                opacity: 100,
                blur: 1
            }]
        }
        ];
        
        this.setState({radials: tempRadials, linears: [], width: 100, height: 100, positioning: "%", bacgroundColor: "#bb0033", selected: {type: "none", index: 0}});
    }
    
    handleSetBricks()
    {
        const tempLinears = [{
            direction: 335,
            vertical: 0,
            horizontal: 2,
            visible: true, 
            grid: false,
            autoSize: true,
            lines: [
                {
                    position: 0,
                    color: "#bb0000",
                    size: 23,
                    opacity: 100,
                    blur: 0
                }
            ]
            
        },
        {
            direction: 155,
            vertical: 4,
            horizontal: 35,
            visible: true, 
            grid: false,
            autoSize: true,
            lines: [
                {
                    position: 0,
                    color: "#dd0000",
                    size: 23,
                    opacity: 100,
                    blur: 0
                }
            ]
        },
        {
            direction: 335,
            vertical: 29,
            horizontal: 31,
            visible: true, 
            grid: false,
            autoSize: true,
            lines: [
                {
                    position: 0,
                    color: "#bb0000",
                    size: 23,
                    opacity: 100,
                    blur: 0
                }
            ]
        },
        {
            direction: 155,
            vertical: 34,
            horizontal: 6,
            visible: true, 
            grid: false,
            autoSize: true,
            lines: [
                {
                    position: 0,
                    color: "#dd0000",
                    size: 23,
                    opacity: 100,
                    blur: 0
                }
            ]
        }];
        
        this.setState({linears: tempLinears, radials: [], width: 58, height: 58, positioning: "px", bacgroundColor: "#c0c0c0", selected: {type: "none", index: 0}});
    }
    
    handleSetStairs()
    {

        const tempLinears = [{
            direction: 64,
            vertical: 7,
            horizontal: 0,
            visible: true, 
            grid: false,
            autoSize: true,
            lines: [
                {
                    position: 0,
                    color: "#999999",
                    size: 22,
                    opacity: 100,
                    blur: 0
                }
            ]
            
        },
        {
            direction: 63,
            vertical: 0,
            horizontal: 0,
            visible: true, 
            grid: false,
            autoSize: true,
            lines: [
                {
                    position: 78,
                    color: "#999999",
                    size: 22,
                    opacity: 100,
                    blur: 2
                }
            ]
        },
        {
            direction: 63,
            vertical: 0,
            horizontal: 0,
            visible: true, 
            grid: false,
            autoSize: true,
            lines: [
                {
                    position: 38,
                    color: "#999999",
                    size: 20,
                    opacity: 100,
                    blur: 2
                }
            ]
        }];
        
        
        this.setState({linears: tempLinears, radials: [], width: 16, height: 48, positioning: "%", bacgroundColor: "#444444", selected: {type: "none", index: 0}});
        
        
    }
    
    handleSetShippo()
    {
        const tempRadials = [{
            shape: "ellipse",
            size: "closest-side",
            posx: 50,
            posy: 50,
            vertical: 0,
            horizontal: 0,
            visible: true, 
            grid: false,
            autoSize: true,
            rays: [{
                position: 99,
                color: "#000000",
                size: 45,
                opacity: 30,
                blur: 0
            }]
        },
        {
            shape: "ellipse",
            size: "closest-side",
            posx: 50,
            posy: 50,
            vertical: 40,
            horizontal: 40,
            visible: true, 
            grid: false,
            autoSize: true,
            rays: [{
                position: 99,
                color: "#000000",
                size: 45,
                opacity: 30,
                blur: 0
            }]
        }
        ];
        
        this.setState({radials: tempRadials, linears: [], width: 80, height: 80, positioning: "%", bacgroundColor: "#ddeeff", selected: {type: "none", index: 0}});
    }
    
    handleSetMicrobial()
    {
        const tempRadials = [{
            shape: "circle",
            size: "farthest-corner",
            posx: 0,
            posy: 10,
            vertical: 0,
            horizontal: 10,
            visible: true, 
            grid: false,
            autoSize: true,
            rays: [{
                position: 10,
                color: "#661133",
                size: 1,
                opacity: 100,
                blur: 0
            }]
        },
        {
            shape: "ellipse",
            size: "farthest-corner",
            posx: 20,
            posy: 20,
            vertical: 0,
            horizontal: 0,
            visible: true, 
            grid: false,
            autoSize: true,
            rays: [{
                position: 10,
                color: "#661133",
                size: 1,
                opacity: 100,
                blur: 0
            }]
        }
        ];
        
        this.setState({radials: tempRadials, linears: [], width: 20, height: 20, positioning: "px", bacgroundColor: "#88aa33", selected: {type: "none", index: 0}});
    }
    
    handleSetCarbon()
    {
        const tempLinears = [{
            direction: 27,
            vertical: 0,
            horizontal: 5,
            visible: true, 
            grid: false,
            autoSize: true,
            lines: [
                {
                    position: 0,
                    color: "#151515",
                    size: 5,
                    opacity: 100,
                    blur: 0
                }
            ]},
            {
            direction: 207,
            vertical: 10,
            horizontal: 0,
            visible: true, 
            grid: false,
            autoSize: true,
            lines: [
                {
                    position: 0,
                    color: "#151515",
                    size: 5,
                    opacity: 100,
                    blur: 0
                }
            ]},
            {
            direction: 27,
            vertical: 0,
            horizontal: 10,
            visible: true, 
            grid: false,
            autoSize: true,
            lines: [
                {
                    position: 0,
                    color: "#222222",
                    size: 5,
                    opacity: 100,
                    blur: 0
                }
            ]},
            {
            direction: 207,
            vertical: 10,
            horizontal: 5,
            visible: true, 
            grid: false,
            autoSize: true,
            lines: [
                {
                    position: 0,
                    color: "#222222",
                    size: 5,
                    opacity: 100,
                    blur: 0
                }
            ]},
            {
            direction: 90,
            vertical: 0,
            horizontal: 0,
            visible: true, 
            grid: false,
            autoSize: true,
            lines: [
                {
                    position: 0,
                    color: "#1b1b1b",
                    size: 10,
                    opacity: 100,
                    blur: 0
                }
            ]},
            {
            direction: 180,
            vertical: 0,
            horizontal: 0,
            visible: true, 
            grid: false,
            autoSize: true,
            lines: [
                {
                    position: 0,
                    color: "#1d1d1d",
                    size: 5,
                    opacity: 100,
                    blur: 0
                },
                {
                    position: 5,
                    color: "#1a1a1a",
                    size: 5,
                    opacity: 100,
                    blur: 0
                },
                {
                    position: 15,
                    color: "#242424",
                    size: 5,
                    opacity: 100,
                    blur: 0
                }
            ]}
            ];
            this.setState({linears: tempLinears, radials: [], width: 20, height: 20, positioning: "px", bacgroundColor: "#131313", selected: {type: "none", index: 0}});
    }
    
    handleSetWeaves()
    {
        const tempLinears = [{
            direction: 135,
            vertical: 0,
            horizontal: 0,
            visible: true, 
            grid: false,
            autoSize: true,
            lines: [
                {
                    position: 22,
                    color: "#d9ecff",
                    size: 2,
                    opacity: 100,
                    blur: 0
                },
                {
                    position: 67,
                    color: "#d9ecff",
                    size: 2,
                    opacity: 100,
                    blur: 0
                }
            ]
            
        },
        {
            direction: 225,
            vertical: 0,
            horizontal: 64,
            visible: true, 
            grid: false,
            autoSize: true,
            lines: [
                {
                    position: 22,
                    color: "#d9ecff",
                    size: 2,
                    opacity: 100,
                    blur: 0
                },
                {
                    position: 67,
                    color: "#d9ecff",
                    size: 2,
                    opacity: 100,
                    blur: 0
                }
            ]
        }];
        
        this.setState({linears: tempLinears, radials: [], width: 64, height: 128, positioning: "px", bacgroundColor: "#708090", selected: {type: "none", index: 0}});
    }
    
////////////////////////////////////////////////////////////////////////GENERATE BUTTON////////////////////////////////////////////////////////////////////////
    
    handleGenerateButton()
    {
        const selector = document.querySelector("#code-div");
        const text = selector.style.cssText;
        this.setState({code: text});
    }
    
    
////////////////////////////////////////////////////////////////////////RENDER/////////////////////////////////////////////////////////////////////////////////  
    
    
    render()
    {
        return(
        
        <div id="container">
            
            <MainProp data={this.state} pointer={this} />
            <List data={this.state} handleChangeLayer={this.handleChangeLayer} handleVisibility={this.handleSetVisibility} handleGrid={this.handleSetGrid}/>
            <Properties handleChange={this.handleChangeInput} data={this.state} addLine={this.handleAddLine} deleteLine={this.handleDeleteLine} addRadius={this.handleAddRadius} deleteRadius={this.handleDeleteRadius}/>
            
            <Preview data={this.state} />
            <Canvas data={this.state} />
            
            <Logo />
            <Links />
            <Ads />
            <Footer />
            <Code handle={this.handleGenerateButton} code={this.state.code} />
        
        </div>
        );
        
        /*

                        
                     <Controls data={this.state} handleChangeWidth={this.handleWidthInput} handleChangeHeight={this.handleHeightInput} handleChange={this.handleBackgroundInput} handleRepeat={this.handleRepeat} handleGrid={this.handleShowGrid} handlePositioning={this.handlePositioning} handleZoom={this.handleZoom} />
                        
                     <Buttons addLinear={this.handleAddLinear} addRadial={this.handleAddRadial} setHearts={this.handleSetHearts} setBricks={this.handleSetBricks} setStairs={this.handleSetStairs} setShippo={this.handleSetShippo} setMicrobial={this.handleSetMicrobial} setWeaves={this.handleSetWeaves} setCarbon={this.handleSetCarbon}/>
                

                    <Preview data={this.state} />
                    <Canvas data={this.state} />

                    <div id="control-panel">
                        <div className="control-section">
                            
                        </div>
                        <div className="control-section">
                        
                            <div className="control-module">
                            <Buttons addLinear={this.handleAddLinear} addRadial={this.handleAddRadial} setHearts={this.handleSetHearts} setBricks={this.handleSetBricks} setStairs={this.handleSetStairs} setShippo={this.handleSetShippo} setMicrobial={this.handleSetMicrobial} setWeaves={this.handleSetWeaves} setCarbon={this.handleSetCarbon}/>
                            
                            </div>
                            
                        </div>
                        
                        <div className="control-section">
                            <Linears handleChange={this.handleChangeInput} AddLine={this.handleAddLine} DeleteLine={this.handleDeleteLine} data={this.state} />
                            <Radials handleChange={this.handleChangeInput} addRadius={this.handleAddRadius} deleteRadius={this.handleDeleteRadius} data={this.state} />
                        </div>
                    
                    </div>
                </div>
            
                <div id="code-panel">
                <button onClick={this.handleGenerateButton} >Generate CSS</button>
                <Code input={this.state.code}/>
                </div>
            
            </div>
        );
        */
    }
}




ReactDOM.render(<App />, document.querySelector("#App"));
