//https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb/5624139
function hexToRgb(hex,a) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
   const r = parseInt(result[1], 16);
   const g = parseInt(result[2], 16);
   const b = parseInt(result[3], 16);

    
    return "rgba(" + r + ", " + g + ", " + b + ", "+ a + ")";
    
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
        <div className="control-module">
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



////////////////////////////////////////////////////////////////////////BUTTONS//////////////////////////////////////////////////////////////////////////////

const Buttons = (props) =>
{
    
    return(
        
        <div className="control-triger">
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

////////////////////////////////////////////////////////////////////////LINEARS//////////////////////////////////////////////////////////////////////////////

const Line = (props) =>
{

    const items = props.linears.lines.map((value,index) => 
    <div className="control-module" key={index}>
        <div className="control-triger">
            <div className="control-name">position</div>
            <input onChange={ (e) => props.handleChange("linear",props.index,index,"position",e)} value={props.linears.lines[index].position} type="number" min="0" />
        </div>
        
        <div className="control-triger">
            <div className="control-name">size</div>
            <input onChange={ (e) => props.handleChange("linear",props.index,index,"size",e)} value={props.linears.lines[index].size} type="number" min="1" />
        </div>
        
        <div className="control-triger">                                  
            <div className="control-name">color</div>
            <input onChange={ (e) => props.handleChange("linear",props.index,index,"color",e)} value={props.linears.lines[index].color} type="color" />
        </div>

        <div className="control-triger">                                  
            <div className="control-name">opacity</div>
            <input onChange={ (e) => props.handleChange("linear",props.index,index,"opacity",e)} value={props.linears.lines[index].opacity}  type="number" min="0" max="100" />
        </div>

        <div className="control-triger">                                  
            <div className="control-name">blur</div>
            <input onChange={ (e) => props.handleChange("linear",props.index,index,"blur",e)} value={props.linears.lines[index].blur}  type="number" min="0" />
        </div>
                                          
        <button onClick={ () => props.DeleteLine(props.index,index)}  className="control-button">delete</button>
    </div>);
                                  
    return(
            <div>
                {items}
            </div>
            )
}



class Linears extends React.Component
{
    constructor(props)
    {
        super(props);
        
    }
    
    render()
    {
                const linears = this.props.data.linears;
                const width = this.props.data.width;
                const height = this.props.data.height;
                
        
                const temp = linears.map((value,index) => 
                                    <div className="control-lines" key={index}>
                                            <div className="control-module-main">
                                                <div className="control-triger">    
                                                    <div className="control-name">direction</div>
                                                    <input type="number" onChange={ (e) => this.props.handleChange("linear",index,0,"direction",e)} value={linears[index].direction}  min="0" max="360"/>
                                                </div>

                                                <div className="control-triger">    
                                                    <div className="control-name">vertical shift(px)</div>
                                                    <input onChange={ (e) => this.props.handleChange("linear",index,0,"vertical",e)} value={linears[index].vertical} type="number" min={0-width} max={width} />
                                                </div>

                                                <div className="control-triger">
                                                    <div className="control-name">horizontal shift(px)</div>
                                                    <input onChange={ (e) => this.props.handleChange("linear",index,0,"horizontal",e)} value={linears[index].horizontal} type="number" min={0-height} max={height}/>
                                                </div>
                                                <button onClick={ () => this.props.AddLine(index) } className="control-button">add line</button>
                                            </div>
                                            
                                        
                                            <Line handleChange={this.props.handleChange} index={index} DeleteLine={this.props.DeleteLine} linears={linears[index]} />
                                        
                                        
    
                                    </div>
                                    );
                                       
        
        return(
            <div >
                {temp}
            </div>
        )
    }
}

////////////////////////////////////////////////////////////////////////RADIALS//////////////////////////////////////////////////////////////////////////////

const Radius = (props) =>
{

    const radius = props.radials.rays;
    
    
    
    const items = radius.map((value,index) => 
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
                                          
        <button onClick={ () => props.deleteRadius(props.index,index)}  className="control-button">delete</button>
    </div>);
                                  
    return(
            <div>
                {items}
            </div>
            )
}



class Radials extends React.Component
{
    constructor(props)
    {
        super(props);
        
    }
    
    render()
    {
                const radials = this.props.data.radials;
                const width = this.props.data.width;
                const height = this.props.data.height;
                
                const temp = radials.map((value,index) => 
                                    <div className="control-lines" key={index}>
                                            <div className="control-module-main">
                                                
                                                <div className="control-triger">
                                                    <div className="control-name">shape</div>
                                                    <select  type="text" list="types" value={radials[index].shape} onChange={ (e) => this.props.handleChange("radial",index,0,"shape",e)}>
                                                        <option value="ellipse ">ellipse</option>
                                                        <option value="circle">circle</option>
                                                    </select>
                                                </div>
                                         
                                                <div className="control-triger">
                                                    <div className="control-name">size</div>
                                                    <select  type="text" list="types" value={radials[index].size} onChange={ (e) => this.props.handleChange("radial",index,0,"extent",e)}>
                                                        <option value="farthest-corner">farthest corner</option>
                                                        <option value="closest-side">closest side</option>
                                                        <option value="closest-corner">closest corner</option>
                                                        <option value="farthest-side">farthest side</option>
                                                    </select>
                                                </div>
                                         
                                                <div className="control-triger">    
                                                    <div className="control-name">pos x</div>
                                                    <input onChange={ (e) => this.props.handleChange("radial",index,0,"posx",e)} value={radials[index].posx} type="number" min={0-width} max={width} />
                                                </div>
                        
                                                <div className="control-triger">    
                                                    <div className="control-name">pos y</div>
                                                    <input onChange={ (e) => this.props.handleChange("radial",index,0,"posy",e)} value={radials[index].posy} type="number" min={0-width} max={width} />
                                                </div>
                                         
                                                <div className="control-triger">    
                                                    <div className="control-name">vertical shift(px)</div>
                                                    <input onChange={ (e) => this.props.handleChange("radial",index,0,"vertical",e)} value={radials[index].vertical} type="number" min={0-width} max={width} />
                                                </div>

                                                <div className="control-triger">
                                                    <div className="control-name">horizontal shift(px)</div>
                                                    <input onChange={ (e) => this.props.handleChange("radial",index,0,"horizontal",e)} value={radials[index].horizontal} type="number" min={0-height} max={height}/>
                                                </div>
                                                <button onClick={ () => this.props.addRadius(index) } className="control-button">add radius</button>
                                            </div>
                                            
                                        
                                            <Radius handleChange={this.props.handleChange} index={index} deleteRadius={this.props.deleteRadius} radials={radials[index]} />
                                        
                                        
    
                                    </div>
                                    );
                                       
        
        return(
            <div >
                {temp}
            </div>
        )
    }
}

////////////////////////////////////////////////////////////////////////CANVAS AND PREVIEW///////////////////////////////////////////////////////////////////

const Preview = (props) =>
{

    let linearGrid = "";
    let backgroundImageCode = "";
    let backgroundPosCode = "";
    const posType = props.data.positioning;
    
    
//LINEARS    
    if(props.data.linears.length > 0)
    {
        props.data.linears.map( (linear, linearindex) =>
        {
            backgroundImageCode += "linear-gradient("+linear.direction+"deg, ";
            linear.lines.map( (line, lineIndex) => 
            {
                             
                const color = hexToRgb(line.color,line.opacity/100);
                if(props.data.positioning == "%") 
                {        
                    const vacancyLeft = "transparent "+(+line.position - +1 - +line.blur)+posType;
                    const colorLeft = color+" "+line.position+posType;
                    const colorRight = color+" "+(+line.position - +1 + +line.size)+posType;
                    const vacancyRight = "transparent "+(+line.position + +line.size + +line.blur)+posType;
                    
                    backgroundImageCode += vacancyLeft+", "+colorLeft+", "+colorRight+", "+vacancyRight;
                }
                else if(props.data.positioning == "px") 
                {
                    const position = line.position * props.data.zoom;
                    const size = line.size * props.data.zoom;
                    
                    const vacancyLeft = "transparent "+(+position - +line.blur)+posType+", "+color;
                    const colorLeft = color+" "+position+posType;
                    const colorRight = color+" "+(+position + +size)+posType;
                    const vacancyRight = "transparent "+(+position + +size + +line.blur)+posType;
                    
                    backgroundImageCode += vacancyLeft+", "+colorLeft+", "+colorRight+", "+vacancyRight;
                }
                if(lineIndex < (linear.lines.length-1))
                {
                    backgroundImageCode += ", ";
                }
                else
                {
                    backgroundImageCode += ") ";
                }

            })

            backgroundPosCode += (+linear.vertical * +props.data.zoom)+"px "+ (+linear.horizontal * +props.data.zoom)+"px";
     
            if(linearindex < (props.data.linears.length-1))
            {
                backgroundImageCode += ", ";
                backgroundPosCode += ", ";
            }

        })
    }
    
//RADIALS    
    if(props.data.radials.length > 0)
    {
        
        if(backgroundImageCode != "") backgroundImageCode += ", ";
        
        props.data.radials.map( (radial, radialIndex) =>
        {
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
                const color = hexToRgb(radius.color,radius.opacity/100);
                if(props.data.positioning == "%") 
                {
                    const vacancyLeft = "transparent "+(+radius.position - +1 - +radius.blur)+posType;
                    const colorLeft = color+" "+radius.position+posType;
                    const colorRight = color+" "+(+radius.position - +1 + +radius.size)+posType;
                    const vacancyRight = "transparent "+(+radius.position + +radius.size + +radius.blur)+posType;
                    
                    backgroundImageCode += vacancyLeft+", "+colorLeft+", "+colorRight+", "+vacancyRight;
                }
                else if(props.data.positioning == "px") 
                {
                    const position = radius.position * props.data.zoom;
                    const size = radius.size * props.data.zoom;
                    
                    const vacancyLeft = "transparent "+(+position - +1 - +radius.blur)+posType+", "+color;
                    const colorLeft = color+" "+position+posType;
                    const colorRight = color+" "+(+position - +1 + +size)+posType;
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

            backgroundPosCode += (+radial.vertical * +props.data.zoom)+"px "+ (+radial.horizontal * +props.data.zoom)+"px";

            if(radialIndex < (props.data.radials.length-1))
            {
                backgroundImageCode += ", ";
                backgroundPosCode += ", ";
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
    

    
    let CanvasStyle = {backgroundImage: backgroundImageCode, backgroundPosition: backgroundPosCode, backgroundColor: props.data.bacgroundColor, backgroundSize: (+props.data.width * +props.data.zoom)+"px "+ (+props.data.height * +props.data.zoom)+"px", backgroundRepeat: repeat};
    let AreaStyle = 
    { 
        backgroundImage: "linear-gradient(90deg,transparent "+(+props.data.width * +props.data.zoom - 1)+"px,  rgba(0,0,0,1) "+(+props.data.width * +props.data.zoom)+"px), linear-gradient(180deg,transparent "+(+props.data.height * +props.data.zoom - 1)+"px,  rgba(0,0,0,1) "+(+props.data.height * +props.data.zoom)+"px)",
        backgroundSize: (+props.data.width * +props.data.zoom)+"px "+ (+props.data.height * +props.data.zoom)+"px",    
    }; 
    
    
    if ((props.data.width > 0 && props.data.height > 0) && props.data.grid == true)
    return(
        <div id="preview" style={CanvasStyle}>
             <div id="primary-area" style={AreaStyle}></div>     
        </div>
    )
    else return(
        <div id="preview" style={CanvasStyle}>
             
        </div>
    );
}


const Canvas = (props) =>
{
    let linearGrid = "";
    let backgroundImageCode = "";
    let backgroundPosCode = "";
    const posType = props.data.positioning;
    
//LINEAR
    if(props.data.linears.length > 0)
    {
        props.data.linears.map( (linear, linearindex) =>
        {
            backgroundImageCode += "linear-gradient("+linear.direction+"deg, ";
            linear.lines.map( (line, lineIndex) => 
            {
                const color = hexToRgb(line.color,line.opacity/100);
                
                const vacancyLeft = "transparent "+(+line.position - +line.blur)+posType;
                const colorLeft = color+" "+line.position+posType;
                const colorRight = color+" "+(+line.position + +line.size)+posType;
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
            
            if(linearindex < (props.data.linears.length-1))
            {
                backgroundImageCode += ", ";
                backgroundPosCode += ", ";
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
                const color = hexToRgb(radius.color,radius.opacity/100);

                const vacancyLeft = "transparent "+(+radius.position - +1 - +radius.blur)+posType;
                const colorLeft = color+" "+radius.position+posType;
                const colorRight = color+" "+(+radius.position - +1 + +radius.size)+posType;
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

            if(radialIndex < (props.data.radials.length-1))
            {
                backgroundImageCode += ", ";
                backgroundPosCode += ", ";
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
    
    let CanvasStyle = {backgroundImage: backgroundImageCode, backgroundPosition: backgroundPosCode, backgroundColor: props.data.bacgroundColor, backgroundSize: props.data.width+"px "+props.data.height+"px", backgroundRepeat: repeat};
    
    return(<div id="canvas" style={CanvasStyle}></div>);
}

////////////////////////////////////////////////////////////////////////GENERATED CODE///////////////////////////////////////////////////////////////////////        
           
const Code = (props) =>
{  
    return(
        <div id="code">
            {props.input}
        </div>
    );
    
}

////////////////////////////////////////////////////////////////////////MAIN COMPONENT/////////////////////////////////////////////////////////////////////////

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
            code: "press button to generate",
            grid: true,
            repeat: true,
            positioning: "%",
            linears: [],
            radials: []
        }
        
        //PATTERN EDITION
        this.handleAddLinear = this.handleAddLinear.bind(this);
        this.handleAddLine = this.handleAddLine.bind(this);
        this.handleDeleteLine = this.handleDeleteLine.bind(this);
        
        this.handleAddRadial = this.handleAddRadial.bind(this);
        this.handleAddRadius = this.handleAddRadius.bind(this);
        this.handleDeleteRadius = this.handleDeleteRadius.bind(this);
        
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
            
            tempLinear = {direction: 90, vertical: 0, horizontal: 0, lines: []};
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
                        //console.log("Delete - lines length: "+lines[LinearIndex].lines.length);
                        if(linears[LinearIndex].lines.length == 0)
                            {
                                linears.splice(LinearIndex,1);
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
            
            tempRadial = {shape: "ellipse ", size: "farthest-corner", posx: 50, posy: 50, vertical: 0, horizontal: 0, rays: []};
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
                            }
                        return{radials};         
               
        });
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
            rays: [{
                position: 0,
                color: "#dd3355",
                size: 30,
                opacity: 100,
                blur: 1
            }]
        }
        ];
        
        this.setState({radials: tempRadials, linears: [], width: 100, height: 100, positioning: "%", bacgroundColor: "#bb0033"});
    }
    
    handleSetBricks()
    {
        const tempLinears = [{
            direction: 335,
            vertical: 0,
            horizontal: 2,
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
        
        this.setState({linears: tempLinears, radials: [], width: 58, height: 58, positioning: "px", bacgroundColor: "silver"});
    }
    
    handleSetStairs()
    {

        const tempLinears = [{
            direction: 64,
            vertical: 7,
            horizontal: 0,
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
        
        
        this.setState({linears: tempLinears, radials: [], width: 16, height: 48, positioning: "%", bacgroundColor: "#444444"});
        
        
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
            rays: [{
                position: 99,
                color: "#000000",
                size: 45,
                opacity: 30,
                blur: 0
            }]
        }
        ];
        
        this.setState({radials: tempRadials, linears: [], width: 80, height: 80, positioning: "%", bacgroundColor: "#ddeeff"});
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
            rays: [{
                position: 10,
                color: "#661133",
                size: 1,
                opacity: 100,
                blur: 0
            }]
        }
        ];
        
        this.setState({radials: tempRadials, linears: [], width: 20, height: 20, positioning: "px", bacgroundColor: "#88aa33"});
    }
    
    handleSetCarbon()
    {
        const tempLinears = [{
            direction: 27,
            vertical: 0,
            horizontal: 5,
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
            this.setState({linears: tempLinears, radials: [], width: 20, height: 20, positioning: "px", bacgroundColor: "#131313"});
    }
    
    handleSetWeaves()
    {
        const tempLinears = [{
            direction: 135,
            vertical: 0,
            horizontal: 0,
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
        
        this.setState({linears: tempLinears, radials: [], width: 64, height: 128, positioning: "px", bacgroundColor: "#708090"});
    }
    
////////////////////////////////////////////////////////////////////////GENERATE BUTTON////////////////////////////////////////////////////////////////////////
    
    handleGenerateButton()
    {
        const selector = document.querySelector("#preview");
        const text = selector.style.cssText;
        this.setState({code: text});
    }
    
    
////////////////////////////////////////////////////////////////////////RENDER/////////////////////////////////////////////////////////////////////////////////  
    
    
    render()
    {
        //Zrobić hierarchię
        //zmienić code na input
        return(
            <div>
                <div id="app">

                    <Preview data={this.state} />
                    <Canvas data={this.state} />

                    <div id="control-panel">
                        <div className="control-section">
                            <Controls data={this.state} handleChangeWidth={this.handleWidthInput} handleChangeHeight={this.handleHeightInput} handleChange={this.handleBackgroundInput} handleRepeat={this.handleRepeat} handleGrid={this.handleShowGrid} handlePositioning={this.handlePositioning} handleZoom={this.handleZoom} />
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
    }
}




ReactDOM.render(<App/>, document.querySelector("#container"));
