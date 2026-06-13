export default function CTASection() {
  return (
    <section className="relative overflow-hidden py-40">
      {/* Glow */}
      <div
        className="
          absolute
          left-1/2
          top-1/2
          h-[500px]
          w-[500px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-primary/15
          blur-[180px]
        "
      />

      <div className="container relative z-10 mx-auto px-6">
        <div
          className="
            relative
            overflow-hidden
            rounded-[40px]
            border
            border-border
            bg-surface/40
            px-8
            py-20
            text-center
            backdrop-blur-xl
            md:px-16
          "
        >
          {/* Corner Glow */}
          <div
            className="
              absolute
              left-0
              top-0
              h-40
              w-40
              rounded-full
              bg-primary/10
              blur-[100px]
            "
          />

          <div
            className="
              absolute
              bottom-0
              right-0
              h-40
              w-40
              rounded-full
              bg-primary/10
              blur-[100px]
            "
          />

          {/* Badge */}
          <div
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
            Get Started Today
          </div>

          {/* Heading */}
          <h2
            className="
              mx-auto
              mt-8
              max-w-4xl
              font-heading
              text-4xl
              font-bold
              leading-tight
              text-text
              md:text-6xl
            "
          >
            Stop managing work.
            <br />
            Start moving it
            <span className="text-primary"> forward.</span>
          </h2>

          {/* Description */}
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
            Pelora organizes communication, coordinates tasks,
            and automates repetitive workflows so you can focus
            on the work that actually matters.
          </p>

          {/* Buttons */}
          <div
            className="
              mt-12
              flex
              flex-col
              items-center
              justify-center
              gap-4
              sm:flex-row
            "
          >
            <button
              className="
                rounded-xl
                border
                border-primary
                bg-primary
                px-8
                py-4
                font-medium
                text-white
                transition-all
                duration-300
                hover:scale-105
                hover:shadow-[0_0_40px_rgba(240,28,112,0.45)]
              "
            >
              Get Started
            </button>

            <button
              className="
                rounded-xl
                border
                border-border
                bg-surface/60
                px-8
                py-4
                font-medium
                text-text
                backdrop-blur-md
                transition-all
                duration-300
                hover:border-primary/40
                hover:bg-surface
              "
            >
              Schedule Demo
            </button>
          </div>

          {/* Trust Text */}
          <p
            className="
              mt-8
              text-sm
              text-text-secondary
            "
          >
            No credit card required • Connect your tools in minutes
          </p>
        </div>
      </div>
    </section>
  );
}