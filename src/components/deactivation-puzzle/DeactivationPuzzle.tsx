import { useState } from "react";
import "./DeactivationPuzzle.css";

interface DeactivationPuzzleProps {
  onSuccess: () => void;
  onClose: () => void;
}

interface MetricState {
  id: string;
  label: string;
  icon: string;
  active: boolean;
}

const INITIAL_METRICS: MetricState[] = [
  { id: "electricity", label: "Electricity", icon: "⚡", active: true },
  { id: "magnetism", label: "Magnetism", icon: "🧲", active: true },
  { id: "heat", label: "Heat", icon: "🔥", active: true },
];

export default function DeactivationPuzzle({ onSuccess, onClose }: DeactivationPuzzleProps) {
  const [metrics, setMetrics] = useState<MetricState[]>(INITIAL_METRICS);
  const [result, setResult] = useState<"correct" | "incorrect" | null>(null);

  const toggleMetric = (id: string) => {
    if (result) return;
    setMetrics((prev) => prev.map((m) => (m.id === id ? { ...m, active: !m.active } : m)));
  };

  const handleSubmit = () => {
    if (result) return;

    const electricity = metrics.find((m) => m.id === "electricity");
    const magnetism = metrics.find((m) => m.id === "magnetism");
    const heat = metrics.find((m) => m.id === "heat");

    const isCorrect = !electricity?.active && magnetism?.active && !heat?.active;

    if (isCorrect) {
      setResult("correct");
      setTimeout(() => {
        onSuccess();
      }, 1500);
    } else {
      setResult("incorrect");
      setTimeout(() => {
        setResult(null);
      }, 1500);
    }
  };

  return (
    <div className="deactivation-overlay" data-testid="deactivation-overlay">
      <div
        className={`deactivation-panel ${result === "correct" ? "deactivation-panel--success" : ""}`}
      >
        <button className="deactivation-close" onClick={onClose} aria-label="Close">
          X
        </button>

        <h2 className="deactivation-title">
          What should we deactivate to make the plasma back into gas?
        </h2>

        <div className="deactivation-metrics">
          {metrics.map((metric) => (
            <button
              key={metric.id}
              className={`deactivation-metric deactivation-metric--${metric.id} ${metric.active ? "deactivation-metric--active" : "deactivation-metric--inactive"}`}
              onClick={() => toggleMetric(metric.id)}
              data-testid={`metric-${metric.id}`}
              aria-pressed={metric.active}
            >
              <span className="deactivation-metric__icon">{metric.icon}</span>
              <span className="deactivation-metric__label">{metric.label}</span>
              <span className="deactivation-metric__status">{metric.active ? "ON" : "OFF"}</span>
            </button>
          ))}
        </div>

        {result && (
          <div
            className={`deactivation-result deactivation-result--${result}`}
            data-testid="deactivation-result"
          >
            {result === "correct" ? "CORRECT!" : "TRY AGAIN"}
          </div>
        )}

        <button
          className="deactivation-submit"
          onClick={handleSubmit}
          data-testid="deactivation-submit"
          disabled={result !== null}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
