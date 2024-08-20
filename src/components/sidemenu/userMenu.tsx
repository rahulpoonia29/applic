"use client";

import React from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown, Settings } from "lucide-react";
import Link from "next/link";
import Signout from "./signout";
import { useSession } from "next-auth/react";

function UserMenu() {
	const { data: session } = useSession();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					className="flex w-full items-center justify-between space-x-2 px-3 py-2 text-gray-700 focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0"
				>
					<div className="flex items-center justify-center space-x-2">
						<Avatar className="size-7">
							<AvatarImage
								src={session?.user?.image || ""}
								alt="@profileImg"
							/>
							<AvatarFallback>{"RP"}</AvatarFallback>
						</Avatar>
						<span>{session?.user?.name}</span>
					</div>
					<ChevronsUpDown className="h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="max-h-[h-[--radix-dropdown-menu-content-available-height]] w-[--radix-dropdown-menu-trigger-width] text-gray-700">
				<DropdownMenuLabel className="text-gray-950">
					<span>{session?.user?.email}</span>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild className="cursor-pointer py-2">
					<Link href={"/user/settings"}>
						<Settings className="mr-1.5 size-4" />
						Settings
					</Link>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild className="p-0">
					<Signout />
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export default UserMenu;
