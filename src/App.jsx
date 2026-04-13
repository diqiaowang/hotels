import { useMemo, useState } from 'react'

const hotels = [
  {
    id: 1,
    name: 'Aman Tokyo',
    city: 'Tokyo',
    country: 'Japan',
    neighborhood: 'Otemachi',
    image:
      'https://images.unsplash.com/photo-1529290130-4ca3753253ae?auto=format&fit=crop&w=1600&q=80',
    priceTier: '$$$$',
    collection: 'Stayed',
    scores: { sleep: 95, design: 97, service: 96, food: 89, location: 90 },
    vibeTags: ['minimalist', 'zen', 'old money'],
    bestFor: ['solo trip', 'anniversary'],
    standoutNote: 'Silence and skyline views that recalibrate your nervous system overnight.',
    personalNote:
      'Best bathtub view I have ever had. Felt choreographed but still deeply restful.',
    wouldReturn: true
  },
  {
    id: 2,
    name: 'Il Pellicano',
    city: 'Porto Ercole',
    country: 'Italy',
    neighborhood: 'Monte Argentario Coast',
    image:
      'https://images.unsplash.com/photo-1535827841776-24afc1e255ac?auto=format&fit=crop&w=1600&q=80',
    priceTier: '$$$$',
    collection: 'Favorites',
    scores: { sleep: 88, design: 94, service: 92, food: 95, location: 93 },
    vibeTags: ['romantic', 'vintage glam', 'coastal'],
    bestFor: ['girls trip', 'anniversary'],
    standoutNote: 'Golden-hour terraces and old-school service that make every dinner cinematic.',
    personalNote: 'Most memorable aperitivo ritual; the staff somehow knew our pace by day two.',
    wouldReturn: true
  },
  {
    id: 3,
    name: 'The Lost Poet',
    city: 'London',
    country: 'United Kingdom',
    neighborhood: 'Shoreditch',
    image:
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=80',
    priceTier: '$$$',
    collection: 'Stayed',
    scores: { sleep: 81, design: 90, service: 84, food: 78, location: 91 },
    vibeTags: ['editorial', 'moody', 'creative'],
    bestFor: ['work trip', 'solo trip'],
    standoutNote: 'A townhouse that feels like sleeping inside an indie magazine spread.',
    personalNote: 'Loved the library lounge for late-night writing, but breakfast was average.',
    wouldReturn: true
  },
  {
    id: 4,
    name: 'Moxy Pompeii',
    city: 'Pompeii',
    country: 'Italy',
    neighborhood: 'Gateway District',
    image:
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1600&q=80',
    priceTier: '$$',
    collection: 'Want to go',
    scores: { sleep: 79, design: 82, service: 80, food: 76, location: 88 },
    vibeTags: ['efficient', 'playful', 'weekend'],
    bestFor: ['friends trip', 'quick getaway'],
    standoutNote: 'A practical launchpad with youthful energy minutes from ancient history.',
    personalNote: 'On my list for a Naples + ruins weekend; not luxurious, but perfectly placed.',
    wouldReturn: false
  },
  {
    id: 5,
    name: 'Borgo Santandrea',
    city: 'Amalfi',
    country: 'Italy',
    neighborhood: 'Conca dei Marini',
    image:
      'https://images.unsplash.com/photo-1519821172141-b5d8d0b8167c?auto=format&fit=crop&w=1600&q=80',
    priceTier: '$$$$',
    collection: 'Favorites',
    scores: { sleep: 91, design: 96, service: 90, food: 92, location: 94 },
    vibeTags: ['design forward', 'romantic', 'mediterranean'],
    bestFor: ['anniversary', 'slow travel'],
    standoutNote: 'Cliffside geometry and sea tones that feel both retro and future-classic.',
    personalNote: 'Every corner looked art-directed, but it still felt warm and lived-in.',
    wouldReturn: true
  },
  {
    id: 6,
    name: 'Habitas AlUla',
    city: 'AlUla',
    country: 'Saudi Arabia',
    neighborhood: 'Ashar Valley',
    image:
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=80',
    priceTier: '$$$',
    collection: 'Want to go',
    scores: { sleep: 87, design: 91, service: 86, food: 83, location: 95 },
    vibeTags: ['earthy', 'adventure', 'wellness'],
    bestFor: ['solo trip', 'reset retreat'],
    standoutNote: 'Desert stillness and cinematic landscapes make every morning feel mythic.',
    personalNote: 'Dreaming of this for a decompression trip with no agenda but sunrise walks.',
    wouldReturn: true
  }
]

const scoreToMood = {
  overall: 'Overall',
  design: 'Design',
  sleep: 'Sleep',
  food: 'Food'
}

function getOverall(scores) {
  return Math.round(
    (scores.sleep + scores.design + scores.service + scores.food + scores.location) / 5
  )
}

function compareTaste(hotelA, hotelB) {
  const scoreA = getOverall(hotelA.scores) + (hotelA.wouldReturn ? 2 : 0)
  const scoreB = getOverall(hotelB.scores) + (hotelB.wouldReturn ? 2 : 0)
  if (scoreA === scoreB) return 'Too close — both fit your taste profile.'
  return scoreA > scoreB
    ? `${hotelA.name} edges out ${hotelB.name} for your current taste.`
    : `${hotelB.name} edges out ${hotelA.name} for your current taste.`
}

export default function App() {
  const [search, setSearch] = useState('')
  const [vibe, setVibe] = useState('All vibes')
  const [city, setCity] = useState('All cities')
  const [tier, setTier] = useState('All tiers')
  const [sortBy, setSortBy] = useState('overall')
  const [collection, setCollection] = useState('All')
  const [compareA, setCompareA] = useState(hotels[0].id)
  const [compareB, setCompareB] = useState(hotels[1].id)

  const vibes = ['All vibes', ...new Set(hotels.flatMap((hotel) => hotel.vibeTags))]
  const cities = ['All cities', ...new Set(hotels.map((hotel) => hotel.city))]
  const tiers = ['All tiers', ...new Set(hotels.map((hotel) => hotel.priceTier))]

  const filteredHotels = useMemo(() => {
    return hotels
      .filter((hotel) => {
        const target = `${hotel.name} ${hotel.city} ${hotel.vibeTags.join(' ')}`.toLowerCase()
        const matchesSearch = target.includes(search.toLowerCase())
        const matchesVibe = vibe === 'All vibes' || hotel.vibeTags.includes(vibe)
        const matchesCity = city === 'All cities' || hotel.city === city
        const matchesTier = tier === 'All tiers' || hotel.priceTier === tier
        const matchesCollection = collection === 'All' || hotel.collection === collection
        return matchesSearch && matchesVibe && matchesCity && matchesTier && matchesCollection
      })
      .sort((a, b) => {
        if (sortBy === 'overall') return getOverall(b.scores) - getOverall(a.scores)
        return b.scores[sortBy] - a.scores[sortBy]
      })
  }, [search, vibe, city, tier, sortBy, collection])

  const stats = useMemo(() => {
    const total = hotels.length
    const avgScore = Math.round(hotels.reduce((sum, h) => sum + getOverall(h.scores), 0) / total)
    const cityCounts = hotels.reduce((acc, hotel) => {
      acc[hotel.city] = (acc[hotel.city] || 0) + 1
      return acc
    }, {})
    const topCity = Object.entries(cityCounts).sort((a, b) => b[1] - a[1])[0]

    return {
      total,
      avgScore,
      topCity: topCity ? `${topCity[0]} (${topCity[1]})` : 'n/a',
      stayed: hotels.filter((hotel) => hotel.collection === 'Stayed').length,
      favorites: hotels.filter((hotel) => hotel.collection === 'Favorites').length,
      wantToGo: hotels.filter((hotel) => hotel.collection === 'Want to go').length
    }
  }, [])

  const hotelA = hotels.find((hotel) => hotel.id === Number(compareA))
  const hotelB = hotels.find((hotel) => hotel.id === Number(compareB))

  return (
    <main className="min-h-screen bg-gradient-to-b from-stone-100 via-stone-50 to-amber-50 px-6 py-10 text-stone-800 md:px-10">
      <section className="mx-auto max-w-7xl space-y-8">
        <header className="space-y-3">
          <p className="text-xs uppercase tracking-[0.3em] text-stone-500">Hotel Atlas</p>
          <h1 className="max-w-2xl font-serif text-4xl leading-tight md:text-6xl">
            A personal archive of places that shaped your travel taste.
          </h1>
          <p className="max-w-3xl text-stone-600">
            Remember how each hotel felt — not just where you slept. Curate by vibe, scenario, and
            memory so your future trips align with your identity.
          </p>
        </header>

        <section className="grid gap-3 rounded-2xl bg-white/70 p-4 shadow-editorial backdrop-blur md:grid-cols-6">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search name, city, vibe"
            className="col-span-2 rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-sm outline-none ring-amber-200 placeholder:text-stone-400 focus:ring"
          />

          <select
            value={vibe}
            onChange={(event) => setVibe(event.target.value)}
            className="rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-sm outline-none focus:ring"
          >
            {vibes.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <select
            value={city}
            onChange={(event) => setCity(event.target.value)}
            className="rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-sm outline-none focus:ring"
          >
            {cities.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <select
            value={tier}
            onChange={(event) => setTier(event.target.value)}
            className="rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-sm outline-none focus:ring"
          >
            {tiers.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            className="rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-sm outline-none focus:ring"
          >
            {Object.entries(scoreToMood).map(([value, label]) => (
              <option key={value} value={value}>
                Sort: {label}
              </option>
            ))}
          </select>
        </section>

        <section className="grid gap-4 md:grid-cols-5">
          {[
            ['Total saved', stats.total],
            ['Average score', stats.avgScore],
            ['Top city', stats.topCity],
            ['Stayed', stats.stayed],
            ['Favorites', stats.favorites]
          ].map(([label, value]) => (
            <article key={label} className="rounded-2xl border border-stone-200 bg-white/80 p-4 shadow-sm">
              <p className="text-xs uppercase tracking-[0.2em] text-stone-500">{label}</p>
              <p className="mt-2 font-serif text-2xl">{value}</p>
            </article>
          ))}
        </section>

        <section className="rounded-2xl bg-white/75 p-4 shadow-editorial">
          <div className="mb-4 flex flex-wrap gap-2">
            {['All', 'Stayed', 'Want to go', 'Favorites'].map((bucket) => (
              <button
                key={bucket}
                onClick={() => setCollection(bucket)}
                className={`rounded-full px-4 py-1.5 text-sm transition ${
                  collection === bucket
                    ? 'bg-stone-900 text-white'
                    : 'bg-stone-200/60 text-stone-700 hover:bg-stone-300/70'
                }`}
              >
                {bucket}
              </button>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredHotels.map((hotel) => (
              <article
                key={hotel.id}
                className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-editorial"
              >
                <img src={hotel.image} alt={hotel.name} className="h-56 w-full object-cover" />
                <div className="space-y-3 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="font-serif text-2xl">{hotel.name}</h2>
                      <p className="text-sm text-stone-500">
                        {hotel.neighborhood} · {hotel.city}, {hotel.country}
                      </p>
                    </div>
                    <span className="rounded-full bg-stone-900 px-3 py-1 text-xs text-white">
                      {hotel.priceTier}
                    </span>
                  </div>

                  <p className="text-sm text-stone-700">{hotel.standoutNote}</p>
                  <p className="text-xs italic text-stone-500">{hotel.personalNote}</p>

                  <div className="flex flex-wrap gap-2">
                    {hotel.vibeTags.map((tag) => (
                      <span key={tag} className="rounded-full bg-amber-100 px-2.5 py-1 text-xs text-amber-800">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <ScoreBadge label="Overall" value={getOverall(hotel.scores)} />
                    <ScoreBadge label="Sleep" value={hotel.scores.sleep} />
                    <ScoreBadge label="Design" value={hotel.scores.design} />
                    <ScoreBadge label="Service" value={hotel.scores.service} />
                    <ScoreBadge label="Food" value={hotel.scores.food} />
                    <ScoreBadge label="Location" value={hotel.scores.location} />
                  </div>

                  <div className="flex items-center justify-between text-xs text-stone-500">
                    <span>Best for: {hotel.bestFor.join(', ')}</span>
                    <span>{hotel.wouldReturn ? 'Would return' : 'One-time stay'}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-editorial">
          <h3 className="font-serif text-2xl">Taste Duel (A vs B)</h3>
          <p className="mb-4 mt-1 text-sm text-stone-500">
            Quick comparison to pressure-test your preferences before planning a trip.
          </p>
          <div className="grid gap-3 md:grid-cols-3">
            <select
              value={compareA}
              onChange={(event) => setCompareA(event.target.value)}
              className="rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-sm"
            >
              {hotels.map((hotel) => (
                <option key={hotel.id} value={hotel.id}>
                  {hotel.name}
                </option>
              ))}
            </select>
            <select
              value={compareB}
              onChange={(event) => setCompareB(event.target.value)}
              className="rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-sm"
            >
              {hotels.map((hotel) => (
                <option key={hotel.id} value={hotel.id}>
                  {hotel.name}
                </option>
              ))}
            </select>
            <div className="rounded-xl bg-stone-900 px-4 py-2 text-sm text-white">
              {hotelA && hotelB ? compareTaste(hotelA, hotelB) : 'Pick two hotels to compare.'}
            </div>
          </div>
        </section>
      </section>
    </main>
  )
}

function ScoreBadge({ label, value }) {
  return (
    <div className="rounded-xl bg-stone-100 p-2 text-center">
      <p className="text-[10px] uppercase tracking-wide text-stone-500">{label}</p>
      <p className="font-medium text-stone-800">{value}</p>
    </div>
  )
}
