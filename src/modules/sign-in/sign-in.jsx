import React, { Component } from "react";
import ReactDOM from "react-dom";

import style from "./sign-in.scss";

class SignIn extends React.Component
{
    constructor(props)
    {
        super(props)

        this.state =
        {
            email: "email",
            password: "pass"
        }

        this.handleInput = this.handleInput.bind(this);
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
            default: break;
        }
        
    }



    render()
    {
        return(   
            <div className="window">
    
                <form>
                <p>
                    <label>email</label>
                    <input onChange={(event) => {this.handleInput("EMAIL",event)}} value={this.state.email} type="email"></input>
                </p>
                <p>
                    <label>password</label>
                    <input onChange={(event) => {this.handleInput("PASSWORD",event)}} value={this.state.password} type="password"></input>
                </p>
                <button>Sign in</button>
                </form>
        
            </div>
        );
    }
    
}


export {SignIn}