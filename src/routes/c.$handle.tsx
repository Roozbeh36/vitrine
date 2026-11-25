import { Link, createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/shell";
import { getCharacter, pinSrc, pinsFor } from "@/data/catalog";

export const Route = createFileRoute("/c/$handle")({
  head: ({ params }) => {
    const character = getCharacter(params.handle);
    return {
      meta: [{ title: character ? `${character.name} — Vitrine` : "Vitrine" }],
    };
  },
  component: ProfilePage,
});

function ProfilePage() {
  const { handle } = Route.useParams();
  const character = getCharacter(handle);

  if (!character) {
    return (
      <Shell>
        <p className="font-serif text-4xl tracking-tight">No such character.</p>
        <Link to="/characters" className="mt-6 inline-flex h-11 items-center text-sm underline">
          All characters
        </Link>
      </Shell>
    );
  }

  const stills = pinsFor(character.handle);
  const facts = [
    ["Studio", character.studio],
    ["Made by", character.makers],
    ["Since", character.since],
    ["Base", character.city],
    ["Practice", character.role],
    ["Handle", character.instagram],
  ];

  return (
    <Shell>
      <p className="text-xs tracking-widest text-muted uppercase">
        <Link to="/characters" className="hover:text-ink">
          Characters
        </Link>
        <span className="px-2 text-faint">/</span>
        {character.city}
      </p>
      <div className="mt-6 grid items-start gap-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <img
            src={pinSrc(character.portraitId)}
            alt={`${character.name} portrait`}
            className="w-full bg-paper-2"
          />
        </div>
        <div className="lg:col-span-6 lg:col-start-7 lg:pt-4">
          <h1 className="font-serif text-5xl tracking-tight text-balance md:text-6xl">{character.name}</h1>
          <p className="mt-5 max-w-prose text-pretty leading-relaxed">{character.bio}</p>
          <dl className="mt-10 border-t border-line">
            {facts.map(([label, value]) => (
              <div key={label} className="grid grid-cols-3 gap-4 border-b border-line py-3 text-sm">
                <dt className="text-muted">{label}</dt>
                <dd className="col-span-2">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <section className="mt-16">
        <div className="mb-5 flex items-baseline justify-between">
          <h2 className="font-serif text-3xl tracking-tight">Stills</h2>
          <p className="text-sm text-muted tabular-nums">{stills.length}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {stills.map((pin) => (
            <Link
              key={pin.id}
              to="/pin/$id"
              params={{ id: pin.id }}
              className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
            >
              <img
                src={pinSrc(pin.id)}
                alt={pin.title}
                className="pin-media w-full bg-paper-2"
                loading="lazy"
              />
              <p className="mt-2 text-sm">{pin.title}</p>
            </Link>
          ))}
        </div>
      </section>
    </Shell>
  );
}
