import {type VariantProps, tv} from "tailwind-variants";
import React from "react";

export const containerVariants = tv({
	base: "mx-auto px-4 sm:px-2",
	variants: {
		size: {
			sm: "w-full",
			md: "max-w-[62rem]",
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
