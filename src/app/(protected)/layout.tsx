import { Suspense } from "react";
import { Sidebar } from "@/components/sidemenu/Sidemenu";
import { ScrollArea } from "@/components/ui/scroll-area";
import Navbar from "@/components/navbar/Navbar";
import { ModalProvider } from "@/store/ModalProvider";
import ApplicationProvider from "@/store/ApplicationProvider";

export default async function ProtectedLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex h-full bg-accent">
			<Sidebar />
			<div className="flex h-full flex-1 flex-col overflow-y-auto">
				<Suspense>
					<Navbar />
				</Suspense>
				<ScrollArea className="max-h-full">{children}</ScrollArea>
				<ModalProvider />
				<ApplicationProvider />
			</div>
		</div>
	);
}
