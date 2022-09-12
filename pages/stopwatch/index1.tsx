import React, { useState, useEffect } from 'react';
import Link from 'next/link';
// import style from './index.module.less';

// interface IProps {
//   articles: [];
// }

export default function Archives({ month, articles = [] }) {
  console.log(66666666666666);

  const [state, setState] = useState(1);
  useEffect(() => {
    console.log('4444444444444444');

    console.log(window);

    const script = document.createElement('script');
    script.src = '/stopwatch.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div>
      <div id="challenge">
        <div className="challenge-impot">
          <canvas id="confetti"></canvas>
          <p className="challenge-start">Herausforderung</p>
          <div className="clockbutton">Gedrückt Halten</div>
          <p className="clockdetail">
            Falls Du die besondere Sekundenzahl <strong>3,33s</strong> oder{' '}
            <strong>5,25s</strong> bekommst, dann erhältst Du die Chance, an der
            Verlosung des entsprechenden Preises teilzunehmen.{' '}
          </p>
          <div className="clockimgbox">
            <svg
              fill="#9d9d9c"
              className="clockarrow"
              viewBox="0 0 155 208"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              // xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <defs>
                <path
                  d="M68.5721689,82.9737108 L110.707425,40.5594133"
                  id="path-13"
                ></path>
                <ellipse
                  id="path-15"
                  cx="75.9389535"
                  cy="76.4418605"
                  rx="4.82848837"
                  ry="4.86046512"
                ></ellipse>
              </defs>
              <g className="timer">
                <g id="Oval-6" strokeLinecap="round" strokeLinejoin="round">
                  <use fill="#45ADEE" xlinkHref="#path-13"></use>
                  <use
                    fill="#9d9d9c"
                    fillOpacity="1"
                    filter="url(#filter-14)"
                    xlinkHref="#path-13"
                  ></use>
                  <use
                    stroke="#ffad01"
                    strokeWidth="5"
                    xlinkHref="#path-13"
                  ></use>
                </g>
                <g id="Oval-6" strokeLinecap="round" strokeLinejoin="round">
                  <use fill="#45ADEE" xlinkHref="#path-15"></use>
                  <use
                    fill="#9d9d9c"
                    fillOpacity="1"
                    filter="url(#filter-16)"
                    xlinkHref="#path-15"
                  ></use>
                  <use
                    stroke="#ffffff"
                    strokeWidth="1"
                    xlinkHref="#path-15"
                  ></use>
                </g>
              </g>
            </svg>
            <div className="clockcount">
              <span>0,00</span>s
            </div>
            <img
              loading="lazy"
              className="clockimg clocknormal"
              src="https://test.flexispot.de/media/public/challenge/clocknormal.png"
            />
            <img
              loading="lazy"
              className="clockimg clockdown"
              src="https://test.flexispot.de/media/public/challenge/clockdown.png"
            />
            <img
              loading="lazy"
              className="clockimg clockup"
              src="https://test.flexispot.de/media/public/challenge/clockup.png"
            />
          </div>
          <div className="clockimgboxmb">
            <svg
              fill="#9d9d9c"
              className="clockarrowmb"
              viewBox="0 0 155 208"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              // xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <defs>
                <path
                  d="M68.5721689,82.9737108 L110.707425,40.5594133"
                  id="path-13"
                ></path>
                <ellipse
                  id="path-15"
                  cx="75.9389535"
                  cy="76.4418605"
                  rx="4.82848837"
                  ry="4.86046512"
                ></ellipse>
              </defs>
              <g className="timermb">
                <g id="Oval-6" strokeLinecap="round" strokeLinejoin="round">
                  <use fill="#45ADEE" xlinkHref="#path-13"></use>
                  <use
                    fill="#9d9d9c"
                    fillOpacity="1"
                    filter="url(#filter-14)"
                    xlinkHref="#path-13"
                  ></use>
                  <use
                    stroke="#ffad01"
                    strokeWidth="5"
                    xlinkHref="#path-13"
                  ></use>
                </g>
                <g id="Oval-6" strokeLinecap="round" strokeLinejoin="round">
                  <use fill="#45ADEE" xlinkHref="#path-15"></use>
                  <use
                    fill="#9d9d9c"
                    fillOpacity="1"
                    filter="url(#filter-16)"
                    xlinkHref="#path-15"
                  ></use>
                  <use
                    stroke="#ffffff"
                    strokeWidth="1"
                    xlinkHref="#path-15"
                  ></use>
                </g>
              </g>
            </svg>
            <div className="clockcountmb">
              <span>0,00</span>s
            </div>
            <img
              loading="lazy"
              className="clockimgmb clocknormalmb"
              src="https://test.flexispot.de/media/public/challenge/clocknormalmb.png"
            />
            <img
              loading="lazy"
              className="clockimgmb clockdownmb"
              src="https://test.flexispot.de/media/public/challenge/clockdownmb.png"
            />
            <img
              loading="lazy"
              className="clockimgmb clockupmb"
              src="https://test.flexispot.de/media/public/challenge/clockupmb.png"
            />
          </div>
        </div>
        <div className="challenge-mask">
          <div className="challenge-blog blogfirst">
            <img
              loading="lazy"
              className="challenge-close"
              src="https://test.flexispot.de/media/public/challenge/close.svg"
              onClick="closeblog()"
            />
            <img
              loading="lazy"
              className="challenge-balloonfirst"
              src="https://test.flexispot.de/media/public/challenge/balloon2.png"
            />
            <h2 className="challenge-blogtitle">Herausforderung Erfolgreich</h2>
            <div className="challenge-blogclock">
              <img
                loading="lazy"
                className="blogclock-img"
                src="https://test.flexispot.de/media/public/challenge/clockone.png"
              />
              <div className="blogclock-detial">
                <div className="blogclock-top">
                  <span>8%</span>Rabatt-Gutschein
                </div>
                <p className="blogclock-bottom">Einmalig und Unkombinierbar</p>
              </div>
            </div>
            <p className="challenge-blogtitle2">
              Gib Deine E-Mail-Adresse ein, um an der Verlosung teilzunehmen
            </p>
            <div className="challenge-inputbox">
              <input
                className="challenge-input"
                type="email"
                placeholder="E-Mail-Adresse"
              />
            </div>
            <div className="challenge-checkbox">
              <input className="challenge-check" type="checkbox" checked />
              <span className="challenge-checkboxspan">
                Mit der Bestellung erklärst Du Dich mit unseren{' '}
                <a
                  target="_blank"
                  href="https://www.flexispot.de/agb"
                  rel="noreferrer"
                >
                  AGB
                </a>{' '}
                und unserer{' '}
                <a
                  target="_blank"
                  href="https://www.flexispot.de/datenschutzerklaerung"
                  rel="noreferrer"
                >
                  Datenschutzerklärung
                </a>{' '}
                einverstanden. Bitte stimme zu!
              </span>
            </div>
            <div className="challenge-subform">OK</div>
          </div>

          <div className="challenge-blog blogsecone">
            <img
              loading="lazy"
              className="challenge-close"
              src="https://test.flexispot.de/media/public/challenge/close.svg"
              onClick="closeblog()"
            />
            <img
              loading="lazy"
              className="challenge-balloonone"
              src="https://test.flexispot.de/media/public/challenge/balloon3.png"
            />
            <img
              loading="lazy"
              className="challenge-balloonfirst balloononenext"
              src="https://test.flexispot.de/media/public/challenge/balloon2.png"
            />
            <h2 className="challenge-blogtitle blogtitleone">
              Herausforderung Erfolgreich
              <img src="https://test.flexispot.de/media/public/challenge/horn.png" />
            </h2>
            <p className="challenge-blogdetail">
              Herzlichen Glückwunsch zur Teilnahme an der Herausforderung und
              zur Chance auf die Verlosung!
            </p>
            <p className="challenge-blogdetail">
              Die Gewinner werden am 27. Mai bekanntgegeben. Viel Glück!
            </p>
          </div>

          <div className="challenge-blog blogsectwo">
            <img
              loading="lazy"
              className="challenge-close"
              src="https://test.flexispot.de/media/public/challenge/close.svg"
              onClick="closeblog()"
            />
            <img
              loading="lazy"
              className="challenge-balloontwo"
              src="https://test.flexispot.de/media/public/challenge/balloon1.png"
            />
            <h2 className="challenge-blogtitle">Herausforderung Erfolgreich</h2>
            <div className="blogsectwo-card">
              <img
                loading="lazy"
                src="https://test.flexispot.de/media/public/challenge/card.png"
              />
              <span>8% Rabatt</span>
            </div>
            <p className="challenge-blogdetail blogdetailtwo">
              Der Gutschein wurde an Deine E-Mail-Adresse gesendet
              <img src="https://test.flexispot.de/media/public/challenge/money.png" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
