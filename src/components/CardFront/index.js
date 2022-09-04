import CardFrontBGImage from "images/bg-card-front.png";
import CardLogo from "images/card-logo.svg";
import { isEmpty } from "lodash";

import "./style.scss";

function CardFront({ formContent }) {
  const { name } = formContent;
  function populateCardNumber() {
    const defaultCardNumber = [
      0,
      0,
      0,
      0,
      " ",
      0,
      0,
      0,
      0,
      " ",
      0,
      0,
      0,
      0,
      " ",
      0,
      0,
      0,
      0,
    ];
    return defaultCardNumber;
  }

  function populateCardExpiry() {}

  return (
    <div className="card-front-wrapper">
      <img className="card-front-bg" src={CardFrontBGImage} alt="Card front" />
      <div className="card-front-content-wrapper">
        <div className="logo-wrapper">
          <img className="card-front-logo" src={CardLogo} alt="Card logo" />
        </div>
        <div className="card-number">{populateCardNumber()}</div>
        <div className="card-name-and-expiry-wrapper">
          <paragraph className="card-name">
            {isEmpty(name) ? "Jane Appleseed" : name}
          </paragraph>
          <paragraph className="card-expiry">{populateCardExpiry()}</paragraph>
        </div>
      </div>
    </div>
  );
}

export default CardFront;
