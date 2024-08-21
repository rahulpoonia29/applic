"use client";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "../ui/dialog";
import { useModal } from "@/store/useModal";
import { Checkbox } from "../ui/checkbox";
import { ArrowRight } from "lucide-react";
import { format, getDay } from "date-fns";
import daysToInterview from "@/lib/daysToInterview";

export default function ClashingInterviewDatesModal() {
	const { type, onClose, isOpen, data } = useModal();
	const isModalOpen = isOpen && type === "interview-clashing-dates";
	const dates = data?.dates;
	console.log(dates);

	if (!dates) return null;

	return (
		<Dialog
			open={isModalOpen}
			onOpenChange={() => {
				onClose();
			}}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Clashing Interview Dates</DialogTitle>
					<DialogDescription>
						Some interviews are on the same day
					</DialogDescription>
				</DialogHeader>
				{
					// Iterate over the dates array
					dates.map(({ date, dates }, key) => (
						<div
							key={date.toISOString()}
							className="w-full space-y-4"
						>
							<div>
								<div className="mb-2 font-medium tabular-nums">
									{key + 1}.
									<span className="ml-2">
										{format(date, "PPPP")}
									</span>
								</div>
								<div className="ml-4 flex flex-col gap-1.5 text-sm">
									{dates.map((date, key) => (
										<li key={key} className="capitalize">
											{format(date, "h:mm a")} -{" "}
											<span className="rounded-sm border border-orange-200 bg-orange-100/30 px-2 py-0.5 text-xs capitalize text-orange-600">
												{daysToInterview(date)}
											</span>
										</li>
									))}
								</div>
							</div>
						</div>
					))
				}
			</DialogContent>
		</Dialog>
	);
}
