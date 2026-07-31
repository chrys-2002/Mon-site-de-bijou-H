/* ============================================================
   Bibliothèque d'icônes ICE-BI — trait fin 1.5, style maison
   Usage : <HeartIcon className="w-5 h-5" />
   ============================================================ */

const iconProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

type IconProps = { className?: string };

export const HeartIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg className={className} {...iconProps}>
    <path d="M12 20.6S3.2 15.3 3.2 9.4a4.9 4.9 0 018.8-3 4.9 4.9 0 018.8 3c0 5.9-8.8 11.2-8.8 11.2z" />
  </svg>
);

export const BagIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg className={className} {...iconProps}>
    <path d="M5.5 8h13l-.9 11.2a2 2 0 01-2 1.8H8.4a2 2 0 01-2-1.8L5.5 8z" />
    <path d="M8.5 10.5V6.75a3.5 3.5 0 017 0v3.75" />
  </svg>
);

export const UserIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg className={className} {...iconProps}>
    <circle cx="12" cy="8" r="3.75" />
    <path d="M4.5 20.5c.7-4 3.4-6 7.5-6s6.8 2 7.5 6" />
  </svg>
);

export const MailIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg className={className} {...iconProps}>
    <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
    <path d="M2.5 7.5L12 13.5l9.5-6" />
  </svg>
);

export const PackageIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg className={className} {...iconProps}>
    <path d="M21 8.2v7.6a2 2 0 01-1 1.73l-7 4.04a2 2 0 01-2 0l-7-4.04a2 2 0 01-1-1.73V8.2a2 2 0 011-1.73l7-4.04a2 2 0 012 0l7 4.04a2 2 0 011 1.73z" />
    <path d="M3.3 7.3L12 12.3l8.7-5" />
    <path d="M12 22V12.3" />
  </svg>
);

export const CheckCircleIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg className={className} {...iconProps}>
    <circle cx="12" cy="12" r="9.25" />
    <path d="M8 12.4l2.7 2.7L16 9.5" />
  </svg>
);

export const EyeIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg className={className} {...iconProps}>
    <path d="M2.5 12S6 5.75 12 5.75 21.5 12 21.5 12 18 18.25 12 18.25 2.5 12 2.5 12z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const EyeOffIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg className={className} {...iconProps}>
    <path d="M4 4l16 16" />
    <path d="M10.6 6.1A9.6 9.6 0 0112 5.75c6 0 9.5 6.25 9.5 6.25a17.7 17.7 0 01-3.2 3.85M6.6 6.9A17 17 0 002.5 12S6 18.25 12 18.25a9.3 9.3 0 004.3-1.05" />
    <path d="M9.9 10a3 3 0 004.1 4.1" />
  </svg>
);

export const PhoneIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg className={className} {...iconProps}>
    <path d="M5.5 3.5h3l1.5 4-2 1.5a12.5 12.5 0 006 6l1.5-2 4 1.5v3a2 2 0 01-2.2 2A16.5 16.5 0 013.5 5.7a2 2 0 012-2.2z" />
  </svg>
);

export const SettingsIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg className={className} {...iconProps}>
    <circle cx="12" cy="12" r="3.25" />
    <path d="M19.5 12a7.5 7.5 0 00-.1-1.2l2-1.5-2-3.4-2.3.9a7.6 7.6 0 00-2.1-1.2L14.6 3h-4l-.4 2.4a7.6 7.6 0 00-2.1 1.2l-2.3-.9-2 3.4 2 1.5a7.6 7.6 0 000 2.4l-2 1.5 2 3.4 2.3-.9a7.6 7.6 0 002.1 1.2l.4 2.4h4l.4-2.4a7.6 7.6 0 002.1-1.2l2.3.9 2-3.4-2-1.5c.07-.4.1-.8.1-1.2z" />
  </svg>
);

export const LogoutIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg className={className} {...iconProps}>
    <path d="M14.5 8V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2h6.5a2 2 0 002-2v-2" />
    <path d="M9.5 12h11" />
    <path d="M17.5 9l3 3-3 3" />
  </svg>
);

export const CardIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg className={className} {...iconProps}>
    <rect x="2.5" y="5.5" width="19" height="13" rx="2.5" />
    <path d="M2.5 9.5h19" />
    <path d="M6 14.5h4" />
  </svg>
);

export const WaveIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg className={className} {...iconProps}>
    <path d="M2.5 8.5c2.4 0 2.4 2 4.75 2s2.35-2 4.75-2 2.35 2 4.75 2 2.35-2 4.75-2" />
    <path d="M2.5 14.5c2.4 0 2.4 2 4.75 2s2.35-2 4.75-2 2.35 2 4.75 2 2.35-2 4.75-2" />
  </svg>
);

export const GemIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg className={className} {...iconProps}>
    <path d="M6 3h12l4 6-10 12L2 9l4-6z" />
    <path d="M2 9h20" />
    <path d="M9 3l3 6 3-6" />
    <path d="M8 9l4 12 4-12" />
  </svg>
);
