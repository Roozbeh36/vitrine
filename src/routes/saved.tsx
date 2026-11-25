import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Board } from "@/components/board";
import { Shell } from "@/components/shell";
import { pins } from "@/data/catalog";
import { useSaves } from "@/lib/saves";

export const Route = createFileRoute("/saved")({
  head: () => ({
    meta: [{ title: "Saved — Vitrine" }],
  }),
  component: SavedPage,
});

function SavedPage() {
  const ids = useSaves((state) => state.ids);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const unsub = useSaves.persist.onFinishHydration(() => setReady(true));
    setReady(useSaves.persist.hasHydrated());
    return unsub;
  }, []);

  const saved = ids
    .map((id) => pins.find((pin) => pin.id === id))
    .filter((pin): pin is (typeof pins)[number] => Boolean(pin));

  return (
    <Shell>
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-4xl tracking-tight md:text-5xl">Saved</h1>
          <p className="mt-2 max-w-md text-sm text-pretty text-muted">
            A private board on this device. Nothing is sent anywhere.
          </p>
        </div>
        <p className="text-sm text-muted tabular-nums">{ready ? saved.length : "—"}</p>
      </div>
      {!ready ? (
        <p className="border-t border-line py-16 text-sm text-muted">Opening the board.</p>
      ) : saved.length === 0 ? (
        <div className="border-t border-line py-16">
          <p className="text-sm text-muted">Nothing saved yet.</p>
          <Link to="/" className="mt-4 inline-flex h-11 items-center text-sm underline">
            Browse the index
          </Link>
        </div>
      ) : (
        <Board pins={saved} />
      )}
    </Shell>
  );
}
