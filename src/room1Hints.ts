export type Room1Progress = {
  pulledLever1: boolean;
  openedBook: boolean;
  openedKeypad: boolean;
  case1Melted: boolean;
  doorUnlocked: boolean;
};

export function getRoom1Hint(progress: Room1Progress, leverClicks: number): string {
  if (!progress.pulledLever1 && !progress.case1Melted) {
    return "Try to use the levers to change the pressure to melt the ice";
  }

  // 🔹 Lever clicked but ice not melted yet
  if (progress.pulledLever1 && !progress.case1Melted) {
    if (leverClicks === 1) {
      return "How does pressure affect solids?";
    }
    return "Increasing pressure causes ice to melt";
  }

  // 🔹 First ice melted but code not entered
  if (progress.case1Melted && !progress.doorUnlocked) {
    if (!progress.openedKeypad) {
      return "Have you found any numbers around the room that could be used to unlock the lever?";
    }
  }

  // 🔹 All ice melted but door not clicked
  if (progress.case1Melted && progress.doorUnlocked) {
    return "Click on the door to go to the next room";
  }

  return "";
}
