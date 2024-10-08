import setInterviewerEmail from "@/actions/setInterviewerEmail";
import JobApplicationSchema from "@/schema/JobApplication";
import { JobApplication, JobStatus } from "@prisma/client";
import axios from "axios";
import { toast } from "sonner";
import { z } from "zod";
import { create } from "zustand";

type useApplicationStateProps = {
	applications: JobApplication[];
	unarchivedApplications: JobApplication[];
	archivedApplications: JobApplication[];
	archivedCount: number;
	retries: number;
	loading: boolean;
};

type useApplicationActionsProps = {
	fetchApplications: () => Promise<void>;
	addApplication: (
		application: z.infer<typeof JobApplicationSchema>,
	) => Promise<void>;
	archiveApplication: (applicationId: number) => Promise<void>;
	restoreApplication: (applicationId: number) => Promise<void>;
	deleteApplication: (applicationId: number) => Promise<void>;
	moveApplication: (applicationId: number, to: JobStatus) => Promise<void>;
	setInterviewDate: (
		applicationId: number,
		date: Date,
		sendEmail: boolean,
	) => Promise<void>;
	setInterviewerEmail: (
		interviewerEmail: string,
		applicationId: number,
	) => Promise<void>;
};

// Utility function to calculate derived state
const calculateDerivedState = (applications: JobApplication[]) => {
	const unarchivedApplications = applications.filter(
		(application) => application.status !== "archived",
	);
	const archivedApplications = applications.filter(
		(application) => application.status === "archived",
	);
	const archivedCount = archivedApplications.length;

	return {
		unarchivedApplications,
		archivedApplications,
		archivedCount,
	};
};

export const useApplication = create<
	useApplicationStateProps & useApplicationActionsProps
>((set) => ({
	applications: [],
	unarchivedApplications: [],
	archivedApplications: [],
	archivedCount: 0,
	retries: 0,
	loading: true,

	// Fetch applications from the server
	fetchApplications: async () => {
		set({ loading: true });
		try {
			const response = await axios.get<{
				applications: JobApplication[];
			}>("/api/applications");

			const applications = response.data.applications;

			if (!applications) {
				throw new Error("No applications found");
			}
			set({
				applications,
				...calculateDerivedState(applications),
			});
		} catch (error) {
			toast.error("Failed to fetch applications");
			console.error("Failed to fetch applications:", error);
			set((state) => {
				if (state.retries < 3) {
					setTimeout(() => {
						state.retries++;
						state.fetchApplications();
					}, 500);
				}
				return state;
			});
		} finally {
			set({ loading: false });
		}
	},

	// Add a new application
	addApplication: async (application) => {
		try {
			const response = await axios.post("/api/new-application", {
				...application,
				salary: parseInt(application.salary),
			});

			set((state) => {
				const applications = [
					response.data.application,
					...state.applications,
				];

				return {
					applications,
					...calculateDerivedState(applications),
				};
			});
			if (response.status === 200) {
				toast.success("Application added successfully");
			} else {
				throw new Error("Failed to add application");
			}
		} catch (error) {
			toast.error("Failed to add application", {
				description: "Please add the application again",
			});
			console.error("Failed to add application:", error);
			set((state) => {
				state.fetchApplications();
				return state;
			});
		}
	},

	// Archive an application by ID
	archiveApplication: async (applicationId) => {
		try {
			set((state) => {
				const applications = state.applications.map((application) =>
					application.id === applicationId
						? {
								...application,
								status: JobApplicationSchema.shape.status.enum
									.archived,
								previousStatus: application.status,
							}
						: application,
				);
				return {
					applications,
					...calculateDerivedState(applications),
				};
			});

			const response = await axios.patch(
				`/api/archive-application?applicationId=${applicationId}`,
			);

			if (response.status === 200) {
				toast.success("Application archived successfully");
			} else {
				throw new Error("Failed to archive application");
			}
		} catch (error) {
			toast.error("Failed to archive application");
			console.error("Failed to archive application:", error);
			set((state) => {
				state.fetchApplications();
				return state;
			});
		}
	},

	// Restore an application by ID
	restoreApplication: async (applicationId) => {
		try {
			set((state) => {
				const applications = state.applications.map((application) =>
					application.id === applicationId
						? {
								...application,
								status:
									application.previousStatus || "bookmarked",
								previousStatus: null,
							}
						: application,
				);
				return {
					applications,
					...calculateDerivedState(applications),
				};
			});

			const response = await axios.post(
				`/api/restore?applicationId=${applicationId}`,
			);

			if (response.status === 200) {
				toast.success("Application restored successfully");
			} else {
				throw new Error("Failed to restore application");
			}
		} catch (error) {
			toast.error("Failed to restore application");
			console.error("Failed to restore application:", error);
			set((state) => {
				state.fetchApplications();
				return state;
			});
		}
	},

	// Delete an application by ID
	deleteApplication: async (applicationId) => {
		try {
			set((state) => {
				const applications = state.applications.filter(
					(application) => application.id !== applicationId,
				);
				return {
					applications,
					...calculateDerivedState(applications),
				};
			});

			const response = await axios.delete(
				`/api/delete-application?applicationId=${applicationId}`,
			);

			if (response.status === 200) {
				toast.success("Application deleted successfully");
			} else {
				throw new Error("Failed to delete application");
			}
		} catch (error) {
			toast.error("Failed to delete application");
			console.error("Failed to delete application:", error);
			set((state) => {
				state.fetchApplications();
				return state;
			});
		}
	},

	// Move an application to a new status
	moveApplication: async (applicationId, to) => {
		try {
			set((state) => {
				const applications = state.applications.map((application) =>
					application.id === applicationId
						? { ...application, status: to }
						: application,
				);
				return {
					applications,
					...calculateDerivedState(applications),
				};
			});

			const response = await axios.patch(
				`/api/move/${to}?applicationId=${applicationId}`,
			);

			if (response.status === 200) {
				toast.success("Application moved successfully");
			} else {
				throw new Error("Failed to move application");
			}
		} catch (error) {
			toast.error("Failed to move application");
			console.error("Failed to move application:", error);
			set((state) => {
				state.fetchApplications();
				return state;
			});
		}
	},

	// Set the interview date for an application
	setInterviewDate: async (applicationId, date, sendEmail) => {
		// Convert the date to ISO string with timezone awareness
		// const isoDateString = formatISO(date, { representation: "complete" });
		const isoDateString = date.toISOString();
		const sendEmailString = sendEmail ? "1" : "0";

		try {
			// Optimistically update the UI state
			set((state) => {
				const applications: JobApplication[] = state.applications.map(
					(application) =>
						application.id === applicationId
							? {
									...application,
									interview: true,
									interviewDate: date,
								}
							: application,
				);
				return {
					applications,
					...calculateDerivedState(applications),
				};
			});

			// Send the request to update the interview date on the server
			const response = await axios.get(
				`/api/set-interview-date?applicationId=${applicationId}&interviewDate=${isoDateString}&sendEmail=${sendEmailString}`,
			);

			if (response.status === 200) {
				toast.success("Interview date set successfully");
			} else {
				throw new Error("Failed to set interview date");
			}
		} catch (error) {
			toast.error("Failed to set interview date");
			console.error("Failed to set interview date:", error);

			// Revert optimistic update or refetch data
			set((state) => {
				state.fetchApplications(); // Assuming this fetches the latest state from the server
				return state;
			});
		}
	},
	setInterviewerEmail: async (interviewerEmail, applicationId) => {
		try {
			set((state) => {
				const applications: JobApplication[] = state.applications.map(
					(application) =>
						application.id === applicationId
							? {
									...application,
									interview: true,
									interviewerEmail: interviewerEmail,
								}
							: application,
				);
				console.log(applications);
				return {
					applications,
					...calculateDerivedState(applications),
				};
			});

			const response = await setInterviewerEmail(
				interviewerEmail,
				applicationId,
			);

			if (response.success) {
				toast.success("Interviewer email set successfully");
			} else {
				throw new Error("Failed to set interviewer email");
			}
		} catch (error) {
			toast.error("Failed to set interviewer email");
			console.error("Failed to set interviewer email:", error);
			set((state) => {
				state.fetchApplications();
				return state;
			});
		}
	},
}));

// Fetch applications on initial load on client side (store initialization)
if (typeof window !== "undefined") {
	useApplication.getState().fetchApplications();
}
