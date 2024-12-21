import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  Fragment,
} from "react";
import "./app.css";
import useTime from "../helpers/useTime";
import menu from "../menu.json";

function App() {
  const [activeLink, setActiveLink] = useState(1);

  const time = useTime();

  const handleActiveLink = useCallback((link) => {
    setActiveLink(link);
  }, []);

  return (
    <>
      <div className="kp-navbar">
        <div className="kp-navbar-logo">kostsplayer</div>
        <div className="kp-navbar-time">{time} (Bandung)</div>
        <div className="kp-navbar-links">
          {menu
            .filter((item) => item.name)
            .map((data) => {
              return (
                <div
                  key={data.id}
                  className={`link ${activeLink === data.id ? "active" : ""}`}
                  onClick={() => handleActiveLink(data.id)}
                >
                  {data.name},
                </div>
              );
            })}
        </div>
      </div>
      <div className="kp-core">
        <div
          className={`kp-core-content1 ${activeLink === 4 ? "contact" : ""}`}
        >
          {menu
            .filter((item) => item.id === activeLink && item.content1)
            .map((data) =>
              data.id === 4 ? (
                <Fragment key={data.id}>
                  {data.content1.map((item, index) => (
                    <div className="wrapper-loan" key={index}>
                      {item.name}
                    </div>
                  ))}
                </Fragment>
              ) : (
                <span key={data.id}>{data.content1}.</span>
              )
            )}
        </div>
        <div className="kp-core-image">
          {menu
            .filter((item) => item.id === activeLink && item.image)
            .map((data) => {
              return (
                <img
                  src={data.image}
                  alt={`${data.name}'s Image`}
                  key={data.id}
                />
              );
            })}
        </div>
        <div
          className={`kp-core-content2 ${activeLink === 4 ? "contact" : ""}`}
        >
          {menu
            .filter((item) => item.id === activeLink && item.content2)
            .map((data) =>
              data.id === 4 ? (
                <Fragment key={data.id}>
                  {data.content2.map((item, index) => (
                    <div className="wrapper-loan" key={index}>
                      {item.name}
                    </div>
                  ))}
                </Fragment>
              ) : (
                <span key={data.id}>{data.content2}.</span>
              )
            )}
        </div>
      </div>
      <div className="kp-me">
        <div className="kp-me-marquee">
          <span>.</span>
          <span>Kosts</span>
          <span>Player</span>
          <span aria-hidden="true">.</span>
          <span aria-hidden="true">Kosts</span>
          <span aria-hidden="true">Player</span>
        </div>
      </div>
    </>
  );
}

export default App;
