import style from "./main.scss";

import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Provider, connect } from 'react-redux'

import {Logo, Links, Footer} from "./modules/visuals/visuals.jsx"
import {MainProp} from "./modules/main-prop/main-prop.jsx"
import {Management} from "./modules/management/management.jsx"
import {List} from "./modules/list/list.jsx"
import {Properties} from "./modules/properties/properties.jsx"
import {Preview} from "./modules/preview/preview.jsx"
import {Canvas} from "./modules/canvas/canvas.jsx"
import {Code} from "./modules/code/code.jsx"
import {SignIn} from "./modules/sign-in/sign-in.jsx"
import {SignUp} from "./modules/sign-up/sign-up.jsx"
import {Publish} from "./modules/publish/publish.jsx"
import {Account} from "./modules/account/account.jsx"
import {Explore} from "./modules/explore/explore.jsx"
require("babel-polyfill");

import {store, updateAll, updateLinears, updateRadials, changeLayer, setGrid, setRepeat, setZoom, setWidth, setHeight, setBackground, setPos, generateCode} from "./redux-store.jsx"

import {defaultLinear, defaultRadial} from "./defaults.js"

class App extends React.Component
{
    constructor(props)
    {
        super(props);
        
        this.state =
        {
            view: "MAIN", //EXPLORE PUBLISH SIGNUP SIGNIN
            logged: false,
            userName: ""
        }

        //PATTERN EDITION
        this.handleAddLinear = this.handleAddLinear.bind(this);
        this.handleAddLine = this.handleAddLine.bind(this);
        this.handleDeleteLine = this.handleDeleteLine.bind(this);
        
        this.handleAddRadial = this.handleAddRadial.bind(this);
        this.handleAddRadius = this.handleAddRadius.bind(this);
        this.handleDeleteRadius = this.handleDeleteRadius.bind(this);

        this.handleClone = this.handleClone.bind(this);
        
        //LIST
        this.handleChangeLayer = this.handleChangeLayer.bind(this);
        this.handleSetVisibility = this.handleSetVisibility.bind(this);
        this.handleSetGrid = this.handleSetGrid.bind(this);
        
        //MAIN CONTROL
        this.handleBackgroundInput = this.handleBackgroundInput.bind(this);
        this.handleWidthInput = this.handleWidthInput.bind(this);
        this.handleHeightInput = this.handleHeightInput.bind(this);
        this.handleGrid = this.handleGrid.bind(this);
        this.handleRepeat = this.handleRepeat.bind(this);
        this.handlePositioning = this.handlePositioning.bind(this);
        this.handleZoom = this.handleZoom.bind(this);
        
        //INPUT HANDLE
        this.handleChangeInput = this.handleChangeInput.bind(this);

        //MANAGEMENT
        this.signIn = this.signIn.bind(this);
        this.signOut = this.signOut.bind(this);
        this.loadPattern = this.loadPattern.bind(this);
           
        //GENERATE BUTTON
        this.handleGenerateButton = this.handleGenerateButton.bind(this);

        //VIEWS
        this.accountView = this.accountView.bind(this);
        this.changeView = this.changeView.bind(this);
        this.mainView = this.mainView.bind(this);
        this.exploreView = this.exploreView.bind(this);
        this.publishView = this.publishView.bind(this);
        this.signUpView = this.signUpView.bind(this);
        this.signInView = this.signInView.bind(this);
        
    }





    ////////////////////////////////////////////////////////////////////////PATTERN EDITION////////////////////////////////////////////////////////////////////////    
    //////LINEARS
    handleAddLinear()
    {
        this.props.submitUpdateLinears([...this.props.state.linears, defaultLinear()]);
    }
    
    handleAddLine(LinearIndex)
    {
        
        const length = this.props.state.linears[LinearIndex].lines.length;
        let tempLine = {};
        Object.assign(tempLine,this.props.state.linears[LinearIndex].lines[length-1]);
        
        let linears = this.props.state.linears;
        linears[LinearIndex].lines = [...this.props.state.linears[LinearIndex].lines, tempLine];     

        this.props.submitUpdateLinears(linears);
        
    }
    
    handleDeleteLine(LinearIndex,LineIndex)
    {
        let linears = this.props.state.linears;
        let selected = this.props.state.selected;
        linears[LinearIndex].lines.splice(LineIndex,1);
        if(linears[LinearIndex].lines.length == 0)
        {
            linears.splice(LinearIndex,1);
            
            if(linears.length>0)
            {
                if(selected.index>0) selected.index -= 1;   
            }
            else
            {
                selected.type = "none";
            }
        }

        this.props.submitChangeLayer(selected);
        this.props.submitUpdateLinears(linears);
    }
    
////RADIALS
    
    handleAddRadial()
    {     
        this.props.submitUpdateRadials([...this.props.state.radials, defaultRadial()]);
    }
    
    handleAddRadius(RadialIndex)
    {
        const length = this.props.state.radials[RadialIndex].rays.length;
        let tempRadius = {};
        Object.assign(tempRadius,this.props.state.radials[RadialIndex].rays[length-1]);
        
        let radials = this.props.state.radials;
        radials[RadialIndex].rays = [...this.props.state.radials[RadialIndex].rays, tempRadius];

        this.props.submitUpdateRadials(radials);
    }
    
    handleDeleteRadius(radialIndex,radiusIndex)
    {
        let radials = this.props.state.radials;
        let selected = this.props.state.selected;
        radials[radialIndex].rays.splice(radiusIndex,1);
        if(radials[radialIndex].rays.length == 0)
            {
                radials.splice(radialIndex,1);
                
                if(radials.length>0)
                {
                    if(selected.index>0) selected.index -= 1;
                }
                else
                {
                    selected.type = "none";
                }
            }
        
        this.props.submitChangeLayer(selected);
        this.props.submitUpdateRadials(radials);

    }

    //OTHERS

    handleClone()
    {
        
        const index = this.props.state.selected.index;

        switch(this.props.state.selected.type)
        {
            case "radial":
            {
                const tempRadial = JSON.parse(JSON.stringify(this.props.state.radials[index]));
                this.props.submitUpdateRadials([...this.props.state.radials, tempRadial]);
                break;
            }
            case "linear":
            {
                const tempLinear = JSON.parse(JSON.stringify(this.props.state.linears[index]));
                this.props.submitUpdateLinears([...this.props.state.linears, tempLinear]);
                break;
            }
            default: break;
        }
        
    }

////////////////////////////////////////////////////////////////////////LIST///////////////////////////////////////////////////////////////////////////////////
    
    handleChangeLayer(type,index)
    {
        
        const newSelected = {type: type, index: index};
        this.props.submitChangeLayer(newSelected);
    }
    
    handleSetVisibility(type, index)
    {
        switch(type)
            {
                case "linear":
                    {
                        const newLinears = this.props.state.linears;
                        if(this.props.state.linears[index].visible == true) 
                            {
                                newLinears[index].visible = false;
                            }
                        else
                            {
                                newLinears[index].visible = true;
                            }
                            this.props.submitUpdateLinears(newLinears);
                        break;
                    }
                case "radial":
                    {
                        const newRadials = this.props.state.radials;
                        if(this.props.state.radials[index].visible == true) 
                            {
                                newRadials[index].visible = false;
                            }
                        else
                            {
                                newRadials[index].visible = true;
                            }
                            this.props.submitUpdateRadials(newRadials);
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
                        const newLinears = this.props.state.linears;
                        if(this.props.state.linears[index].grid == true) 
                            {
                                newLinears[index].grid = false;
                            }
                        else
                            {
                                newLinears[index].grid = true;
                            }
                        this.props.submitUpdateLinears(newLinears);
                        break;
                    }
                case "radial":
                    {
                        const newRadials = this.props.state.radials;
                        if(this.props.state.radials[index].grid == true) 
                            {
                                newRadials[index].grid = false;
                            }
                        else
                            {
                                newRadials[index].grid = true;
                            }
                        this.props.submitUpdateRadials(newRadials);
                        break;
                    }
            }
    }
    
////////////////////////////////////////////////////////////////////////MAIN CONTROL///////////////////////////////////////////////////////////////////////////
    
    handleGrid()
    {
        switch(this.props.state.grid)
            {
                case false:
                    {
                        this.props.submitSetGrid(true);
                        break;
                    }
                case true:
                    {
                        this.props.submitSetGrid(false);
                        break;
                    }
            }
    }
    
    handleRepeat()
    {
        switch(this.props.state.repeat)
            {
                case false:
                    {
                        this.props.submitSetRepeat(true);
                        break;
                    }
                case true:
                    {
                        this.props.submitSetRepeat(false);
                        break;
                    }
            }
    }
    
    handleZoom(event)
    {
        this.props.submitSetZoom(event.target.value);
    }
    
    handleWidthInput(event)
    {
        this.props.submitSetWidth(event.target.value);
        
    }
    
    handleHeightInput(event)
    {
        this.props.submitSetHeight(event.target.value);
    }
    
    handleBackgroundInput(event)
    {
        this.props.submitSetBackground(event.target.value);
    }
    
    handlePositioning(event)
    {
        this.props.submitSetPos(event.target.value);
    }
    
////////////////////////////////////////////////////////////////////////INPUT HANDLE///////////////////////////////////////////////////////////////////////////
    
    handleChangeInput(type,firstIndex,secondIndex,inputName)
    {
        let newLinears = this.props.state.linears;
        let newRadials = this.props.state.radials;
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
                                if(value >= 0 - +this.props.state.width && value <= +this.props.state.width)
                                {
                                    newLinears[firstIndex].vertical= value;
                                }
                                break;
                            }
                        case "horizontal": 
                            {
                                if(value >= 0 - +this.props.state.height && value <= +this.props.state.height)
                                {
                                    newLinears[firstIndex].horizontal= value;
                                } 
                                break;
                            }
                        case "auto-size":
                            {
                                if(this.props.state.linears[firstIndex].autoSize == true)
                                {
                                    newLinears[firstIndex].width = this.props.state.width;
                                    newLinears[firstIndex].height = this.props.state.height;
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
                    this.props.submitUpdateLinears(newLinears);
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
                                if(this.props.state.radials[firstIndex].autoSize == true)
                                {
                                    newRadials[firstIndex].width = this.props.state.width;
                                    newRadials[firstIndex].height = this.props.state.height;
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
                
                this.props.submitUpdateRadials(newRadials);
                break;
            }
        }
        
    }

////////////////////////////////////////////////////////////////////////MANAGEMENT////////////////////////////////////////////////////////////////////////
    
        signIn(name)
        {
            this.setState({logged: true, userName: name})
        }

        async signOut()
        {
            const response = await fetch("http://localhost:3000/signout");
            this.setState({logged: false, userName: ""});
        }

        loadPattern(pattern)
        {
            this.props.submitUpdateAll(pattern);
        }

    
////////////////////////////////////////////////////////////////////////GENERATE BUTTON////////////////////////////////////////////////////////////////////////
    
    handleGenerateButton()
    {
        const selector = document.querySelector("#code-div");
        const text = selector.style.cssText;
        this.props.submitGenerateCode(text);
    }
    
    
////////////////////////////////////////////////////////////////////////VIEWS///////////////////////////////////////////////////////////////////////////////// 

    changeView(view)
    {
        this.setState({view});
    }

    accountView()
    {
        return(
            <div id="container-window">
                <Account handleUpdate={this.updateAccountData} handleChange={this.changeView}/>
            </div>
        )
    }

    exploreView()
    {


        return(
            <div id="container-window">
                <Explore  handleLoad={this.loadPattern} handleChange={this.changeView}/>
            </div>
        )
    }

    publishView(style)
    {
        return(
            <div id="container-window">
                <Publish projectStyle={style} pattern={this.props.state} handlePublish={this.publishPattern} handleChange={this.changeView}/>
            </div>
        )
    }

    signUpView()
    {
        return(
            <div id="container-window">
                <SignUp handleChange={this.changeView} />
            </div> 
        )
    }

    signInView()
    {
        return(
            <div id="container-window">
                <SignIn handleChange={this.changeView} handleSignIn={this.signIn}/>
            </div>
        )
    }

    mainView()
    {
        return(
            <div id="container">
            
            <MainProp data={this.props.state} pointer={this} />
            <List data={this.props.state} handleChangeLayer={this.handleChangeLayer} handleVisibility={this.handleSetVisibility} handleGrid={this.handleSetGrid}/>
            <Properties handleChange={this.handleChangeInput} 
                        data={this.props.state} 
                        addLine={this.handleAddLine} 
                        deleteLine={this.handleDeleteLine} 
                        addRadius={this.handleAddRadius} 
                        deleteRadius={this.handleDeleteRadius}/>
            <Preview data={this.props.state} />
            <Canvas data={this.props.state} />
            
            <Logo />
            <Links />
            <Management handleSignOut={this.signOut} name={this.state.userName} isLogged={this.state.logged} handleChange={this.changeView}/>
            <Footer />
            <Code handle={this.handleGenerateButton} code={this.props.state.code} />
        
        </div>
        )
    }
    

////////////////////////////////////////////////////////////////////////RENDER/////////////////////////////////////////////////////////////////////////////////  
    
    
    render()
    {
        switch(this.state.view)
        {
            case "ACCOUNT": return this.accountView();
            case "EXPLORE": return this.exploreView();
            case "PUBLISH": 
            {
                const selectorStyle = document.querySelector("#code-div").style;

                return this.publishView({
                    backgroundImage: selectorStyle.backgroundImage, 
                    backgroundPosition: selectorStyle.backgroundPosition, 
                    backgroundColor: selectorStyle.backgroundColor, 
                    backgroundSize: selectorStyle.backgroundSize
                })
            }
            case "SIGNUP": return this.signUpView();
            case "SIGNIN": return this.signInView();
            case "MAIN": return this.mainView();
            default: return this.mainView();
        }

    }
}

const mapStateToProps = (state) => 
{
    return {state};
};

const mapDispatchToProps = (dispatch) => 
{
    return {
        submitUpdateAll: (value) =>       {dispatch(updateAll(value))},
        submitUpdateLinears: (value) =>   {dispatch(updateLinears(value))},
        submitUpdateRadials: (value) =>   {dispatch(updateRadials(value))},
        submitChangeLayer: (value) =>     {dispatch(changeLayer(value))},
        submitSetGrid: (value) =>         {dispatch(setGrid(value))},
        submitSetRepeat: (value) =>       {dispatch(setRepeat(value))},
        submitSetZoom: (value) =>         {dispatch(setZoom(value))},
        submitSetWidth: (value) =>        {dispatch(setWidth(value))},
        submitSetHeight: (value) =>       {dispatch(setHeight(value))},
        submitSetBackground: (value) =>   {dispatch(setBackground(value))},
        submitSetPos: (value) =>          {dispatch(setPos(value))},
        submitGenerateCode: (value) =>    {dispatch(generateCode(value))}
    }
}

const Container = connect(mapStateToProps, mapDispatchToProps)(App);

class AppWrapper extends React.Component 
{
    render() {
      return (
        <Provider store={store}>
          <Container/>
        </Provider>
      );
    }
};

ReactDOM.render(<AppWrapper />, document.querySelector("#App"))

