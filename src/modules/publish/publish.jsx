import React, { Component } from "react";
import ReactDOM from "react-dom";

import style from "./publish.scss";

class Publish extends React.Component
{

    constructor(props)
    {
        super(props);

        this.state =
        {
            title: "",
            warning: false,
            warningMsg: "",
            done: false
        }

        this.handleInput = this.handleInput.bind(this);
        this.publish = this.publish.bind(this);

    }

    async publish()
    {
        if(this.state.title.length < 6)
        {
            this.setState({warning: true, warningMsg: "Title must be minimum 6 characters"});
        }
        else
        {
            this.setState({warning: false})

            //console.log(this.props.projectStyle);
            
            const response = await fetch("https://csspatternapp.pl/publish", 
            {
                headers: {"Content-type": "application/json; charset=UTF-8"},
                method: "post", 
                body: JSON.stringify({
                    title: this.state.title,
                    data: this.props.pattern,
                    style: this.props.projectStyle
                })
            });

            const data = await response.json();
            if(data.error)
            {
                this.setState({warning: true, warningMsg: data.msg});
            }
            else
            {
                this.setState({done: true});
            }
        }
    }

    handleInput(type, event)
    {

        switch (type)
        {
            case "TITLE":
            {
                this.setState({title: event.target.value})
                break;
            }
            case "BUTTON":
            {
                this.publish();
                break;
            }
            default: break;
        }

        event.preventDefault();
        
    }


    render()
    {
        const publish =  
    
                <form onSubmit = {() => this.handleInput("BUTTON", event)}>
                <p>
                    <label>Name</label>
                    <input onChange = {() => this.handleInput("TITLE", event)} type="text"></input>
                </p>
                {
                    (this.state.warning) ? <p class="warning"> {this.state.warningMsg} </p> : ""
                }
                <button type="submit">Publish</button>
                <button onClick = { () => {this.props.handleChange("MAIN")}}>cancel</button>
                </form>

        const succesfull = 
        <p>
            <label>Successfully published</label>
            <button onClick = { () => {this.props.handleChange("MAIN")}}>ok</button>
        </p>

        return (
        <div className="window">
            {(this.state.done) ? succesfull : publish}
        </div>
        )

    }


}


export {Publish}