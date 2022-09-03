import DesktopBgImage from "../../images/bg-main-desktop.png";

import "./style.scss";

function InteractiveCardContainer() {
  return (
    <div className="interactive-card-form-container">
      <div className="background-image-wrapper">
        <img
          className="background-image"
          src={DesktopBgImage}
          alt="background"
        />
      </div>
      <div className="interactive-card-form-wrapper">
        <form className="form-wrapper">
          <div className="input-wrapper">
            <label className="input-label">CARDHOLDER NAME</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Jane Appleseed"
            />
          </div>
          <div className="input-wrapper">
            <label className="input-label">CARD NUMBER</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. 1234 5678 9123 0000"
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
                />
                <input
                  className="date-input form-input"
                  type="text"
                  placeholder="YY"
                />
              </div>
            </div>
            <div className="input-wrapper">
              <label className="input-label">CVC</label>
              <input
                className="cvc-input form-input"
                type="text"
                placeholder="e.g. 123"
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
