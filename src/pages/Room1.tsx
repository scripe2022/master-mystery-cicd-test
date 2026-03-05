import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Popup from "../components/popups/popup";
import lever1img from "../assets/images/room1/lever1.png";
import lever2img from "../assets/images/room1/lever2.png";
import case1img from "../assets/images/room1/case1.png";
import case2img from "../assets/images/room1/case2.png";
import doorimg from "../assets/images/room1/door.png";
import bookimg from "../assets/images/room1/book.png";
import bookopen from "../assets/images/room1/bookopen.png";
import Keypad from "../components/keypad/keypad";
import { handleButtonEvent } from "../eventHandlers";
import Timer from "../components/timer/timer";
import HintButton from "../components/buttons/HintButton";
import MenuButton from "../components/buttons/MenuButton";
import { getRoom1Hint } from "../room1Hints";
import { useReducer } from "react";
import { room1Events, initialRoom1State } from "../room1Events";

const CASE1_TARGET_PRESSURE = 503;
const CASE1_RANDOM_MIN = 20;
const CASE1_RANDOM_MAX = 90;
const CASE1_RANDOM_STEP = 10;

function getRandomPressureIncrease() {
  const choices = Math.floor((CASE1_RANDOM_MAX - CASE1_RANDOM_MIN) / CASE1_RANDOM_STEP) + 1;
  const pick = Math.floor(Math.random() * choices);
  return CASE1_RANDOM_MIN + pick * CASE1_RANDOM_STEP;
}

export default function Room1() {
  const navigate = useNavigate();

  const [showPopup, setShowPopup] = useState<string | null>(null);
  const [showKeypad, setShowKeypad] = useState(false);

  const handleTimerExpire = () => {
    navigate("/");
  };

  const [state, dispatch] = useReducer(room1Events, initialRoom1State);
  const isCase1Melted = state.progress.case1Melted;

  const handleCorrectCode = () => {
    setShowKeypad(false);

    handleButtonEvent("room1", {
      dispatch,
      action: { type: "UNLOCK_DOOR" },
    });
  };

  return (
    <div className="wrapper">
      <div className="game-scale">
        <Timer initialSeconds={900} onExpire={handleTimerExpire} />
        <div className="room1bkg">
          <img
            src={lever1img}
            className="btnlever1"
            onClick={() =>
              handleButtonEvent("room1", {
                dispatch,
                action: {
                  type: "LEVER1_CLICK",
                  pressureIncrease: getRandomPressureIncrease(),
                  target: CASE1_TARGET_PRESSURE,
                },
              })
            }
          />
          <img
            src={lever2img}
            className="btnlever2"
            onClick={() => {
              handleButtonEvent("popup", {
                setState: setShowKeypad,
                value: true,
              });

              handleButtonEvent("room1", {
                dispatch,
                action: { type: "OPEN_KEYPAD" },
              });
            }}
          />
          <div className="case1PressurePlaque" aria-live="polite">
            Pressure: {state.pressure} atm
          </div>
          <img
            src={isCase1Melted ? case2img : case1img}
            className="imgcase1"
            alt="Case 1 container"
          />
          <img
            src={isCase1Melted ? case2img : case1img}
            className="imgcase2"
            alt="Case 1 container"
          />
          {isCase1Melted && state.progress.doorUnlocked && (
            <img
              src={doorimg}
              className="btndoor"
              alt="Exit door"
              onClick={() => navigate("/room2")}
            />
          )}
          <img
            src={bookimg}
            className="btnbook"
            onClick={() => {
              setShowPopup(bookopen);

              handleButtonEvent("room1", {
                dispatch,
                action: { type: "OPEN_BOOK" },
              });
            }}
          />
          {showKeypad && (
            <Keypad onSuccess={handleCorrectCode} onClose={() => setShowKeypad(false)} />
          )}
        </div>
        {showPopup && <Popup imageSrc={showPopup} onClose={() => setShowPopup(null)} />}
        <div className="menu-button">
          <MenuButton />
        </div>
        <div className="hint-button">
          <HintButton hint={getRoom1Hint(state.progress, state.lever1Clicks)} />
        </div>
      </div>
    </div>
  );
}
