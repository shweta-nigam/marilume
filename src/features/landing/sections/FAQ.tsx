"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is Marilume?",
    answer:
      "Marilume is a modern productivity platform designed to transform scattered ideas, tasks, and workflows into a clear, organized system that helps teams move faster and focus on meaningful work.",
  },
  {
    question: "Who is Marilume built for?",
    answer:
      "Marilume is designed for creators, startups, freelancers, product teams, and organizations that need a better way to manage complexity and maintain momentum.",
  },
  {
    question: "How quickly can I get started?",
    answer:
      "Most users can set up their workspace and begin using Marilume within minutes. The experience is intentionally designed to feel intuitive from day one.",
  },
  {
    question: "Can I collaborate with my team?",
    answer:
      "Yes. Marilume makes it easy to organize projects, share progress, and keep everyone aligned in a single workspace.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Security is built into the foundation of Marilume. Data is protected using modern security practices and infrastructure designed for reliability and privacy.",
  },
  {
    question: "Do you offer a free plan?",
    answer:
      "Yes. You can explore Marilume with a free plan before deciding if premium features are right for your workflow.",
  },
];

export default function FAQSection() {
  const [active, setActive] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative overflow-hidden bg-background/40 py-32"
    >
      {/* Background Glow */}
      <div className="absolute left-1/2 top-40 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/10 blur-[180px]" />

      <div className="relative mx-auto max-w-5xl px-6">
        {/* Header */}
        <div className="mb-20 text-center">
          <div
            className="
              inline-flex
              items-center
              rounded-full
              border
              border-primary/20
              bg-primary/10
              px-4
              py-2
              text-xs
              font-medium
              uppercase
              tracking-[0.25em]
              text-primary
            "
          >
            Frequently Asked Questions
          </div>

          <h2
            className="
              mt-6
              font-heading
              text-4xl
              font-bold
              tracking-[-0.04em]
              text-text
              md:text-6xl
            "
          >
            Everything you need
            <span className="block text-primary">
              to know about Marilume.
            </span>
          </h2>

          <p
            className="
              mx-auto
              mt-6
              max-w-2xl
              text-lg
              leading-relaxed
              text-text-secondary
            "
          >
            Find answers to the most common questions about
            Marilume, how it works, and how it can help you
            simplify your workflow.
          </p>
        </div>

        {/* FAQ Cards */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = active === index;

            return (
              <div
                key={faq.question}
                className="
                  overflow-hidden
                  rounded-3xl
                  border
                  border-border
                  bg-surface/70
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  hover:border-primary/20
                "
              >
                <button
                  onClick={() =>
                    setActive(isOpen ? null : index)
                  }
                  className="
                    flex
                    w-full
                    items-center
                    gap-6
                    px-7
                    py-6
                    text-left
                  "
                >
                  <span
                    className="
                      text-sm
                      font-semibold
                      text-primary
                    "
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span
                    className="
                      flex-1
                      text-lg
                      font-medium
                      text-text
                    "
                  >
                    {faq.question}
                  </span>

                  <ChevronDown
                    className={`
                      h-5 w-5 text-text-secondary
                      transition-transform duration-300
                      ${isOpen ? "rotate-180" : ""}
                    `}
                  />
                </button>

                <div
                  className={`
                    grid transition-all duration-300
                    ${
                      isOpen
                        ? "grid-rows-[1fr]"
                        : "grid-rows-[0fr]"
                    }
                  `}
                >
                  <div className="overflow-hidden">
                    <div
                      className="
                        border-t
                        border-border
                        px-7
                        py-6
                        text-base
                        leading-relaxed
                        text-text-secondary
                      "
                    >
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div
          className="
            mt-14
            rounded-3xl
            border
            border-border
            bg-surface/60
            p-10
            text-center
            backdrop-blur-xl
          "
        >
          <h3
            className="
              text-2xl
              font-semibold
              text-text
            "
          >
            Still have questions?
          </h3>

          <p
            className="
              mt-3
              text-text-secondary
            "
          >
            Our team is happy to help you get the most
            out of Marilume.
          </p>

          <button
            className="
              mt-6
              rounded-2xl
              bg-primary
              px-6
              py-3
              font-medium
              text-white
              transition-all
              duration-300
              hover:scale-105
              hover:shadow-[0_0_35px_rgba(240,28,112,0.35)]
            "
          >
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
}