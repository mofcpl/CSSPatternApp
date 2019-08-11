import React from 'react'
import ReactDOM from 'react-dom'
import { Provider, connect } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

///////////////////////////////////////////////////////CONSTANTS///////////////////////////////////////////////////////

//Buttons
const ADD_LINEAR = 'ADD_LINEAR';
const ADD_LINE = 'ADD_LINE';
const DELETE_LINE = 'DELETE_LINE';
const ADD_RADIAL = 'ADD_RADIAL';
const ADD_RADIUS = 'ADD_RADIUS';
const DELETE_RADIUS = 'DELETE_RADIUS';

//List
const CHANGE_LAYER = 'CHANGE_LAYER';
const SET_VISIBILITY = 'SET_VISIBILITY';
const SET_GRID = 'SET_GRID';

//Main properties
const GRID = 'GRID';
const REPEAT = "REPEAT";
const ZOOM = "ZOOM";
const WIDTH = "WIDTH";
const HEIGHT = "HEIGHT";
const BACKGROUND = "BACKGROUND";
const POSITIONING = "POSITIONING";

//Propetries
const LINEAR_DIRECTION = "";
const LINEAR_VERTICAL = "";
const LINEAR_HORIZONTAL = "";
const LINEAR_AUTO_SIZE = "";
const LINEAR_WIDTH = "";
const LINEAR_HEIGHT = "";

const LINE_POSITION = "";
const LINE_SIZE = "";
const LINE_COLOR = "";
const LINE_OPACITY = "";
const LINE_BLUR = "";

const RADIAL_SHAPE = "";
const RADIAL_EXTENT = "";
const RADIAL_POSX = "";
const RADIAL_POSY = ""
const RADIAL_VERTICAL = "";
const RADIAL_HORIZONTAL = "";
const RADIAL_AUTO_SIZE = "";
const RADIAL_WIDTH = "";
const RADIAL_HEIGHT = "";

const RADIAL_POSITION = "";
const RADIAL_SIZE = "";
const RADIAL_COLOR = "";
const RADIAL_OPACITY = "";
const RADIAL_BLUR = "";


