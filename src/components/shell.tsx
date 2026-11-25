import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { useSaves } from "@/lib/saves";

const links = [
  { to: "/", label: "Index" },
  { to: "/characters", label: "Characters" },
  { to: "/saved", label: "Saved" },
] as const;

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />
      <main className="mx-auto w-full max-w-screen-2xl px-4 pt-6 pb-16 md:px-8 md:pt-8">
        {children}
      </main>
      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-screen-2xl flex-col gap-2 px-4 py-8 text-sm text-muted sm:flex-row sm:items-baseline sm:justify-between md:px-8">
          <p className="font-serif text-xl text-ink">Vitrine</p>
          <p>An index of AI characters and the studios behind them.</p>
        </div>
      </footer>
    </div>
  );
}

function Header() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const search = useRouterState({
    select: (state) => state.location.search as { q?: string; character?: string },
  });
  const navigate = useNavigate();
  const savedCount = useSaves((state) => state.ids.length);
  const [query, setQuery] = useState(typeof search.q === "string" ? search.q : "");

  useEffect(() => {
    setQuery(typeof search.q === "string" ? search.q : "");
  }, [search.q]);

  function onQuery(next: string) {
    setQuery(next);
    const character =
      search.character === "miquela" || search.character === "imma" || search.character === "shudu"
        ? search.character
        : undefined;
    void navigate({
      to: "/",
      search: {
        q: next.trim() ? next : undefined,
        character,
      },
    });
  }

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-paper/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-screen-2xl items-center gap-4 px-4 py-3 md:px-8">
        <Link to="/" search={{ q: undefined, character: undefined }} className="font-serif text-2xl leading-none tracking-tight">
          Vitrine
        </Link>
        <nav className="hidden items-center md:flex" aria-label="Primary">
          {links.map((link) => (
            <NavItem key={link.to} to={link.to} label={link.label} active={pathname === link.to} count={link.to === "/saved" ? savedCount : 0} />
          ))}
        </nav>
        <form
          className="ml-auto w-full max-w-56"
          role="search"
          onSubmit={(event) => {
            event.preventDefault();
            onQuery(query);
          }}
        >
          <label htmlFor="board-search" className="sr-only">
            Search stills
          </label>
          <input
            id="board-search"
            value={query}
            onChange={(event) => onQuery(event.target.value)}
            placeholder="Search"
            className="h-11 w-full border-b border-line bg-transparent text-sm text-ink placeholder:text-faint focus:border-ink focus:outline-none"
          />
        </form>
      </div>
      <nav className="mx-auto flex max-w-screen-2xl px-2 pb-1 md:hidden" aria-label="Primary">
        {links.map((link) => (
          <NavItem key={link.to} to={link.to} label={link.label} active={pathname === link.to} count={link.to === "/saved" ? savedCount : 0} />
        ))}
      </nav>
    </header>
  );
}

function NavItem({
  to,
  label,
  active,
  count,
}: {
  to: "/" | "/characters" | "/saved";
  label: string;
  active: boolean;
  count: number;
}) {
  return (
    <Link
      to={to}
      search={to === "/" ? { q: undefined, character: undefined } : undefined}
      className={`inline-flex h-11 items-center gap-2 px-2 text-sm ${active ? "text-ink" : "text-muted"}`}
    >
      <span className={active ? "border-b border-ink pb-0.5" : undefined}>{label}</span>
      {count > 0 ? <span className="tabular-nums text-faint">{count}</span> : null}
    </Link>
  );
}
