import { useState, useEffect } from "react";
import { isEmpty, isEqual } from "lodash";
import classnames from "classnames";

import CardFront from "components/CardFront";
import CardBack from "components/CardBack";

import DesktopBgImage from "../../images/bg-main-desktop.png";
import IconComplete from "../../images/icon-complete.svg";

import "./style.scss";

function InteractiveCardContainer() {
  const defaultFormContent = {
    name: "",
    cardNumber: "",
    month: "",
    year: "",
    cvc: "",
  };

  const defaultFormErrors = {
    nameError: "",
    cardNumberError: "",
    monthError: "",
    yearError: "",
    cvcError: "",
  };

  const FORM_STATE_INCOMPLETE = "form_state_incomplete";
  const FORM_STATE_COMPLETE = "form_state_complete";

  const [formContent, setFormContent] = useState(defaultFormContent);
  const [formErrors, setFormErrors] = useState(defaultFormErrors);
  const [spacedCardNumber, setSpacedCardNumber] = useState();
  const [formState, setFormState] = useState(FORM_STATE_INCOMPLETE);

  const { name, cardNumber, month, year, cvc } = formContent;
  const { nameError, cardNumberError, monthError, yearError, cvcError } =
    formErrors;

  const spacedCardNumberHandler = (str) => {
    return (
      str
        .replace(/\s/g, "")
        .match(/.{1,4}/g)
        ?.join(" ")
        .substr(0, 19) || ""
    );
  };

  useEffect(() => {
    setFormErrors(defaultFormErrors);
  }, [formContent]);

  useEffect(() => {
    setSpacedCardNumber(spacedCardNumberHandler(cardNumber));
  }, [cardNumber]);

  function handleInputChange(event) {
    const {
      target: { value, name: inputName },
    } = event;
    setFormContent({ ...formContent, [inputName]: value });
  }

  function checkIsNumber(value) {
    return /^\d+\.\d+$|^\d+$/.test(value);
  }

  function handleResetForm() {
    setFormContent(defaultFormContent);
    setFormErrors(defaultFormErrors);
    setFormState(FORM_STATE_INCOMPLETE);
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    let errors = { ...formErrors };
    //Name Validation
    if (isEmpty(name)) {
      errors.nameError = "Can't be blank";
    }

    //Card Number Validation
    const cardNumberSimplified = [...cardNumber].join("").replace(/ /g, "");
    if (!checkIsNumber(cardNumberSimplified) && !isEmpty(cardNumber)) {
      errors.cardNumberError = "Wrong format, numbers only";
    }
    if (isEmpty(cardNumber)) {
      errors.cardNumberError = "Can't be blank";
    }

    //Month Validation
    if (!checkIsNumber(month) && !isEmpty(month)) {
      errors.monthError = "Wrong format, numbers only";
    }
    if (isEmpty(month)) {
      errors.monthError = "Can't be blank";
    }

    //Year Validation
    if (!checkIsNumber(year) && !isEmpty(year)) {
      errors.yearError = "Wrong format, numbers only";
    }
    if (isEmpty(year)) {
      errors.yearError = "Can't be blank";
    }

    //CVC Validation
    if (!checkIsNumber(cvc) && !isEmpty(cvc)) {
      errors.cvcError = "Wrong format, numbers only";
    }
    if (isEmpty(cvc)) {
      errors.cvcError = "Can't be blank";
    }

    if (isEqual(errors, defaultFormErrors)) {
      setFormState(FORM_STATE_COMPLETE);
      return;
    }

    return setFormErrors(errors);
  }

  const renderFormContent = (
    <div className="interactive-card-form-wrapper">
      <form onSubmit={handleFormSubmit} className="form-wrapper">
        <div className="input-wrapper">
          <label className="input-label">CARDHOLDER NAME</label>
          <input
            type="text"
            className={classnames("form-input", {
              "error-input": !isEmpty(nameError),
            })}
            placeholder="e.g. Jane Appleseed"
            onChange={handleInputChange}
            name="name"
            value={name}
          />
          {!isEmpty(nameError) && <p className="error-msg">{nameError}</p>}
        </div>
        <div className="input-wrapper">
          <label className="input-label">CARD NUMBER</label>
          <input
            type="text"
            className={classnames("form-input", {
              "error-input": !isEmpty(cardNumberError),
            })}
            placeholder="e.g. 1234 5678 9123 0000"
            value={spacedCardNumber}
            name="cardNumber"
            onChange={handleInputChange}
          />
          {!isEmpty(cardNumberError) && (
            <p className="error-msg">{cardNumberError}</p>
          )}
        </div>
        <div className="date-cvc-wrapper">
          <div className="input-wrapper">
            <label className="input-label">Exp. Date (MM/YY)</label>
            <div className="date-input-wrapper">
              <input
                className={classnames("form-input", "date-input", {
                  "error-input": !isEmpty(monthError),
                })}
                type="text"
                placeholder="MM"
                onChange={handleInputChange}
                name="month"
                value={month}
                maxLength="2"
              />
              <input
                className={classnames("form-input", "date-input", {
                  "error-input": !isEmpty(yearError),
                })}
                type="text"
                placeholder="YY"
                onChange={handleInputChange}
                name="year"
                value={year}
                maxLength="2"
              />
            </div>
            {(!isEmpty(monthError) || !isEmpty(yearError)) && (
              <p className="error-msg">{monthError || yearError}</p>
            )}
          </div>
          <div className="input-wrapper">
            <label className="input-label">CVC</label>
            <input
              className={classnames("form-input", "cvc-input", {
                "error-input": !isEmpty(cvcError),
              })}
              type="number"
              placeholder="e.g. 123"
              onChange={handleInputChange}
              name="cvc"
              value={cvc}
              maxLength="3"
            />
            {!isEmpty(cvcError) && <p className="error-msg">{cvcError}</p>}
          </div>
        </div>
        <button className="form-btn">Confirm</button>
      </form>
    </div>
  );

  const renderSuccessFormState = (
    <div className="interactive-card-form-wrapper">
      <div className="success-state-container">
        <img
          className="success-state-icon"
          src={IconComplete}
          alt="success state"
        />
        <h1 className="success-state-heading">Thank you!</h1>
        <p className="success-state-info">We've added your card details</p>
        <button className="form-btn" onClick={handleResetForm}>
          Continue
        </button>
      </div>
    </div>
  );

  return (
    <div className="interactive-card-form-container">
      <div className="background-image-wrapper">
        <img
          className="background-image"
          src={DesktopBgImage}
          alt="background"
        />
        <div className="cards-wrapper">
          <div className="card-front-position">
            <CardFront
              formContent={formContent}
              spacedCardNumber={spacedCardNumber}
            />
          </div>
          <div className="card-back-position">
            <CardBack cvc={cvc} />
          </div>
        </div>
      </div>
      {isEqual(formState, FORM_STATE_INCOMPLETE) && renderFormContent}
      {isEqual(formState, FORM_STATE_COMPLETE) && renderSuccessFormState}
    </div>
  );
}

export default InteractiveCardContainer;
