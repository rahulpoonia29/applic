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
												restoreApplication(
													application.id
												);
											}}
										>
											Restore
										</Button>
										<Button
											variant="destructive"
											size={"sm"}
											className="text-xs h-8 border border-destructive bg-transparent text-destructive hover:text-destructive-foreground"
											onClick={() => {
												deleteApplication(
													application.id
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
				</CommandList>
			</CommandDialog>
		);

	return (
		<Drawer open={isModalOpen} onOpenChange={onClose}>
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
													restoreApplication(
														application.id
													);
												}}
											>
												Restore
											</Button>
											<Button
												variant="destructive"
												size={"sm"}
												className="text-xs h-8 border border-destructive bg-transparent text-destructive hover:text-destructive-foreground"
												onClick={() => {
													deleteApplication(
														application.id
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
