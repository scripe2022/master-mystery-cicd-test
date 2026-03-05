export type EnergyLevel = "HIGH" | "MEDIUM";

export interface Room2Progress {
  viewedParticlePoster: boolean;
  viewedEnergyPoster: boolean;
  viewedPlaque: boolean;
  puzzleSolved: boolean;
  consoleUnlocked: boolean;
  magnetUsed: boolean;
  doorRevealed: boolean;
}

export interface Room2State {
  energyLevel: EnergyLevel;
  consoleLocked: boolean;
  doorUnlocked: boolean;
  progress: Room2Progress;
}

export type Room2Action =
  | { type: "VIEW_PARTICLE_POSTER" }
  | { type: "VIEW_ENERGY_POSTER" }
  | { type: "VIEW_PLAQUE" }
  | { type: "SOLVE_PUZZLE" }
  | { type: "UNLOCK_CONSOLE" }
  | { type: "USE_MAGNET" }
  | { type: "REVEAL_DOOR" }
  | { type: "SET_ENERGY_LEVEL"; payload: EnergyLevel };

export const initialRoom2State: Room2State = {
  energyLevel: "HIGH",
  consoleLocked: true,
  doorUnlocked: false,
  progress: {
    viewedParticlePoster: false,
    viewedEnergyPoster: false,
    viewedPlaque: false,
    puzzleSolved: false,
    consoleUnlocked: false,
    magnetUsed: false,
    doorRevealed: false,
  },
};

export function room2Events(state: Room2State, action: Room2Action): Room2State {
  switch (action.type) {
    case "VIEW_PARTICLE_POSTER":
      return {
        ...state,
        progress: { ...state.progress, viewedParticlePoster: true },
      };

    case "VIEW_ENERGY_POSTER":
      return {
        ...state,
        progress: { ...state.progress, viewedEnergyPoster: true },
      };

    case "VIEW_PLAQUE":
      return {
        ...state,
        progress: { ...state.progress, viewedPlaque: true },
      };

    case "SOLVE_PUZZLE":
      return {
        ...state,
        progress: { ...state.progress, puzzleSolved: true },
        consoleLocked: false,
      };

    case "UNLOCK_CONSOLE":
      return {
        ...state,
        progress: { ...state.progress, consoleUnlocked: true },
      };

    case "USE_MAGNET":
      return {
        ...state,
        progress: { ...state.progress, magnetUsed: true },
      };

    case "REVEAL_DOOR":
      return {
        ...state,
        doorUnlocked: true,
        progress: { ...state.progress, doorRevealed: true },
      };

    case "SET_ENERGY_LEVEL":
      return {
        ...state,
        energyLevel: action.payload,
      };

    default:
      return state;
  }
}
