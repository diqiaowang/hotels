import ScoreBreakdown from './ScoreBreakdown'

export default function HotelCard({ hotel, isExpanded, onToggle }) {
  return (
    <article className="overflow-hidden rounded-[2rem] border border-stone-200 bg-[#fffaf2] shadow-[0_28px_80px_-46px_rgba(41,37,36,0.8)] transition hover:-translate-y-1 hover:shadow-[0_32px_90px_-48px_rgba(41,37,36,0.9)]">
      <button onClick={onToggle} className="block w-full text-left" aria-expanded={isExpanded}>
        <div className="relative h-64 overflow-hidden">
          <img src={hotel.image} alt={hotel.name} className="h-full w-full object-cover transition duration-500 hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/55 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4 text-white">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-white/75">
                {hotel.city}, {hotel.country}
              </p>
              <h2 className="mt-1 font-serif text-3xl leading-none">{hotel.name}</h2>
            </div>
            <div className="rounded-full bg-white/90 px-4 py-2 text-center text-stone-900 shadow-sm">
              <p className="text-[0.6rem] uppercase tracking-[0.18em] text-stone-500">Atlas</p>
              <p className="font-serif text-2xl leading-none">{hotel.atlasScore}</p>
            </div>
          </div>
        </div>
      </button>

      <div className="space-y-5 p-5">
        <div className="flex flex-wrap gap-2">
          {hotel.vibeTags.map((tag) => (
            <span key={tag} className="rounded-full border border-stone-200 bg-white/70 px-3 py-1 text-xs text-stone-600">
              {tag}
            </span>
          ))}
        </div>

        <div>
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-stone-400">
            Best for
          </p>
          <p className="mt-1 text-sm text-stone-700">{hotel.bestFor.join(' · ')}</p>
        </div>

        <ScoreBreakdown scores={hotel.scores} />

        <p className="border-l border-stone-300 pl-4 font-serif text-lg leading-relaxed text-stone-700">
          “{hotel.note}”
        </p>

        {isExpanded && (
          <div className="rounded-3xl bg-white/65 p-4 text-sm leading-6 text-stone-600">
            <p className="mb-2 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-stone-400">
              Field note
            </p>
            <p>{hotel.detail}</p>
          </div>
        )}

        <button
          onClick={onToggle}
          className="font-serif text-sm italic text-stone-500 underline decoration-stone-300 underline-offset-4 hover:text-stone-900"
        >
          {isExpanded ? 'Close note' : 'Open hotel note'}
        </button>
      </div>
    </article>
  )
}
