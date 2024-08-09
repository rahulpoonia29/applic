import { Suspense } from "react";
import Navbar from "@/components/navbar/Navbar";
import { Sidebar } from "@/components/sidemenu/Sidemenu";

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
				<div className="flex-1">{children}</div>
			</div>
		</div>
	);
}
