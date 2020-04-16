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
                <div id="adfly">
                    <a href="https://join-adf.ly/22762713">
                        <img border="0" src="https://cdn.ay.gy/images/banners/adfly.728x90.1.gif" title="AdF.ly - shorten links and earn money!" />
                    </a><br />
                </div>
            </div>
        </div>
    );
}

const Ads = (props) =>
{
    return(   
        <div className="area" id="ads">

            <a href="http://greponozy.com/1RsW" target="_blank">Css tricks</a>
            <a href="http://greponozy.com/1Rzl" target="_blank">Patterns gallery</a>
            <a href="http://greponozy.com/1SCz" target="_blank">Color palettes</a>
            <a href="http://greponozy.com/1SPu" target="_blank">Front-end tutorials</a>
            <a href="http://greponozy.com/1SSM" target="_blank">Palette generator</a>
    
        </div>
    );
}

const Footer = (props) =>
{
    return(   
        <div className="area" id="footer">
            <a href="" target="_blank"><i className="icon-home" /></a>
            <a href="https://github.com/mofcpl" target="_blank"><i className="icon-github-circled" /></a>
            <a href="https://www.linkedin.com/in/zbrogdom/" target="_blank"><i className="icon-linkedin-squared" /></a>
        </div>
    );
}

export {Logo, Links, Ads, Footer}