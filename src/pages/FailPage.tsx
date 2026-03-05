import { useNavigate } from "react-router-dom";

export default function FailPage() {
  const navigate = useNavigate();

  return (
    <div className="wrapper">
      <div className="game-scale">
        <div className="end-page end-page--failure">
          <div className="center">
            <h1 className="end-title">You Ran Out of Time</h1>
            <h2 className="end-subtitle">Maybe Next Time!</h2>
            <button className="btnReturn" onClick={() => navigate("/")}>
              Return
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
