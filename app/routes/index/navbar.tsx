import { Link, NavLink, useLocation } from "react-router";

export function Navbar() {
  const location = useLocation ()
  return (
    <nav className="
      sticky
      top-0
      w-full
      bg-white
      flex
      justify-between
      items-center
      px-12
      py-4
      shadow-sm
      shrink-0
      z-50
    ">
      {location.pathname === "/" ? (
        <img src="/logo.svg" alt="Citiz logo" className="w-32"/>
      ) : (
        <Link to="/">
          <img src="/logo.svg" alt="Citiz logo" className="w-32"/>
        </Link>
      )}
      <div className="w-full flex justify-end gap-8 items-center">
        <div className="flex gap-4">
          {
            [
              {
                to: "/autopartage",
                text: "L'autopartage, c'est quoi ?"
              },
              {
                to: "/tarifs",
                text: "Tarifs"
              },
              {
                to: "/qui-sommes-nous",
                text: "Qui sommes nous ?"
              }
            ].map((el, i) => (<NavLink key={i} to={el.to} className="hover:opacity-50 underline">{el.text}</NavLink>) )
          }
        </div>
        <div className="flex gap-4">
          <NavLink to="/connexion" className="bg-gray-light px-4 py-2 rounded-2xl">
            Connexion
          </NavLink>
          <NavLink to="/inscription" className="bg-primary px-4 py-2 rounded-2xl text-white font-bold">
            Inscription
          </NavLink>
        </div>
      </div>
    </nav>
  )
}