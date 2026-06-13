import {
  FiClock,
  FiMail,
  FiCalendar,
  FiAlertTriangle,
} from "react-icons/fi";

export default function ProblemsSection() {
  const problems = [
    {
      icon: <FiMail />,
      title: "Inbox overload",
      description:
        "Important emails disappear beneath newsletters, promotions, and endless threads.",
    },
    {
      icon: <FiCalendar />,
      title: "Scheduling chaos",
      description:
        "Meetings, reminders, and commitments live across multiple disconnected tools.",
    },
    {
      icon: <FiClock />,
      title: "Hours lost on busywork",
      description:
        "Repeating the same administrative tasks steals time from meaningful work.",
    },
    {
      icon: <FiAlertTriangle />,
      title: "Things slip through the cracks",
      description:
        "Missed follow-ups and forgotten actions quietly compound over time.",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-background py-32">
      {/* Glow */}
      <div className="absolute left-1/2 top-40 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px]" />

      <div className="container mx-auto px-6">
        {/* Heading */}
        <div className="mx-auto mb-20 max-w-3xl text-center">
          <span className="mb-4 inline-flex rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            The Problem
          </span>

          <h2 className="font-heading text-4xl font-bold leading-tight text-text md:text-6xl">
            Modern work shouldn't feel
            <span className="text-primary"> this fragmented.</span>
          </h2>

          <p className="mt-6 text-lg text-text-secondary">
            Every day, professionals waste hours switching between tools,
            managing inboxes, and remembering what comes next.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {problems.map((item, index) => (
            <div
              key={index}
              className="
                group
                relative
                overflow-hidden
                rounded-3xl
                border
                border-border
                bg-surface/80
                p-8
                backdrop-blur-xl
                transition-all
                duration-500
                hover:border-primary/40
                hover:-translate-y-2
              "
            >
              {/* Hover Glow */}
              <div
                className="
                  absolute
                  inset-0
                  opacity-0
                  transition-opacity
                  duration-500
                  group-hover:opacity-100
                "
                style={{
                  background:
                    "radial-gradient(circle at top left, rgba(240,28,112,.15), transparent 60%)",
                }}
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
                    text-2xl
                    text-primary
                  "
                >
                  {item.icon}
                </div>

                <h3 className="mb-3 text-2xl font-semibold text-text">
                  {item.title}
                </h3>

                <p className="leading-relaxed text-text-secondary">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Statement */}
        <div className="mx-auto mt-20 max-w-4xl text-center">
          <div
            className="
              rounded-3xl
              border
              border-primary/20
              bg-gradient-to-r
              from-primary/10
              via-transparent
              to-secondary/10
              p-10
            "
          >
            <h3 className="font-heading text-3xl font-bold text-text">
              The real cost isn't time.
            </h3>

            <p className="mt-4 text-lg text-text-secondary">
              It's the constant context switching, mental overhead, and missed
              opportunities that slowly drain productivity every single day.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}