import React, { Component } from "react";
import ReactDOM from "react-dom";

import style from "./sign-in.scss";

class SignIn extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state =
        {
            email: "email",
            password: "pass",
            warning: false,
            warningMsg: "",
            done: false
        }

        this.handleInput = this.handleInput.bind(this);
        this.login = this.login.bind(this);
    }

    async login()
    {
        if(this.state.password.length < 8)
        {
            this.setState({warning: true, warningMsg: "Passwords must be minimum 8 characters"});
        }
        else
        {
            this.setState({warning: false})

            const response = await fetch("https://csspatternapp.pl:3000/signin", 
            {
                headers: {"Content-type": "application/json; charset=UTF-8"},
                method: "post", 
                body: JSON.stringify({
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
                this.setState({done: true});
                this.props.handleSignIn(data.name);
            }
        }
    }

    handleInput(type, event)
    {

        switch (type)
        {
            case "EMAIL":
            {
                this.setState({email: event.target.value})
                break;
            }
            case "PASSWORD":
            {
                this.setState({password: event.target.value});
                break;
            }
            case "BUTTON":
            {
                this.login();
                break;
            }
            default: break;
        }

        event.preventDefault();
        
    }



    render()
    {
        const login =  (
            <form onSubmit={ () => this.handleInput("BUTTON",event)}>
            <p>
                <label>email</label>
                <input onChange={(event) => {this.handleInput("EMAIL",event)}} value={this.state.email} type="email" required></input>
            </p>
            <p>
                <label>password</label>
                <input onChange={(event) => {this.handleInput("PASSWORD",event)}} value={this.state.password} type="password" required></input>
            </p>
            {
                (this.state.warning) ? <p class="warning"> {this.state.warningMsg} </p> : ""
            }
            <button type="submit">Sign in</button>
            <button onClick = { () => {this.props.handleChange("MAIN")}}>cancel</button>
            </form>
            )
        
        const succesfull = (
            <p>
                <label>Successfully logged in</label>
                <button onClick = { () => {this.props.handleChange("MAIN")}}>ok</button>
            </p>
        )

        return (
            <div className="window">
                {(this.state.done) ? succesfull : login}
            </div>
        )
    }
    
}


export {SignIn}