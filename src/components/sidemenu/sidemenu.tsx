"use client";

import {
	BriefcaseBusiness,
	CircleHelp,
	FileArchive,
	FileText,
	Grid2X2,
	LucideIcon,
	MessageSquareMore,
	PlusCircle,
	Settings,
} from "lucide-react";
import SidebarItem from "./sidebarItem";
import UserMenu from "./userMenu";
import SearchInput from "./searchInput";
import { Suspense } from "react";
import SidebarLink from "./sidebarLink";

interface SidebarNavLinkProps {
	label: string;
	href: string;
	icon: LucideIcon;
}

export const SidebarNavLinks: SidebarNavLinkProps[] = [
	{
		label: "Dashboard",
		href: "/dashboard",
		icon: Grid2X2,
	},
	{
		label: "Manage Documents",
		href: "/documents",
		icon: FileText,
	},
	{
		label: "Search Jobs",
		href: "/search-jobs",
		icon: BriefcaseBusiness,
	},
];

export const Sidebar = () => {
	return (
		<aside className="hidden h-full w-full flex-col gap-4 overflow-y-auto border-r bg-white md:flex md:w-[250px]">
			<div className="w-full px-5 py-2 xl:py-3">
				<UserMenu />
			</div>
			<div className="space-y-3 px-5">
				<Suspense>
					<SearchInput />
				</Suspense>
			</div>

			<div className="h-px w-full border-b" />
			<div className="flex flex-col px-5">
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
			<div className="flex flex-col px-5 py-2 xl:py-3">
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
				<SidebarItem icon={Settings} label="Settings" type="settings" />
			</div>

			<div className="flex w-full flex-1 flex-col justify-end self-end px-5 py-2 xl:py-3">
				<SidebarItem icon={CircleHelp} label="Support" type="support" />
				<SidebarItem
					icon={MessageSquareMore}
					label="Feedback"
					type="feedback"
				/>
			</div>
		</aside>
	);
};
