import React from 'react'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

 let RadioButtonsGroup = (props) => {

  return (
    <div className='inputHolder'>
      <FormControl component="fieldset">
        <FormLabel component="legend">{props.label}</FormLabel>
        <RadioGroup aria-label={props.name} name={props.name}>
          {props.options.map(option=><FormControlLabel key={option.value} value={option.value} control={<Radio />} label={option.label} />)}          
        </RadioGroup>
      </FormControl>     
    </div>
  );
}

export default RadioButtonsGroup