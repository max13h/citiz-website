import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import stylesheet from "./app.css?url";
import { Contacts } from "./routes/index/contacts";
import { Navbar } from "./routes/index/navbar";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Arimo:ital,wght@0,400..700;1,400..700&family=Fira+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Overpass:ital,wght@0,100..900;1,100..900&display=swap",
  },
  { rel: "stylesheet", href: stylesheet },
  { rel: "icon", href: "/citiz-website/favicon.ico" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="flex flex-col min-h-screen h-full">
        <Navbar/>
        <div className="flex-1">
          {children}
        </div>
        <Contacts color="dark" />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

interface ErrorBoundaryExtended extends Route.ErrorBoundaryProps {
  error: {
    status: number
  }
}

export function ErrorBoundary({ error }: ErrorBoundaryExtended) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <>
      <main className="pt-16 p-4 container mx-auto flex flex-col gap-16">
        <section className="flex flex-col items-center gap-16">
          <div className="flex flex-col items-center">
            <h1 className="header">{message}</h1>
            <p>{details}</p>
            {stack && (
              <pre className="w-full p-4 overflow-x-auto">
                <code>{stack}</code>
              </pre>
            )}
          </div>
          {
            (error.status === 404) && (
              <div className="flex flex-col gap-2 p-4 border-gray-light border-2 rounded-3xl">
                <h1 className="text-xl">⚠️ Warning</h1>
                <p>Only the root page of this website has been implemented</p>
                <Link to="/" className="text-primary underline">Go back to root</Link>
              </div>
            )
          }
        </section>
      </main>
    </>
  );
}
