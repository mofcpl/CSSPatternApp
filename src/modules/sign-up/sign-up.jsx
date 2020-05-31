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
            warning: false,
            warningMsg: "",
            done: false
        }

        this.handleInput = this.handleInput.bind(this);
        this.register = this.register.bind(this);
    }

    async register()
    {
        if(this.state.password.length >= 8)
        {
            if(this.state.password === this.state.repeat)
            {

                this.setState({warning: false})

                const response = await fetch("https://csspatternapp.pl/signup", 
                {
                    headers: {"Content-type": "application/json; charset=UTF-8"},
                    method: "post", 
                    body: JSON.stringify({
                        name: this.state.name,
                        email: this.state.email,
                        password: this.state.password
                    })
                });
                
                const data = await response.json();
                if(data.error)
                {
                    this.setState({warning: true, warningMsg: data.msg});
                }
                else
                {
                    this.setState({done: true})
                }
            }
            else
            {
                this.setState({warning: true, warningMsg: "Passwords are not equal"});
            }
        }
        else
        {
            this.setState({warning: true, warningMsg: "Passwords must be minimum 8 characters"});
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
        const registration = (
            
    
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
                    (this.state.warning) ? <p class="warning"> {this.state.warningMsg} </p> : ""
                }
                <button type="submit">Sign up</button>
                <button onClick = { () => {this.props.handleChange("MAIN")}}>cancel</button>
                </form>
        
        );

        const succesfull = (
            <p>
                <label>Account was succesfully registered and email with activation link was send to {this.state.email} </label>
                <button onClick = { () => {this.props.handleChange("MAIN")}}>ok</button>
            </p>
        )

        return (
            <div className="window">
                {(this.state.done) ? succesfull : registration}
            </div>
        )
 
    }
    
}


export {SignUp}