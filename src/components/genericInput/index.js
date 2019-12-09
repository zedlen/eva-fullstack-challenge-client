import React from 'react'
import TextField from '@material-ui/core/TextField'
let GenericInput = (props) => {    
    return (<div className='inputHolder'>  
        <TextField {...props} variant="outlined" />
    </div>)
}

export default GenericInput