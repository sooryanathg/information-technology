import Image from "next/image";
import {cards, categories, sections} from "./data/gear";

export default function HeroSection() {
  return (
  <div className="w-full">
    <section className="relative h-dvh w-full">
      <Image
        src="/events/heroevents.webp"
        alt="IT Department building"
        fill
        priority
        className="object-cover object-center"
      />
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="flex flex-col items-center gap-8">

          <p className="max-w-7xl text-left text-[64px] font-semibold bg-gradient-to-b from-[#BABABA] to-[#FFFFFF] bg-clip-text text-transparent">
            Explore, learn and grow exciting events
            organised by the department of IT
          </p>

          <div className="flex gap-40 h-14 ">
            <button className=" rounded-[15px] border-3 border-white bg-white px-15 py-3 text-[24px] font-semibold text-blue-900 transition-colors hover:bg-gray-200 text-center -mt-2">
              Explore Events
            </button>

            <button className="rounded-[15px] border-3 border-[#133D65] bg-transparent px-15 py-3 text-[24px] font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10 text-center -mt-2">
              View Past Events
            </button>
          </div>
        </div>
      </div>
    </section>

    <section className="w-full min-h-screen items-center justify-center gap-8 py-20 bg-white">
      <div className="relative z-20 mx-auto -mt-32 w-[90vw] md:w-[60vw]">
        <div className="grid grid-cols-2 md:grid-cols-4 shadow-xl">
             {categories.map((category) => (
              <div 
                key={category.title}
                className={`flex flex-col items-center justify-center py-14 text-white transition-colors cursor-pointer ${category.bg} ${category.hover}`}
              >
                <Image
                  src={category.image}
                  alt={category.title}
                  width={75}
                  height={75}
                />
                <h3 className="text-xl md:text-2xl font-bold mt-4">{category.title}</h3>
              </div>
            ))}
          </div>
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-10">
            {sections.map((section) => (
              <div 
                key={section.title}
                className={`relative w-full flex items-center justify-center rounded-[15px] py-2 text-black cursor-pointer ${section.bg} ${section.hover}`}
              >
                <h3 className="text-lg md:text-xl">{section.title}</h3>
              </div>
            ))}
          </div>
        </div>


        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1200px] px-6 mx-auto">
            {cards.map((card) => (
              <div key={card.id} className="bg-gradient-to-b from-[#e4e9f0] to-[#f4f6f9] overflow-hidden flex flex-col rounded-[2rem] shadow-lg">
                <div className="h-52 bg-[#CFD6DF] relative">
                  <div className="absolute top-6 left-6 bg-white/70 backdrop-blur-md text-[#153252] px-5 py-1.5 rounded-full text-sm font-semibold">
                    {card.tag}
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-[24px] font-black text-[#153252] mb-3">{card.title}</h3>
                  <h4 className="text-slate-600 text-sm leading-relaxed mb-6">
                    {card.description}
                  </h4>
                  <div className="flex items-center text-slate-600 text-sm mb-5">
                    <Image 
                      src={card.clock}
                      alt="Clock"
                      width={20}
                      height={20}
                    />
                    <span className="ml-2 font-medium">{card.time}</span>
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full overflow-hidden flex items-center justify-center text-white">
                        <Image 
                          src={card.pfp}
                          alt="Profile Picture"
                          width={80}
                          height={80}
                          className="object-cover"
                        />
                      </div>
                      <span className="font-bold text-[#153252]">{card.org}</span>
                    </div>
                    
                    <button className="border-[2px] border-[#153252] text-[#153252] px-5 py-1.5 rounded-full text-sm font-bold hover:bg-[#153252] hover:text-white transition-colors tracking-wide">
                      REGISTER
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </section>
        
        <section className="relative min-h-screen w-full bg-white">
          <div className="flex flex-col items-center justify-center ">
            <button className=" rounded-[15px] border-3 border-[#1d426a] bg-[#1d426a] px-15 py-3 text-[24px] font-semibold text-white transition-colors hover:bg-[#245080] text-center -mt-2 cursor-pointer">
              Explore All
            </button>
          </div>
        </section>

  </div>


  );
}