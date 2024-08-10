"use client";

import {
	CircleHelp,
	MessageSquareMore,
	PlusCircle,
	Settings,
	Trash,
} from "lucide-react";
import SidebarItem from "../sidemenu/SidebarItem";
import UserMenu from "../sidemenu/UserMenu";
import SearchInput from "../sidemenu/SearchInput";
import SidebarLink from "../sidemenu/SidebarLink";
import { Suspense } from "react";
import { SidebarNavLinks } from "../sidemenu/Sidemenu";
import { Button } from "../ui/button";
import { AlignLeft, } from "lucide-react";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";

type Props = {};

function MobileNavbar({}: Props) {
	return (
		<div className="flex ml-1 gap-2 w-full items-center justify-start h-full overflow-y-auto border-r">
			<Sheet>
				<SheetTrigger asChild>
					<AlignLeft className="size-5 cursor-pointer" />
				</SheetTrigger>
				<SheetContent side={"left"} className="space-y-4">
					<SheetHeader>
						<SheetTitle>Menu</SheetTitle>
						{/* <SheetDescription>Manage your account</SheetDescription> */}
					</SheetHeader>
					<UserMenu />

					<div className="w-full h-px border-b" />

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

					<div className="w-full h-px border-b" />

					<div>
						<SidebarItem
							icon={PlusCircle}
							label="New Application"
							type="new-application"
						/>
						<SidebarItem
							icon={Trash}
							label="Trash"
							notification={2}
							type="trash"
						/>
						<SidebarItem
							icon={Settings}
							label="Settings"
							type="settings"
						/>
					</div>

					<div className="w-full h-px border-b" />

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
					<SheetFooter>
						<SheetClose asChild>
							<Button type="submit">Close</Button>
						</SheetClose>
					</SheetFooter>
				</SheetContent>
			</Sheet>
			<div className="px-5 space-y-3">
				<Suspense>
					<SearchInput />
				</Suspense>
			</div>
		</div>
	);
}

export default MobileNavbar;
