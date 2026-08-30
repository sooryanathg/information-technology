import React from 'react';
import StarDivider from '@/app/Components/StarDivider';

interface HighlightItem {
  id: string;
  renderIcon: () => React.ReactNode;
  value: string;
  label: string;
}

const highlights: HighlightItem[] = [
  {
    id: 'rate',
    renderIcon: () => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="#F4B942"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-8 h-8"
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    value: '95%',
    label: 'Placement Rate',
  },

  {
    id: 'highest',
    renderIcon: () => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="#F4B942"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-8 h-8"
      >
        <path d="M6 3h12M6 8h12M6 13l7 8M6 13h3a4.5 4.5 0 0 0 0-9" />
      </svg>
    ),
    value: '18.6LPA',
    label: 'Highest package',
  },

  {
    id: 'avg',
    renderIcon: () => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="#F4B942"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-8 h-8"
      >
        <path d="M3 20h18M6 16v4M12 10v10M18 4v16" />
      </svg>
    ),
    value: '9.2 LPA',
    label: 'Average package',
  },

  {
    id: 'companies',
    renderIcon: () => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="#F4B942"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-8 h-8"
      >
        <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
        <path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01" />
      </svg>
    ),
    value: '120+',
    label: 'Companies verified',
  },

  {
    id: 'placed',
    renderIcon: () => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="#F4B942"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-8 h-8"
      >
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
    value: '350+',
    label: 'Students placed',
  },

  {
    id: 'batch',
    renderIcon: () => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="#F4B942"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-8 h-8"
      >
        <rect width="18" height="18" x="3" y="4" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
    ),
    value: '2026-2027',
    label: 'Placement Btech',
  },
];

export default function Highlights() {
  return (
    <section className="w-full font-inter py-16 sm:py-20 lg:py-24">

      {/* ================================
          SECTION TITLE
          ================================ */}
      <div 
        className="
          w-[535px]
          h-[119px]
          mx-auto
          flex
          flex-col
          items-center
          justify-center
          gap-0
          pt-[20px]
          pr-[48px]
          pl-[48px]
          mb-8
          sm:mb-12
        "
      >

        <h2
          className="
            w-[438px]
            h-[54px]
            mx-auto
            font-poppins
            font-bold
            text-[36px]
            leading-[100%]
            tracking-[0%]
            uppercase
            text-[#1A2332]
          "
        >
          PLACEMENT HIGHLIGHTS
        </h2>

        <StarDivider />

      </div>


      {/* ================================
          HIGHLIGHT CARDS
          ================================ */}
      <div
        className="
          w-full
          max-w-7xl
          mx-auto
          px-4
          sm:px-6
          lg:px-8

          grid
          grid-cols-2
          sm:grid-cols-3
          lg:grid-cols-6

          gap-4
          sm:gap-5

          justify-items-center
        "
      >

        {highlights.map((item) => (

          <div
            key={item.id}
            className="
              bg-white
              rounded-2xl

              flex
              flex-col
              items-center
              text-center

              border
              border-gray-100/80

              shadow-[0_4px_20px_rgba(0,0,0,0.04)]

              hover:shadow-xl
              hover:-translate-y-1.5

              transition-all
              duration-300

              group

              h-[254px]
              w-full

              pt-[53px]
            "
          >

            {/* ================================
                ICON
                ================================ */}
            <div
              className="
                w-8
                h-8

                flex
                items-center
                justify-center

                mb-[66px]

                group-hover:scale-110
                transition-transform
              "
            >
              {item.renderIcon()}
            </div>


            {/* ================================
                VALUE
                ================================

                Figma properties:

                Width:       119px
                Height:      29px
                Font:        Inter
                Weight:      700
                Size:        24px
                Line height: 100%
                Alignment:   Center
                Color:       #000000
            */}
            <div
              className="
                w-[119px]
                h-[29px]

                flex
                items-center
                justify-center

                font-inter
                font-bold

                text-[24px]
                leading-[100%]
                tracking-[0%]

                text-[#000000]
                text-center

                whitespace-nowrap
              "
            >
              {item.value}
            </div>


            {/* ================================
                LABEL
                ================================

                Figma properties:

                Width:       119px
                Height:      19px
                Font:        Inter
                Weight:      400
                Size:        16px
                Line height: 100%
                Alignment:   Center
                Color:       #000000
            */}
            <div
              className="
                w-[119px]
                h-[19px]

                flex
                items-center
                justify-center

                font-inter
                font-normal

                text-[16px]
                leading-[100%]
                tracking-[0%]

                text-[#000000]
                text-center

                whitespace-nowrap

                mt-[16px]
              "
            >
              {item.label}
            </div>

          </div>

        ))}

      </div>

    </section>
  );
}