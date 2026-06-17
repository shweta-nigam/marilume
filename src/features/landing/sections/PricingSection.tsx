"use client";

import { Check, Sparkles } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for exploring AI-powered productivity.",
    features: [
      "Connect Gmail",
      "Connect Calendar",
      "Basic AI assistance",
      "Email search",
      "Calendar management",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$12",
    period: "/month",
    description: "For professionals who want a personal AI executive assistant.",
    features: [
      "Everything in Starter",
      "Unlimited AI actions",
      "Smart email drafting",
      "Meeting preparation",
      "Workflow automations",
      "Priority support",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Advanced controls and security for teams.",
    features: [
      "Everything in Pro",
      "Team workspaces",
      "Admin controls",
      "Advanced integrations",
      "Custom workflows",
      "Dedicated support",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

export default function PricingSection() {
  return (
    <section
      id="pricing"
      className="relative overflow-hidden py-40 bg-background/40"
    >
      {/* Background Glow */}
      <div
        className="
          absolute
          left-1/2
          top-40
          h-[500px]
          w-[500px]
          -translate-x-1/2
          rounded-full
          bg-primary/10
          blur-[180px]
        "
      />

      <div className="container relative mx-auto px-6">
        {/* Header */}
        <div className="mx-auto mb-24 max-w-3xl text-center">
          <span
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-primary/20
              bg-primary/10
              px-4
              py-2
              text-sm
              text-primary
            "
          >
            <Sparkles className="h-4 w-4" />
            Pricing
          </span>

          <h2
            className="
              mt-6
              font-heading
              text-4xl
              font-bold
              text-text
              md:text-6xl
            "
          >
            Simple pricing for
            <span className="text-primary">
              {" "}extraordinary productivity
            </span>
          </h2>

          <p
            className="
              mt-6
              text-lg
              text-text-secondary
            "
          >
            Start for free and upgrade when you're ready
            to unlock your AI executive assistant.
          </p>
        </div>

        {/* Pricing Cards */}
        <div
          className="
            mx-auto
            grid
            max-w-7xl
            gap-8
            lg:grid-cols-3
          "
        >
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`
                relative
                overflow-hidden
                rounded-3xl
                border
                backdrop-blur-xl
                transition-all
                duration-500
                hover:-translate-y-2
                ${
                  plan.highlighted
                    ? `
                      border-primary/40
                      bg-surface/80
                      shadow-[0_0_80px_rgba(240,28,112,0.15)]
                    `
                    : `
                      border-border
                      bg-surface/50
                    `
                }
              `}
            >
              {plan.highlighted && (
                <>
                  <div
                    className="
                      absolute
                      inset-x-0
                      top-0
                      h-px
                      bg-gradient-to-r
                      from-transparent
                      via-primary
                      to-transparent
                    "
                  />

                  <div
                    className="
                      absolute
                      right-6
                      top-6
                      rounded-full
                      border
                      border-primary/20
                      bg-primary/10
                      px-3
                      py-1
                      text-xs
                      font-medium
                      text-primary
                    "
                  >
                    Most Popular
                  </div>
                </>
              )}

              <div className="p-8">
                <h3
                  className="
                    font-heading
                    text-2xl
                    font-semibold
                    text-text
                  "
                >
                  {plan.name}
                </h3>

                <p className="mt-3 text-text-secondary">
                  {plan.description}
                </p>

                <div className="mt-8">
                  <div className="flex items-end">
                    <span
                      className="
                        font-heading
                        text-5xl
                        font-bold
                        text-text
                      "
                    >
                      {plan.price}
                    </span>

                    {plan.period && (
                      <span
                        className="
                          ml-2
                          pb-2
                          text-text-secondary
                        "
                      >
                        {plan.period}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  className={`
                    mt-8
                    w-full
                    rounded-2xl
                    px-5
                    py-3.5
                    text-sm
                    font-medium
                    transition-all
                    duration-300
                    ${
                      plan.highlighted
                        ? `
                          bg-primary
                          text-white
                          hover:scale-[1.02]
                          hover:shadow-[0_0_40px_rgba(240,28,112,0.4)]
                        `
                        : `
                          border
                          border-border
                          bg-background
                          text-text
                          hover:border-primary/30
                        `
                    }
                  `}
                >
                  {plan.cta}
                </button>

                <div
                  className="
                    my-8
                    h-px
                    bg-gradient-to-r
                    from-transparent
                    via-border
                    to-transparent
                  "
                />

                <ul className="space-y-4">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="
                        flex
                        items-start
                        gap-3
                      "
                    >
                      <div
                        className="
                          mt-0.5
                          flex
                          h-5
                          w-5
                          items-center
                          justify-center
                          rounded-full
                          bg-primary/15
                          text-primary
                        "
                      >
                        <Check className="h-3 w-3" />
                      </div>

                      <span className="text-text-secondary">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}