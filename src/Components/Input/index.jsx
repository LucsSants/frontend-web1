import React from 'react'
import './index.css'
function Input({label, ...rest}) {
  return (
    <div className='input-wrap'>
          <label>{label}</label>
          <input 
            {...rest}
            />
        </div>
  )
}
 export default Input


