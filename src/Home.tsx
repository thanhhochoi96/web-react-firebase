import { useRef, useState } from "react";
import images from "./assets/index";
import classNames from "classnames";

interface BetValueInterface {
  [key: number]: number;
}

const betValueDefault: BetValueInterface = {
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0,
  7: 0,
  8: 0,
  9: 0,
  10: 0,
  11: 0,
  12: 0,
};

const resultAreaNumber = 13;

const betResultScreen = new Map([
  [1, "bi bi-alarm-fill"],
  [2, "bi bi-signpost-fill"],
  [3, "bi bi-bag-fill"],
  [4, "bi bi-bell-fill"],
  [12, "bi bi-suit-heart-fill"],
  [5, "bi bi-square-fill"],
  [11, "bi bi-camera-reels-fill"],
  [resultAreaNumber, ""],
  [6, "bi bi-cart-fill"],
  [10, "bi bi-cloud-fill"],
  [9, "bi bi-display-fill"],
  [8, "bi bi-emoji-smile-fill"],
  [7, "bi bi-star-fill"],
]);

const coinInitial = 10;
const multipleNumber = 12;

export const Home = () => {
  const [betValueState, setBetValueState] =
    useState<BetValueInterface>(betValueDefault);
  const [coin, setCoin] = useState(coinInitial);
  const [coinCounter, setCoinCounter] = useState({ value: 0 });
  const [coinMiss, setCoinMiss] = useState(coinInitial);
  const [coinIsRunTurn, setCoinIsRunTurn] = useState(0);
  const [result, setResult] = useState(0);
  const [isOpenResult, setIsOpenResult] = useState(false);
  const [isLoadingResult, setIsLoadingResult] = useState(false);
  const [isEnoughMoney, setIsEnoughMoney] = useState(true);
  const [isRunCounter, setIsRunCounter] = useState(false);
  const [runTurnNumber, setRunTurnNumber] = useState({ value: 1 });
  let timeRunInterval = useRef(80);
  let loopNumber = useRef(0);
  let isStopCallAnimationCoinCounter = useRef(true);

  const handleBet = (itemKey: number) => {
    if (isLoadingResult || !isEnoughMoney) return;
    setIsOpenResult(false);
    const betValue = isOpenResult ? betValueDefault : betValueState;
    const valueOld = betValue[itemKey] || 0;
    const betValueStateNew = { ...betValue, [itemKey]: valueOld + 1 };

    let sumBet = 0;
    for (let item = 1; item <= 12; item++) {
      sumBet += betValueStateNew[item];
    }
    if (coin - sumBet < 0) {
      setIsEnoughMoney(false);
    } else {
      setBetValueState(betValueStateNew);
      setCoinMiss(coin - sumBet);
    }
  };

  const renderItem = (numberEnd: number, numberStart: number = 1) => {
    const listItem = [];
    for (let item = numberStart; item <= numberEnd; item++) {
      listItem.push(
        <div key={item} className="item" onClick={() => handleBet(item)}>
          <span className="number">
            <i className={betResultScreen.get(item)} />
          </span>
          <img src={images.button_item} alt="item" />
        </div>
      );
    }

    return <div className="item-wrapper">{listItem}</div>;
  };

  const renderBet = (numberEnd: number, numberStart: number = 1) => {
    const betItem = [];
    for (let item = numberStart; item <= numberEnd; item++) {
      const className = classNames(
        "bet-item",
        {
          active: betValueState[item] > 0,
        },
        { result: !isLoadingResult && isOpenResult && item === result }
      );
      betItem.push(
        <div key={item} className={className}>
          {betValueState[item]}
        </div>
      );
    }

    return <div className="bet-wrapper">{betItem}</div>;
  };

  const clearBet = () => {
    if (isLoadingResult) return;
    setCoinMiss(coin);
    setBetValueState(betValueDefault);
    setIsOpenResult(false);
  };

  const animationCoinCounter = (coin: number) => {
    isStopCallAnimationCoinCounter.current = false;
    setCoinCounter({ ...coinCounter, value: coin });
    let count = 0;
    const coinReceive = betValueState[result] * multipleNumber;
    const interval = setInterval(() => {
      if (count === coinReceive) {
        setCoinCounter({ ...coinCounter, value: 0 });
        setIsRunCounter(false);
        isStopCallAnimationCoinCounter.current = true;
        clearInterval(interval);
        return;
      }
      ++coinCounter.value;
      setCoinCounter({ ...coinCounter });
      ++count;
    }, 100);
  };

  if (isRunCounter && isStopCallAnimationCoinCounter.current) {
    animationCoinCounter(coinIsRunTurn);
  }

  const handleEndBet = (result: number) => {
    const coinReceive = betValueState[result] * multipleNumber;
    const coinChange = coinMiss + coinReceive;
    setCoin(coinChange);
    setCoinMiss(coinChange);
  };

  const increaseTurnNumber = () => {
    setRunTurnNumber({ ...runTurnNumber, value: runTurnNumber.value + 1 });
    runTurnNumber.value = runTurnNumber.value + 1;
  };

  const decreaseTimeInterval = () => {
    timeRunInterval.current += 20;
  };

  const runTurn = (resultNumber: number) => {
    if (loopNumber.current === 2) decreaseTimeInterval();
    if (runTurnNumber.value === resultNumber) {
      if (loopNumber.current === 3) {
        loopNumber.current = 0;
        timeRunInterval.current = 100;
        setIsLoadingResult(false);
        setIsRunCounter(true);
        return;
      } else {
        increaseTurnNumber();
      }
    } else if (runTurnNumber.value === 12) {
      ++loopNumber.current;
      setRunTurnNumber({ ...runTurnNumber, value: 1 });
      runTurnNumber.value = 1;
    } else {
      increaseTurnNumber();
    }

    setTimeout(() => runTurn(resultNumber), timeRunInterval.current);
  };

  const start = () => {
    if (isLoadingResult) return;
    if (isOpenResult) {
      clearBet();
      setIsOpenResult(false);
    }
    if (coinMiss < coin) {
      setCoinIsRunTurn(coinMiss);
      setIsLoadingResult(true);
      const result = Math.floor(Math.random() * 12 + 1);
      setResult(result);
      handleEndBet(result);
      setIsOpenResult(true);
      runTurn(result);
    }
  };

  const renderControl = (numberEnd: number, numberStart: number = 1) => {
    return (
      <>
        {renderBet(numberEnd, numberStart)}
        {renderItem(numberEnd, numberStart)}
      </>
    );
  };

  const renderBetResultScreen = () => {
    const listResultScreen: JSX.Element[] = [];
    betResultScreen.forEach((item: string, key: number) => {
      if (key === resultAreaNumber) {
        listResultScreen.push(
          <div key={key} className="item-result-center">
            {!isLoadingResult && isOpenResult ? (
              <i className={betResultScreen.get(result)} />
            ) : (
              <div className="spinner-grow" role="status">
                <span className="sr-only"></span>
              </div>
            )}
          </div>
        );
      } else {
        listResultScreen.push(
          <div
            key={key}
            className={classNames(
              "item-result",
              {
                active: runTurnNumber.value === key,
              },
              { selected: betValueState[key] }
            )}
          >
            <i className={item} />
          </div>
        );
      }
    });

    return <div className="inner">{listResultScreen}</div>;
  };

  const getCoinWhenNotLoading = () => {
    if (isLoadingResult) return coinIsRunTurn;
    return coinMiss;
  };

  return (
    <div className="wrapper">
      <div className="game-box">
        <div className="coin">
          {isRunCounter ? coinCounter.value : getCoinWhenNotLoading()}
        </div>
        <div className="game-top">{renderBetResultScreen()}</div>
        <div className="game-control">
          <div className="start-clear">
            <img
              src={images.button_clear}
              onClick={() => clearBet()}
              className="button_clear"
              alt="button clear"
            />
            <img
              src={images.button_start}
              onClick={() => start()}
              className="button_start"
              alt="button start"
            />
          </div>
          <div className="button-control">
            <div className="left">{renderControl(6)}</div>
            <div className="right">{renderControl(12, 7)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
