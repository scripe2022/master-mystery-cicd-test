import type { Room2Progress } from "./room2Events";

export function getRoom2Hint(progress: Room2Progress): string {
  if (!progress.viewedParticlePoster) {
    return "Examine how particles behave in different states of matter.";
  }

  if (!progress.viewedEnergyPoster) {
    return "Compare the relative energy levels of each state.";
  }

  if (!progress.viewedPlaque) {
    return "Read the plaque carefully. How is plasma formed?";
  }

  if (!progress.puzzleSolved) {
    return "To turn plasma back into gas, what must be removed?";
  }

  if (!progress.consoleUnlocked) {
    return "Use the numbers from the posters in the correct order.";
  }

  if (!progress.magnetUsed) {
    return "Something magnetic may influence plasma...";
  }

  if (!progress.doorRevealed) {
    return "The plasma must be moved before you can escape.";
  }

  return "The exit is ready.";
}
