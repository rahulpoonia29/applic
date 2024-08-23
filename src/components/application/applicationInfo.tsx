"use client";

import { JobApplication } from "@prisma/client";
import {
	Award,
	Briefcase,
	Building2,
	MapPin,
	LinkIcon,
	FileText,
	Calendar,
	Mail,
	Clipboard,
	LucideIcon,
	DollarSign,
	CheckCircle,
} from "lucide-react";
import { format, isPast } from "date-fns";
import Link from "next/link";
import daysToInterview from "@/lib/daysToInterview";

type Props = {
	application: JobApplication;
};

// Define a type for keys of the JobApplication object that we're interested in
type JobApplicationKeys = keyof Pick<
	JobApplication,
	| "role"
	| "company"
	| "salary"
	| "type"
	| "location"
	| "status"
	| "posting_link"
	| "interviewDate"
	| "interviewerEmail"
	| "notes"
>;

// For reference:

// const application: JobApplication = {
// 	id: 26,
// 	posting_link:
// 		"https://www.radix-ui.com/primitives/docs/components/dialog#api-reference",
// 	role: "Frontend Engineer",
// 	company: "Facebook",
// 	salary: 500000,
// 	type: "onsite",
// 	location: "Banglore",
// 	country: "India ",
// 	status: "interview",
// 	previousStatus: null,
// 	userId: "clzuqgxjv0000rw6z9f4zfd1p",
// 	interview: true,
// 	interviewDate: new Date("2024-08-16T03:30:00.000Z"),
// 	emailSentDate: new Date("2024-08-16T03:30:00.000Z"),
// 	interviewerEmail: null,
// 	notes: null,
// 	createdAt: new Date("2024-08-16T11:29:59.970Z"),
// 	updatedAt: new Date("2024-08-16T11:29:59.970Z"),
// };

function ApplicationInfo({ application }: Props) {
	const properties: {
		key: JobApplicationKeys;
		label: string;
		icon: LucideIcon;
		condition: any;
		format: (value: any) => React.ReactNode;
	}[] = [
		{
			key: "role",
			label: "Role",
			icon: Briefcase,
			condition: application.role,
			format: (value: string) => value,
		},
		{
			key: "company",
			label: "Company",
			icon: Building2,
			condition: application.company,
			format: (value: string) => value,
		},
		{
			key: "salary",
			label: "Salary",
			icon: DollarSign,
			condition: application.salary,
			format: (value: number) => value.toLocaleString(),
		},
		{
			key: "type",
			label: "Job Type",
			icon: Award,
			condition: application.type,
			format: (value: string) =>
				value.charAt(0).toUpperCase() + value.slice(1),
		},
		{
			key: "location",
			label: "Location",
			icon: MapPin,
			condition: application.location,
			format: (value: string) => value,
		},
		{
			key: "status",
			label: "Status",
			icon: Clipboard,
			condition: application.status,
			format: (value: string) =>
				value.charAt(0).toUpperCase() + value.slice(1),
		},
		{
			key: "posting_link",
			label: "Posting Link",
			icon: LinkIcon,
			condition: application.posting_link,
			format: (value: string) => {
				const regex = /^(?:https?:\/\/)?(?:www\.)?([^\/]+)(\/.*)?$/;

				// Apply regex to the URL
				const [_, domain, path] = value.match(regex) || [];
				// Extract the first path segment
				const firstSegment = path
					? path.split("/")[1] + "/" + path.split("/")[2]
					: "";
				// Construct the formatted path
				const formattedPath = firstSegment
					? `/${firstSegment}/...`
					: "";
				// Combine domain and formatted path
				const formattedUrl = `${domain}${formattedPath}`;

				return (
					<Link
						href={value}
						target="_blank"
						className="hover:underline"
					>
						{formattedUrl}
					</Link>
				);
			},
		},
		{
			key: "interviewDate",
			label: "Interview Date",
			icon: Calendar,
			condition: application.interviewDate,
			format: (date: Date) => (
				<span className="capitalize flex items-center gap-2">
					{daysToInterview(date)}
					{isPast(date) && (
						<CheckCircle className="size-4 text-green-500" />
					)}
				</span>
			),
		},
		{
			key: "interviewerEmail",
			label: "Interviewer Email",
			icon: Mail,
			condition: application.interviewerEmail,
			format: (value: string) => value,
		},
		{
			key: "notes",
			label: "Notes",
			icon: FileText,
			condition: application.notes,
			format: (value: string) => value,
		},
	];

	return (
		<div className="flex w-full flex-col gap-4 rounded-md text-left">
			{/* Company Name */}
			<h1 className="flex items-center gap-3 text-xl font-semibold text-gray-800">
				<Building2 size={20} />
				{application.company}
			</h1>
			<div className="md:grid-cols- grid grid-cols-1 rounded-xl border bg-card p-4">
				{properties.map((property) => {
					if (!property.condition) return null;

					return (
						<div
							key={property.key}
							className="flex items-center gap-2 py-2.5 text-sm"
						>
							<property.icon
								size={16}
								className="text-gray-600"
							/>
							<span className="font-semibold text-gray-700">
								{property.label}:
							</span>
							{property.format(application[property.key])}
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default ApplicationInfo;
