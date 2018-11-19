import React from 'react'

export default props => 
<React.Fragment>
    <label>{props.label}</label>
    <input type={props.text} className="form-control"
        name={props.name} value={props.value}
        onChange={props.functionChange}
        placeholder={props.placeholder} />
</React.Fragment>