import React, { Component } from "react";
import ReactDOM from "react-dom";

import style from "./visuals.scss";

const Logo = (props) =>
{
    return(   
        <div className="area" id="logo">
            <div className="card">
                <div><span>CSS</span>PatternApp</div>
            </div>
        </div>
    );
}

const Links = (props) =>
{
    return(   
        <div className="area" id="links">
            <div className="card">

            </div>
        </div>
    );
}

const Ads = (props) =>
{
    return(   
        <div className="area" id="ads">

                <div>Option 1</div>
                <div>Option 2</div>
                <div>Option 3</div>
                <div>Option 4</div>
                <div>Option 5</div>
    
        </div>
    );
}

const Footer = (props) =>
{
    return(   
        <div className="area" id="footer">
            <div>CSSPatternApp® All rights reserved</div>
            <div>bla bla bla</div>
            <div>contact@csspatternapp.com</div>
        </div>
    );
}

export {Logo, Links, Ads, Footer}