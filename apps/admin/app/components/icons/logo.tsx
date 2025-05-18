type IconProps = React.HTMLAttributes<SVGElement>;

export const Logo = (props: IconProps) => (
	<svg
		{...props}
		width="100"
		height="100"
		viewBox="0 0 100 100"
		xmlns="http://www.w3.org/2000/svg"
	>
		<circle cx="50" cy="50" r="45" fill="hsl(222.2 84% 4.9%)" />
		<path
			d="
      M 30 35
      C 30 25, 70 25, 70 35
      L 70 65
      C 70 80, 30 80, 30 65
      Z
    "
			fill="none"
			stroke="hsl(210 40% 98%)"
			strokeWidth="6"
			strokeLinejoin="round"
		/>

		<path
			d="
      M 28 33
      C 28 33, 50 38, 72 33
    "
			fill="none"
			stroke="hsl(210 40% 98%)"
			strokeWidth="4"
			strokeLinecap="round"
		/>
		<path
			d="M 40 50 C 45 55, 55 55, 60 50"
			fill="none"
			stroke="hsl(210 40% 98%)"
			strokeWidth="3"
			strokeLinecap="round"
		/>
	</svg>
);
