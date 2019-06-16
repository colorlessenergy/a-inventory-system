import React from 'react';

import classes from './form.module.css'
import Error from '../Error/Error';
/**
  form to handle user input
  @prop {String} formTitle - form title
  @prop {Array} inputsData - Array of objects with info for each form group (label and input)
    @prop {String} inputsData[i].key - unique key for each form group
    @prop {String} inputsData[i].for - label for and input id value
    @prop {String} inputsData[i].labelText - label text
    @prop {String} inputsData[i].type - input type
  @prop {Function} onChange - event listener on input to sync form data with container state
  @prop {Function} onSubmit - event listener on form to send PUT request to API
  @prop {String} buttonText - submit button text
  @prop {Function} deleteHandler - event listener on form to send DELETE request to API
  @prop {String} deleteButtonText - submit button text
  @prop {String} ...this.state - the container state passed down to make inputs reactive (ie control the input value)
*/

const Form = (props) => {
  console.log('props', props);
  let inputList = props.inputsData.map((input) => {
    if (props.errorMessage) {
      console.log(props);
      console.log(props.inputsClicked);
      if (props.errorMessage.includes(input.for)) {
        if (props.inputsClicked.indexOf(input.for) !== -1) {
          // **This input had an error and was clicked
          console.log('had an error class, but not anymore for this input with FOR', input.for);
          return (
            <div className={classes.form__group} key={input.key}>
              <label
                htmlFor={input.for}
                className={classes['form__label']}
              >{input.labelText}</label>
              <input
                className={classes['form__input']}
                id={input.for} type={input.type}
                onChange={props.onChange}
                value={props[input.for]} />
            </div>
          );
        }
        else {
          // **This input has an error and has not been clicked
          console.log('should have an error class for this input with FOR', input.for);
          return (
            <div className={classes.form__group} key={input.key}>
              <label
                htmlFor={input.for}
                className={[classes['form__label'], classes['form__label--error']].join(' ')}
              >{input.labelText}</label>
              <input
                className={[classes['form__input'], classes['form__input--error']].join(' ')}
                id={input.for}
                type={input.type}
                onChange={props.onChange}
                value={props[input.for]}
                onClick={props.onClick} />
            </div>
          );
        }
      }
      else {
        // **normal input
        return (
          <div className={classes.form__group} key={input.key}>
            <label
              htmlFor={input.for}
              className={classes['form__label']}
            >{input.labelText}</label>
            <input
              className={classes['form__input']}
              id={input.for} type={input.type}
              onChange={props.onChange}
              value={props[input.for]} />
          </div>
        );
      }
    }
    else {
      // **normal input
      return (
        <div className={classes.form__group} key={input.key}>
          <label className={classes.form__label} htmlFor={input.for}>{input.labelText}</label>
          <input
            className={classes.form__input}
            id={input.for} type={input.type}
            onChange={props.onChange}
            value={props[input.for]} />
        </div>
      );
    }
  });
  console.log('inputList', inputList);
  let deleteButton = null;
  if (props.deleteButtonText) {
    deleteButton = (
      <button type="button" className={[classes['form__button'], classes['form__button--delete']].join(' ')} onClick={props.deleteHandler}>{props.deleteButtonText}</button>
    );
  }
  let error = null;
  if (props.errorMessage) {
    error = (
      <Error errorMessage={props.errorMessage} />
    );
  }
  return (
    <React.Fragment>
      <form className={classes.form} onSubmit={props.onSubmit}>
        <h1 className={classes.form__title}>{props.formTitle}</h1>
        {error}
        {inputList}
        <button className={classes.form__button} type="submit">{props.buttonText}</button>
        {deleteButton}
      </form>
    </React.Fragment>
  );
};

export default Form;