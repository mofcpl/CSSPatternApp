import React, { Component } from "react";
import ReactDOM from "react-dom";

import style from "./publish.scss";

const Publish = (props) =>
{
    return(   
        <div className="window">

            <form>
            <p>
                <label>Name</label>
                <input type="text"></input>
            </p>
            <button>Publish</button>
            </form>
    
        </div>
    );
}


export {Publish}