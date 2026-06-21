import { useMemo, useState } from 'react'
import HotelCard from './components/HotelCard'
import SearchBar from './components/SearchBar'
import { hotels } from './data/hotels'

export default function App() {
  const [query, setQuery] = useState('')
  const [expandedHotelId, setExpandedHotelId] = useState(hotels[0].id)

  const visibleHotels = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    if (!normalizedQuery) return hotels

    return hotels.filter((hotel) => {
      const searchableText = [
        hotel.name,
        hotel.city,
        hotel.country,
        hotel.note,
        ...hotel.vibeTags,
        ...hotel.bestFor
      ]
        .join(' ')
        .toLowerCase()

      return searchableText.includes(normalizedQuery)
    })
  }, [query])

  return (
    <main className="min-h-screen bg-[#f5efe4] text-stone-900">
      <section className="mx-auto max-w-6xl px-5 py-10 md:px-8 md:py-14">
        <header className="grid gap-8 border-b border-stone-300/70 pb-10 md:grid-cols-[1.05fr_0.95fr] md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-stone-500">
              Hotel Atlas
            </p>
            <h1 className="mt-5 max-w-3xl font-serif text-5xl leading-[0.95] text-stone-950 md:text-7xl">
              Flashcards for places worth remembering.
            </h1>
          </div>
          <div className="space-y-5">
            <p className="max-w-xl text-base leading-7 text-stone-600">
              A personal hotel atlas for taste, memory, and travel identity. Search by place,
              feeling, or occasion, then open a card like a note from a boutique travel booklet.
            </p>
            <SearchBar value={query} onChange={setQuery} />
          </div>
        </header>

        <div className="mt-8 flex items-center justify-between text-sm text-stone-500">
          <p>
            Showing <span className="font-medium text-stone-800">{visibleHotels.length}</span> of{' '}
            {hotels.length} hotels
          </p>
          <p className="hidden font-serif italic md:block">Collected by how each place felt.</p>
        </div>

        <section className="mt-8 grid gap-7 lg:grid-cols-2">
          {visibleHotels.map((hotel) => (
            <HotelCard
              key={hotel.id}
              hotel={hotel}
              isExpanded={expandedHotelId === hotel.id}
              onToggle={() =>
                setExpandedHotelId((currentId) => (currentId === hotel.id ? null : hotel.id))
              }
            />
          ))}
        </section>

        {visibleHotels.length === 0 && (
          <section className="mt-10 rounded-[2rem] border border-dashed border-stone-300 bg-white/45 p-10 text-center">
            <p className="font-serif text-3xl text-stone-800">No atlas cards found.</p>
            <p className="mt-2 text-stone-500">Try a softer search like “Italy”, “solo”, or “coastal”.</p>
          </section>
        )}
      </section>
    </main>
  )
}
