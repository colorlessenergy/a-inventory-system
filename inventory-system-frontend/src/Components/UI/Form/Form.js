import React from 'react';

/**
  form to handle user input
  @prop {String} title - form title
  @prop {Array} inputs - Array of objects with info for each form group (label and input)
    @prop {String} inputs[i].key - unique key for each form group
    @prop {String} inputs[i].for - label for and input id value
    @prop {String} inputs[i].label - label name
    @prop {String} inputs[i].type - input type
  @prop {Function} onChange - event listener on input to sync form data with container state
  @prop {Function} onSubmit - event listener on form to send request to API
*/

const Form = (props) => {
  console.log('props', props);
  let inputList = props.inputs.map((input) => {
    return (
      <div key={input.key}>
        <label htmlFor={input.for}>{input.label}</label>
        <input id={input.for} type={input.type} onChange={props.onChange} />
      </div>
    );
  });
  console.log('inputList', inputList);
  
  return (
    <React.Fragment>
      <form onSubmit={props.onSubmit}>
        <h3>{props.title}</h3>
        {inputList}
        <button type="submit">Create New Item</button>
      </form>
    </React.Fragment>
  );
};

export default Form;