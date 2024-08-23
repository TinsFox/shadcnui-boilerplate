type IconProps = React.HTMLAttributes<SVGElement>

export const Logo = (props: IconProps) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <rect x="10" y="10" width="80" height="80" fill="#3b82f6" rx="10" ry="10" />
    <path d="M30 30 L70 30 L70 45 L55 45 L55 70 L45 70 L45 45 L30 45 Z" fill="#ffffff" />
  </svg>
)
