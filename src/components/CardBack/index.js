import { map, isNil } from "lodash";

import CardBackBGImage from "images/bg-card-back.png";

import "./style.scss";

function CardBack({ cvc }) {
  function populateCvc() {
    const defaultCvc = [0, 0, 0];
    const resultCVC = map(defaultCvc, (num, index) => {
      if (isNil(cvc[index])) {
        return num;
      }
      return cvc[index];
    });
    return resultCVC;
  }

  return (
    <div className="card-back-wrapper">
      <img className="card-back-bg" src={CardBackBGImage} alt="Card back" />
      <span className="card-cvc">{populateCvc()}</span>
    </div>
  );
}

export default CardBack;
