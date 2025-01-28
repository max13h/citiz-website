import { Link } from "react-router"

const Links = [
  {
    name: "Linkedin",
    icon: (<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="M6.94 5a2 2 0 1 1-4-.002a2 2 0 0 1 4 .002M7 8.48H3V21h4zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91z"></path></svg>),
    url: "https://linkedin.com/in/hmae/"
  },
  {
    name: "Github",
    icon: (<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"></path></svg>),
    url: "https://github.com/max13h"
  },
  {
    name: "contact@hmae.fr",
    icon: (<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><g fill="currentColor"><path d="M22 7.535V17a3 3 0 0 1-2.824 2.995L19 20H5a3 3 0 0 1-2.995-2.824L2 17V7.535l9.445 6.297l.116.066a1 1 0 0 0 .878 0l.116-.066z"></path><path d="M19 4c1.08 0 2.027.57 2.555 1.427L12 11.797l-9.555-6.37a3 3 0 0 1 2.354-1.42L5 4z"></path></g></svg>),
    url: "mailto:contact@hmae.fr"
  },
]

export function Contacts({ color }: { color: "dark" | "light" }) {
  return (
    <section className={`py-16 flex justify-center ${color === "dark" && "bg-gray-dark text-white"}`}>
      <div className="w-full max-w-[920px] flex flex-col items-end justify-end gap-4">
        <h2 className="header">Contacts</h2>
        <p className="text-end">
          This website is a personal project and is not the official website. <br />
          It was created as part of my portfolio to showcase my skills and creativity. <br /> 
          If you enjoyed this project or would like to learn more, feel free to <strong>contact me</strong>. <br />
        </p>
      <div className="flex items-center gap-4">
        {
          Links.map((el, i) => {
            return (
              <Link key={i}to={el.url} title={el.name}>
                {el.icon}
              </Link>
            )
          })
        }
        </div>
      </div>
    </section>
  )
}