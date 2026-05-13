"use client";

import { cn } from "@agon/ui/lib/utils";
import {
	CheckIcon,
	Loader2Icon,
	MinusIcon,
	TriangleAlertIcon,
	XIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import type * as React from "react";
import { Toaster as Sonner, type ToasterProps } from "sonner";

function Toaster({ ...props }: ToasterProps) {
	const { theme = "system" } = useTheme();

	return (
		<Sonner
			className="toaster group select-none"
			gap={14}
			icons={{
				success: (
					<CheckIcon
						aria-hidden
						className="mt-0.5 size-3.5 shrink-0 stroke-[1.75] text-green-700 dark:text-green-400"
					/>
				),
				info: (
					<MinusIcon
						aria-hidden
						className="mt-0.5 size-3.5 shrink-0 stroke-[1.75] stroke-foreground text-foreground"
					/>
				),
				warning: (
					<TriangleAlertIcon
						aria-hidden
						className="mt-0.5 size-3.5 shrink-0 stroke-[1.75] stroke-foreground text-foreground"
					/>
				),
				error: (
					<XIcon
						aria-hidden
						className="mt-0.5 size-3.5 shrink-0 stroke-[1.75] stroke-destructive text-destructive"
					/>
				),
				loading: (
					<Loader2Icon
						aria-hidden
						className="mt-0.5 size-3.5 shrink-0 animate-spin stroke-[1.75] stroke-foreground stroke-muted-foreground text-foreground"
					/>
				),
			}}
			style={
				{
					"--border-radius": "0px",
				} as React.CSSProperties
			}
			theme={theme as ToasterProps["theme"]}
			toastOptions={{
				classNames: {
					actionButton: cn(
						"rounded-none border-2 border-foreground bg-transparent px-3 py-1.5",
						"font-mono font-semibold text-[0.65rem] text-foreground uppercase tracking-widest",
						"hover:bg-foreground hover:text-background"
					),
					content: "flex flex-1 flex-col gap-0",
					default: "border-foreground",
					description: cn(
						"mt-1 font-normal text-[0.65rem] text-muted-foreground leading-relaxed tracking-normal"
					),
					error: "!border-destructive",
					icon: "self-start",
					info: "!border-muted-foreground",
					success: "!border-green-700 dark:!border-green-400",
					title: cn(
						"font-semibold text-[0.7rem] text-foreground leading-snug tracking-wide"
					),
					toast: cn(
						"group/toast flex w-full items-start rounded-none border-2",
						"bg-card px-4 py-3 font-mono text-foreground text-xs shadow-none",
						"sm:max-w-md"
					),
				},
			}}
			{...props}
		/>
	);
}

export { Toaster };
