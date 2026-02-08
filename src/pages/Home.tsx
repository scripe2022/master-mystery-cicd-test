import menuPng from "../assets/images/menu.png";

export default function Home() {
  return (
    <div className="home">
      <div className="center">
        <h1 className="title">Matter Mystery</h1>

        <button className="btnStart" onClick={() => console.log("start")}>
          Start
        </button>
      </div>

      <button className="menuBtn" onClick={() => console.log("menu")} aria-label="Open menu">
        <img src={menuPng} alt="" draggable={false} />
      </button>
    </div>
  );
}
