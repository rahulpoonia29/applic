"use strict";

import React from "react";
import { Button } from "../ui/button";
import { signOut } from "@/auth";
import { LogOut } from "lucide-react";
import { toast } from "sonner";

type Props = {};

function ServerSignout({}: Props) {
	return (
		<form
			noValidate={true}
			className="flex items-center space-x-2"
			action={async (): Promise<void> => {
				"use server";
				await signOut();
				toast.success("Signed out successfully", {
					description: "You have been signed out.",
					// richColors: true,
					action: {
						label: "Close",
						onClick: (): void => {},
						actionButtonStyle: {
							cursor: "pointer",
						},
					},
				});
			}}
		>
			<Button variant={"destructive"} className="w-full">
				<LogOut className="size-4 mr-2" />
				Sign Out
			</Button>
		</form>
	);
}

export default ServerSignout;
