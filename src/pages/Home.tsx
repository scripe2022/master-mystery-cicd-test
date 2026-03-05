import { useNavigate } from "react-router-dom";
import Button from "../components/buttons/Button";
import MenuButton from "../components/buttons/MenuButton";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="wrapper">
      <div className="game-scale">
        <div className="home">
          <div className="center">
            <h1 className="title">Matter Mystery</h1>

            <Button
              className="btnStart"
              fontSize="clamp(16px, calc(5 * var(--unit)), 200px)"
              onClick={() => navigate("/story")}
            >
              Start
            </Button>
          </div>

          <div className="menu-button">
            <MenuButton />
          </div>
        </div>
      </div>
    </div>
  );
}
