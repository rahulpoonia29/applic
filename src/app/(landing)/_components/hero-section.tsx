"use client";

import AnimatedShinyText from "@/components/magicui/animated-shiny-text";
import NumberTicker from "@/components/magicui/number-ticker";
import ShimmerButton from "@/components/magicui/shimmer-button";
import { Skeleton } from "@/components/ui/skeleton";
import { motion as m } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { useState } from "react";

const poppins = Poppins({
	weight: ["400", "600"],
	subsets: ["latin"],
});

export const HeroSection = () => {
	const [count, setCount] = useState(63);
	const [isLoading, setLoading] = useState(false);
	// useEffect(() => {
	// 	const getCount = async () => {
	// 		setLoading(true);
	// 		try {
	// 			const res = await axios.get("/api/get-application-count");
	// 			setCount(res.data.count);
	// 		} catch (error) {
	// 			console.log(error);
	// 		} finally {
	// 			setLoading(false);
	// 		}
	// 	};
	// 	getCount();
	// }, []);
	return (
		<m.div
			className={
				"flex flex-col items-center gap-2 text-center md:items-center " +
				poppins.className
			}
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: 0.1, ease: "easeInOut" }}
		>
			<h1
				className={
					"mx-8 text-wrap bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-5xl font-bold leading-[3.3rem] tracking-wide text-transparent md:text-6xl lg:text-7xl 2xl:text-[4rem]"
				}
			>
				Streamline Your Job Search with Ease
			</h1>
			<p className="text-md mx-8 mt-2 leading-6 tracking-normal text-gray-500/80 md:text-lg xl:text-xl">
				Efficiently Track All Your Job Applications and Manage Related
				Documents in One Convenient Platform
			</p>
			<div className="flex flex-col items-center gap-5">
				<Link href={"/sign-up"}>
					<ShimmerButton
						className="mt-5 flex items-center text-lg text-primary-foreground shadow-2xl hover:bg-primary/90 md:mt-10"
						background="hsl(var(--primary))"
						shimmerSize="0.1em"
						shimmerDuration="1.2s"
					>
						{/* <span className="whitespace-pre-wrap text-center font-medium leading-none text-white dark:from-white dark:to-slate-900/10 lg:text-xl"> */}
						Begin Tracking
						{/* </span> */}
						<ChevronRight className="ml-2 size-4 transition group-hover:translate-x-1 md:size-5" />
					</ShimmerButton>
				</Link>
				<AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
					<div className="flex gap-1.5">
						<span>Tracking</span>
						<div className="flex items-center">
							{isLoading ? (
								<Skeleton className="size-5 bg-zinc-200" />
							) : (
								<NumberTicker
									value={count}
									className="font-semibold tabular-nums text-neutral-600"
								/>
							)}
						</div>
						<span>applications and counting!</span>
					</div>
				</AnimatedShinyText>
			</div>
		</m.div>
	);
};
