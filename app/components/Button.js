import React from 'react';

const Button = (props) => 
  <button onClick={props.onClick} className='btn btn-default'>{props.title}</button>

export default Button