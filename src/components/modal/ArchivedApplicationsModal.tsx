"use client";

import { useApplication } from "@/store/useApplication";
import { useModal } from "@/store/useModal";

import {
	Command,
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerFooter,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import { useMediaQuery } from "usehooks-ts";

type ModalProps = {
	open: boolean;
	onOpenChange: () => void;
};

export function ArchivedApplications({ open, onOpenChange }: ModalProps) {
	const { data } = useModal();
	const { archivedApplications } = useApplication();
	const isDesktop = useMediaQuery("(min-width: 768px)");

	// const [loading, setLoading] = useState(false);
	if (isDesktop)
		return (
			<CommandDialog open={open} onOpenChange={onOpenChange}>
				<CommandInput placeholder="Type a command or search..." />
				<CommandList>
					<CommandEmpty>No results found.</CommandEmpty>
					<CommandGroup heading="Archived Applications">
						{archivedApplications.map((application, index) => (
							<CommandItem key={index} asChild>
								<div className="flex items-center justify-between w-full my-1.5 text-sm">
									<span>
										<span className="mr-1">
											{index + 1}.
										</span>
										{application.role},{" "}
										{application.company}
									</span>

									<div className="space-x-2">
										<Button
											variant="outline"
											size={"sm"}
											className="text-xs h-8 border cursor-pointer bg-transparent text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white"
											onClick={() => {
												console.log("Restore");
											}}
										>
											Restore
										</Button>
										<Button
											variant="destructive"
											size={"sm"}
											className="text-xs h-8 border border-destructive bg-transparent text-destructive hover:text-destructive-foreground"
											onClick={() => {
												console.log("Restore");
											}}
										>
											Delete
										</Button>
									</div>
								</div>
							</CommandItem>
						))}
					</CommandGroup>
				</CommandList>
			</CommandDialog>
		);

	return (
		<Drawer open={open} onClose={onOpenChange}>
			<DrawerContent>
				<Command>
					<CommandInput placeholder="Type a command or search..." />
					<CommandList>
						<CommandEmpty>No results found.</CommandEmpty>
						<CommandGroup heading="Archived Applications">
							{archivedApplications.map((application, index) => (
								<CommandItem key={index} asChild>
									<div className="flex items-center justify-between w-full my-1.5 text-sm">
										<span>
											<span className="mr-1">
												{index + 1}.
											</span>
											{application.role},{" "}
											{application.company}
										</span>

										<div className="space-x-2">
											<Button
												variant="outline"
												size={"sm"}
												className="text-xs h-8 border cursor-pointer bg-transparent text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white"
												onClick={() => {
													console.log("Restore");
												}}
											>
												Restore
											</Button>
											<Button
												variant="destructive"
												size={"sm"}
												className="text-xs h-8 border border-destructive bg-transparent text-destructive hover:text-destructive-foreground"
												onClick={() => {
													console.log("Restore");
												}}
											>
												Delete
											</Button>
										</div>
									</div>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
				<DrawerFooter className="pt-2">
					<DrawerClose asChild>
						<Button variant="outline" onClick={onOpenChange}>
							Cancel
						</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
