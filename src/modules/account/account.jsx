import React, { Component } from "react";
import ReactDOM from "react-dom";

import style from "./account.scss";

const Account = (props) =>
{
    return(   
        <div className="window">

            <form>
            <p>
                <label>name</label>
                <input type="text" placeholder="mofc"></input>
            </p>
            <p>
                <label>email</label>
                <input type="email" placeholder="mofc@gmail.com"></input>
            </p>
            <p>
                <label>homepage</label>
                <input type="text" placeholder="mofc"></input>
            </p>
            <p>
                <label>password</label>
                <input type="password" placeholder="dupa1234"></input>
            </p>
            <p>
                <label>repeat password</label>
                <input type="password"></input>
            </p>
            <button>Update</button>
            </form>
    
        </div>
    );
}


export {Account}