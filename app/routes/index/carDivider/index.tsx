import { Car } from "./car";

export function CarDivider() {
  return (
    <section className="">
      <section className="w-full flex items-center justify-center overflow-hidden gap-8 bottom-full">
          <Car className="w-[20vw] min-w-64 h-fit shrink-0" />
          <Car className="w-[20vw] min-w-64 h-fit shrink-0" />
          <Car className="w-[20vw] min-w-64 h-fit shrink-0" />
          <Car className="w-[20vw] min-w-64 h-fit shrink-0" />
          <Car className="w-[20vw] min-w-64 h-fit shrink-0" />
      </section>
    </section>
  );
}
