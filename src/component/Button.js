function Button(){


    
//BUTTON TYPES

function ButtonSelector() {
    let button;
    switch (0) {
        case 0:
            button = <button className="btn primary large">Label</button>
            break;
        case 1:
            button = <button className="btn primary small">Label</button>
            break;
        case 2:
            button = <button className="btn default large">Label</button>
           
      }

    return button
}


    return(
        ButtonSelector()
    )
}


export default Button