import React from 'react'
import ReactDOM from 'react-dom'
import { Provider, connect } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'



///////////////////////////////////////////////////////CONSTANTS///////////////////////////////////////////////////////

const UPDATE_ALL = "UPDATE_ALL";
const UPDATE_LINEARS = "UPDATE_LINEARS";
const UPDATE_RADIALS = "UPDATE_RADIALS";
const CHANGE_LAYER = "CHANGE_LAYER";
const SET_GRID = "SET_GRID";
const SET_REPEAT = "SET_REPEAT";
const SET_ZOOM = "SET_ZOOM";
const SET_WIDTH = "SET_WIDTH";
const SET_HEIGHT = "SET_HEIGHT";
const SET_BACKGROUND = "SET_BACKGROUND";
const SET_POS = "SET_POS";
const GENERATE_CODE = "GENERATE_CODE";

///////////////////////////////////////////////////////DEFAULT_STORE///////////////////////////////////////////////////////

const defaultState =
{
    backgroundColor: "#ffffff",
    width: 100,
    height: 100,
    zoom: 1.0,
    code: "press button to generate...",
    grid: true,
    repeat: true,
    positioning: "%",
    linears: [],
    radials: [],
    selected:
    {
        type: "none",
        index: 0
    }
}

///////////////////////////////////////////////////////ACTION CREATORS///////////////////////////////////////////////////////
const updateAll = (value) =>
{
    return {type: UPDATE_ALL, value: value}
}
const updateLinears = (value) =>
{
    return {type: UPDATE_LINEARS, value: value}
}
const updateRadials = (value) =>
{
    return {type: UPDATE_RADIALS, value: value}
}
const changeLayer = (value) =>
{
    return {type: CHANGE_LAYER, value: value}
}
const setGrid = (value) =>
{
    return {type: SET_GRID, value: value}
}
const setRepeat = (value) =>
{
    return {type: SET_REPEAT, value: value}
}
const setZoom = (value) =>
{
    return {type: SET_ZOOM, value: value}
}
const setWidth = (value) =>
{
    return {type: SET_WIDTH, value: value}
}
const setHeight = (value) =>
{
    return {type: SET_HEIGHT, value: value}
}
const setBackground = (value) =>
{
    return {type: SET_BACKGROUND, value: value}
}
const setPos = (value) =>
{
    return {type: SET_POS, value: value}
}
const generateCode = (value) =>
{
    return {type: GENERATE_CODE, value: value}
}

///////////////////////////////////////////////////////REDUCER///////////////////////////////////////////////////////

const reducer = (state = defaultState, action) =>
{

    switch(action.type)
    {
        case UPDATE_ALL:        return Object.assign({}, action.value, {zoom: 1.0, code: "press button to generate...", grid: true, repeat: true,} );
        case UPDATE_LINEARS:    return Object.assign({},state, {linears: action.value});
        case UPDATE_RADIALS:    return Object.assign({},state, {radials: action.value});
        case CHANGE_LAYER:      return Object.assign({},state, {selected: action.value});
        case SET_GRID:          return Object.assign({},state, {grid: action.value});
        case SET_REPEAT:        return Object.assign({},state, {repeat: action.value});
        case SET_ZOOM:          return Object.assign({},state, {zoom: action.value});
        case SET_WIDTH:         return Object.assign({},state, {width: action.value});
        case SET_HEIGHT:        return Object.assign({},state, {height: action.value});
        case SET_BACKGROUND:    return Object.assign({},state, {backgroundColor: action.value});
        case SET_POS:           return Object.assign({},state, {positioning: action.value});
        case GENERATE_CODE:     return Object.assign({},state, {code: action.value});
        default: return defaultState;
    }
}

const store = createStore(reducer);

export {store, updateAll, updateLinears, updateRadials, changeLayer, setGrid, setRepeat, setZoom, setWidth, setHeight, setBackground, setPos, generateCode}