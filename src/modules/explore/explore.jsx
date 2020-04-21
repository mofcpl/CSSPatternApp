import React, { Component } from "react";
import ReactDOM from "react-dom";

import style from "./explore.scss";

const Explore = (props) =>
{
    return(   
        
        
        <div id="explore" className="window">
            <div id="sort">
                <div>
                    <div>sort by</div>
                    <select type="text" list="types">
                        <option>most popular</option>
                        <option>newest</option>
                    </select>
                </div>
            </div>
            <div id="projects">
                <div className="project">
                    <div className="preview">

                    </div>
                    <div className="desc">
                        <h2>Linie bezpieczeństwa</h2>
                        <h3>Gumofc</h3>
                        <p>downloads - 4354</p>
                        <p>release - 10.06.2020</p>
                        <p>www.gumofc.pl</p>
                        <button>Load</button>
                    </div>
                </div>

                



            </div>
    
        </div>
    );
}


export {Explore}