import React, { Component } from "react";
import ReactDOM from "react-dom";

import style from "./sign-up.scss";

class SignUp extends React.Component
{
    constructor(props)
    {
        super(props)

        this.state =
        {
            name: "",
            email: "",
            password: "",
            repeat: "",
            pswdEqual: true
        }

        this.handleInput = this.handleInput.bind(this);
        
    }

    async register()
    {
        if(this.state.password === this.state.repeat)
        {

            this.setState({pswdEqual: true})

            const response = await fetch("http://localhost:3000/signup", 
            {
                headers: {"Content-type": "application/json; charset=UTF-8"},
                method: "post", 
                body: JSON.stringify({
                    name: this.state.name,
                    email: this.state.email,
                    password: this.state.password
                })
            });
            
            //const data = await response.json();
        }
        else
        {
            this.setState({pswdEqual: false})
        }

    }

    handleInput(type, event)
    {
        switch (type)
        {
            case "NAME":
            {
                this.setState({name: event.target.value});
                break;
            }
            case "EMAIL":
            {
                this.setState({email: event.target.value});
                break;
            }
            case "PASSWORD":
            {
                this.setState({password: event.target.value});
                break;
            }
            case "REPEAT":
            {
                this.setState({repeat: event.target.value});
                break;
            }
            case "BUTTON":
            {
                this.register();
                break;
            }
            default: break;
        }

        event.preventDefault();
    }

    render()
    {
        return(   
            <div className="window">
    
                <form onSubmit={ () => this.handleInput("BUTTON",event)}>
                <p>
                    <label>name</label>
                    <input onChange={ (event) => {this.handleInput("NAME", event)}} value={this.state.name} type="text" required></input>
                </p>
                <p>
                    <label>email</label>
                    <input onChange={ (event) => {this.handleInput("EMAIL", event)}} value={this.state.email} type="email" required></input>
                </p>
                <p>
                    <label>password</label>
                    <input onChange={ (event) => {this.handleInput("PASSWORD", event)}} value={this.state.password} type="password" required></input>
                </p>
                <p>
                    <label>repeat password</label>
                    <input onChange={ (event) => {this.handleInput("REPEAT", event)}} value={this.state.repeat} type="password" required></input>
                </p>
                {
                    (!this.state.pswdEqual) ? <p class="warning"> passwords not matching </p> : ""
                }
                <button type="submit">Sign up</button>
                </form>
        
            </div>
        );
    }
    
}


export {SignUp}