import style from "./main.scss";

import React, { Component } from "react";
import ReactDOM from "react-dom";

import {Logo, Links, Ads, Footer} from "./modules/visuals/visuals.jsx"
import {MainProp} from "./modules/main-prop/main-prop.jsx"
import {List} from "./modules/list/list.jsx"
import {Properties} from "./modules/properties/properties.jsx"
import {Preview} from "./modules/preview/preview.jsx"
import {Canvas} from "./modules/canvas/canvas.jsx"
import {Code} from "./modules/code/code.jsx"





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

    }
}




ReactDOM.render(<App />, document.querySelector("#App"));
