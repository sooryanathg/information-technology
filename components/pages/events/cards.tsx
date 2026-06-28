import Image from "next/image";
import {cards, categories, sections} from "./data/gear";

export default function Cards() {
  return (
    <div className="w-full bg-white">
        
      <div className="relative z-20 mx-auto -mt-32 w-[90vw] xl:w-[70vw] max-w-[1300px] pb-20">
        
        {/* ROW 1: The Blue Category Boxes */}
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

        {/* ROW 2: The Grey Filter Buttons */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {sections.map((section) => (
            <div 
              key={section.title}
              className={`relative w-full flex items-center justify-center rounded-[15px] py-3 text-black cursor-pointer shadow-sm ${section.bg} ${section.hover}`}
            >
              <h3 className="text-lg md:text-xl font-medium">{section.title}</h3>
            </div>
          ))}
        </div>

        {/* ROW 3: The Event Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card) => (
            <div key={card.id} className="bg-gradient-to-b from-[#e4e9f0] to-[#f4f6f9] overflow-hidden flex flex-col rounded-[2rem] shadow-lg">
              
              {/* Top Blank Placeholder Area */}
              <div className="h-52 bg-[#CFD6DF] relative">
                <div className="absolute top-6 left-6 bg-white/70 backdrop-blur-md text-[#153252] px-5 py-1.5 rounded-full text-sm font-semibold">
                  {card.tag}
                </div>
              </div>
              
              {/* Card Content Area */}
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-[24px] font-black text-[#153252] mb-3">{card.title}</h3>
                <h4 className="text-slate-600 text-sm leading-relaxed mb-6">
                  {card.description}
                </h4>
                
                {/* Time Section */}
                <div className="flex items-center text-slate-600 text-sm mb-5">
                  <Image 
                    src={card.clock}
                    alt="Clock"
                    width={20}
                    height={20}
                  />
                  <span className="ml-2 font-medium">{card.time}</span>
                </div>
                
                {/* Footer Section */}
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full overflow-hidden flex items-center justify-center text-white bg-[#CFD6DF]">
                      <Image 
                        src={card.pfp}
                        alt="Profile Picture"
                        width={40}
                        height={40}
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

      </div>
      <div className="flex flex-col items-center justify-center pb-24">
        <button className="rounded-[15px] border-[3px] border-[#1d426a] bg-[#1d426a] px-[60px] py-3 text-[24px] font-semibold text-white transition-colors hover:bg-[#245080] text-center cursor-pointer">
          Explore All
        </button>
      </div>

    </div>
  );
}