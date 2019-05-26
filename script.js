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


//MAIN CONTROL

const Controls = (props) =>
{
    return(
        <div className="control-module">
            <div className="control-triger">
                <div className="control-name">background</div>
                <input 
                    type="color"
                    value={props.input}
                    onChange={props.handleChange}
                    placeholder="HTML code..."/>
            </div>
            <div className="control-triger">
                <div className="control-name">width</div>

                <input min="2" type="number" value={props.inputWidth} onChange={props.handleChangeWidth}/>
            </div>
            <div className="control-triger">
                <div className="control-name">height</div>

                <input min="2" type="number" value={props.inputHeight} onChange={props.handleChangeHeight}/>
            </div>
            <div className="control-triger">
                <div className="control-name">grid</div>

                <input type="checkbox" checked={props.grid} onChange={props.handleGrid}/>
            </div>
            <div className="control-triger">
                <div className="control-name">repeat</div>

                <input type="checkbox" checked={props.repeat} onChange={props.handleRepeat}/>
            </div>
            <div className="control-triger">
                <div className="control-name">position</div>
                <select value={props.positioning} onChange={props.handlePositioning} type="text" list="types">
                    <option selected="selected" value="%">%</option>
                    <option value="px">px</option>
                </select>
            </div>
        
        </div>
        );  
};



//ADDING BUTTONS


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
                    <button></button>
                    <button></button>
                </div>
            </div>
        </div>
    );
}

//LINEARS AND RADIAL CONTROLS

const Line = (props) =>
{

    const items = props.linears.lines.map((value,index) => 
    <div className="control-module" key={index}>
        <div className="control-triger">
            <div className="control-name">position</div>
            <input onChange={ (e) => props.handleChange(props.index,index,"position",e)} value={props.linears.lines[index].position} type="number" />
        </div>
        
        <div className="control-triger">
            <div className="control-name">size</div>
            <input onChange={ (e) => props.handleChange(props.index,index,"size",e)} value={props.linears.lines[index].size} type="number" />
        </div>
        
        <div className="control-triger">                                  
            <div className="control-name">color</div>
            <input onChange={ (e) => props.handleChange(props.index,index,"color",e)} value={props.linears.lines[index].color} type="color" />
        </div>

        <div className="control-triger">                                  
            <div className="control-name">opacity</div>
            <input onChange={ (e) => props.handleChange(props.index,index,"opacity",e)} value={props.linears.lines[index].opacity}  type="number" />
        </div>

        <div className="control-triger">                                  
            <div className="control-name">blur</div>
            <input onChange={ (e) => props.handleChange(props.index,index,"blur",e)} value={props.linears.lines[index].blur}  type="number" />
        </div>
                                          
        <button onClick={ () => props.DeleteLine(props.index,index)}  className="control-button">-</button>
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

                const temp = this.props.linears.map((value,index) => 
                                    <div className="control-lines" key={index}>
                                            <div className="control-module">
                                                <div className="control-triger">    
                                                    <div className="control-name">direction</div>
                                                    <input type="number" onChange={ (e) => this.props.handleChange(index,0,"direction",e)} value={this.props.linears[index].direction}  />
                                                </div>

                                                <div className="control-triger">    
                                                    <div className="control-name">vertical</div>
                                                    <input onChange={ (e) => this.props.handleChange(index,0,"vertical",e)} value={this.props.linears[index].posX} type="number" />
                                                </div>

                                                <div className="control-triger">
                                                    <div className="control-name">horizontal</div>
                                                    <input onChange={ (e) => this.props.handleChange(index,0,"horizontal",e)} value={this.props.linears[index].posY} type="number" />
                                                </div>
                                                <button onClick={ () => this.props.AddLine(index) } className="control-button">+</button>
                                            </div>
                                            
                                        
                                            <Line handleChange={this.props.handleChange} index={index} DeleteLine={this.props.DeleteLine} linears={this.props.linears[index]} />
                                        
                                        
    
                                    </div>
                                    );
                                       
    //console.log("Linears");
    //console.log(this.props.linears[0]);
        
        return(
            <div >
                {temp}
            </div>
        )
    }
}



const Canvas = (props) =>
{

    let linearGrid = "";
    let backgroundImageCode = "";
    let backgroundPosCode = "";
    const posType = props.data.positioning;
    
    if(props.data.linears.length > 0)
    {
        props.data.linears.map( (linear, linearindex) =>
        {
            backgroundImageCode += "linear-gradient("+linear.direction+"deg, ";
            linear.lines.map( (line, lineIndex) => 
            {
                const color = hexToRgb(line.color,line.opacity/100);
                backgroundImageCode += "transparent "+(+line.position - +line.blur)+posType+", "+color+" "+line.position+posType+", "+color+" "+(+line.position + +line.size)+posType+", transparent "+(+line.position + +line.size + +line.blur)+posType;
                if(lineIndex < (linear.lines.length-1))
                {
                    backgroundImageCode += ", ";
                }
                else
                {
                    backgroundImageCode += ") ";
                }
                


            })

            backgroundPosCode += linear.posX+posType+" "+linear.posY+posType;
            if(linearindex < (props.data.linears.length-1))
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
    let AreaStyle = 
    { 
        backgroundImage: "linear-gradient(90deg,transparent "+(props.data.width-1)+"px,  rgba(0,0,0,1) "+(props.data.width)+"px), linear-gradient(180deg,transparent "+(props.data.height-1)+"px,  rgba(0,0,0,1) "+(props.data.height)+"px)",
        backgroundSize: props.data.width+"px "+props.data.height+"px",    
    }; 
    
    
    if ((props.data.width > 0 && props.data.height > 0) && props.data.grid == true)
    return(
        <div id="canvas" style={CanvasStyle}>
             <div id="primary-area" style={AreaStyle}></div>     
        </div>
    )
    else return(
        <div id="canvas" style={CanvasStyle}>
             
        </div>
    );
}

const Code = (props) =>
{  
    return(
        <div id="code">
            {props.input}
        </div>
    );
    
}

// MAIN COMPONENT 

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
            code: "press button to generate",
            grid: true,
            repeat: true,
            positioning: "%",
            linears: [],
            radials: []
        }
        
        
        this.handleBackgroundInput = this.handleBackgroundInput.bind(this);
        this.handleGenerateButton = this.handleGenerateButton.bind(this);
        this.handleWidthInput = this.handleWidthInput.bind(this);
        this.handleHeightInput = this.handleHeightInput.bind(this);
        this.handleAddLinear = this.handleAddLinear.bind(this);
        this.handleAddRadial = this.handleAddRadial.bind(this);
        this.handleShowGrid = this.handleShowGrid.bind(this);
        this.handleRepeat = this.handleRepeat.bind(this);
        this.handlePositioning = this.handlePositioning.bind(this);
        
        this.handleAddLine = this.handleAddLine.bind(this);
        this.handleDeleteLine = this.handleDeleteLine.bind(this);
        this.handleChangeInput = this.handleChangeInput.bind(this);
        
        this.handleSetWeaves = this.handleSetWeaves.bind(this);
        this.handleSetCarbon = this.handleSetCarbon.bind(this);
        
        /*
        
        this.handleLinearPositionVecrtical = this.handleLinearPositionVecrtical.bind(this,LinearIndex);
        this.handleLinearPositionHorizontal = this.handleLinearPositionHorizontal.bind(this,LinearIndex);
        
        this.handleLinePosition = this.handleLinePosition.bind(this, LinearIndex, LineIndex);
        this.handleLineSize = this.handleLineSize.bind(this, LinearIndex, LineIndex);
        this.handleLineColor = this.handleLineColor.bind(this, LinearIndex, LineIndex);
        this.handleLinearDirection = this.handleLinearDirection.bind(this);
        */
        
        
    }
    
    handleSetCarbon()
    {
        const tempLinears = [{
            direction: 27,
            posX: 0,
            posY: 5,
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
            posX: 10,
            posY: 0,
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
            posX: 0,
            posY: 10,
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
            posX: 10,
            posY: 5,
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
            posX: 0,
            posY: 0,
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
            posX: 0,
            posY: 0,
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
            this.setState({linears: tempLinears, width: 20, height: 20, positioning: "px", bacgroundColor: "#131313"});
    }
    
    handleSetWeaves()
    {
        const tempLinears = [{
            direction: 135,
            posX: 0,
            posY: 0,
            lines: [
                {
                    position: 22,
                    color: "#d9ecff",
                    size: 1,
                    opacity: 100,
                    blur: 1
                },
                {
                    position: 67,
                    color: "#d9ecff",
                    size: 1,
                    opacity: 100,
                    blur: 1
                }
            ]
            
        },
        {
            direction: 225,
            posX: 0,
            posY: 64,
            lines: [
                {
                    position: 22,
                    color: "#d9ecff",
                    size: 1,
                    opacity: 100,
                    blur: 1
                },
                {
                    position: 67,
                    color: "#d9ecff",
                    size: 1,
                    opacity: 100,
                    blur: 1
                }
            ]
        }];
        
        this.setState({linears: tempLinears, width: 64, height: 128, positioning: "px", bacgroundColor: "#708090"});
    }
    
    handleChangeInput(LinearIndex,LineIndex,inputName)
    {
        let newLinears = this.state.linears;
        
        switch(inputName)
            {
                case "direction": {newLinears[LinearIndex].direction = event.target.value; break;}
                case "vertical": {newLinears[LinearIndex].posX= event.target.value; break;}
                case "horizontal": {newLinears[LinearIndex].posY= event.target.value; break;}
                case "position": {newLinears[LinearIndex].lines[LineIndex].position = event.target.value; break;}
                case "size": {newLinears[LinearIndex].lines[LineIndex].size = event.target.value; break;}
                case "color": {newLinears[LinearIndex].lines[LineIndex].color = event.target.value; break;}
                case "opacity": {newLinears[LinearIndex].lines[LineIndex].opacity = event.target.value; break;}
                case "blur": {newLinears[LinearIndex].lines[LineIndex].blur = event.target.value; break;}
            }
        
        this.setState({linears: newLinears});
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
    
    handleAddLinear()
    {
        let tempLine = {};
        let tempLinear = {};
        tempLine = {position: 0, color: "#000000", size: 5, opacity: 100, blur: 0};
        
        if(this.state.linears.length == 0)
        {
            
            tempLinear = {direction: 90, posX: 0, posY: 0, lines: []};
            tempLinear.lines.push(tempLine);
        }
        else
        {
            const length =  this.state.linears.length;
            tempLinear = JSON.parse(JSON.stringify(this.state.linears[length-1]));

        }
        
        
        this.setState({linears: [...this.state.linears, tempLinear]});
        
    }
    
    handleAddRadial()
    {
        
    }
    
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
    
    handleWidthInput(event)
    {
        this.setState({width: event.target.value});
        
    }
    
    handleHeightInput(event)
    {
        this.setState({height: event.target.value});
    }
    
    handleGenerateButton()
    {
        const selector = document.querySelector("#canvas");
        const text = selector.style.cssText;
        this.setState({code: text});
    }
    
    handleBackgroundInput(event)
    {
        this.setState({bacgroundColor: event.target.value});
    }
    
    handlePositioning(event)
    {
        this.setState({positioning: event.target.value});
    }
    
    render()
    {
        //Zrobić hierarchię
        //zmienić code na input
        return(
            <div>
                <div id="app">

                    <Canvas data={this.state} />

                    <div id="control-panel">
                        <div className="control-section">
                            <Controls handleChangeWidth={this.handleWidthInput} handleChangeHeight={this.handleHeightInput} inputWidth={this.state.width} inputHeight={this.state.height} handleChange={this.handleBackgroundInput} input={this.state.bacgroundColor} repeat={this.state.repeat} grid={this.state.grid} handleRepeat={this.handleRepeat} handleGrid={this.handleShowGrid} positioning={this.state.positioning} handlePositioning={this.handlePositioning}/>
                        </div>
                        <div className="control-section">
                        
                            <div className="control-module">
                            <Buttons addLinear={this.handleAddLinear} addRadial={this.handleAddRadial} setWeaves={this.handleSetWeaves} setCarbon={this.handleSetCarbon}/>
                            
                            </div>
                            
                        </div>
                        
                        <div className="control-section">
                            <Linears handleChange={this.handleChangeInput} AddLine={this.handleAddLine} DeleteLine={this.handleDeleteLine}  linears={this.state.linears} />
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

// WYMYŚLIĆ LEPSZE NAZWY


ReactDOM.render(<App/>, document.querySelector("#container"));
