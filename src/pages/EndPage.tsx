import { useNavigate } from "react-router-dom";

export default function EndPage() {
  const navigate = useNavigate();

  return (
    <div className="wrapper">
      <div className="game-scale">
        <div className="end-page end-page--success">
          <div className="center">
            <h1 className="end-title">Congrats!</h1>
            <h2 className="end-subtitle">YOU ESCAPED!</h2>
            <button className="btnReturn" onClick={() => navigate("/")}>
              Return
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
