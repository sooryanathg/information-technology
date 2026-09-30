import {
  BookOpenText,
  ChartNoAxesColumnIncreasing,
  FlaskConical,
  GraduationCap,
  Rocket,
  UsersRound,
} from "lucide-react";

const stats = [
  { value: "1,250+", label: "Students", Icon: UsersRound },
  { value: "45+", label: "Courses", Icon: GraduationCap },
  { value: "120+", label: "Courses", Icon: Rocket },
  { value: "120+", label: "Labs", Icon: FlaskConical },
  { value: "50+", label: "Faculty", Icon: BookOpenText },
  {
    value: "95%",
    label: "Placement rate",
    Icon: ChartNoAxesColumnIncreasing,
  },
];

export default function StatsSection() {
  return (
    <section
      aria-label="Department statistics"
      className="bg-[#fbf7ef] px-4 py-3 sm:px-8 sm:py-6 lg:px-12 lg:py-8"
    >
      <div
        className="
          mx-auto grid max-w-[1357px] grid-cols-6 gap-1
          rounded-[6px] bg-[#5D442F] p-1.5
          sm:gap-2 sm:rounded-[12px] sm:p-2
          lg:min-h-[180px] lg:gap-3 lg:rounded-[19px] lg:p-3
        "
      >
        {stats.map(({ value, label, Icon }) => (
          <div
            key={`${value}-${label}`}
            className="
              flex min-h-[78px] flex-col
              items-center justify-center
              gap-1 rounded-[3px] bg-[#fffaf4]
              px-0.5 py-2
              text-center
              sm:min-h-[130px] sm:gap-2 sm:px-2 sm:py-4
              lg:min-h-[156px] lg:rounded-xl lg:gap-3
            "
          >
            {/* Icon */}
            <Icon
              aria-hidden="true"
              className="
                h-7 w-7
                text-black
                sm:h-10 sm:w-10
                lg:h-12 lg:w-12
              "
              strokeWidth={1.5}
            />

            {/* Number */}
            <p
              className="
                font-poppins
                text-[0.48rem]
                font-bold
                leading-tight
                text-black
                sm:text-base
                lg:text-xl
              "
            >
              {value}
            </p>

            {/* Label */}
            <p
              className="
                font-poppins
                text-[0.45rem]
                font-bold
                leading-tight
                text-black
                sm:text-sm
                lg:text-lg
              "
            >
              {label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
