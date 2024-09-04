"use client";

import { Button } from "@/components/ui/button";
import { Github, Star } from "lucide-react";
import Link from "next/link";
import { motion as m } from "framer-motion";

export const CalltoActionFooter = () => {
	return (
		<m.div
			className="flex items-center justify-center py-5 text-center md:px-32"
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: 0.1, ease: "easeInOut" }}
		>
			<div className="z-10 flex w-full flex-col items-center gap-2 px-5 md:max-w-3xl md:gap-5">
				<span className="text-lg font-semibold text-blue-600">
					Open Source
				</span>
				<h2 className="text-3xl font-bold md:text-4xl">
					Join the Community and Contribute
				</h2>
				<span className="text-base text-zinc-400 lg:text-lg">
					Whether you&apos;re a developer looking to contribute to the
					project or a user interested in the inner workings of the
					app, you can dive right in and be a part of our journey.
				</span>
				<Link
					href={"https://github.com/rahulpoonia29/applic"}
					target={"_blank"}
				>
					<Button
						className="group relative mt-5 inline-flex h-max items-center justify-center overflow-hidden rounded-lg bg-neutral-950 py-3 font-medium text-neutral-200 duration-500"
						size={"lg"}
					>
						<div className="relative inline-flex -translate-x-0 items-center transition group-hover:translate-x-6">
							<div className="absolute -translate-x-4 opacity-0 transition group-hover:-translate-x-6 group-hover:opacity-100">
								<Star className="size-5" strokeWidth={2.5} />
							</div>
							<span className="pr-6 text-base">
								Github Repository
							</span>
							<div className="absolute -right-2 translate-x-0 opacity-100 transition group-hover:translate-x-4 group-hover:opacity-0">
								<Github className="size-5" strokeWidth={2.5} />
							</div>
						</div>
					</Button>
				</Link>
			</div>
		</m.div>
	);
};
