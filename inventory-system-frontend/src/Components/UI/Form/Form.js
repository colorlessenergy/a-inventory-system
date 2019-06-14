import React from 'react';

import classes from './form.module.css'

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
      <div className={classes.form__group} key={input.key}>
        <label className={classes.form__label} htmlFor={input.for}>{input.labelText}</label>
        <input className={classes.form__input} id={input.for} type={input.type} onChange={props.onChange} />
      </div>
    );
  });
  console.log('inputList', inputList);
  let deleteButton = null;
  if (props.deleteButtonText) {
    deleteButton = (
      <button type="button" className={[classes['form__button'], classes['form__button--delete']].join(' ')} onClick={props.deleteHandler}>{props.deleteButtonText}</button>
    );
  }
  console.log('================================================')
  console.log('================================================')
  console.log('================================================')
  console.log(props);
  return (
    <React.Fragment>
      <form className={classes.form} onSubmit={props.onSubmit}>
        <h1 className={classes.form__title}>{props.formTitle}</h1>
        {inputList}
        <button className={classes.form__button} type="submit">{props.buttonText}</button>
        {deleteButton}
      </form>
    </React.Fragment>
  );
};

export default Form;