import { publishedWorks } from "@/data/research/publishedWorks"; 
import PublishedWorkCard from "./PublishedWorkCard"; 

export default function PublishedWorks() { 
  return ( 
    <section 
      className=" 
        relative w-full 
        px-6 
        pb-12 
        pt-10 
        md:px-10 
        lg:px-[40px] 
      " 
      style={{
        background: "linear-gradient(180deg, #F3E7D7 0%, #EBDEC8 50%, #E3D1BA 100%)",
      }}
    > 
      <div className="mx-auto w-full max-w-[1316px]"> 

        {/* Heading */} 
        <div className="flex items-end justify-between gap-6"> 
          <div> 
            <h2 className="text-[32px] font-bold leading-[40px] tracking-[-0.5px] text-[#171717]"> 
              Published Works 
            </h2> 

            <p className="mt-1 text-[14px] leading-[22px] text-[#6B5E52]"> 
              Recent contributions to global academic journals. 
            </p> 
          </div> 

          <button 
            type="button" 
            className="mb-1 shrink-0 text-[14px] font-medium text-[#4A3A2D] transition-opacity hover:opacity-60" 
          > 
            View All Publications → 
          </button> 
        </div> 

        {/* Publication Cards */} 
        <div className="mt-6 flex flex-col gap-4"> 
          {publishedWorks.map((work) => ( 
            <PublishedWorkCard 
              key={work.title} 
              work={work} 
            /> 
          ))} 
        </div> 

      </div> 
    </section> 
  ); 
}