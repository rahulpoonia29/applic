"use client";

import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion as m } from "framer-motion";

const features = [
	{
		id: 1,
		title: "Track",
		heading: "Stay Organized and On Track",
		description:
			"Keep all your job applications in one place. With our intuitive dashboard, easily manage your applications, track progress, and stay updated on where you stand with each employer.",
		imageSrc:
			"https://utfs.io/f/1bb820d3-18ff-47b1-a50f-e38e6d7cab40-nbw1x2.png",
		imageAlt: "track-feature",
		reverse: false,
	},
	{
		id: 2,
		title: "Document Management",
		heading: "Manage Your Documents with Ease",
		description:
			"Upload, store, and manage all your important documents in one place. Attach the right resume or cover letter to each job application with just a few clicks, ensuring you always send the right materials.",
		imageSrc:
			"https://utfs.io/f/cb8b6e8a-b5a6-4aec-9aaa-85b3702e139c-nbw0hd.png",
		imageAlt: "document-feature",
		reverse: true,
	},
	{
		id: 3,
		title: "Reminders",
		heading: "Never Miss an Important Date",
		description:
			"Set interview dates within the app, and we'll send you a reminder email one day before the scheduled interview. This way, you can prepare in advance and show up confident and ready to impress.",
		imageSrc:
			"https://utfs.io/f/cbaaad09-d847-4602-b675-0bfa57698cc1-nbvzpv.png",
		imageAlt: "reminder-feature",
		reverse: false,
	},
	{
		id: 4,
		title: "Dynamic Job Details",
		heading: "Tailor Your Application Process",
		description:
			"Our Notion-like editor lets you dynamically edit and update job details, track interview information, and add personalized notes. It's an all-in-one workspace tailored to your application process.",
		imageSrc:
			"https://utfs.io/f/a1ad78c8-bb80-4df4-9f3b-97e99016f768-nbvzsg.png",
		imageAlt: "dynamic-feature",
		reverse: true,
	},
];

export const ProductFeatures = () => {
	return (
		<m.div
			className="xl mt-12 flex w-full flex-col gap-10 md:mt-20 md:gap-20"
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: 0.1, ease: "easeInOut" }}
		>
			{features.map((feature) => (
				<div
					key={feature.id}
					className={`flex flex-col gap-10 ${
						feature.reverse ? "lg:flex-row-reverse" : "lg:flex-row"
					}`}
				>
					<div className="flex w-full flex-col gap-3 lg:max-w-md">
						<span className="text-xl font-semibold text-blue-600">
							{feature.title}
						</span>
						<h2 className="text-2xl font-bold md:text-3xl xl:text-4xl">
							{feature.heading}
						</h2>
						<span className="text-base text-gray-500/80 lg:text-lg">
							{feature.description}
						</span>
						<Button
							className="group w-max font-normal"
							asChild
						>
							<Link href={"/sign-up"}>
								Explore{" "}
								<ChevronRight className="ml-2 size-4 transition group-hover:translate-x-1" />
							</Link>
						</Button>
					</div>
					<div className="flex-1">
						<Image
							src={feature.imageSrc}
							alt={feature.imageAlt}
							className="aspect-video rounded-xl border object-cover shadow-lg"
							width={1000}
							height={1000}
						/>
					</div>
				</div>
			))}
		</m.div>
	);
};
