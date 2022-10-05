import CardFrontBGImage from "images/bg-card-front.png";
import CardLogo from "images/card-logo.svg";
import { isEmpty, map } from "lodash";

import "./style.scss";

function CardFront({ formContent, spacedCardNumber = [] }) {
  const { name, month, year } = formContent;

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

    const resultCardNumber = map(defaultCardNumber, (num, index) => {
      if (!isEmpty(spacedCardNumber[index])) {
        return spacedCardNumber[index];
      }
      return num;
    }).join("");
    return resultCardNumber;
  }

  function populateCardExpiry() {
    const defaultMonthYear = [0, 0];

    const resultMonth = map(defaultMonthYear, (mon, index) => {
      if (!isEmpty(month[index])) {
        return month[index];
      }
      return mon;
    }).join("");

    const resultYear = map(defaultMonthYear, (y, index) => {
      if (!isEmpty(year[index])) {
        return year[index];
      }
      return y;
    }).join("");

    return `${resultMonth} / ${resultYear}`;
  }

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
