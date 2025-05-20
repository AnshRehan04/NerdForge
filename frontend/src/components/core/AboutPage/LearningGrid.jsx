import React from "react";
import HighlightText from "../../../components/core/HomePage/HighlightText";
import CTAButton from "../../../components/core/HomePage/Button";

const LearningGridArray = [
  {
    order: -1,
    heading: "World-Class Learning for",
    highlightText: "Anyone, Anywhere",
    description:
      "NerdForge partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
    BtnText: "Learn More",
    BtnLink: "/",
  },
  {
    order: 1,
    heading: "Curriculum Based on Industry Needs",
    description:
      "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
  },
  {
    order: 2,
    heading: "Our Learning Methods",
    description:
      "NerdForge partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 3,
    heading: "Certification",
    description:
      "NerdForge partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 4,
    heading: "Rating Based on Input",
    description:
      "NerdForge partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 5,
    heading: "Ready to Work",
    description:
      "NerdForge partners with more than 275+ leading universities and companies to bring",
  },
];

const LearningGrid = () => {

  return (
    <div className="grid mx-auto w-[350px] lg:w-fit grid-cols-1 lg:grid-cols-4 mb-12">
      {LearningGridArray.map((card, i) => {
        return (
          <div
            key={i}
            className={`${i === 0 && "lg:col-span-2 lg:h-[294px]"}  ${
              card.order % 2 === 1
                ? "bg-[#F1F8F5] h-[294px]"
                : card.order % 2 === 0
                ? "bg-[#E8F0E6] h-[294px]"
                : "bg-transparent"
            } ${card.order === 3 && "lg:col-start-2"} rounded-xl border border-[#C1D3C0] shadow-md`}
          >
            {card.order < 0 ? (
              <div className="lg:w-[90%] flex flex-col gap-3 pb-10 lg:pb-0 p-8">
                <div className="text-4xl font-semibold text-[#2E2E2E]">
                  {card.heading}
                  <HighlightText text={card.highlightText} />
                </div>
                <p className="text-[#5E6B5F] font-medium">
                  {card.description}
                </p>

                <div className="w-fit mt-2">
                  <CTAButton active={true} linkto={card.BtnLink}>
                    {card.BtnText}
                  </CTAButton>
                </div>
              </div>
            ) : (
              <div className="p-8 flex flex-col gap-8">
                <h1 className="text-[#3C6E71] text-lg font-semibold">{card.heading}</h1>
                <p className="text-[#5E6B5F] font-medium">
                  {card.description}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default LearningGrid;