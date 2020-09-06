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

const Footer = (props) =>
{
    return(   
        <div className="area" id="footer">
            <a href="https://zbrogdom.pl/" target="_blank"><i className="icon-home" /></a>
            <a href="https://github.com/mofcpl/CSSPatternApp" target="_blank"><i className="icon-github-circled" /></a>
            <a href="https://www.linkedin.com/in/zbrogdom/" target="_blank"><i className="icon-linkedin-squared" /></a>
        </div>
    );
}

export {Logo, Links, Footer}