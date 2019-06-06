import React from 'react';

/**
  form to handle user input
  @prop {String} formTitle - form title
  @prop {Array} inputsData - Array of objects with info for each form group (label and input)
    @prop {String} inputsData[i].key - unique key for each form group
    @prop {String} inputsData[i].for - label for and input id value
    @prop {String} inputsData[i].labelText - label text
    @prop {String} inputsData[i].type - input type
  @prop {Function} onChange - event listener on input to sync form data with container state
  @prop {Function} onSubmit - event listener on form to send request to API
  @prop {String} buttonText - submit button text
*/

const Form = (props) => {
  console.log('props', props);
  let inputList = props.inputsData.map((input) => {
    return (
      <div key={input.key}>
        <label htmlFor={input.for}>{input.labelText}</label>
        <input id={input.for} type={input.type} onChange={props.onChange} />
      </div>
    );
  });
  console.log('inputList', inputList);
  
  return (
    <React.Fragment>
      <form onSubmit={props.onSubmit}>
        <h1>{props.formTitle}</h1>
        {inputList}
        <button type="submit">{props.buttonText}</button>
      </form>
    </React.Fragment>
  );
};

export default Form;