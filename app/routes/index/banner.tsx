import React from "react";
import { useState, useEffect } from "react";

export function Banner() {
  const [navbarHeight, setNavbarHeight] = useState(0);

  useEffect(() => {
    // Access `document` safely after the component is mounted
    const navHeight = document.querySelector("nav")?.offsetHeight || 0;
    setNavbarHeight(navHeight);
  }, []);

  const imgHeight = `calc(90vh - ${navbarHeight}px)`;

  const arrow1 = (
    <svg className="self-center" width="320" height="120" viewBox="0 0 320 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M274.819 117.302C275.888 119.545 278.573 120.498 280.817 119.428L317.378 102.006C319.621 100.937 320.573 98.2512 319.504 96.0076C318.435 93.7641 315.75 92.812 313.506 93.8811L281.007 109.368L265.521 76.8692C264.451 74.6257 261.766 73.6736 259.522 74.7427C257.279 75.8119 256.327 78.4973 257.396 80.7409L274.819 117.302ZM9.57647 0.553448C-0.0935247 32.2641 -2.01112 54.4882 3.03199 69.0815C5.62112 76.5736 10.0531 82.0741 16.0856 85.6401C22.0232 89.15 29.1702 90.587 36.944 90.6485C52.3752 90.7706 71.5603 85.4645 92.0449 77.94C112.629 70.3789 135.097 60.3522 157.163 50.6733C179.316 40.9567 201.066 31.589 220.507 25.1697C240.111 18.6969 256.615 15.492 268.522 17.4294C274.341 18.3762 278.818 20.5137 282.092 23.8941C285.373 27.2814 287.823 32.3048 288.874 39.6984C291.011 54.7208 287.219 78.3782 274.64 113.862L283.122 116.87C295.791 81.1361 300.246 55.7303 297.785 38.4309C296.538 29.6636 293.477 22.7115 288.557 17.6321C283.63 12.5457 277.214 9.7253 269.967 8.54623C255.744 6.23198 237.431 10.104 217.686 16.6236C197.778 23.1968 175.649 32.7372 153.548 42.4313C131.361 52.1631 109.202 62.0499 88.9417 69.4919C68.582 76.9705 50.7056 81.7571 37.0152 81.6488C30.2281 81.5951 24.7992 80.3361 20.6655 77.8925C16.6267 75.505 13.4919 71.7946 11.5384 66.1418C7.49627 54.4452 8.59012 34.6432 18.1851 3.17861L9.57647 0.553448Z" fill="#56B5B5"/>
    </svg>
  )

  const arrow2 = (
    <svg className="self-center" width="259" height="125" viewBox="0 0 259 125" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.844 121.725C17.7969 124.021 20.4302 125.109 22.7255 124.156L60.1299 108.627C62.4252 107.674 63.5134 105.041 62.5605 102.745C61.6075 100.45 58.9743 99.3617 56.679 100.315L23.4306 114.118L9.62676 80.8701C8.6738 78.5748 6.04056 77.4866 3.74523 78.4395C1.44991 79.3925 0.361709 82.0257 1.31466 84.321L16.844 121.725ZM250.001 0.389604C249.299 28.998 246.786 47.8447 242.92 59.6494C239.047 71.4761 234.315 74.919 229.925 75.5295C224.749 76.2492 217.772 73.5563 208.465 67.7776C199.302 62.088 189.337 54.4038 177.956 46.4882C155.845 31.1101 129.022 15.2998 100.528 20.9996C71.7822 26.7499 43.4745 53.8337 16.8411 118.281L25.1589 121.719C51.5255 57.9163 78.2008 34.6443 102.293 29.8248C126.638 24.9549 150.508 38.3608 172.817 53.8769C183.646 61.4084 194.324 69.5908 203.718 75.4237C212.969 81.1676 222.466 85.6532 231.164 84.4438C240.647 83.1252 247.189 75.5315 251.473 62.4505C255.764 49.3474 258.292 29.4154 258.999 0.610396L250.001 0.389604Z" fill="#56B5B5"/>
    </svg>
  )

  return (
    <section className="flex justify-center items-center gap-16">
      <div className="w-3/5 flex justify-end">
        <div className="flex flex-col gap-2 w-[600px]">
          {
            [
              ["Réservez", "Via l'application ou par téléphone"],
              ["Déverouillez", "le véhicule", "Via l'application ou par badge"],
              ["C'est parti !", "à partir de 3 €/heure et 0,42€/km"]
            ].map((el, index) => {
              return (
                <React.Fragment key={index}>
                  <p className={"flex flex-col items-center w-fit " + (index === 1 && "self-end" ||"")}>
                    { el.map((string, stringIndex) => (<span key={stringIndex} className={stringIndex === 0 ? "text-6xl font-bold font-header": "opacity-50"}>{string}</span>)) }
                  </p>
                  {index === 0 && arrow1}
                  {index === 1 && arrow2}
                </React.Fragment>
              );
            })
          }
        </div>
      </div>
      <img src="https://images.unsplash.com/photo-1563096080-761dbf0020b9?q=80&w=2373&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Photo d'illustration Citiz" className={"w-2/5 object-cover object-[60%] rounded-l-3xl shadow-sm"} style={{height: imgHeight}} />
    </section>
  )
}