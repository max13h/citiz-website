import { useEffect, useState } from 'react';

export function Simulateur() {
  const [currentDate, setCurrentDate] = useState('');
  const [clientTypeSelected, setClientTypeSelected] = useState<string | undefined>(undefined);
  const [carSelected, setCarSelected] = useState<string | undefined>(undefined);
  const [startDate, setStartDate] = useState<string | undefined>(undefined);
  const [endDate, setEndDate] = useState<string | undefined>(undefined);
  const [kilometers, setKilometers] = useState<number>(0);
  const [result, setResult] = useState<string | null>(null);

  const clientTypes = ["Particulier", "Professionnel"];
  const cars = [
    { 
      type: "S", 
      hourlyRate: 5.5, 
      dailyRate: 39, 
      weeklyRate: 180, 
      kmRate: 0.42, 
      kmRateAfter100: 0.22, 
      imgUrl: "https://grand-est.citiz.coop/bundles/cooptilleulsportail/img/car-s.png" 
    },
    { 
      type: "M", 
      hourlyRate: 6, 
      dailyRate: 45, 
      weeklyRate: 210, 
      kmRate: 0.42, 
      kmRateAfter100: 0.22, 
      imgUrl: "https://grand-est.citiz.coop/bundles/cooptilleulsportail/img/car-m.png" 
    },
    { 
      type: "L", 
      hourlyRate: 6.5, 
      dailyRate: 50, 
      weeklyRate: 240, 
      kmRate: 0.42, 
      kmRateAfter100: 0.22, 
      imgUrl: "https://grand-est.citiz.coop/bundles/cooptilleulsportail/img/car-l.png" 
    },
    { 
      type: "XL", 
      hourlyRate: 7, 
      dailyRate: 56, 
      weeklyRate: 270, 
      kmRate: 0.52, 
      kmRateAfter100: 0.27, 
      imgUrl: "https://grand-est.citiz.coop/bundles/cooptilleulsportail/img/car-xl.png" 
    },
    { 
      type: "XXL", 
      hourlyRate: 7.5, 
      dailyRate: 60, 
      weeklyRate: 300, 
      kmRate: 0.52, 
      kmRateAfter100: 0.27, 
      imgUrl: "https://grand-est.citiz.coop/bundles/cooptilleulsportail/img/car-xxl.png" 
    },
    { type: "Citiz Rouge",
      hourlyRate: 5.5,
      dailyRate: 39,
      weeklyRate: 180,
      kmRate: 0.42,
      kmRateAfter100: 0.22,
      imgUrl: "https://grand-est.citiz.coop/bundles/cooptilleulsportail/img/car-citiz-rouge.png"
    },
  ];

  useEffect(() => {
    const now = new Date();
    const currentDateString = now.toISOString().slice(0, 16);
    setCurrentDate(currentDateString);
  }, []);

  const calculateCost = () => {
    if (!startDate || !endDate || !carSelected || clientTypeSelected !== "Particulier") {
      setResult(null);
      return;
    }

    const car = cars.find((c) => c.type === carSelected);
    if (!car) return;

    const start = new Date(startDate);
    const end = new Date(endDate);
    const durationInHours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);

    if (durationInHours <= 0) {
      setResult("La durée doit être supérieure à zéro.");
      return;
    }

    let cost = 0;

    if (durationInHours >= 24 * 7) {
      cost += Math.floor(durationInHours / (24 * 7)) * car.weeklyRate;
    }
    if (durationInHours % (24 * 7) >= 24) {
      cost += Math.floor((durationInHours % (24 * 7)) / 24) * car.dailyRate;
    }
    cost += (durationInHours % 24) * car.hourlyRate;

    if (kilometers > 100) {
      cost += 100 * car.kmRate + (kilometers - 100) * car.kmRateAfter100;
    } else {
      cost += kilometers * car.kmRate;
    }

    setResult(cost.toFixed(2));
  };

  const resetForm = () => {
    setClientTypeSelected(undefined);
    setCarSelected(undefined);
    setStartDate(undefined);
    setEndDate(undefined);
    setKilometers(0);
    setResult(null);
  }

  return (
    <section className="flex justify-center w-full h-fit py-8">
      <div className="flex flex-col w-full max-w-[1080px] gap-16">
        <h2 className="header">Simulateur de tarif <strong>Grand-Est</strong></h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            calculateCost();
          }}
          className="flex flex-col items-center gap-8"
        >
          <fieldset className="flex flex-col items-center gap-2">
            <div><legend className='text-lg'>Je suis un</legend></div>
            <div className="flex items-center rounded-full border border-gray-dark overflow-hidden w-80">
              {clientTypes.map((clientType, index) => {
                const isSameClientType = clientTypeSelected === clientType;
                return (
                  <label
                    key={index}
                    htmlFor={clientType}
                    className={`relative px-4 py-2 shrink-0 w-1/2 text-center ${isSameClientType ? "bg-gray-light" : ""} hover:bg-gray-light transition-all duration-200 cursor-pointer ${clientType === "Professionnel" ? "opacity-50 cursor-default hover:bg-white" : ""}`}
                  >
                    {clientType}
                    <input
                      type="radio"
                      id={clientType}
                      name="type"
                      value={clientType}
                      checked={isSameClientType}
                      onChange={({ target: { value } }) => setClientTypeSelected(value)}
                      className="absolute opacity-0"
                      disabled={clientType === "Professionnel"}
                    />
                  </label>
                );
              })}
            </div>
          </fieldset>

          <fieldset className="flex items-center justify-center gap-4">
            {cars.map((car, index) => (
              <div key={index} className="relative">
                <input
                  type="radio"
                  id={"car-" + car.type}
                  className="absolute opacity-0"
                  name="car"
                  value={car.type}
                  checked={carSelected === car.type}
                  onChange={({ target: { value } }) => setCarSelected(value)}
                />
                <label
                  htmlFor={"car-" + car.type}
                  className={`cursor-pointer p-4 transition-all duration-200 hover:bg-gray-light flex flex-col items-center font-medium rounded-2xl ${carSelected === car.type ? "bg-gray-light" : ""}`}
                >
                  <img src={car.imgUrl} alt={"Voiture " + car.type} className="w-16" />
                  <span>{car.type}</span>
                </label>
              </div>
            ))}
          </fieldset>

          <fieldset className='flex justify-center gap-16'>
            <label className='flex flex-col items-center'>
              Date et heure de départ
              <input
                type="datetime-local"
                name="start"
                id="start"
                value={startDate}
                min={currentDate}
                onChange={({ target: { value } }) => setStartDate(value)}
                className='py-2 px-4 border border-gray-dark rounded-full'
              />
            </label>

            <label className='flex flex-col items-center'>
              Date et heure de retour
              <input
                disabled={!startDate}
                type="datetime-local"
                name="end"
                id="end"
                value={endDate}
                min={startDate}
                onChange={({ target: { value } }) => setEndDate(value)}
                className='py-2 px-4 border border-gray-dark rounded-full disabled:opacity-50'
              />
            </label>
          </fieldset>

          <fieldset className='flex flex-col items-center'>
            <label className='flex flex-col items-center'>
              Kilomètres prévus
              <input
                type="number"
                value={kilometers}
                onChange={({ target: { value } }) => setKilometers(Number(value))}
                className='py-2 px-4 border border-gray-dark rounded-full'
                placeholder="Entrez le nombre de kilomètres"
              />
            </label>
          </fieldset>

          <button
            disabled={!clientTypeSelected || !carSelected || !startDate || !endDate || !kilometers}
            className='px-8 py-2 bg-primary rounded-full text-white disabled:opacity-50'
            onClick={calculateCost}
          >
            Simuler
          </button>
          <div className="text-center text-lg">Le coût total est de <strong>{result ? `${result}€` : "..."}</strong></div>
          {result && (
            <button
              className='px-8 py-2 bg-gray-light rounded-full disabled:opacity-50'
              onClick={resetForm}
            >
              Remettre à zéro
            </button>
          )}
        </form>

        
      </div>
    </section>
  );
}
