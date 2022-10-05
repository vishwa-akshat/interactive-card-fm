import { useState, useEffect } from "react";
import { map } from "lodash";

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

  const [formContent, setFormContent] = useState(defaultFormContent);
  const [spacedCardNumber, setSpacedCardNumber] = useState();

  const { name, cardNumber, month, year, cvc } = formContent;

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
    setSpacedCardNumber(spacedCardNumberHandler(cardNumber));
  }, [cardNumber]);

  function handleInputChange(event) {
    const {
      target: { value, name },
    } = event;
    setFormContent({ ...formContent, [name]: value });
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
        <form className="form-wrapper">
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
          </div>
          <div className="input-wrapper">
            <label className="input-label">CARD NUMBER</label>
            <input
              type="number"
              className="form-input"
              placeholder="e.g. 1234 5678 9123 0000"
              value={spacedCardNumber}
              name="cardNumber"
              onChange={handleInputChange}
            />
          </div>
          <div className="date-cvc-wrapper">
            <div className="input-wrapper">
              <label className="input-label">Exp. Date (MM/YY)</label>
              <div className="date-input-wrapper">
                <input
                  className="date-input form-input"
                  type="text"
                  placeholder="MM"
                  onChange={handleInputChange}
                  name="month"
                  value={month}
                  maxLength="2"
                />
                <input
                  className="date-input form-input"
                  type="text"
                  placeholder="YY"
                  onChange={handleInputChange}
                  name="year"
                  value={year}
                  maxLength="2"
                />
              </div>
            </div>
            <div className="input-wrapper">
              <label className="input-label">CVC</label>
              <input
                className="cvc-input form-input"
                type="text"
                placeholder="e.g. 123"
                onChange={handleInputChange}
                name="cvc"
                value={cvc}
                maxLength="3"
              />
            </div>
          </div>
          <button className="submit-btn">Confirm</button>
        </form>
      </div>
    </div>
  );
}

export default InteractiveCardContainer;
