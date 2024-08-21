import { Loader2, LucideIcon } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

type Props = {
	icon: LucideIcon;
	status: "resume" | "coverLetter" | "other";
	count?: number;
	documents?: { name: string }[];
	loading: boolean;
};

export default function DocumentGroup({
	icon: Icon,
	status,
	count,
	documents,
	loading,
}: Props) {
	return (
		<div className="w-full space-y-3">
			<div className="ml-2 flex items-center justify-start gap-3 font-semibold text-gray-700">
				<Icon className="size-4" strokeWidth={2} />
				<span className="text-sm capitalize">
					{status === "resume"
						? "Resume"
						: status === "coverLetter"
							? "Cover Letter"
							: "Other"}
				</span>
				<span className="flex size-5 items-center justify-center rounded-sm border border-gray-400/50 text-xs tabular-nums text-gray-500">
					{loading ? (
						<Loader2 className="size-3 animate-spin" />
					) : (
						count
					)}
				</span>
			</div>

			{loading ? (
				<div className="flex h-[48px] w-full items-center justify-between space-x-4 rounded-lg bg-white px-2 py-3 sm:px-4 sm:py-3 xl:pr-4">
					<div className="flex h-full items-center justify-center space-x-3">
						<Skeleton className="h-full w-[58px]" />
						<Skeleton className="h-full w-[216px]" />
					</div>
					<div className="flex h-full items-center justify-center space-x-4">
						<div className="hidden h-full items-center justify-center space-x-2 md:flex">
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
			) : // <Applications applications={applications} status={status} />
			null}
		</div>
	);
}
