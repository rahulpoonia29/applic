import React from "react";
import { Button } from "../ui/button";
import { signOut } from "@/auth";
import { LogOut } from "lucide-react";
import { toast } from "sonner";

type Props = {};

function Signout({}: Props) {
	return (
		<form
			noValidate={true}
			className="flex items-center space-x-2"
			action={async () => {
				"use server";
				await signOut();
				toast.success("Signed out successfully", {
					description: "You have been signed out.",
					position: "top-center",
					richColors: true,
					action: {
						label: "Close",
						onClick: () => {},
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

export default Signout;
