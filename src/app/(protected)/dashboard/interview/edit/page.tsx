"use client";
import Editor from "@/components/editor/advanced-editor";
// import { ThemeToggle } from "@/components/theme-toggle";
import { JSONContent } from "novel";
import { useState } from "react";
import { defaultValue } from "./default-value";

export default function Home() {
	const [value, setValue] = useState<JSONContent>(defaultValue);
	console.log(value);
	return (
		<main className="flex min-h-screen w-full flex-col items-center justify-between  px-3 py-4 xl:px-10 xl:py-8">
			<div className="flex w-full flex-col gap-6 rounded-md border bg-card p-6">
				<div className="flex justify-between">
					<h1 className="text-4xl font-semibold"> Novel Example</h1>
				</div>
				<Editor initialValue={value} onChange={setValue} />
			</div>
		</main>
	);
}
