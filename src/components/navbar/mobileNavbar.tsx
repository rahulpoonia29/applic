"use client";

import {
	CircleHelp,
	FileArchive,
	MessageSquareMore,
	Plus,
	PlusCircle,
	Settings,
} from "lucide-react";
import SidebarItem from "../sidemenu/sidebarItem";
import UserMenu from "../sidemenu/userMenu";
import SearchInput from "../sidemenu/searchInput";
import SidebarLink from "../sidemenu/sidebarLink";
import { Suspense, useEffect, useState } from "react";
import { SidebarNavLinks } from "../sidemenu/sidemenu";
import { Button } from "../ui/button";
import { AlignLeft } from "lucide-react";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import NewApplication from "./newApplication";

type Props = {};

function MobileNavbar({}: Props) {
	const [open, setOpen] = useState(false);

	return (
		<div className="mobilenav mx-1 mr-2 flex h-full w-full items-center justify-start gap-4 overflow-y-auto">
			<Sheet open={open} onOpenChange={setOpen}>
				<SheetTrigger asChild className="m-0">
					<AlignLeft className="size-5 cursor-pointer" />
				</SheetTrigger>
				<SheetContent side={"left"} className="space-y-4">
					<SheetHeader className="w-full [&_*]:text-center">
						<SheetTitle>Menu</SheetTitle>
					</SheetHeader>
					<UserMenu />

					<div className="h-px w-full border-b" />

					<div>
						{SidebarNavLinks.map((link, index) => (
							<SidebarLink
								key={index}
								label={link.label}
								href={link.href}
								icon={link.icon}
								onClick={() => setOpen(false)}
							/>
						))}
					</div>

					<div className="h-px w-full border-b" />

					<div>
						<SidebarItem
							icon={PlusCircle}
							label="New Application"
							type="new-application"
							onClick={() => setOpen(false)}
						/>
						<SidebarItem
							icon={FileArchive}
							label="Archived"
							type="archived-applications"
							onClick={() => setOpen(false)}
						/>
						<SidebarItem
							icon={Settings}
							label="Settings"
							type="settings"
							onClick={() => setOpen(false)}
						/>
					</div>

					<div className="h-px w-full border-b" />

					<div>
						<SidebarItem
							icon={CircleHelp}
							label="Support"
							type="support"
						/>
						<SidebarItem
							icon={MessageSquareMore}
							label="Feedback"
							type="feedback"
						/>
					</div>
				</SheetContent>
			</Sheet>

			<Suspense>
				<SearchInput className="flex-grow" />
				<NewApplication />
				{/* <ModeToggle /> */}
			</Suspense>
		</div>
	);
}

export default MobileNavbar;
