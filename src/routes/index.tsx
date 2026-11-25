import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Board } from "@/components/board";
import { Shell } from "@/components/shell";
import { characters, pins, type Handle } from "@/data/catalog";

type IndexSearch = {
  q?: string;
  character?: Handle;
};

const handles: Handle[] = ["miquela", "imma", "shudu"];

function validateSearch(search: Record<string, unknown>): IndexSearch {
  const q = typeof search.q === "string" && search.q.trim() ? search.q : undefined;
  const character = handles.find((handle) => handle === search.character);
  return {
    ...(q ? { q } : {}),
    ...(character ? { character } : {}),
  };
}

export const Route = createFileRoute("/")({
  validateSearch,
  head: () => ({
    meta: [{ title: "Index — Vitrine" }],
  }),
  component: Home,
});

function Home() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const query = search.q?.trim().toLowerCase() ?? "";
  const filtered = pins.filter((pin) => {
    if (search.character && pin.character !== search.character) return false;
    if (!query) return true;
    const character = characters.find((item) => item.handle === pin.character);
    const haystack = `${pin.title} ${pin.caption} ${pin.credit} ${character?.name ?? ""} ${character?.studio ?? ""} ${character?.city ?? ""}`.toLowerCase();
    return haystack.includes(query);
  });

  function setCharacter(character?: Handle) {
    void navigate({
      to: "/",
      search: {
        ...(search.q ? { q: search.q } : {}),
        ...(character ? { character } : {}),
      },
    });
  }

  const filters: { id?: Handle; label: string }[] = [
    { label: "All" },
    ...characters.map((character) => ({ id: character.handle, label: character.name })),
  ];

  return (
    <Shell>
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-4xl tracking-tight text-balance md:text-5xl">The index</h1>
          <p className="mt-2 max-w-md text-sm text-pretty text-muted">
            Eighteen stills. Three characters. Save anything — it stays on this device.
          </p>
        </div>
        <p className="shrink-0 text-sm text-muted tabular-nums">{filtered.length}</p>
      </div>
      <div className="mb-6 flex flex-wrap" role="group" aria-label="Filter by character">
        {filters.map((filter) => {
          const active = (filter.id ?? undefined) === (search.character ?? undefined);
          return (
            <button
              key={filter.label}
              type="button"
              aria-pressed={active}
              onClick={() => setCharacter(filter.id)}
              className={`h-11 px-3 text-sm ${active ? "bg-ink text-paper" : "text-muted"}`}
            >
              {filter.label}
            </button>
          );
        })}
      </div>
      {filtered.length === 0 ? (
        <p className="border-t border-line py-16 text-sm text-muted">Nothing matches that.</p>
      ) : (
        <Board pins={filtered} />
      )}
    </Shell>
  );
}
