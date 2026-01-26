import React from 'react';
import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {steps} from "../constants/steps";

gsap.registerPlugin(ScrollTrigger)


const WorkStages: React.FC = () => {
  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>(".timeline-card").forEach((card) => {
      gsap.from(card, {
        xPercent: -10,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
        },
      });
    });

    gsap.fromTo(
      ".timeline-line",
      { scaleY: 0 },
      {
        scaleY: 1,
        transformOrigin: "top center",
        ease: "none",
        scrollTrigger: {
          trigger: ".timeline-line",
          start: "top 80%",
          end: "bottom 20%",
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <section className="w-full bg-white py-20">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-12 text-center text-3xl font-semibold text-gray-900">
          Этапы работ
        </h2>

        <div className="relative mx-auto max-w-4xl">
          <div className="pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2">
            <div className="timeline-line h-full w-px bg-gray-300 origin-top" />
          </div>

          <div className="space-y-16">
            {steps.map((step) => {
              const isLeft = step.side === "left";

              return (
                <div
                  key={step.id}
                  className={`
                    timeline-card flex items-center gap-6
                    ${isLeft ? "justify-start" : "justify-end"}
                  `}
                >
                  {isLeft && (
                    <div className="w-1/2 text-right px-4">
                      <h3 className="mb-2 text-base font-bold text-gray-900">
                        {step.title}
                      </h3>
                      <p className="text-sm leading-relaxed font-semibold text-gray-700">
                        {step.description}
                      </p>
                    </div>
                  )}

                  <div className="z-10 flex h-12 w-12 items-center justify-center rounded-full bg-lime-400 text-base font-bold text-white shadow-md">
                    {step.id}
                  </div>

                  {!isLeft && (
                    <div className="w-1/2 text-left px-4">
                      <h3 className="mb-2 text-base font-bold text-gray-900">
                        {step.title}
                      </h3>
                      <p className="text-sm leading-relaxed font-semibold text-gray-700">
                        {step.description}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkStages;