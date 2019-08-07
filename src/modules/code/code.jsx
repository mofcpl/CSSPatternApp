import React, { Component } from "react";
import ReactDOM from "react-dom";

import style from "./code.scss";

const Code = (props) =>
{  
    return(
        <div className="area" id="code">
            <div className="card">
                <div id="codeButton">
                    <button onClick={props.handle} >Generate CSS</button>
                </div>
                <div id="codeText">
                    <textarea id="code-output" value={props.code} readOnly>
                        
                    </textarea>    
                </div>
            </div>
        </div>
    );
}

export {Code}