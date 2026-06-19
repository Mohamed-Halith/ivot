import type { Metadata } from "next";
import { DuaBlock } from "@/components/dua/DuaBlock";
import { getAllDuaCollections } from "@/sanity/queries/duas";

export const metadata: Metadata = {
  title: "Duas",
  description:
    "A collection of duas from the Qur'an and Sunnah with Tamil meaning and transliteration.",
};

export default async function DuasPage() {
  const collections = await getAllDuaCollections();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-2xl">
        <div className="mb-10 space-y-2">
          <h1 className="text-foreground text-3xl font-bold">Duas / துஆக்கள்</h1>
          <p className="text-muted-foreground">
            Supplications from the Qur&apos;an and Sunnah with Tamil meaning.
          </p>
        </div>

        {collections.length === 0 ? (
          <div className="text-muted-foreground py-20 text-center">
            <p className="mb-3 text-4xl">🤲</p>
            <p>Duas are being added — check back soon.</p>
          </div>
        ) : (
          <div className="space-y-14">
            {collections.map((collection) => (
              <section key={collection._id} className="space-y-5">
                <div>
                  <h2 className="text-foreground text-xl font-semibold">{collection.title}</h2>
                  {collection.description && (
                    <p className="text-muted-foreground mt-1 text-sm">{collection.description}</p>
                  )}
                </div>

                <div className="space-y-4">
                  {collection.duas.map((dua, i) => (
                    <DuaBlock
                      key={i}
                      label={(dua as { label?: string }).label}
                      arabic={dua.arabic}
                      transliteration={dua.transliteration}
                      tamil={dua.tamil}
                      english={dua.english}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
