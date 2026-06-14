import {
  FiLink,
  FiTarget,
  FiZap,
  FiCheckCircle,
} from "react-icons/fi";

export default function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      icon: <FiLink />,
      title: "Connect your tools",
      description:
        "Securely connect Gmail, Calendar, and the tools you already use. Marilume instantly begins understanding your workflow and priorities.",
    },
    {
      number: "02",
      icon: <FiTarget />,
      title: "Define what matters",
      description:
        "Tell Marilume what deserves your attention, what can be automated, and how you prefer work to be organized.",
    },
    {
      number: "03",
      icon: <FiZap />,
      title: "AI handles the coordination",
      description:
        "Marilume prioritizes requests, manages follow-ups, organizes tasks, and executes repetitive workflows behind the scenes.",
    },
    {
      number: "04",
      icon: <FiCheckCircle />,
      title: "Stay focused",
      description:
        "Receive concise updates, recommendations, and approvals while staying focused on meaningful work instead of administration.",
    },
  ];

  return (
    <section  id="how-it-works" className="relative overflow-hidden bg-background/40 py-40">
      {/* Background Glow */}
      <div className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/10 blur-[180px]" />

      <div className="container relative z-10 mx-auto px-6">
        {/* Header */}
        <div className="mx-auto mb-28 max-w-3xl text-center">
          <span
            className="
              inline-flex
              rounded-full
              border
              border-primary/30
              bg-primary/10
              px-4
              py-2
              text-sm
              font-medium
              text-primary
            "
          >
            How It Works
          </span>

          <h2
            className="
              mt-6
              font-heading
              text-4xl
              font-bold
              leading-tight
              text-text
              md:text-6xl
            "
          >
            From complexity to
            <span className="text-primary"> clarity.</span>
          </h2>

          <p
            className="
              mt-6
              text-lg
              leading-relaxed
              text-text-secondary
            "
          >
            Connect your tools once. Marilume continuously organizes,
            prioritizes, and executes the work that matters most.
          </p>
        </div>

        {/* Timeline */}
        <div className="mx-auto max-w-5xl">
          {steps.map((step, index) => (
            <div key={step.number}>
              <div
                className="
                  grid
                  gap-8
                  py-10
                  md:grid-cols-[120px_1fr]
                "
              >
                {/* Number */}
                <div className="flex justify-center md:justify-start">
                  <span
                    className="
                      font-heading
                      text-6xl
                      font-black
                      leading-none
                      text-primary/20
                    "
                  >
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <div
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-3xl
                    border
                    border-border
                    bg-surface/40
                    p-8
                    backdrop-blur-xl
                    transition-all
                    duration-300
                    hover:border-primary/30
                    hover:bg-surface/60
                  "
                >
                  {/* Glow */}
                  <div
                    className="
                      absolute
                      right-0
                      top-0
                      h-32
                      w-32
                      rounded-full
                      bg-primary/10
                      blur-[80px]
                      transition-opacity
                      duration-300
                      group-hover:opacity-100
                    "
                  />

                  <div className="relative z-10">
                    <div
                      className="
                        mb-6
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-2xl
                        border
                        border-primary/20
                        bg-primary/10
                        text-xl
                        text-primary
                      "
                    >
                      {step.icon}
                    </div>

                    <h3
                      className="
                        text-2xl
                        font-bold
                        text-text
                      "
                    >
                      {step.title}
                    </h3>

                    <p
                      className="
                        mt-4
                        max-w-2xl
                        leading-relaxed
                        text-text-secondary
                      "
                    >
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Connector */}
              {index !== steps.length - 1 && (
                <div className="flex justify-center md:ml-[58px] md:justify-start">
                  <div
                    className="
                      h-16
                      w-px
                      bg-gradient-to-b
                      from-primary/40
                      to-transparent
                    "
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}