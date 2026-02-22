"use client";

import { motion, useReducedMotion } from "framer-motion";

const socialLinks = [
  {
    href: "#",
    label: "Follow us on Instagram",
    icon: InstagramIcon,
  },
  {
    href: "#",
    label: "Follow us on LinkedIn",
    icon: LinkedInIcon,
  },
  {
    href: "#",
    label: "Follow us on Facebook",
    icon: FacebookIcon,
  },
] as const;

/* TODO: להחליף למספר הטלפון האמיתי של העסק בפורמט בינלאומי */
const PHONE_HREF = "tel:+972000000000";

export function FloatingSocialBar() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? { x: 0, opacity: 1 } : { x: -24, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 lg:flex"
      aria-label="Social media links"
    >
      <div className="flex flex-col items-center gap-2 rounded-full border border-white/20 bg-zinc-900/20 px-2.5 py-4 shadow-[0_0_15px_rgba(0,0,0,0.1),0_8px_30px_rgba(0,0,0,0.1)] backdrop-blur-xl dark:bg-white/10">
        {socialLinks.map(({ href, label, icon: Icon }) => (
          <SocialLink key={label} href={href} label={label} reduceMotion={!!reduceMotion}>
            <Icon className="h-5 w-5 shrink-0 text-zinc-100/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)] transition-colors group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]" />
          </SocialLink>
        ))}
        <PhoneLink href={PHONE_HREF} reduceMotion={!!reduceMotion} />
      </div>
    </motion.div>
  );
}

function SocialLink({
  href,
  label,
  children,
  reduceMotion,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
  reduceMotion: boolean;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex items-center justify-center rounded-full p-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
      aria-label={label}
      whileHover={reduceMotion ? undefined : { scale: 1.2, x: 5 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {children}
      <span className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-md border border-white/20 bg-black/60 px-2.5 py-1.5 text-xs font-medium text-white/95 opacity-0 shadow-lg backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100">
        {label}
      </span>
    </motion.a>
  );
}

function PhoneLink({ href, reduceMotion }: { href: string; reduceMotion: boolean }) {
  return (
    <motion.a
      href={href}
      className="group relative flex items-center justify-center rounded-full p-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
      aria-label="חיוג לטלפון"
      whileHover={reduceMotion ? undefined : { scale: 1.2, x: 5 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <PhoneIcon className="h-5 w-5 shrink-0 text-zinc-100/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)] transition-colors group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]" />
      <span className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-md border border-white/20 bg-black/60 px-2.5 py-1.5 text-xs font-medium text-white/95 opacity-0 shadow-lg backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100">
        חיוג לטלפון
      </span>
    </motion.a>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.067-.06-1.407-.06-4.123v-.08c0-2.643.012-2.987.06-4.043.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm0 5.25a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5zM12 8a4 4 0 110 8 4 4 0 010-8z" clipRule="evenodd" />
      <path d="M16.5 6.75a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}
