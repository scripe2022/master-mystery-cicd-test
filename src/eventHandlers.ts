import type { Room1Action } from "./room1Events";
import type { Room2Action } from "./room2Events";

type NavigatePayload = string;

type PopupPayload<T> = {
  setState: (val: T) => void;
  value: T;
};

type GamePayloadrm1 = {
  dispatch?: React.Dispatch<Room1Action>;
  action?: Room1Action;
};

type GamePayloadrm2 = {
  dispatch?: React.Dispatch<Room2Action>;
  action?: Room2Action;
};

export function handleButtonEvent<T>(
  eventType: string,
  payload: NavigatePayload | PopupPayload<T> | GamePayloadrm1 | GamePayloadrm2,
  navigate?: (route: string) => void,
) {
  switch (eventType) {
    case "navigate":
      if (navigate && typeof payload === "string") {
        navigate(payload);
      }
      break;

    case "popup": {
      const popupPayload = payload as PopupPayload<T>;
      if (popupPayload && typeof popupPayload.setState === "function") {
        popupPayload.setState(popupPayload.value);
      }
      break;
    }

    case "room1": {
      const gamePayload = payload as GamePayloadrm1;
      if (gamePayload.dispatch && gamePayload.action) {
        gamePayload.dispatch(gamePayload.action);
      }
      break;
    }

    case "room2": {
      const gamePayload2 = payload as GamePayloadrm2;
      if (gamePayload2.dispatch && gamePayload2.action) {
        gamePayload2.dispatch(gamePayload2.action);
      }
      break;
    }

    default:
      console.error(`Unhandled event type: ${eventType}`);
      break;
  }
}
