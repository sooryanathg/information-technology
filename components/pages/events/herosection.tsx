export default function HeroSection() {
  return (
    <div className="bg-zinc-50 font-sans">
    <section className="w-full h-dvh flex flex-col items-center justify-center relative overflow-hidden">
      <img
        src="/image1.png"
        alt="Description of image"
        className="absolute w-full h-full object-cover object-center inset-0"
      />
      <div className="relative z-10 flex flex-col justify-center w-full h-full">
        <nav className="absolute top-8 left-24 gap-3 px-20 py-2 rounded-full backdrop-blur-md border border-white/20 text-white font-medium bg-[#939090] flex shadow-xl opacity-60">
        <a href="/" className="hover:opacity-75 transition-opacity">
            Home
        </a>
        <span className="opacity-40 font-bold text-lg">
            {'>'}
        </span>
        <span className="text-white">
            <a href="/events">Events</a>
        </span>
        </nav>
        <div className="flex flex-col text-white text-left justify-left gap-4 px-20 py-4 -mt-64">
          <h1 className="text-6xl font-bold mb-4 underline underline-offset-8 decoration-4">EVENTS</h1>
          <p className="text-3xl max-w-2xl opacity-70">
            Explore learn and grow through exciting events organised by the IT department.
          </p>
          <div className="flex flex-wrap gap-4 mt-4">
            <button className="text-xl px-8 py-3 bg-white text-blue-900 font-semibold rounded-full hover:bg-gray-200 transition-colors shadow-lg">
              Explore Events
            </button>
            <button className="text-xl px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 backdrop-blur-sm transition-colors">
              View Past Events
            </button>
          </div>
        </div>
      </div>
      
    </section>
    </div>
  );
}