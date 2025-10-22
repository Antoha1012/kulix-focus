import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
	"inline-flex items-center justify-center rounded-full border px-3 py-1 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-all duration-200 overflow-hidden",
	{
		variants: {
			variant: {
				default:
					"border-violet-400/40 bg-gradient-to-r from-violet-500/20 to-purple-500/20 text-violet-200 hover:from-violet-500/30 hover:to-purple-500/30 hover:border-violet-400/60",
				secondary:
					"border-slate-600/40 bg-gradient-to-r from-slate-700/50 to-slate-800/50 text-slate-300 hover:from-slate-600/60 hover:to-slate-700/60",
				destructive:
					"border-red-400/40 bg-gradient-to-r from-red-500/20 to-red-600/20 text-red-200 hover:from-red-500/30 hover:to-red-600/30",
				outline:
					"border-violet-400/60 text-violet-200 hover:bg-violet-500/10 hover:border-violet-400/80",
				success:
					"border-green-400/40 bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-200 hover:from-green-500/30 hover:to-emerald-500/30",
				warning:
					"border-yellow-400/40 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-200 hover:from-yellow-500/30 hover:to-orange-500/30",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	}
);

function Badge({
	className,
	variant,
	asChild = false,
	...props
}: React.ComponentProps<"span"> &
	VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
	const Comp = asChild ? Slot : "span";

	return (
		<Comp
			data-slot="badge"
			className={cn(badgeVariants({ variant }), className)}
			{...props}
		/>
	);
}

export { Badge, badgeVariants };
