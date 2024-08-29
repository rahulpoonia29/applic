import { cn } from "@/lib/utils";
import { LandingNavbar } from "./_components/landing-navbar";
import { LandingFooter } from "./_components/landing-footer";
import { CalltoActionFooter } from "./_components/call-to-action-footer";
import DotPattern from "@/components/magicui/dot-pattern";
import FlickeringGrid from "@/components/magicui/flickering-grid";

export default function LandingLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="relative flex min-h-full flex-col justify-between gap-12 md:gap-24" suppressHydrationWarning>
			<LandingNavbar />
			<div className="container flex flex-1 flex-col px-5 xl:max-w-7xl">
				{children}
			</div>
			<DotPattern
				width={30}
				height={30}
				x={0}
				y={0}
				className={cn(
					"-z-10 [mask-image:linear-gradient(to_bottom,white,transparent,transparent)]",
				)}
			/>
			<CalltoActionFooter />
			<LandingFooter />
		</div>
	);
}
