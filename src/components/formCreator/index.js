import React from 'react'
import PropTypes from 'prop-types'; 
import Button from '@material-ui/core/Button'
import GenericInput from '../genericInput';
import './style.css'
import DateInput from '../dateInput';
import RadioButtonsGroup from '../radioSelectInput';
import MultiSelect from '../multiSelector';

let formCreator = ({form, getValues}) => {
    const renderItem = (item) =>{
        switch (item.type) {
            case 'date':
                return (<DateInput key={item.name} {...item} />)
            case 'radio':
                    return (<RadioButtonsGroup key={item.name} {...item} />)
            case 'chips':
                    return (<MultiSelect key={item.name} {...item} />)
            default:
                return(<GenericInput key={item.name} {...item}/>)                    
        }
    }

    const sendHandler = () =>{
        let values = {}
        const mainForm = document.forms.mainForm
        let fail = false
        form.map(item=>{
            if(mainForm.elements[item.name]){
                if(mainForm.elements[item.name].value ==='' && !fail){
                    alert(`${item.label} can't be empty`)
                    fail = true
                }
                values[item.name] = mainForm.elements[item.name].value
            }            
            return item
        })      
        if (!fail) {
            getValues(values) 
        }          
    }

    return (
        <div className='formContainer'>
            <form id='mainForm'>
                {form.map(item=>renderItem(item))}
                <Button variant="contained" type='button' onClick={sendHandler}>Search</Button >
            </form>
        </div>
    )
}

formCreator.propTypes = {
    form: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            options:PropTypes.arrayOf(
                PropTypes.shape({
                    label: PropTypes.string.isRequired,
                    value: PropTypes.string.isRequired,
                })
            ),
            extra: PropTypes.object
        })
    ).isRequired,
    getValues: PropTypes.func
}

export default formCreator