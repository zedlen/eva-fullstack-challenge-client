import React from 'react'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import Add from '@material-ui/icons/Add';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    backgroundColor:'#afafaf'
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

let MultiSelect = (props) => {
    const classes = useStyles();
    const [values, setValues] = React.useState([])
    const [name, setName] = React.useState('')
    const handleMouseDownPassword = event => {
        event.preventDefault();
    };
    const handleChange = event => {
        setName(event.target.value)
    };
    const handleAdd = () => {
        setValues([...values,name])
        setName('')
    } 
    const handleDelete = chipToDelete => () => {
        setValues(chips => chips.filter(chip => chip !== chipToDelete));
    };
    return (
        <div className='inputHolder'>
            <OutlinedInput 
                label={props.label} 
                placeholder='Add medication' 
                variant="outlined" 
                value={name}
                onChange={handleChange}
                endAdornment={
                    <InputAdornment position="end">
                      <IconButton                        
                        onClick={handleAdd}
                        onMouseDown={handleMouseDownPassword}
                      >
                        <Add />
                      </IconButton>
                    </InputAdornment>
                  }
            />
            <Paper className={classes.root}>

                {values.map(data =>         
                    <Chip
                        key={data}            
                        label={data}
                        onDelete={handleDelete(data)}   
                        className={classes.chip}                     
                    />        
                )}
            </Paper>
            <input name={props.name} hidden value={values.length?JSON.stringify(values):''} readOnly/>
        </div>    
    )
}

export default MultiSelect