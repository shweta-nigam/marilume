import {
  FiMail,
  FiCalendar,
  FiZap,
} from "react-icons/fi";

export default function FeaturesSection() {
  const features = [
  {
    icon: <FiMail />,
    title: "Email that organizes itself",
    description:
      "Marilume prioritizes important conversations, drafts replies, and surfaces actions before they become problems.",
    video: "/videos/email-demo.mp4",
    poster: "/images/m-1.1.png",
  },
  {
    icon: <FiCalendar />,
    title: "A calendar that thinks ahead",
    description:
      "Automatically prepare for meetings, manage conflicts, and keep your day aligned with your priorities.",
    video: "/videos/calendar-demo.mp4",
    poster: "/images/m-2.1.png",
  },
  {
    icon: <FiZap />,
    title: "Automation without complexity",
    description:
      "Turn repetitive workflows into intelligent actions powered by AI.",
    video: "/videos/automation-demo.mp4",
    poster: "/images/m-3.1.png",
  },
];

//   add short compressed video on visulas sections

  return (
    <section  id="features" className="relative overflow-hidden bg-background/40 py-40">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mx-auto mb-28 max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-primary">
            Features
          </span>

          <h2 className="mt-6 font-heading text-4xl font-bold text-text md:text-6xl">
            One workspace.
            <span className="text-primary">
              {" "}Every workflow.
            </span>
          </h2>

          <p className="mt-6 text-lg text-text-secondary">
            Designed to reduce friction, eliminate busywork,
            and help you stay focused on what matters most.
          </p>
        </div>

        {/* Feature Rows */}
        <div className="space-y-32">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`
                grid
                items-center
                gap-12
                lg:grid-cols-2
              `}
            >
              {/* Content */}
              <div
                className={
                  index % 2 === 1
                    ? "lg:order-2"
                    : ""
                }
              >
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
                  {feature.icon}
                </div>

                <h3 className="text-3xl font-bold text-text">
                  {feature.title}
                </h3>

                <p className="mt-6 text-lg leading-relaxed text-text-secondary">
                  {feature.description}
                </p>
              </div>

              {/* Visual */}
              <div
                className={
                  index % 2 === 1
                    ? "lg:order-1"
                    : ""
                }
              >
                <div
                  className="
                    relative
                    overflow-hidden
                    rounded-3xl
                    border
                    border-white/10
                    bg-surface/40
                    p-4
                    backdrop-blur-xl
                  "
                >
                 <video
  className="
    aspect-[16/10]
    w-full
    rounded-2xl
    border
    border-white/5
    object-cover
  "
  autoPlay
  muted
  loop
  playsInline
  preload="metadata"
  poster={feature.poster}
>
  <source src={feature.video} type="video/mp4" />
</video>

                  <div
                    className="
                      absolute
                      left-1/2
                      top-1/2
                      h-48
                      w-48
                      -translate-x-1/2
                      -translate-y-1/2
                      rounded-full
                      bg-primary/20
                      blur-[100px]
                    "
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}