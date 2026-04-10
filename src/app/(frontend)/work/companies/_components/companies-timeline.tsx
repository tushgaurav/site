import { Briefcase, MapPin } from 'lucide-react'

// TODO: Migrate to CMS-driven content
const experiences = [
  {
    role: 'Software Developer (Contract)',
    company: 'Pactle',
    location: 'Noida, UP',
    period: 'Sep. 2025 – Present',
    current: true,
    highlights: [
      'Engineered robust, bidirectional ERP integrations to automate the entire quote-to-cash cycle.',
      'Developed core backend features for workflow automation, including instant RFQ capture and AI-assisted quote generation.',
      'Administered and optimized scalable cloud infrastructure on AWS.',
      'Collaborated on building a unified dashboard for real-time visibility into quotes, orders, and payments.',
    ],
  },
  {
    role: 'Software Developer',
    company: 'Orangewood Labs (Y Combinator 2018)',
    location: 'Noida, UP',
    period: 'Sep. 2023 – Present',
    current: true,
    highlights: [
      'Led development of RoboGPT web application that simplified robotic arm programming for non-technical users.',
      'Engineered a web application for robotic arm control with real-time 3D visualization using gRPC and WebSockets.',
      'Developed and deployed client-specific robotic control systems for Cashify and Radiant Anodizers.',
      'Optimized company website performance by 50%, improving SEO rankings and lead generation.',
    ],
  },
]

export default function CompaniesTimeline() {
  return (
    <div className="relative">
      {/* The vertical timeline line */}
      <div className="absolute left-[7px] top-3 bottom-3 w-px bg-border md:left-[9px]" />

      <div className="space-y-10">
        {experiences.map((exp, idx) => (
          <div key={idx} className="relative pl-8 md:pl-10 group">
            {/* Timeline dot */}
            <div className="absolute left-0 top-[22px] md:top-[24px]">
              <div className="relative flex items-center justify-center">
                <span
                  className={`block h-[15px] w-[15px] rounded-full border-2 md:h-[19px] md:w-[19px] transition-colors duration-300 ${
                    exp.current
                      ? 'border-primary bg-primary/20 group-hover:bg-primary/40'
                      : 'border-muted-foreground/40 bg-background group-hover:border-primary'
                  }`}
                />
                {exp.current && (
                  <span className="absolute h-[7px] w-[7px] rounded-full bg-primary md:h-[9px] md:w-[9px]" />
                )}
              </div>
            </div>

            {/* Card */}
            <div className="rounded-lg border border-border bg-card p-5 transition-all duration-300 hover:border-primary/20 hover:shadow-sm md:p-6">
              {/* Period badge */}
              <div className="mb-3 flex items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs font-medium tracking-wide text-muted-foreground">
                  {exp.period}
                </span>
                {exp.current && (
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-primary">
                    Current
                  </span>
                )}
              </div>

              {/* Role & Company */}
              <h3 className="text-base font-semibold tracking-tight text-foreground md:text-lg">
                {exp.role}
              </h3>
              <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Briefcase className="h-3.5 w-3.5" />
                  {exp.company}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" />
                  {exp.location}
                </span>
              </div>

              {/* Highlights */}
              <ul className="mt-4 space-y-2">
                {exp.highlights.map((highlight, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-[13px] leading-relaxed text-muted-foreground md:text-sm"
                  >
                    <span className="mt-1.5 block h-1 w-1 flex-shrink-0 rounded-full bg-muted-foreground/40" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
