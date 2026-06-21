import { useState } from 'react'
import HotelCard from './components/HotelCard'
import SearchBar from './components/SearchBar'
import { hotels } from './data/hotels'

function hotelMatchesSearch(hotel, query) {
  const normalizedQuery = query.trim().toLowerCase()

  if (!normalizedQuery) return true

  const searchableText = [
    hotel.name,
    hotel.city,
    hotel.country,
    hotel.note,
    hotel.detail,
    ...hotel.vibeTags,
    ...hotel.bestFor
  ]
    .join(' ')
    .toLowerCase()

  return searchableText.includes(normalizedQuery)
}

export default function App() {
  const [query, setQuery] = useState('')
  const [openHotelId, setOpenHotelId] = useState(null)
  const filteredHotels = hotels.filter((hotel) => hotelMatchesSearch(hotel, query))

  return (
    <main className="min-h-screen bg-[#f4eadc] text-stone-900">
      <div className="mx-auto max-w-6xl px-5 py-8 md:px-8 md:py-12">
        <section className="rounded-[2.25rem] border border-stone-300/70 bg-[#fff8ec]/70 p-6 shadow-[0_30px_90px_-60px_rgba(68,64,60,0.9)] md:p-10">
          <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-stone-500">
                Hotel Atlas
              </p>
              <h1 className="mt-5 max-w-3xl font-serif text-5xl leading-[0.92] tracking-tight md:text-7xl">
                A flashcard atlas for hotels you want to remember.
              </h1>
            </div>

            <div className="space-y-5">
              <p className="text-base leading-7 text-stone-600">
                Search by destination, feeling, or use case. Each card is a compact memory:
                score, vibe, best-for notes, and the small detail that made the stay linger.
              </p>
              <SearchBar value={query} onChange={setQuery} />
            </div>
          </div>
        </section>

        <section className="mt-8 flex flex-wrap items-center justify-between gap-3 border-b border-stone-300/70 pb-5 text-sm text-stone-500">
          <p>
            <span className="font-semibold text-stone-800">{filteredHotels.length}</span> atlas
            cards found
          </p>
          <p className="font-serif italic">Boutique notes, not booking advice.</p>
        </section>

        {filteredHotels.length > 0 ? (
          <section className="mt-8 grid gap-7 lg:grid-cols-2">
            {filteredHotels.map((hotel) => (
              <HotelCard
                key={hotel.id}
                hotel={hotel}
                isExpanded={openHotelId === hotel.id}
                onToggle={() =>
                  setOpenHotelId((currentId) => (currentId === hotel.id ? null : hotel.id))
                }
              />
            ))}
          </section>
        ) : (
          <section className="mt-10 rounded-[2rem] border border-dashed border-stone-300 bg-white/50 p-10 text-center shadow-[0_24px_70px_-55px_rgba(68,64,60,0.85)]">
            <p className="font-serif text-3xl text-stone-800">No matching hotel cards.</p>
            <p className="mt-2 text-stone-500">
              Try searching for “Italy”, “solo”, “coastal”, “Tokyo”, or “design”.
            </p>
          </section>
        )}
      </div>
    </main>
  )
}
