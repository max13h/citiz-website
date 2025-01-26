export function Location() { 
  return (
    <div className="flex gap-16 w-full justify-center py-16 bg-gray-light">
      <div className="flex flex-col justify-center items-center gap-4">
        <iframe 
          className="w-[500px] h-[500px] rounded-3xl shadow-md"
          loading="lazy" 
          allowFullScreen 
          src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJsbWPxd9VkUcR_RfRz30ZyLk&key=AIzaSyDKDVVNL5FeC6oEKMdVMascV7WDuglvu8c"
        />
        <input type="text" placeholder="Recherchez un endroit" className="shadow-sm border border-gray-light w-full px-4 py-2 rounded-full" />
      </div>
      <div className="w-1/3 flex flex-col justify-center gap-4">
        <h2 className="header">Nos bornes près de chez vous !</h2>
        <p>
          <strong>Citiz</strong> dans le Grand Est, c'est :
          <ul className="list-disc list-inside">
            <li>Près de 400 voitures accessibles en libre-service 24h/24</li>
            <li>Plus de 210 stations réparties dans 40 villes du Grand Est</li>
            <li>Location pour une heure, une journée ou plus.</li>
            <li>5 catégories de voitures, à choisir pour chaque déplacement en fonction de vos projets.</li>
          </ul>
        </p>
        <p>
          Vous pouvez également retrouver les stations des autres services Citiz <br/>
          À Besançon, Dijon, Lyon, Marseille, Grenoble, Toulouse, Bordeaux, etc.
        </p>
      </div>
    </div>
  )
}