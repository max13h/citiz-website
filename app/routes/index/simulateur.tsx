import { useEffect, useState } from 'react';
import { Link } from 'react-router';

// Interfaces for type safety
interface Car {
  type: string;
  hourlyRate: number;
  dailyRate: number;
  weeklyRate: number;
  kmRate: number;
  kmRateAfter100: number;
  imgUrl: string;
}

interface SimulatorState {
  clientTypeSelected?: string;
  carSelected?: string;
  startDate?: string;
  endDate?: string;
  kilometers: number;
  result: string | null;
}

export function Simulateur() {
  // Constants
  const clientTypes = ["Particulier", "Professionnel"];
  const cars = [
    { type: "S", hourlyRate: 5.5, dailyRate: 39, weeklyRate: 180, kmRate: 0.42, kmRateAfter100: 0.22, imgUrl: "https://grand-est.citiz.coop/bundles/cooptilleulsportail/img/car-s.png" },
    { type: "M", hourlyRate: 6, dailyRate: 45, weeklyRate: 210, kmRate: 0.42, kmRateAfter100: 0.22, imgUrl: "https://grand-est.citiz.coop/bundles/cooptilleulsportail/img/car-m.png" },
    { type: "L", hourlyRate: 6.5, dailyRate: 50, weeklyRate: 240, kmRate: 0.42, kmRateAfter100: 0.22, imgUrl: "https://grand-est.citiz.coop/bundles/cooptilleulsportail/img/car-l.png" },
    { type: "XL", hourlyRate: 7, dailyRate: 56, weeklyRate: 270, kmRate: 0.52, kmRateAfter100: 0.27, imgUrl: "https://grand-est.citiz.coop/bundles/cooptilleulsportail/img/car-xl.png" },
    { type: "XXL", hourlyRate: 7.5, dailyRate: 60, weeklyRate: 300, kmRate: 0.52, kmRateAfter100: 0.27, imgUrl: "https://grand-est.citiz.coop/bundles/cooptilleulsportail/img/car-xxl.png" },
    { type: "Citiz Rouge", hourlyRate: 5.5, dailyRate: 39, weeklyRate: 180, kmRate: 0.42, kmRateAfter100: 0.22, imgUrl: "https://grand-est.citiz.coop/bundles/cooptilleulsportail/img/car-citiz-rouge.png" },
  ];

  // State management
  const [currentDate, setCurrentDate] = useState('');
  const [state, setState] = useState<SimulatorState>({
    clientTypeSelected: undefined,
    carSelected: undefined,
    startDate: undefined,
    endDate: undefined,
    kilometers: 0,
    result: null
  });

  // Initialize current date on component mount
  useEffect(() => {
    const now = new Date();
    const currentDateString = now.toISOString().slice(0, 16);
    setCurrentDate(currentDateString);
  }, []);

  // Cost calculation logic
  const calculateCost = () => {
    const { startDate, endDate, carSelected, clientTypeSelected, kilometers } = state;

    // Validation checks
    if (!startDate || !endDate || !carSelected || clientTypeSelected !== "Particulier") {
      setState(prev => ({ ...prev, result: null }));
      return;
    }

    const car = cars.find((c) => c.type === carSelected);
    if (!car) return;

    const start = new Date(startDate);
    const end = new Date(endDate);
    const durationInHours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);

    if (durationInHours <= 0) {
      setState(prev => ({ ...prev, result: "La durée doit être supérieure à zéro." }));
      return;
    }

    // Cost calculation
    let cost = 0;
    if (durationInHours >= 24 * 7) {
      cost += Math.floor(durationInHours / (24 * 7)) * car.weeklyRate;
    }
    if (durationInHours % (24 * 7) >= 24) {
      cost += Math.floor((durationInHours % (24 * 7)) / 24) * car.dailyRate;
    }
    cost += (durationInHours % 24) * car.hourlyRate;

    // Kilometer rate calculation
    if (kilometers > 100) {
      cost += 100 * car.kmRate + (kilometers - 100) * car.kmRateAfter100;
    } else {
      cost += kilometers * car.kmRate;
    }

    setState(prev => ({ ...prev, result: cost.toFixed(2) }));
  };

  // Form reset functionality
  const resetForm = () => {
    setState({
      clientTypeSelected: undefined,
      carSelected: undefined,
      startDate: undefined,
      endDate: undefined,
      kilometers: 0,
      result: null
    });
  };

  // Helper method to update state
  const updateState = (updates: Partial<SimulatorState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  // Render methods
  const renderClientTypeSelector = () => (
    <fieldset className="flex items-center gap-8">
      <div><legend className='text-lg'>Je suis un</legend></div>
      <div className="flex rounded-full border border-gray-dark overflow-hidden w-80 shadow">
        {clientTypes.map((clientType, index) => {
          const isSameClientType = state.clientTypeSelected === clientType;
          const isDisabled = clientType === "Professionnel";
          
          return (
            <label
              key={index}
              htmlFor={clientType}
              className={`
                relative px-4 py-2 shrink-0 w-1/2 text-center 
                ${isSameClientType ? "bg-gray-light" : ""} 
                hover:bg-gray-light transition-all duration-200 
                ${isDisabled ? "opacity-50 cursor-default hover:bg-white" : "cursor-pointer"}
              `}
            >
              {clientType}
              <input
                type="radio"
                id={clientType}
                name="type"
                value={clientType}
                checked={isSameClientType}
                onChange={({ target: { value } }) => updateState({ clientTypeSelected: value })}
                className="absolute opacity-0"
                disabled={isDisabled}
              />
            </label>
          );
        })}
      </div>
    </fieldset>
  );

  const renderCarSelector = () => (
    <fieldset className="flex items-center justify-center gap-4">
      {cars.map((car, index) => (
        <div key={index} className="relative">
          <input
            type="radio"
            id={"car-" + car.type}
            className="absolute opacity-0"
            name="car"
            value={car.type}
            checked={state.carSelected === car.type}
            onChange={({ target: { value } }) => updateState({ carSelected: value })}
          />
          <label
            htmlFor={"car-" + car.type}
            className={`
              cursor-pointer p-4 transition-all duration-200 
              shadow hover:bg-gray-light flex flex-col 
              items-center font-medium rounded-2xl 
              ${state.carSelected === car.type ? "bg-gray-light" : ""}
            `}
          >
            <img src={car.imgUrl} alt={"Voiture " + car.type} className="w-16" />
            <span>{car.type}</span>
          </label>
        </div>
      ))}
    </fieldset>
  );

  const renderDateSelectors = () => (
    <fieldset className='flex flex-col gap-2'>
      <label className='flex gap-8 items-center'>
        Date et heure de départ
        <input
          type="datetime-local"
          name="start"
          id="start"
          value={state.startDate}
          min={currentDate}
          onChange={({ target: { value } }) => updateState({ startDate: value })}
          className='py-2 px-4 border border-gray-dark rounded-full shadow'
        />
      </label>

      <label className='flex gap-8 items-center'>
        Date et heure de retour
        <input
          disabled={!state.startDate}
          type="datetime-local"
          name="end"
          id="end"
          value={state.endDate}
          min={state.startDate}
          onChange={({ target: { value } }) => updateState({ endDate: value })}
          className='py-2 px-4 border border-gray-dark rounded-full disabled:opacity-50 shadow'
        />
      </label>
    </fieldset>
  );

  const renderKilometerInput = () => (
    <fieldset className='flex items-center'>
      <label className='flex items-center gap-8'>
        Kilomètres prévus
        <input
          type="number"
          value={state.kilometers}
          onChange={({ target: { value } }) => updateState({ kilometers: Number(value) })}
          className='py-2 px-4 border border-gray-dark rounded-full shadow'
          placeholder="Entrez le nombre de kilomètres"
        />
      </label>
    </fieldset>
  );

  const renderResultPanel = () => (
    <div
      className={`
        ${state.result ? 'flex' : 'hidden'} 
        flex-col absolute w-full h-[80%] 
        border border-gray-light rounded-3xl 
        bg-white shadow z-10 top-0 left-0 p-4 gap-4
      `}
    >
      <div className="flex flex-1 flex-col justify-center bg-gray-light items-center w-full border-gray-dark border rounded-3xl">
        <p className="text-2xl font-medium">Sans abonnement</p>
        <p className="text-xl"><strong>{state.result}</strong> € TTC</p>
        <Link to="/tarifs" className='text-primary underline mt-2 font-bold'>Voir plus</Link>
      </div>
      <div className="flex flex-1 flex-col justify-center bg-gray-light items-center w-full border-gray-dark border rounded-3xl">
        <p className="text-2xl font-medium">Avec abonnement</p>
        <p className="opacity-60 text-xl">Informations non disponible</p>
        <Link to="/tarifs" className='text-primary underline mt-2'>Voir plus</Link>
      </div>
      <div className="flex flex-1 flex-col justify-center bg-gray-light items-center w-full border-gray-dark border rounded-3xl">
        <p className="text-2xl font-medium">Sans abonnement</p>
        <p className="opacity-60 text-xl">Informations non disponible</p>
        <Link to="/tarifs" className='text-primary underline mt-2'>Voir plus</Link>
      </div>
    </div>
  );

  return (
    <section className="flex justify-center w-full h-fit py-16">
      <div className="flex flex-col w-full max-w-[1080px] gap-8">
        <h2 className="header">Simulateur de tarif <strong>Grand-Est</strong></h2>
        <div className='flex justify-center gap-8'>
          <div className='flex flex-col gap-8'>
            <p>
              Au moment de votre inscription, choisissez une formule avec ou sans abonnement ! <br /><br />
              Pour chaque location vous payerez les heures réservées + les kilomètres parcourus. <br />
              <strong>Tout est compris</strong> : carburant, assurance, entretien, assistance… <br /><br />
              <Link to="/tarifs" className='underline text-primary'>Voir plus</Link>
            </p>
          </div>
          <span className='w-[4px] bg-gray-light' />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              calculateCost();
            }}
            className="relative shrink-0"
          >
            <div className={`flex flex-col gap-8 w-fit ${state.result && 'invisible'}`}>
              {renderClientTypeSelector()}
              {renderCarSelector()}
              {renderDateSelectors()}
              {renderKilometerInput()}

              <button
                disabled={
                  !state.clientTypeSelected || 
                  !state.carSelected || 
                  !state.startDate || 
                  !state.endDate || 
                  !state.kilometers
                }
                className='px-8 py-2 bg-primary rounded-full text-white disabled:opacity-50 w-fit shadow'
                onClick={calculateCost}
              >
                Simuler
              </button>
            </div>

            {renderResultPanel()}

            {state.result && (
              <button
                className='px-8 py-2 bg-gray-light rounded-full shadow'
                onClick={resetForm}
              >
                Remettre à zéro
              </button>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}