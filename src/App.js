import Home from "./Pages/Home.js";
import "./App.css";

function App() {
  let touch = matchMedia("(hover: none)").matches;

  window.addEventListener("resize", () => {
    touch = matchMedia("(hover: none)").matches;
  });

  window.onmousemove = (e) => {
    if (!touch) {
      let cursor = document.getElementById("cursor");
      let x = e.clientX;
      let y = e.clientY;
      cursor.style.left = x - 10 + "px";
      cursor.style.top = y - 10 + "px";
    }
  };

  return (
    <div className="App">
      <div id="cursor"></div>
      <Home />
    </div>
  );
}

export default App;
