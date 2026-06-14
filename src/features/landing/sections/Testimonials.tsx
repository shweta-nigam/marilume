"use client";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Product Designer",
    company: "Notion",
    image: "SC",
    quote:
      "Pelora completely changed how I organize complex projects. What used to take hours now feels effortless.",
  },
  {
    name: "Michael Ross",
    role: "Founder",
    company: "LaunchLabs",
    image: "MR",
    quote:
      "The clarity and structure Pelora brings is incredible. Our entire team adopted it within the first week.",
  },
  {
    name: "Emily Carter",
    role: "Engineering Lead",
    company: "Stripe",
    image: "EC",
    quote:
      "Beautiful experience, powerful workflows, and zero learning curve. Exactly what modern teams need.",
  },
  {
    name: "James Wilson",
    role: "Growth Manager",
    company: "Linear",
    image: "JW",
    quote:
      "We've tested dozens of tools. Pelora is the first one that genuinely feels designed for focus.",
  },
  {
    name: "Sophia Lee",
    role: "Operations Director",
    company: "ScaleUp",
    image: "SL",
    quote:
      "The attention to detail is outstanding. Every interaction feels polished and intentional.",
  },
  {
    name: "Daniel Brown",
    role: "Startup Founder",
    company: "Nova",
    image: "DB",
    quote:
      "Pelora helped us eliminate unnecessary complexity and move faster across every department.",
  },
];

export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-background/40 py-32"
    >
      {/* Background Glow */}
      <div className="absolute left-1/2 top-40 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/10 blur-[180px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mx-auto mb-20 max-w-3xl text-center">
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
            Trusted Worldwide
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
            Loved by teams
            <span className="block text-primary">
              building ambitious things.
            </span>
          </h2>

          <p
            className="
              mt-6
              text-lg
              leading-relaxed
              text-text-secondary
            "
          >
            Thousands of professionals rely on Pelora to simplify
            workflows, improve collaboration, and stay focused on
            what truly matters.
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 gap-6 md:columns-2 xl:columns-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="
                group
                mb-6
                break-inside-avoid
                rounded-3xl
                border
                border-border
                bg-surface/80
                p-7
                backdrop-blur-xl
                transition-all
                duration-500
                hover:-translate-y-2
                hover:border-primary/30
                hover:shadow-[0_0_50px_rgba(240,28,112,0.15)]
              "
            >
              {/* Stars */}
              <div className="mb-5 flex gap-1 text-primary">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>

              {/* Quote */}
              <p
                className="
                  text-base
                  leading-relaxed
                  text-text-secondary
                "
              >
                "{testimonial.quote}"
              </p>

              {/* Divider */}
              <div className="my-6 h-px bg-border" />

              {/* User */}
              <div className="flex items-center gap-4">
                <div
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-2xl
                    bg-gradient-to-br
                    from-primary
                    to-blue-500
                    font-semibold
                    text-white
                  "
                >
                  {testimonial.image}
                </div>

                <div>
                  <div className="font-medium text-text">
                    {testimonial.name}
                  </div>

                  <div className="text-sm text-text-secondary">
                    {testimonial.role}
                  </div>
                </div>

                <div className="ml-auto">
                  <span
                    className="
                      rounded-full
                      border
                      border-primary/20
                      bg-primary/10
                      px-3
                      py-1
                      text-xs
                      text-primary
                    "
                  >
                    {testimonial.company}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div
          className="
            mt-20
            grid
            gap-6
            rounded-3xl
            border
            border-border
            bg-surface/60
            p-8
            backdrop-blur-xl
            md:grid-cols-3
          "
        >
          <div className="text-center">
            <h3 className="text-4xl font-bold text-text">50K+</h3>
            <p className="mt-2 text-text-secondary">
              Active Users
            </p>
          </div>

          <div className="text-center">
            <h3 className="text-4xl font-bold text-text">4.9/5</h3>
            <p className="mt-2 text-text-secondary">
              Average Rating
            </p>
          </div>

          <div className="text-center">
            <h3 className="text-4xl font-bold text-text">120+</h3>
            <p className="mt-2 text-text-secondary">
              Countries Reached
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}