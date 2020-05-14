import React, { Component } from "react";
import ReactDOM from "react-dom";

import style from "./account.scss";

class Account extends React.Component
{

    constructor(props)
    {
        super(props)

        this.state =
        {
            name: "",
            email: "",
            homepage: "",
            password: "",
            newPassword: "",
            newPasswordRepeat: "",
            warning: false,
            warningMsg: "",
            done: false,
            emailError: false,
            emailChange: false
        }

        this.handleInput = this.handleInput.bind(this);
        this.update = this.update.bind(this);
    }

    async update()
    {
        if(!this.state.name && !this.state.email && !this.state.homepage && !this.state.newpassword)
        {
            this.setState({warning: true, warningMsg: "Nothing to update"})
        }
        else
        {
            if(this.state.newPassword.length < 8 && this.state.password.length < 8)
            {
                
                this.setState({warning: true, warningMsg: "Passwords must be minimum 8 characters"})
            }
            else
            {
                if(this.state.newPassword != "" && this.state.newPassword !== this.state.newPasswordRepeat)
                {
                    this.setState({warning: true, warningMsg: "Passwords are not equal"})
                }
                else
                {
                    this.setState({warning: false})

                    const response = await fetch("http://localhost:3000/update", 
                    {
                        headers: {"Content-type": "application/json; charset=UTF-8"},
                        method: "post", 
                        body: JSON.stringify({
                            name: this.state.name,
                            email: this.state.email,
                            homepage: this.state.homepage,
                            password: this.state.password,
                            newPassword: this.state.newPassword
                        })
                    });
                    
                    const data = await response.json();
                    if(data.error)
                    {
                        this.setState({warning: true, warningMsg: data.msg, emailError: data.emailError});
                    }
                    else
                    {
                        this.setState({done: true, emailChange: data.emailChange})
                    }
                }
            }
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
            case "HOMEPAGE":
            {
                this.setState({homepage: event.target.value});
                break;
            }
            case "PASSWORD":
            {
                this.setState({password: event.target.value});
                break;
            }
            case "NEWPASSWORD":
            {
                this.setState({newPassword: event.target.value});
                break;
            }
            case "REPEAT":
            {
                this.setState({newPasswordRepeat: event.target.value});
                break;
            }
            case "BUTTON":
            {
                this.update();
                break;
            }
            default: break;
        }

        event.preventDefault();
    }

    componentDidMount()
    {
        fetch("http://localhost:3000/data")
        .then(data => data.json())
        .then(data => 
        {
            if(data.error)
        {
            this.props.handleChange("SIGNIN");
        }
        else
        {
            const homepage = (data.homepage) ? data.homepage : "";
            this.setState({name: data.name, email: data.email, homepage});
        }
        })
    }

    render()
    {

        const update =   
                <form onSubmit={ (event) => {this.handleInput("BUTTON", event)}}>
                <p>
                    <label>name</label>
                    <input onChange={ (event) => {this.handleInput("NAME", event)}} type="text" value={this.state.name}></input>
                </p>
                <p>
                    <label>email</label>
                    <input onChange={ (event) => {this.handleInput("EMAIL", event)}} type="email" value={this.state.email}></input>
                </p>
                <p>
                    <label>homepage</label>
                    <input onChange={ (event) => {this.handleInput("HOMEPAGE", event)}} type="text" value={this.state.homepage}></input>
                </p>
                <p>
                    <label>new password</label>
                    <input onChange={ (event) => {this.handleInput("NEWPASSWORD", event)}} type="password" value={this.state.newPassword}></input>
                </p>
                <p>
                    <label>repeat new password</label>
                    <input onChange={ (event) => {this.handleInput("REPEAT", event)}} type="password" value={this.state.newPasswordRepeat}></input>
                </p>
                <p>
                    <label>current password</label>
                    <input onChange={ (event) => {this.handleInput("PASSWORD", event)}} type="password" required value={this.state.password}></input>
                </p>
                { (this.state.warning) ? <p class="warning"> {this.state.warningMsg} </p> : ""}
                { (this.state.emailError) ? <p class="warning">can't send activation email</p> : ""}
                <button>Update</button>
                <button onClick = { () => {this.props.handleChange("MAIN")}}>cancel</button>
                </form>
        
        const succesfull = (
            <p>
                <label>Account was succesfully updated</label>
                {(this.state.emailChange) ? ((this.state.emailError) ? <p class="warning">can't send activation email</p> : "Activation email was send to: "+this.state.email) : ""}
                <button onClick = { () => {this.props.handleChange("MAIN")}}>ok</button>
            </p>
        ) 

        return (
            <div className="window">
                {(this.state.done) ? succesfull : update}
            </div>
        )
    }
    
}


export {Account}