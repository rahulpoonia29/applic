"use client";

import {
	CircleHelp,
	FileArchive,
	MessageSquareMore,
	Plus,
	PlusCircle,
	Settings,
} from "lucide-react";
import SidebarItem from "../sidemenu/SidebarItem";
import UserMenu from "../sidemenu/UserMenu";
import SearchInput from "../sidemenu/SearchInput";
import SidebarLink from "../sidemenu/SidebarLink";
import { Suspense } from "react";
import { SidebarNavLinks } from "../sidemenu/Sidemenu";
import { Button } from "../ui/button";
import { AlignLeft } from "lucide-react";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { useModal } from "@/store/useModal";
import { ModeToggle } from "../theme/themeToggle";

type Props = {};

function MobileNavbar({}: Props) {
	const { onOpen } = useModal();
	return (
		<div className="mobilenav mx-1 mr-2 flex h-full w-full items-center justify-start gap-4 overflow-y-auto">
			<Sheet>
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
							/>
						))}
					</div>

					<div className="h-px w-full border-b" />

					<div>
						<SidebarItem
							icon={PlusCircle}
							label="New Application"
							type="new-application"
						/>
						<SidebarItem
							icon={FileArchive}
							label="Archived"
							type="archived-applications"
						/>
						<SidebarItem
							icon={Settings}
							label="Settings"
							type="settings"
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
				<Button
					variant="outline"
					className="flex gap-2 border-gray-300 bg-accent font-medium text-foreground text-gray-700"
					onClick={() => onOpen("new-application")}
				>
					<Plus className="size-4" /> New
				</Button>
				{/* <ModeToggle /> */}
			</Suspense>
		</div>
	);
}

export default MobileNavbar;
