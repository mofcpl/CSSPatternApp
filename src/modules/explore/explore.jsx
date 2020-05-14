import React, { Component } from "react";
import ReactDOM from "react-dom";

import style from "./explore.scss";

class Explore extends React.Component
{
    
    constructor(props)
    {
        super(props);

        this.state=
        {
            sort: "popular",
            projects: [],
            project: {},
            loadedProjectId: 0,
            loaded: false,
            author: {},
            warning: false,
            warningMsg: ""
        }


        this.handleInput = this.handleInput.bind(this);
        this.loadProject = this.loadProject.bind(this);
        this.deleteProject = this.deleteProject.bind(this);
        this.renderLoadedProject = this.renderLoadedProject.bind(this);
        this.sort = this.sort.bind(this);
    }

    async loadProject(id, loadedId)
    {

        this.setState({warning: false})

        const response = await fetch("http://localhost:3000/download", 
        {
            headers: {"Content-type": "application/json; charset=UTF-8"},
            method: "post", 
            body: JSON.stringify({id})
        }); 

        const data = await response.json();

        if(data.error)
        {
            //this.setState({loaded: false, warning: true});
        }
        else
        {
            this.setState({project: data.project, loaded: true, author: data.author, loadedProjectId: loadedId});
        }
    }

    async deleteProject(id)
    {
        
        this.setState({warning: false})

        const response = await fetch("http://localhost:3000/delete", 
        {
            headers: {"Content-type": "application/json; charset=UTF-8"},
            method: "post", 
            body: JSON.stringify({projectId: id})
        }); 

        const data = await response.json();
        if(data.error)
        {
            this.setState({warning: true, warningMsg: data.msg});
        }
        else
        {
            const tempArray = this.state.projects;
            tempArray.splice(this.state.loadedProjectId);
            this.setState({loaded: false, projects: tempArray});

        }
    }

    sort(type)
    {
        switch(type)
        {
            case "most popular":
            {
                const sortedArray = this.state.projects.sort((a, b) => b.downloads - a.downloads);
                this.setState({projects: sortedArray});
                break;
            }
            case "newest":
            {
                const sortedArray = this.state.projects.sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));
                this.setState({projects: sortedArray});
                break;
            }
            case "alphabetic":
            {
                const sortedArray = this.state.projects.sort((a, b) => 
                {
                    let comparison = 0;
                    
                    if(a.title > b.title)
                    comparison = 1;
                    else if(a.title < b.title) 
                    comparison = -1
                    return comparison;
                });
                this.setState({projects: sortedArray});
                break;
            }
            default: break;
        }
    }

    handleInput(type, event,id, loadedId)
    {

        switch (type)
        {
            case "SORT":
            {
                this.setState({sort: event.target.value})
                this.sort(event.target.value);
                break;
            }
            case "LOAD":
            {
                this.loadProject(id, loadedId);
                break;
            }
            case "RETURN":
            {
                this.setState({loaded: false});
                break;
            }
            case "DELETE":
            {
                this.deleteProject(id);
                break;
            }
            case "DOWNLOAD":
            {
                console.log(this.state.project.data);
                this.props.handleLoad(this.state.project.data);
                this.props.handleChange("MAIN");
                break;
            }
            default: break;
        }

        event.preventDefault();
        
    }

    componentDidMount()
    {
        fetch("http://localhost:3000/explore")
        .then(data => data.json())
        .then(data => 
        {
            if(data.error)
            {
                this.props.handleChange("SIGNIN");
            }
            else
            {
                this.setState({projects: data.projects});
            }
        })
    }
    

    renderLoadedProject()
    {
        console.log(this.state.project.publishedDate);
        const date =  new Date(this.state.project.publishedDate);
        const formatedDate = date.getDate() +"-"+date.getMonth()+"-"+date.getFullYear()+" "+date.getHours()+":"+date.getMinutes();

        return(
            <div className="content" id="project">
                <div id="preview" style={{
                            backgroundImage: this.state.project.style.backgroundImage, 
                            backgroundPosition: this.state.project.style.backgroundPosition, 
                            backgroundColor: this.state.project.style.backgroundColor, 
                            backgroundSize: this.state.project.style.backgroundSize
                    }}>
                </div>
                <div id="desc">
                    <div>
                        <div className="title">{this.state.project.title}</div>
                        <div className="info">
                            <div className="info-name">author:</div>
                            <div className="info-data">{this.state.author.name}</div>
                        </div>
                        <div className="info">
                            <div className="info-name">homepage:</div>
                            <div className="info-data">{this.state.author.homepage}</div>
                        </div>
                        <div className="info">
                            <div className="info-name">published date:</div>
                            <div className="info-data">{formatedDate}</div>
                        </div>
                        <div className="info">
                            <div className="info-name">views:</div>
                            <div className="info-data">{this.state.project.downloads}</div>
                        </div>
                    </div>
                </div>
                <div id="buttons">
                        <button onClick = { () => {this.handleInput("DOWNLOAD", event,0)}}>load</button>
                        <button onClick = { () => {this.handleInput("DELETE", event,this.state.project._id)}}>delete</button>
                        <button onClick = { () => {this.handleInput("RETURN", event,0)}}>return</button>
                </div>
                {
                    (this.state.warning) ? <p className="warning"> {this.state.warningMsg} </p> : ""
                }
            </div>
        )
    }
    
    render()
    {
        const browser = 
            <div className="content" id="projects">
                { 
                    this.state.projects.map( (currentValue, index, array) => 
                    <div className={"preview"} key={index} onClick = { () => {this.handleInput("LOAD", event,currentValue.id, index)}}
                        style={{
                            backgroundImage: currentValue.style.backgroundImage, 
                            backgroundPosition: currentValue.style.backgroundPosition, 
                            backgroundColor: currentValue.style.backgroundColor, 
                            backgroundSize: currentValue.style.backgroundSize
                    }}>
                        <div>
                            <h2>{currentValue.title}</h2>
                        </div>
                    </div>)
                }
            </div>

        return(   
       
            <div id="explore" className="window">
                <div id="sort">
                    <div>
                        <div>sort by</div>
                        <select value={this.state.sort} onChange = {() => this.handleInput("SORT", event)} type="text" list="types">
                            <option>most popular</option>
                            <option>newest</option>
                            <option>alphabetic</option>
                        </select>
                    </div>
                </div>
                {(this.state.loaded) ? this.renderLoadedProject() : browser}
                <button onClick = { () => {this.props.handleChange("MAIN")}}>cancel</button>  
            </div>
        );
    }
    
    
    
}


export {Explore}