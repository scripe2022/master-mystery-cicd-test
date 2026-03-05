import { useEffect, useState } from "react";
import Modal from "../modal/Modal";

function formatMMSS(totalSeconds: number) {
  const clamped = Math.max(0, Math.floor(totalSeconds));
  const mm = String(Math.floor(clamped / 60)).padStart(2, "0");
  const ss = String(clamped % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}

export type TimerProps = {
  initialSeconds: number;
  onExpire: () => void;
  /** Message shown in the modal when countdown ends. */
  expiredMessage?: string;
  /** Label for the confirm button in the expired modal. */
  confirmLabel?: string;
  className?: string;
};

export default function Timer({
  initialSeconds,
  onExpire,
  expiredMessage = "You are running out of time.",
  confirmLabel = "Return to Home",
  className = "game-clock",
}: TimerProps) {
  const [remaining, setRemaining] = useState(initialSeconds);
  const [showExpiredModal, setShowExpiredModal] = useState(false);

  useEffect(() => {
    const id = window.setInterval(() => {
      setRemaining((prev) => {
        const next = prev - 1;
        if (next <= 0) {
          window.clearInterval(id);
          queueMicrotask(() => setShowExpiredModal(true));
          return 0;
        }
        return next;
      });
    }, 1000);

    return () => window.clearInterval(id);
  }, [initialSeconds]);

  const handleConfirmExpired = () => {
    setShowExpiredModal(false);
    onExpire();
  };

  return (
    <>
      <div className={className}>{formatMMSS(remaining)}</div>

      <Modal isOpen={showExpiredModal} onClose={handleConfirmExpired}>
        <p>{expiredMessage}</p>
        <button type="button" onClick={handleConfirmExpired}>
          {confirmLabel}
        </button>
      </Modal>
    </>
  );
}
