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
import { ChevronsUpDown } from "lucide-react";
import Link from "next/link";

type Props = {};

function UserMenu({}: Props) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					className="w-full flex items-center justify-between space-x-2 px-3 py-2 text-gray-700 focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0"
				>
					<div className="flex items-center justify-center space-x-2">
						<Avatar className="size-7">
							<AvatarImage
								src={"https://github.com/shadcn.png"}
								alt="@profileImg"
							/>
							<AvatarFallback>{"RP"}</AvatarFallback>
						</Avatar>
						<span>{"RAHUL"}</span>
					</div>
					<ChevronsUpDown className="h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] max-h-[h-[--radix-dropdown-menu-content-available-height]] text-gray-700">
				<DropdownMenuLabel className="text-gray-950">
					My Account
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild className="cursor-pointer">
					<Link href={""}>Profile</Link>
				</DropdownMenuItem>
				<DropdownMenuItem asChild className="cursor-pointer">
					<Link href={"/new"}>Create New Post</Link>
				</DropdownMenuItem>
				<DropdownMenuItem className="cursor-pointer">
					Settings
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem>{/* <SignOut /> */}</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export default UserMenu;
