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

export function ArchivedApplications() {
	const { archivedApplications, restoreApplication, deleteApplication } =
		useApplication();

	const { type, onClose, isOpen } = useModal();
	const isModalOpen = isOpen && type === "archived-applications";
	const isDesktop = useMediaQuery("(min-width: 768px)");

	if (isDesktop)
		return (
			<CommandDialog open={isModalOpen} onOpenChange={onClose}>
				<CommandInput placeholder="Type a command or search..." />
				<CommandList>
					<CommandGroup heading="Archived Applications">
						{archivedApplications.map((application, index) => (
							<CommandItem key={index} asChild>
								<div className="my-1.5 flex w-full items-center justify-between text-sm">
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
											className="h-8 cursor-pointer border border-blue-500 bg-transparent text-xs text-blue-500 hover:bg-blue-500 hover:text-white"
											onClick={() => {
												restoreApplication(
													application.id,
												);
											}}
										>
											Restore
										</Button>
										<Button
											variant="destructive"
											size={"sm"}
											className="h-8 border border-destructive bg-transparent text-xs text-destructive hover:text-destructive-foreground"
											onClick={() => {
												deleteApplication(
													application.id,
												);
											}}
										>
											Delete
										</Button>
									</div>
								</div>
							</CommandItem>
						))}
					</CommandGroup>
					<CommandEmpty>No results found.</CommandEmpty>
				</CommandList>
			</CommandDialog>
		);

	return (
		<Drawer open={isModalOpen} onOpenChange={onClose}>
			<DrawerContent>
				<Command>
					<CommandInput placeholder="Type a command or search..." />
					<CommandList>
						<CommandGroup heading="Archived Applications">
							{archivedApplications.map((application, index) => (
								<CommandItem key={index} asChild>
									<div className="my-1.5 flex w-full items-center justify-between text-sm">
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
												className="h-8 cursor-pointer border border-blue-500 bg-transparent text-xs text-blue-500 hover:bg-blue-500 hover:text-white"
												onClick={() => {
													restoreApplication(
														application.id,
													);
												}}
											>
												Restore
											</Button>
											<Button
												variant="destructive"
												size={"sm"}
												className="h-8 border border-destructive bg-transparent text-xs text-destructive hover:text-destructive-foreground"
												onClick={() => {
													deleteApplication(
														application.id,
													);
												}}
											>
												Delete
											</Button>
										</div>
									</div>
								</CommandItem>
							))}
						</CommandGroup>
						<CommandEmpty>No results found.</CommandEmpty>
					</CommandList>
				</Command>
				<DrawerFooter className="pt-2">
					<DrawerClose asChild>
						<Button variant="secondary">Close</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
