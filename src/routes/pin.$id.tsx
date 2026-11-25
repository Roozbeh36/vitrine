import { Link, createFileRoute } from "@tanstack/react-router";
import { Bookmark } from "lucide-react";
import { Shell } from "@/components/shell";
import { getCharacter, getPin, pinSrc, pinsFor } from "@/data/catalog";
import { useSaves } from "@/lib/saves";

export const Route = createFileRoute("/pin/$id")({
  head: ({ params }) => {
    const pin = getPin(params.id);
    const character = pin ? getCharacter(pin.character) : undefined;
    return {
      meta: [{ title: pin ? `${pin.title} — ${character?.name ?? "Vitrine"}` : "Vitrine" }],
    };
  },
  component: PinPage,
});

function PinPage() {
  const { id } = Route.useParams();
  const pin = getPin(id);

  if (!pin) {
    return (
      <Shell>
        <p className="font-serif text-4xl tracking-tight">This still is not on the board.</p>
        <Link to="/" className="mt-6 inline-flex h-11 items-center text-sm underline">
          Index
        </Link>
      </Shell>
    );
  }

  const character = getCharacter(pin.character);
  const saved = useSaves((state) => state.ids.includes(pin.id));
  const toggle = useSaves((state) => state.toggle);
  const more = pinsFor(pin.character).filter((item) => item.id !== pin.id).slice(0, 3);

  return (
    <Shell>
      <div className="grid items-start gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <img src={pinSrc(pin.id)} alt={pin.title} className="w-full bg-paper-2" />
        </div>
        <aside className="lg:sticky lg:top-24 lg:col-span-4 lg:col-start-9">
          <Link to="/" className="text-sm text-muted hover:text-ink">
            Index
          </Link>
          {character ? (
            <Link
              to="/c/$handle"
              params={{ handle: character.handle }}
              className="mt-6 block font-serif text-5xl tracking-tight"
            >
              {character.name}
            </Link>
          ) : null}
          <h1 className="mt-2 text-lg">{pin.title}</h1>
          <p className="mt-4 max-w-prose text-pretty leading-relaxed text-muted">{pin.caption}</p>
          <p className="mt-6 text-xs tracking-widest text-faint uppercase">Press still · {pin.credit}</p>
          <button
            type="button"
            aria-pressed={saved}
            onClick={() => toggle(pin.id)}
            className="mt-8 inline-flex h-11 items-center gap-2 border border-ink px-5 text-sm"
          >
            <Bookmark className={saved ? "fill-ink" : undefined} strokeWidth={1.5} size={16} />
            {saved ? "Saved" : "Save still"}
          </button>
          {more.length > 0 && character ? (
            <div className="mt-12">
              <p className="text-xs tracking-widest text-muted uppercase">More from {character.name}</p>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {more.map((item) => (
                  <Link key={item.id} to="/pin/$id" params={{ id: item.id }} className="block">
                    <img src={pinSrc(item.id)} alt={item.title} className="w-full bg-paper-2" />
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </aside>
      </div>
    </Shell>
  );
}
