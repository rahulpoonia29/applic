"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
	if (typeof window === "undefined") return { children };
	else return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
