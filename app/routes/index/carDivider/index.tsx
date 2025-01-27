import { Car } from "./car";

export function CarDivider() {
  const leftPosition = [
    "-115vw",
    "-100vw",
    "-80vw",
    "-60vw",
    "-40vw",
    "-20vw",
    "20vw",
    "40vw",
    "60vw",
    "80vw",
    "100vw",

  ]
  return (
    <section className="">
      <section className="w-full h-fit relative overflow-hidden">
        {
          Array.from({ length: 11 }).map((_, i) => {
            return (
              <div 
                className={`
                  car
                  w-[15%]
                  h-fit
                  ${i > 0 && "absolute top-0 " + leftPosition[i]}
                `}
                style={{
                  left: leftPosition[i]
                }}
              >
                <Car className="w-full h-fit woobling" />
              </div>
            )
          })
        }
      </section>
    </section>
  );
}
