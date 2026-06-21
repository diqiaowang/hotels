export default function SearchBar({ value, onChange }) {
  return (
    <label className="block rounded-[2rem] border border-stone-200 bg-white/80 px-5 py-4 shadow-[0_22px_60px_-38px_rgba(41,37,36,0.65)] backdrop-blur">
      <span className="mb-2 block text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-stone-400">
        Search the atlas
      </span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Try Tokyo, coastal, solo, design..."
        className="w-full bg-transparent font-serif text-2xl text-stone-900 outline-none placeholder:text-stone-300"
      />
    </label>
  )
}
