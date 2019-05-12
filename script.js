//MAIN CONTROL

const ControlColor = (props) =>
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
        </div>
        );  
};

const ControlSize = (props) =>
{
    

    
    return(
        <div className="control-module">
            <div className="control-triger">
                <div className="control-name">width</div>

                <input min="2" type="number" value={props.inputWidth} onChange={props.handleChangeWidth}/>
            </div>
            <div className="control-triger">
                <div className="control-name">height</div>

                <input min="2" type="number" value={props.inputHeight} onChange={props.handleChangeHeight}/>
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
            <button onClick={props.showGrid} className="control-button">{props.gridText}</button>
            <button onClick={props.repeat} className="control-button">{props.repeatText}</button>
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
    
    let backgroundImageCode = "";
    let backgroundPosCode = "";
    
    if(props.data.linears.length > 0)
    {
        props.data.linears.map( (linear, linearindex) =>
        {
            backgroundImageCode += "linear-gradient("+linear.direction+"deg, ";
            linear.lines.map( (line, lineIndex) => 
            {
                backgroundImageCode += "transparent "+line.position+"%, "+line.color+" "+line.position+"%, "+line.color+" "+(+line.position + +line.size)+"%, transparent "+(+line.position + +line.size)+"%";
                if(lineIndex < (linear.lines.length-1))
                {
                    backgroundImageCode += ", ";
                }
                else
                {
                    backgroundImageCode += ") ";
                }

            })

            backgroundPosCode += linear.posX+"px "+linear.posY+"px"
            if(linearindex < (props.data.linears.length-1))
            {
                backgroundImageCode += ", ";
                backgroundPosCode += ", ";
            }

        })
    }
    
    let repeat = "";
    
    if(props.data.repeat == "true")
    {
        repeat = "repeat";
    }
    else
    {
        repeat = "no-repeat";
    }
    
    let CanvasStyle = {backgroundImage: backgroundImageCode, backgroundPosition: backgroundPosCode, backgroundColor: props.data.bacgroundColor, backgroundSize: props.data.width+"px "+props.data.height+"px", backgroundRepeat: repeat};
    //console.log(CanvasStyle);
    let AreaStyle = 
    { 
        background: "linear-gradient(90deg,transparent "+(props.data.width-1)+"px,  rgba(0,0,0,1) "+(props.data.width)+"px), linear-gradient(180deg,transparent "+(props.data.height-1)+"px,  rgba(0,0,0,1) "+(props.data.height)+"px)",
        backgroundSize: props.data.width+"px "+props.data.height+"px",    
    }; 
    
    
    
    if ((props.data.width > 0 && props.data.height > 0) && props.data.grid == "true")
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
            grid: "true",
            gridText: "hide grid",
            repeat: "true",
            repeatText: "repeat off",
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
        
        this.handleAddLine = this.handleAddLine.bind(this);
        this.handleDeleteLine = this.handleDeleteLine.bind(this);
        this.handleChangeInput = this.handleChangeInput.bind(this);
        
        /*
        
        this.handleLinearPositionVecrtical = this.handleLinearPositionVecrtical.bind(this,LinearIndex);
        this.handleLinearPositionHorizontal = this.handleLinearPositionHorizontal.bind(this,LinearIndex);
        
        this.handleLinePosition = this.handleLinePosition.bind(this, LinearIndex, LineIndex);
        this.handleLineSize = this.handleLineSize.bind(this, LinearIndex, LineIndex);
        this.handleLineColor = this.handleLineColor.bind(this, LinearIndex, LineIndex);
        this.handleLinearDirection = this.handleLinearDirection.bind(this);
        */
        
        
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
        tempLine = {position: 0, color: "#000000", size: 5};
        
        if(this.state.linears.length == 0)
        {
            
            tempLinear = {direction: 90, posX: 0, posY: 0, lines: []};
            tempLinear.lines.push(tempLine);
        }
        else
        {
            const length =  this.state.linears.length;
            Object.assign(tempLinear,this.state.linears[length-1]);
            
            tempLinear.lines = [];
            tempLinear.lines.push(tempLine);
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
                case "false":
                    {
                        this.setState({grid: "true", gridText: "hide grid"});
                        break;
                    }
                case "true":
                    {
                        this.setState({grid: "false", gridText: "show grid"});
                        break;
                    }
            }
    }
    
    handleRepeat()
    {
        switch(this.state.repeat)
            {
                case "false":
                    {
                        this.setState({repeat: "true", repeatText: "repeat off"});
                        break;
                    }
                case "true":
                    {
                        this.setState({repeat: "false", repeatText: "repeat on"});
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
                            <ControlColor handleChange={this.handleBackgroundInput} input={this.state.bacgroundColor}/>
                            <ControlSize  handleChangeWidth={this.handleWidthInput} handleChangeHeight={this.handleHeightInput} inputWidth={this.state.width} inputHeight={this.state.height}/>
                            
            
                            <div className="control-module">
                            <Buttons repeat={this.handleRepeat} repeatText={this.state.repeatText} gridText={this.state.gridText} showGrid={this.handleShowGrid}  addLinear={this.handleAddLinear} addRadial={this.handleAddRadial}/>
                            
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
