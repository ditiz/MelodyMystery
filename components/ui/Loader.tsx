import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import React from "react";

export interface LoaderProps
	extends React.InputHTMLAttributes<HTMLInputElement> {}

const Loader = React.forwardRef<HTMLInputElement, LoaderProps>(
	({ className, type, ...props }, ref) => {
		return <Loader2 className={cn("animate-spin", className)} />;
	},
);
Loader.displayName = "Input";

export default Loader;
