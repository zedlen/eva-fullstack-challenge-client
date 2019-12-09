import React from 'react'
import TextField from '@material-ui/core/TextField'
import * as moment from 'moment'
let GenericInput = (props) => {    
    return (<div className='inputHolder'>  
        <TextField {...props} variant="outlined" defaultValue={moment().format('YYYY-MM-DD')} />
    </div>)
}

export default GenericInput