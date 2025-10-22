"use client";

import {
	CircleCheckIcon,
	InfoIcon,
	Loader2Icon,
	OctagonXIcon,
	TriangleAlertIcon,
} from "lucide-react";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
	return (
		<Sonner
			theme="dark"
			className="toaster group"
			toastOptions={{
				classNames: {
					toast: "group toast group-[.toaster]:border-violet-400/40 group-[.toaster]:shadow-purple-700/30 group-[.toaster]:shadow-lg",
					description: "group-[.toast]:text-slate-300",
					actionButton:
						"group-[.toast]:bg-violet-500 group-[.toast]:text-slate-100 group-[.toast]:hover:bg-violet-600",
					cancelButton:
						"group-[.toast]:bg-slate-700 group-[.toast]:text-slate-300 group-[.toast]:hover:bg-slate-600",
				},
			}}
			icons={{
				success: <CircleCheckIcon className="size-4 text-green-400" />,
				info: <InfoIcon className="size-4 text-blue-400" />,
				warning: (
					<TriangleAlertIcon className="size-4 text-yellow-400" />
				),
				error: <OctagonXIcon className="size-4 text-red-400" />,
				loading: (
					<Loader2Icon className="size-4 animate-spin text-violet-400" />
				),
			}}
			style={
				{
					"--normal-bg": "hsl(260 50% 8%)",
					"--normal-text": "hsl(0 0% 98%)",
					"--normal-border": "hsl(260 100% 70% / 0.4)",
					"--border-radius": "12px",
				} as React.CSSProperties
			}
			{...props}
		/>
	);
};

export { Toaster };
