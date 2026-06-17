"use client";

import { motion } from "framer-motion";

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

const stats = [
  {
    value: "50K+",
    label: "Active Users",
  },
  {
    value: "4.9/5",
    label: "Average Rating",
  },
  {
    value: "120+",
    label: "Countries Reached",
  },
];

export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="relative overflow-hidden py-32"
    >
      {/* Grid Pattern */}
      <div
        className="
          absolute
          inset-0
          bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)]
          bg-[size:80px_80px]
          opacity-[0.03]
        "
      />

      {/* Floating Orbs */}
      <motion.div
        animate={{
          y: [-40, 40, -40],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          left-[-150px]
          top-20
          h-[450px]
          w-[450px]
          rounded-full
          bg-primary/15
          blur-[180px]
        "
      />

      <motion.div
        animate={{
          y: [40, -40, 40],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          right-[-150px]
          bottom-0
          h-[450px]
          w-[450px]
          rounded-full
          bg-secondary/15
          blur-[180px]
        "
      />

      <div
        className="
          absolute
          left-1/2
          top-1/3
          h-[600px]
          w-[600px]
          -translate-x-1/2
          rounded-full
          bg-primary/10
          blur-[220px]
        "
      />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
          }}
          className="mx-auto mb-24 max-w-4xl text-center"
        >
          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-primary/20
              bg-primary/10
              px-5
              py-2.5
              backdrop-blur-xl
            "
          >
            <div className="h-2 w-2 rounded-full bg-primary shadow-[0_0_20px_var(--primary)]" />
            <span
              className="
                text-xs
                font-medium
                uppercase
                tracking-[0.25em]
                text-primary
              "
            >
              Trusted Worldwide
            </span>
          </div>

          <h2
            className="
              mt-8
              text-5xl
              font-bold
              tracking-[-0.05em]
              text-text
              md:text-7xl
            "
          >
            Loved by teams
            <span
              className="
                mt-2
                block
                bg-gradient-to-r
                from-primary
                via-pink-300
                to-primary
                bg-[length:200%_100%]
                bg-clip-text
                text-transparent
                animate-shine
              "
            >
              building ambitious things.
            </span>
          </h2>

          <p
            className="
              mx-auto
              mt-8
              max-w-2xl
              text-lg
              leading-relaxed
              text-text-secondary
            "
          >
            Thousands of professionals rely on Pelora to simplify
            workflows, improve collaboration, and stay focused on
            what truly matters.
          </p>
        </motion.div>

        {/* Testimonials */}
        <div className="columns-1 gap-6 md:columns-2 xl:columns-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{
                opacity: 0,
                y: 60,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                margin: "-100px",
              }}
              transition={{
                duration: 0.6,
                delay: index * 0.08,
              }}
              className="
                group
                relative
                mb-6
                break-inside-avoid
                overflow-hidden
                rounded-[32px]
                border
                border-border
                bg-gradient-to-b
                from-surface/95
                to-surface/60
                p-7
                backdrop-blur-2xl
                transition-all
                duration-500
                hover:-translate-y-3
                hover:border-primary/30
                hover:shadow-[0_20px_80px_rgba(240,28,112,0.18)]
              "
            >
              {/* Glow */}
              <div
                className="
                  absolute
                  inset-0
                  opacity-0
                  transition-opacity
                  duration-500
                  group-hover:opacity-100
                "
              >
                <div
                  className="
                    absolute
                    left-1/2
                    top-0
                    h-40
                    w-40
                    -translate-x-1/2
                    rounded-full
                    bg-primary/25
                    blur-[90px]
                  "
                />
              </div>

              {/* Border Glow */}
              <div
                className="
                  absolute
                  inset-0
                  rounded-[32px]
                  bg-gradient-to-br
                  from-primary/10
                  via-transparent
                  to-secondary/10
                  opacity-0
                  transition-opacity
                  duration-500
                  group-hover:opacity-100
                "
              />

              <div className="relative z-10">
                {/* Quote Icon */}
                <div
                  className="
                    mb-5
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-primary/20
                    bg-primary/10
                    text-primary
                  "
                >
                  <svg
                    width="18"
                    height="18"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7.17 6A5 5 0 002 11v7h8v-8H6.1A3.1 3.1 0 019.17 7L10 6H7.17zm10 0A5 5 0 0012 11v7h8v-8h-3.9A3.1 3.1 0 0119.17 7L20 6h-2.83z" />
                  </svg>
                </div>

                {/* Stars */}
                <div className="mb-5 flex gap-1 text-primary">
                  {[...Array(5)].map((_, i) => (
                    <motion.span
                      key={i}
                      whileHover={{
                        scale: 1.3,
                      }}
                    >
                      ★
                    </motion.span>
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

                <div className="my-6 h-px bg-border" />

                {/* User */}
                <div className="flex items-center gap-4">
                  <div
                    className="
                      relative
                      flex
                      h-14
                      w-14
                      items-center
                      justify-center
                      rounded-2xl
                      bg-gradient-to-br
                      from-primary
                      to-secondary
                      font-semibold
                      text-white
                      shadow-[0_0_30px_rgba(240,28,112,0.4)]
                    "
                  >
                    {testimonial.image}
                  </div>

                  <div>
                    <div className="font-semibold text-text">
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
                        py-1.5
                        text-xs
                        font-medium
                        text-primary
                      "
                    >
                      {testimonial.company}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{
            opacity: 0,
            y: 50,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
          }}
          className="
            relative
            mt-24
            overflow-hidden
            rounded-[36px]
            border
            border-primary/15
            bg-gradient-to-br
            from-surface
            via-surface
            to-primary/5
            p-10
            backdrop-blur-2xl
          "
        >
          <div
            className="
              absolute
              left-1/2
              top-0
              h-60
              w-60
              -translate-x-1/2
              rounded-full
              bg-primary/10
              blur-[120px]
            "
          />

          <div className="relative grid gap-8 md:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="
                  text-center
                  transition-transform
                  duration-300
                  hover:scale-105
                "
              >
                <h3
                  className="
                    bg-gradient-to-r
                    from-white
                    to-primary
                    bg-clip-text
                    text-5xl
                    font-bold
                    text-transparent
                  "
                >
                  {stat.value}
                </h3>

                <p className="mt-3 text-text-secondary">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}