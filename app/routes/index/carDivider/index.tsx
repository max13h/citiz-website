import { Car } from "./car";

export function CarDivider() {
  return (
    <section className="w-full flex items-center justify-center overflow-hidden -translate-y-8 gap-8">
        <Car className="w-[20vw] min-w-64 h-fit shrink-0" />
        <Car className="w-[20vw] min-w-64 h-fit shrink-0" />
        <Car className="w-[20vw] min-w-64 h-fit shrink-0" />
        <Car className="w-[20vw] min-w-64 h-fit shrink-0" />
        <Car className="w-[20vw] min-w-64 h-fit shrink-0" />
    </section>
  );
}
