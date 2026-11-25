import { Link } from "@tanstack/react-router";
import { Bookmark } from "lucide-react";
import { getCharacter, pinSrc, type Pin } from "@/data/catalog";
import { useSaves } from "@/lib/saves";

export function Board({ pins }: { pins: Pin[] }) {
  return (
    <div className="board">
      {pins.map((pin, index) => (
        <PinCard key={pin.id} pin={pin} eager={index < 4} />
      ))}
    </div>
  );
}

export function PinCard({ pin, eager = false }: { pin: Pin; eager?: boolean }) {
  const character = getCharacter(pin.character);
  const saved = useSaves((state) => state.ids.includes(pin.id));
  const toggle = useSaves((state) => state.toggle);

  return (
    <article className="board-item">
      <Link
        to="/pin/$id"
        params={{ id: pin.id }}
        className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
      >
        <img
          src={pinSrc(pin.id)}
          alt={`${pin.title}, ${character?.name ?? ""}`}
          className="pin-media block w-full bg-paper-2"
          loading={eager ? "eager" : "lazy"}
          decoding="async"
        />
      </Link>
      <div className="mt-2 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <Link
            to="/c/$handle"
            params={{ handle: pin.character }}
            className="text-xs tracking-widest text-muted uppercase"
          >
            {character?.name}
          </Link>
          <p className="text-sm leading-snug text-pretty">{pin.title}</p>
        </div>
        <button
          type="button"
          aria-pressed={saved}
          aria-label={saved ? `Unsave ${pin.title}` : `Save ${pin.title}`}
          onClick={() => toggle(pin.id)}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center text-ink"
        >
          <Bookmark className={saved ? "fill-ink" : undefined} strokeWidth={1.5} size={18} />
        </button>
      </div>
    </article>
  );
}
