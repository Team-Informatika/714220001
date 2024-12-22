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
import Hamburger from "../components/hamburger/Hamburger";

function App() {
  const [activeLink, setActiveLink] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [animationRunning, setAnimationRunning] = useState(false);

  const time = useTime();

  const toggleMobile = () => {
    if (isMobile) {
      setAnimationRunning(true);
      setIsMobile(false);
    } else {
      setIsMobile(true);
    }
  };

  const handleActiveLink = useCallback(
    (link) => {
      if (link === activeLink) return;
      setIsLoading(true);

      setTimeout(() => {
        setActiveLink(link);
        setIsLoading(false);
      }, 3000);
    },
    [activeLink]
  );

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 500); // Initial loader timeout
  }, []);

  return (
    <>
      <div className={`kp-loader ${isLoading ? "active" : ""}`}></div>
      <div className={`kp-app ${isLoading ? "" : "display"}`}>
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
                    onClick={(e) => {
                      e.preventDefault();
                      handleActiveLink(data.id);
                    }}
                  >
                    {data.name},
                  </div>
                );
              })}
          </div>
          <div className="kp-navbar-mobile" onClick={toggleMobile}>
            <Hamburger />
          </div>
          {(isMobile || animationRunning) && (
            <div
              className={`mobile-wrapper ${
                isMobile ? "slide-in" : "slide-out"
              }`}
              onAnimationEnd={() => {
                if (!isMobile) setAnimationRunning(false);
              }}
            >
              {menu
                .filter((item) => item.name)
                .map((data) => {
                  return (
                    <div
                      key={data.id}
                      className={`link ${
                        activeLink === data.id ? "active" : ""
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleActiveLink(data.id);
                      }}
                    >
                      {data.name},
                    </div>
                  );
                })}
            </div>
          )}
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
      </div>
    </>
  );
}

export default App;
