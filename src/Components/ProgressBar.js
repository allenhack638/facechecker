import "../App.css";
import { useEffect } from "react";
function Progressbar({ progress }) {
  // useEffect(() => {
  //   const progressBar = document.querySelector(".skillBarValue");
  //   if (progressBar) {
  //     progressBar.style.animation = `slideIn ${progress / 100}s linear`;
  //   }
  // }, [progress]);
  return (
    <div className="skillBarContainer">
      <div className={`skillBarValue`} style={{ width: `${progress}%` }}>
        {progress}%{" "}
      </div>
    </div>
  );
}

export default Progressbar;
