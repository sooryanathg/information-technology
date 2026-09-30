import { PublishedWork } from "@/data/research/publishedWorks"; 

interface PublishedWorkCardProps { 
  work: PublishedWork; 
} 

export default function PublishedWorkCard({ 
  work, 
}: PublishedWorkCardProps) { 
  return ( 
    <article 
      className=" 
        w-full 
        rounded-[12px] 
        border 
        border-[#EADBCE] 
        bg-[#FFFDF9] 
        px-6 
        py-5 
        shadow-[0_2px_8px_rgba(0,0,0,0.04)] 
      " 
    > 
      {/* Top Header Row */} 
      <div className="flex items-center justify-between gap-4"> 
        <span className="rounded-full bg-[#F3ECE4] px-3 py-1 text-[12px] font-medium text-[#6B5E52]"> 
          {work.category} 
        </span> 

        <span className="shrink-0 text-[13px] text-[#91867C]"> 
          {work.date} 
        </span> 
      </div> 

      {/* Title */} 
      <h3 className="mt-3 text-[18px] font-bold leading-[24px] text-[#1A1816]"> 
        {work.title} 
      </h3> 

      {/* Description */} 
      <p className="mt-2 text-[13px] leading-[20px] text-[#786E65]"> 
        {work.description} 
      </p> 

      {/* Bottom Row */} 
      <div className="mt-4 flex items-center justify-between border-t border-[#F0E6DC] pt-3 text-[13px]"> 
        <p className="text-[#6B5E52]"> 
          <span className="font-semibold text-[#29231E]">Authors:</span>{" "} 
          {work.authors} 
        </p> 

        <button 
          type="button" 
          className="shrink-0 font-bold text-[#1A1816] transition-opacity hover:opacity-70" 
        > 
          Download PDF 
        </button> 
      </div> 
    </article> 
  ); 
}