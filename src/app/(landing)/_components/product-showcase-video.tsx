"use client";

import { BorderBeam } from "@/components/magicui/border-beam";
import { motion as m } from "framer-motion";

export const ProductShowcaseVideo = () => {
	return (
		<m.div
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: 0.1, ease: "easeInOut" }}
		>
			<div className="relative overflow-hidden rounded-2xl p-1.5 lg:m-20">
				<BorderBeam duration={10} size={300} borderWidth={2} />
				<video
					src="https://utfs.io/f/bf11796d-f9d3-4563-ad9f-7b20dfae86a9-aos42.mp4"
					autoPlay
					muted
					loop
					className="rounded-xl border bg-cover shadow-lg"
					poster="/images/applitrack-showcase-poster.png"
				/>
			</div>
		</m.div>
	);
};
