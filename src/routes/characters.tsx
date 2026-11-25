import { Link, createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/shell";
import { characters, pinSrc } from "@/data/catalog";

export const Route = createFileRoute("/characters")({
  head: () => ({
    meta: [{ title: "Characters — Vitrine" }],
  }),
  component: CharactersPage,
});

function CharactersPage() {
  return (
    <Shell>
      <h1 className="font-serif text-4xl tracking-tight md:text-5xl">Characters</h1>
      <p className="mt-2 max-w-md text-sm text-pretty text-muted">
        Three houses. A human studio behind each one.
      </p>
      <ol className="mt-8 border-t border-line">
        {characters.map((character, index) => (
          <li key={character.handle} className="border-b border-line">
            <Link
              to="/c/$handle"
              params={{ handle: character.handle }}
              className="grid gap-5 py-8 md:grid-cols-12 md:items-center md:gap-8"
            >
              <div className="md:col-span-5">
                <img
                  src={pinSrc(character.portraitId)}
                  alt=""
                  className="w-full bg-paper-2"
                />
              </div>
              <div className="md:col-span-6 md:col-start-7">
                <p className="text-xs tracking-widest text-muted uppercase tabular-nums">
                  0{index + 1}
                </p>
                <h2 className="mt-2 font-serif text-5xl tracking-tight">{character.name}</h2>
                <p className="mt-3 max-w-md text-sm text-pretty text-muted">
                  {character.role}. {character.studio}, {character.city}.
                </p>
                <p className="mt-6 text-sm">View profile</p>
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </Shell>
  );
}
