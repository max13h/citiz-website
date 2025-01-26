export function Autopartage() {
  return (
    <div className="flex flex-col gap-8 items-center py-8">
      <h2 className="header">C'est quoi l'autopartage ?</h2>
      <p className="w-full max-w-[720px] text-center text-lg">
        Prenez une voiture <strong>Citiz</strong>, profitez-en, puis ramenez-là à son emplacement <br />
        Elle est disponible pour la personne suivante
      </p>
      <iframe 
        width="560" 
        height="315" 
        src="https://www.youtube.com/embed/Su047sfe0PA?si=fGsvVBGI9qOFxPNK" 
        title="YouTube video player" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        referrerPolicy="strict-origin-when-cross-origin" 
        allowFullScreen 
      />
    </div>
  )
}