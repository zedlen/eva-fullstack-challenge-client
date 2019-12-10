import React from 'react';
import FormCreator from './components/formCreator';
import Axios from 'axios'
import * as moment from 'moment'
const form = [
  {
    name:'date_start',
    type:'date',
    label:'Date Start',
    options:[],
    extra:{},
  },{
    name:'date_end',
    type:'date',
    label:'Date End',
    options:[],
    extra:{},
  },{
    name:'clinic',
    type:'name',
    label:'Clinic Name',
    options:[],
    extra:{},
  },{
    name:'mode',
    type:'radio',
    label:'Search Mode',
    options:[{
      label:'Strict',
      value:'STRICT'
    },{
      label:'Lax',
      value:'LAX'
    }],
    extra:{},
  },{
    name:'medications',
    type:'chips',
    label:'Medications',
    options:[],
    extra:{},
  },
]




function App() {
  const [results, setResults] = React.useState([])
  const getValues = async (values) => {    
    console.log(values)
    const params = new URLSearchParams(values).toString()
    try{
      const response = await Axios.get('http://localhost:1337/analytics/consumedMedications?'+params,{headers:{Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'}})
      if (response.status === 200) {
        setResults(response.data.map(item=>{
          item = {...item, ...item.exploration}
          delete item.exploration
          return item
        }))
      }
    }catch(err){
      console.error(err)
    }
    
  }
  return (
    <div className="App">
      <FormCreator form={form} getValues={getValues}/>
      <table>
        <thead>
          <tr className='row'>
            <th className='col header'>Name</th>
            <th className='col header'>Datetime</th>
            <th className='col header'>Medications</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result,index)=>{
            console.log(result)
            return (<tr className={'row '+(index%2===0?'even':'')}>
              
              <td className='col header'>{result.name}</td>
              <td className='col header'>{moment(result.datetime).format('lll')}</td>
              <td className='col header'>{JSON.parse(result.consumedMedications).join(', ')}</td>
            </tr>)
          })}
        </tbody>
      </table>      
    </div>
  );
}

export default App;
