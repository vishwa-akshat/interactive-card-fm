import { useState, useEffect } from "react";
import { isEmpty, isNil } from "lodash";

import CardFront from "components/CardFront";
import CardBack from "components/CardBack";

import DesktopBgImage from "../../images/bg-main-desktop.png";

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

  const [formContent, setFormContent] = useState(defaultFormContent);
  const [formErrors, setFormErrors] = useState(defaultFormErrors);
  const [spacedCardNumber, setSpacedCardNumber] = useState();

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
  }, []);

  useEffect(() => {
    setSpacedCardNumber(spacedCardNumberHandler(cardNumber));
  }, [cardNumber]);

  function handleInputChange(event) {
    const {
      target: { value, name: inputName },
    } = event;
    setFormContent({ ...formContent, [inputName]: value });
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    let errors = { ...formErrors };
    //Name Validation
    if (isEmpty(name)) {
      errors.nameError = "Can't be blank";
    }

    //Card Number Validation
    // if (isEmpty(cardNumber)) {
    //   errors.cardNumberError = "Can't be blank";
    // }
    const cardNumberSimplified = [...cardNumber].join("").replace(/ /g, "");
    const isNumber = /^\d+\.\d+$|^\d+$/.test(cardNumberSimplified);
    if (!isNumber) {
      errors.cardNumberError = "Wrong format, numbers only";
    }

    //Month Validation
    if (isEmpty(month)) {
      errors.monthError = "Can't be blank";
    }

    //Year Validation
    if (isEmpty(year)) {
      errors.yearError = "Can't be blank";
    }

    //CVC Validation
    if (isEmpty(cvc)) {
      errors.cvcError = "Can't be blank";
    }

    return setFormErrors(errors);
  }

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
      <div className="interactive-card-form-wrapper">
        <form onSubmit={handleFormSubmit} className="form-wrapper">
          <div className="input-wrapper">
            <label className="input-label">CARDHOLDER NAME</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Jane Appleseed"
              onChange={handleInputChange}
              name="name"
              value={name}
            />
            {!isNil(nameError) && <p className="error-msg">{nameError}</p>}
          </div>
          <div className="input-wrapper">
            <label className="input-label">CARD NUMBER</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. 1234 5678 9123 0000"
              value={spacedCardNumber}
              name="cardNumber"
              onChange={handleInputChange}
            />
            {!isNil(cardNumberError) && (
              <p className="error-msg">{cardNumberError}</p>
            )}
          </div>
          <div className="date-cvc-wrapper">
            <div className="input-wrapper">
              <label className="input-label">Exp. Date (MM/YY)</label>
              <div className="date-input-wrapper">
                <input
                  className="date-input form-input"
                  type="number"
                  placeholder="MM"
                  onChange={handleInputChange}
                  name="month"
                  value={month}
                  maxLength="2"
                />
                <input
                  className="date-input form-input"
                  type="number"
                  placeholder="YY"
                  onChange={handleInputChange}
                  name="year"
                  value={year}
                  maxLength="2"
                />
              </div>
              {(!isNil(monthError) || !isNil(yearError)) && (
                <p className="error-msg">{monthError || yearError}</p>
              )}
            </div>
            <div className="input-wrapper">
              <label className="input-label">CVC</label>
              <input
                className="cvc-input form-input"
                type="number"
                placeholder="e.g. 123"
                onChange={handleInputChange}
                name="cvc"
                value={cvc}
                maxLength="3"
              />
              {!isNil(cvcError) && <p className="error-msg">{cvcError}</p>}
            </div>
          </div>
          <button className="submit-btn">Confirm</button>
        </form>
      </div>
    </div>
  );
}

export default InteractiveCardContainer;
