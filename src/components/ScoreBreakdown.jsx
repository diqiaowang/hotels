const labels = {
  design: 'Design',
  location: 'Location',
  sleep: 'Sleep',
  foodCafe: 'Food/Cafe',
  soloFriendly: 'Solo Friendly'
}

export default function ScoreBreakdown({ scores }) {
  return (
    <div className="space-y-2">
      {Object.entries(labels).map(([key, label]) => (
        <div key={key} className="grid grid-cols-[7rem_1fr_2rem] items-center gap-3 text-xs">
          <span className="font-medium uppercase tracking-[0.16em] text-stone-500">{label}</span>
          <div className="h-1.5 overflow-hidden rounded-full bg-stone-200">
            <div
              className="h-full rounded-full bg-stone-800"
              style={{ width: `${scores[key]}%` }}
            />
          </div>
          <span className="text-right font-semibold text-stone-800">{scores[key]}</span>
        </div>
      ))}
    </div>
  )
}
