import {type VariantProps, tv} from "tailwind-variants";
import React from "react";

export const containerVariants = tv({
	base: "mx-auto",
	variants: {
		size: {
			sm: "w-full px-2",
			md: "max-w-[62rem] px-2",
		},
	},
	defaultVariants: {
		size: "sm",
	},
});

interface ContainerProps
	extends VariantProps<typeof containerVariants>,
		React.ComponentProps<"div"> {
	as?: keyof React.JSX.IntrinsicElements;
}

export function Container({
	as = "div",
	children,
	className,
	...props
}: ContainerProps) {
	return React.createElement(
		as,
		{
			className: containerVariants({size: "md", className}),
			...props,
		},
		children
	);
}
