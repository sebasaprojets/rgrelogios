/** Faixa horizontal contínua; a lista é duplicada para o loop não ter emenda. */
export function Marquee({ items }: { items: readonly string[] }) {
  const loop = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-[#1C1917]/10 bg-white py-6 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div className="animate-marquee flex w-max items-center gap-10">
        {loop.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-10 whitespace-nowrap font-serif text-3xl text-[#1C1917]/80 md:text-4xl"
          >
            {item}
            <span className="h-1.5 w-1.5 rotate-45 bg-[#C5A059]" aria-hidden />
          </span>
        ))}
      </div>
    </div>
  );
}
