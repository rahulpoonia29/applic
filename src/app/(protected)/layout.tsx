import { Suspense } from "react";
import { Sidebar } from "@/components/sidemenu/Sidemenu";
import { ScrollArea } from "@/components/ui/scroll-area";
import Navbar from "@/components/navbar/Navbar";
import { ApplicationProvider } from "@/providers/ApplicationProvider";

export default function ProtectedLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="h-full flex bg-accent">
			<Sidebar />
			<div className="h-full overflow-y-auto flex flex-col flex-1">
				<Suspense>
					<Navbar />
				</Suspense>
				{/* <ApplicationProvider> */}
					<ScrollArea className="max-h-full">{children}</ScrollArea>
				{/* </ApplicationProvider> */}
			</div>
		</div>
	);
}
