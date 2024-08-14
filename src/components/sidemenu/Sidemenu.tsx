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
import SidebarItem from "./SidebarItem";
import UserMenu from "./UserMenu";
import SearchInput from "./SearchInput";
import { Suspense } from "react";
import SidebarLink from "./SidebarLink";

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
		<aside className="hidden md:flex flex-col gap-4 w-full md:w-[250px] h-full bg-white overflow-y-auto border-r">
			<div className="py-2 xl:py-3 px-5 w-full">
				<UserMenu />
			</div>
			<div className="px-5 space-y-3">
				<Suspense>
					<SearchInput />
				</Suspense>
			</div>

			<div className="w-full h-px border-b" />
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

			<div className="w-full h-px border-b" />
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

			<div className="w-full px-5 flex flex-col flex-1 justify-end self-end py-2 xl:py-3">
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
