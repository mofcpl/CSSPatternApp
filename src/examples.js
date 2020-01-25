const CicadaStripes = () =>
{
    return(
    {
        grid: false,
        width: 100,
        height: 100,
        positioning: "%",
        backgroundColor: "#026873",
        selected: {type: "none", index: 0},
        radials: [],
        linears: [{
            direction: 90,
            vertical: 0,
            horizontal: 0,
            visible: true, 
            grid: false,
            autoSize: false,
            width: 13,
            height: 100,
            lines: [
                {
                    position: 0,
                    color: "#ffffff",
                    size: 50,
                    opacity: 7,
                    blur: 0
                }
            ]},
            {
            direction: 90,
            vertical: 0,
            horizontal: 0,
            visible: true, 
            grid: false,
            autoSize: false,
            width: 29,
            height: 100,
            lines: [
                {
                    position: 0,
                    color: "#ffffff",
                    size: 50,
                    opacity: 13,
                    blur: 0
                }
            ]},
            {
            direction: 90,
            vertical: 0,
            horizontal: 0,
            visible: true, 
            grid: false,
            autoSize: false,
            width: 37,
            height: 100,
            lines: [
                {
                    position: 50,
                    color: "#ffffff",
                    size: 50,
                    opacity: 17,
                    blur: 0
                }
            ]},
            {
            direction: 90,
            vertical: 0,
            horizontal: 0,
            visible: true, 
            grid: false,
            autoSize: false,
            width: 53,
            height: 100,
            lines: [
                {
                    position: 0,
                    color: "#ffffff",
                    size: 50,
                    opacity: 19,
                    blur: 0
                }
            ]}
        ]
    });
}

const Hearts = ()=>
{
    return(
    {   
        width: 100,
        height: 100,
        positioning: "%",
        backgroundColor: "#bb0033",
        selected: {type: "none", index: 0},
        linears: [],   
        radials: [{
            shape: "circle",
            size: "closest-side",
            posx: 60,
            posy: 43,
            vertical: 50,
            horizontal: 50,
            visible: true, 
            grid: false,
            autoSize: true,
            rays: [{
                position: 0,
                color: "#bb0033",
                size: 26,
                opacity: 100,
                blur: 1
            }]
        },
        {
            shape: "circle",
            size: "closest-side",
            posx: 40,
            posy: 43,
            vertical: 50,
            horizontal: 50,
            visible: true, 
            grid: false,
            autoSize: true,
            rays: [{
                position: 0,
                color: "#bb0033",
                size: 26,
                opacity: 100,
                blur: 1
            }]
        },
        {
            shape: "circle",
            size: "closest-side",
            posx: 40,
            posy: 22,
            vertical: 50,
            horizontal: 50,
            visible: true, 
            grid: false,
            autoSize: true,
            rays: [{
                position: 0,
                color: "#dd3355",
                size: 45,
                opacity: 100,
                blur: 1
            }]
        },
        {
            shape: "circle",
            size: "closest-side",
            posx: 60,
            posy: 22,
            vertical: 50,
            horizontal: 50,
            visible: true, 
            grid: false,
            autoSize: true,
            rays: [{
                position: 0,
                color: "#dd3355",
                size: 45,
                opacity: 100,
                blur: 1
            }]
        },
        {
            shape: "circle",
            size: "closest-side",
            posx: 50,
            posy: 35,
            vertical: 50,
            horizontal: 50,
            visible: true, 
            grid: false,
            autoSize: true,
            rays: [{
                position: 0,
                color: "#dd3355",
                size: 30,
                opacity: 100,
                blur: 1
            }]
        }
        ]
    });
}

const Bricks = () =>
{
    return(
    {
        width: 58,
        height: 58,
        positioning: "px",
        backgroundColor: "#c0c0c0",
        selected: {type: "none", index: 0},
        radials: [],  
        linears:[{
            direction: 335,
            vertical: 0,
            horizontal: 2,
            visible: true, 
            grid: false,
            autoSize: true,
            lines: [
                {
                    position: 0,
                    color: "#bb0000",
                    size: 23,
                    opacity: 100,
                    blur: 0
                }
            ]
            
        },
        {
            direction: 155,
            vertical: 4,
            horizontal: 35,
            visible: true, 
            grid: false,
            autoSize: true,
            lines: [
                {
                    position: 0,
                    color: "#dd0000",
                    size: 23,
                    opacity: 100,
                    blur: 0
                }
            ]
        },
        {
            direction: 335,
            vertical: 29,
            horizontal: 31,
            visible: true, 
            grid: false,
            autoSize: true,
            lines: [
                {
                    position: 0,
                    color: "#bb0000",
                    size: 23,
                    opacity: 100,
                    blur: 0
                }
            ]
        },
        {
            direction: 155,
            vertical: 34,
            horizontal: 6,
            visible: true, 
            grid: false,
            autoSize: true,
            lines: [
                {
                    position: 0,
                    color: "#dd0000",
                    size: 23,
                    opacity: 100,
                    blur: 0
                }
            ]
        }]
    });
}

const Stairs = () =>
{
    return(
    {
        width: 16,
        height: 48,
        positioning: "%",
        backgroundColor: "#444444",
        selected: {type: "none", index: 0},
        radials: [], 
        linears: [{
            direction: 64,
            vertical: 7,
            horizontal: 0,
            visible: true, 
            grid: false,
            autoSize: true,
            lines: [
                {
                    position: 0,
                    color: "#999999",
                    size: 22,
                    opacity: 100,
                    blur: 0
                }
            ]
            
        },
        {
            direction: 63,
            vertical: 0,
            horizontal: 0,
            visible: true, 
            grid: false,
            autoSize: true,
            lines: [
                {
                    position: 78,
                    color: "#999999",
                    size: 22,
                    opacity: 100,
                    blur: 2
                }
            ]
        },
        {
            direction: 63,
            vertical: 0,
            horizontal: 0,
            visible: true, 
            grid: false,
            autoSize: true,
            lines: [
                {
                    position: 38,
                    color: "#999999",
                    size: 20,
                    opacity: 100,
                    blur: 2
                }
            ]
        }]
    });
}


const Shippo = () =>
{
    return(
    {
        width: 80,
        height: 80,
        positioning: "%",
        backgroundColor: "#ddeeff",
        selected: {type: "none", index: 0},
        linears: [],
        radials: [{
            shape: "ellipse",
            size: "closest-side",
            posx: 50,
            posy: 50,
            vertical: 0,
            horizontal: 0,
            visible: true, 
            grid: false,
            autoSize: true,
            rays: [{
                position: 99,
                color: "#000000",
                size: 45,
                opacity: 30,
                blur: 0
            }]
        },
        {
            shape: "ellipse",
            size: "closest-side",
            posx: 50,
            posy: 50,
            vertical: 40,
            horizontal: 40,
            visible: true, 
            grid: false,
            autoSize: true,
            rays: [{
                position: 99,
                color: "#000000",
                size: 45,
                opacity: 30,
                blur: 0
            }]
        }
        ]
    });
}


const Microbial = () =>
{
    return(
    {
        width: 20,
        height: 20,
        positioning: "px",
        backgroundColor: "#88aa33",
        selected: {type: "none", index: 0},
        linears: [],
        radials: [{
            shape: "circle",
            size: "farthest-corner",
            posx: 0,
            posy: 10,
            vertical: 0,
            horizontal: 10,
            visible: true, 
            grid: false,
            autoSize: true,
            rays: [{
                position: 10,
                color: "#661133",
                size: 1,
                opacity: 100,
                blur: 0
            }]
        },
        {
            shape: "ellipse",
            size: "farthest-corner",
            posx: 20,
            posy: 20,
            vertical: 0,
            horizontal: 0,
            visible: true, 
            grid: false,
            autoSize: true,
            rays: [{
                position: 10,
                color: "#661133",
                size: 1,
                opacity: 100,
                blur: 0
            }]
        }
        ]
    });
}


const Carbon = () =>
{
    return(
    {
        width: 20,
        height: 20,
        positioning: "px",
        backgroundColor: "#131313",
        selected: {type: "none", index: 0},
        radials: [],
        linears: [{
            direction: 27,
            vertical: 0,
            horizontal: 5,
            visible: true, 
            grid: false,
            autoSize: true,
            lines: [
                {
                    position: 0,
                    color: "#151515",
                    size: 5,
                    opacity: 100,
                    blur: 0
                }
            ]},
            {
            direction: 207,
            vertical: 10,
            horizontal: 0,
            visible: true, 
            grid: false,
            autoSize: true,
            lines: [
                {
                    position: 0,
                    color: "#151515",
                    size: 5,
                    opacity: 100,
                    blur: 0
                }
            ]},
            {
            direction: 27,
            vertical: 0,
            horizontal: 10,
            visible: true, 
            grid: false,
            autoSize: true,
            lines: [
                {
                    position: 0,
                    color: "#222222",
                    size: 5,
                    opacity: 100,
                    blur: 0
                }
            ]},
            {
            direction: 207,
            vertical: 10,
            horizontal: 5,
            visible: true, 
            grid: false,
            autoSize: true,
            lines: [
                {
                    position: 0,
                    color: "#222222",
                    size: 5,
                    opacity: 100,
                    blur: 0
                }
            ]},
            {
            direction: 90,
            vertical: 0,
            horizontal: 0,
            visible: true, 
            grid: false,
            autoSize: true,
            lines: [
                {
                    position: 0,
                    color: "#1b1b1b",
                    size: 10,
                    opacity: 100,
                    blur: 0
                }
            ]},
            {
            direction: 180,
            vertical: 0,
            horizontal: 0,
            visible: true, 
            grid: false,
            autoSize: true,
            lines: [
                {
                    position: 0,
                    color: "#1d1d1d",
                    size: 5,
                    opacity: 100,
                    blur: 0
                },
                {
                    position: 5,
                    color: "#1a1a1a",
                    size: 5,
                    opacity: 100,
                    blur: 0
                },
                {
                    position: 15,
                    color: "#242424",
                    size: 5,
                    opacity: 100,
                    blur: 0
                }
            ]
        }]
    });
}

const Weaves = () =>
{
    return(
    {
        width: 64,
        height: 128,
        positioning: "px",
        backgroundColor: "#708090",
        selected: {type: "none", index: 0},
        radials: [],
        linears: [{
            direction: 135,
            vertical: 0,
            horizontal: 0,
            visible: true, 
            grid: false,
            autoSize: true,
            lines: [
                {
                    position: 22,
                    color: "#d9ecff",
                    size: 1,
                    opacity: 100,
                    blur: 1
                },
                {
                    position: 67,
                    color: "#d9ecff",
                    size: 1,
                    opacity: 100,
                    blur: 1
                }
            ]
            
        },
        {
            direction: 225,
            vertical: 0,
            horizontal: 64,
            visible: true, 
            autoSize: true,
            lines: [
                {
                    position: 22,
                    color: "#d9ecff",
                    size: 1,
                    opacity: 100,
                    blur: 1
                },
                {
                    position: 67,
                    color: "#d9ecff",
                    size: 1,
                    opacity: 100,
                    blur: 1
                }
            ]
        }]
    });
}

export {CicadaStripes, Hearts, Bricks, Stairs, Shippo, Microbial, Carbon, Weaves}