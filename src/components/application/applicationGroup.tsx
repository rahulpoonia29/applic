import clashingDates from "@/lib/clashingDates";
import { useModal } from "@/store/useModal";
import { JobApplication } from "@prisma/client";
import { isPast } from "date-fns";
import { AlertCircle, Loader2, LucideIcon } from "lucide-react";
import BadgeButton from "../badge";
import { Skeleton } from "../ui/skeleton";
import Applications from "./applications";

type Props = {
	icon: LucideIcon;
	status: "bookmarked" | "applied" | "interview" | "offer" | "rejected";
	count: number;
	applications: JobApplication[];
	loading: boolean;
	conditions?: {
		[K in keyof JobApplication]?: any;
	};
};

function ApplicationGroup({
	icon: Icon,
	status,
	count,
	applications,
	loading,
	conditions,
}: Props) {
	const { onOpen } = useModal();
	applications = applications.filter((application) => {
		if (conditions) {
			return Object.entries(conditions).every(([key, value]) => {
				if (!key || !value) return true;

				if (key === "type") {
					return value.includes(application.type.toLowerCase());
				}
				return true;
			});
		}
	});

	return (
		<div className="w-full space-y-3">
			<div className="ml-2 flex items-center justify-start gap-3 font-semibold text-gray-700">
				<Icon className="size-4" strokeWidth={2} />
				<span className="text-sm capitalize">
					{status === "bookmarked"
						? "Bookmarked"
						: status === "applied"
							? "Applied"
							: status === "interview"
								? "Interview Scheduled"
								: status === "offer"
									? "Got Offer"
									: "Rejected"}
				</span>
				<span className="flex size-5 items-center justify-center rounded-sm border border-gray-400/50 text-xs tabular-nums text-gray-500">
					{loading ? (
						<Loader2 className="size-3 animate-spin" />
					) : (
						count
					)}
				</span>
				{status === "interview" &&
					clashingDates(
						applications
							.filter(
								(application) =>
									application.interviewDate !== null &&
									application.interviewDate !== undefined &&
									!isPast(application.interviewDate),
							)
							.map(
								(application) =>
									// @ts-ignore
									new Date(application?.interviewDate),
							),
					).length > 0 && (
						<BadgeButton
							text="Some interviews are on the same day"
							icon={AlertCircle}
							color="red"
							hoverColor="red"
							className="px-2 py-0.5 text-xs"
							onClick={() => {
								console.log("Clashing dates");

								onOpen("interview-clashing-dates", {
									dates: clashingDates(
										applications
											.filter(
												(application) =>
													application.interviewDate !==
														null &&
													application.interviewDate !==
														undefined,
											)
											.map(
												(application) =>
													new Date(
														// @ts-ignore
														application?.interviewDate,
													),
											),
									),
								});
							}}
						/>
					)}
			</div>

			{loading ? (
				<div className="flex h-[48px] w-full items-center justify-between space-x-4 rounded-lg bg-white px-2 py-3 sm:px-4 sm:py-3 xl:pr-4">
					<div className="flex h-full items-center justify-center space-x-3">
						<Skeleton className="h-full w-[58px]" />
						<Skeleton className="h-full w-[216px]" />
					</div>
					<div className="flex h-full items-center justify-center space-x-4">
						<div className="hidden h-full items-center justify-center space-x-2 lg:flex">
							<Skeleton className="h-full w-[90px]" />
							<Skeleton className="h-full w-[140px]" />
							<Skeleton className="h-full w-[90px] max-w-full" />
						</div>
						<div className="flex h-full items-center justify-center space-x-3 sm:space-x-2">
							<Skeleton className="aspect-square h-full" />
							<Skeleton className="aspect-square h-full" />
						</div>
					</div>
				</div>
			) : (
				<Applications applications={applications} status={status} />
			)}
		</div>
	);
}

export default ApplicationGroup;
