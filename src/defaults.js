
const defaultLinear = () =>
{
    return {
        direction: 90,
        width: 0, 
        height: 0, 
        autoSize: true, 
        vertical: 0, 
        horizontal: 0, 
        visible: true, 
        grid: "false", 
        lines: [{
            position: 0, 
            color: "#000000", 
            size: 5, 
            opacity: 100, 
            blur: 0
            }]
        }
}

const defaultRadial = () =>
{
    return {
        shape: "ellipse", 
        autoSize: true, 
        size: "farthest-corner", 
        posx: 50, 
        posy: 50, 
        vertical: 0, 
        horizontal: 0, 
        visible: true, 
        grid: false,
        rays: [{
            position: "0", 
            color: "#000000", 
            size: 5, 
            opacity: 100, 
            blur: 0
        }
    ]}
}


export {defaultLinear, defaultRadial}