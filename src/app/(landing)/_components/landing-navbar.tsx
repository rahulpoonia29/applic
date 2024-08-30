import { Button } from "@/components/ui/button";
import {
	ArrowRight,
	ChevronRight,
	Github,
	ListChecks,
	Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
	{ name: "Features", href: "/#features" },
	{ name: "Testimonials", href: "/sign-up" },
];

export const LandingNavbar = async () => {
	return (
		<nav className="fixed top-0 z-50 w-full border-b border-zinc-300 bg-white shadow-sm">
			<div className="container flex items-center justify-between px-5 py-4 xl:max-w-7xl">
				<div className="w-full flex items-center justify-between sm:justify-start gap-6">
					<Link
						href={"/"}
						className="flex items-center justify-center gap-1.5 text-xl font-bold"
					>
						<ListChecks size={22} />
						<h1 className="text-lg font-bold">Applic</h1>
					</Link>

					<Link
						href={"https://github.com/rahulpoonia29/applic"}
						target="_blank"
						className="rounded-xl shadow-md"
					>
						<Button
							className="group relative inline-flex items-center justify-center overflow-hidden font-semibold shadow-lg shadow-gray-500/50"
							size={"sm"}
						>
							<div className="relative inline-flex -translate-x-0 items-center transition group-hover:-translate-x-6">
								<div className="absolute translate-x-0 opacity-100 transition group-hover:-translate-x-6 group-hover:opacity-0">
									<Star
										className="size-4"
										strokeWidth={2.5}
									/>
								</div>
								<span className="pl-6">Star on Github</span>
								<div className="absolute right-0 flex translate-x-12 items-center gap-1 opacity-0 transition group-hover:translate-x-6 group-hover:opacity-100">
									<Github
										className="size-4"
										strokeWidth={2.5}
									/>
								</div>
							</div>
						</Button>
					</Link>
				</div>
				<Button
					variant={"default"}
					className="hidden sm:block  group font-semibold shadow-lg shadow-gray-500/50"
					size={"sm"}
					asChild
				>
					<Link href={"/sign-up"}>
						Get Started
						<ChevronRight className="ml-0.5 size-4 transition group-hover:translate-x-1 md:size-4" />
					</Link>
				</Button>
			</div>
		</nav>
	);
};
