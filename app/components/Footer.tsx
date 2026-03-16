export function Footer() {
  return (
    <footer className="bg-grow-blue border-t border-white/10 page-container py-12 flex flex-col md:flex-row justify-between items-center gap-6 sm:gap-8" style={{ position: 'relative', zIndex: 10 }}>
      <div className="flex flex-col items-center md:items-start gap-4">
        <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9]">
          <span className="text-grow-yellow">SAMIA</span> FUTURE
        </h1>
        <p className="text-[10px] uppercase font-bold tracking-widest opacity-40">
          © Copyright Samia Future 2026
        </p>
        <p className="text-[10px] uppercase font-bold tracking-widest opacity-60">
          317 Runda Grove, Runda, Nairobi, Kenya.
        </p>
      </div>
      <div className="flex gap-8 text-[10px] uppercase font-bold tracking-widest opacity-60">
        <a href="#" className="hover:text-white transition-colors">Updates / News</a>
        <a href="#" className="hover:text-white transition-colors">Privacy & Legal</a>
        <a href="#" className="hover:text-white transition-colors">Social Media</a>
      </div>
    </footer>
  );
}
