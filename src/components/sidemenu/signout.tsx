"use client";

import React from "react";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { toast } from "sonner";
import { signOut } from "next-auth/react";

type Props = {};

function Signout({}: Props) {
	return (
		<Button
			variant={"destructive"}
			className="w-full"
			onClick={async (): Promise<void> => {
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
			<LogOut className="mr-2 size-4" />
			Sign Out
		</Button>
	);
}

export default Signout;
