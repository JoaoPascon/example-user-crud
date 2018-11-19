import React from 'react'

export default props =>
    <button className={props.style}
    onClick={props.function}>
        <i className={props.icon}></i>
    </button> 