import JobApplicationSchema from "@/schema/JobApplication";
import { JobApplication } from "@prisma/client";
import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";

type useApplicationProps = {
	applications: JobApplication[];
	unarchivedApplications: JobApplication[];
	archivedApplications: JobApplication[];
	archivedCount: number;
	loading: boolean;
	fetchApplications: () => Promise<void>;
	addApplication: (application: JobApplication) => Promise<void>;
	archiveApplication: (applicationId: number) => Promise<void>;
	restoreApplication: (applicationId: number) => Promise<void>;
	deleteApplication: (applicationId: number) => Promise<void>;
};

// Utility function to calculate derived state
const calculateDerivedState = (applications: JobApplication[]) => {
	const unarchivedApplications = applications.filter(
		(application) => application.status !== "archived"
	);
	const archivedApplications = applications.filter(
		(application) => application.status === "archived"
	);
	const archivedCount = archivedApplications.length;

	return {
		unarchivedApplications,
		archivedApplications,
		archivedCount,
	};
};

export const useApplication = create<useApplicationProps>((set) => ({
	applications: [],
	unarchivedApplications: [],
	archivedApplications: [],
	archivedCount: 0,
	loading: true,
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
			console.error("Failed to fetch applications:", error);
		} finally {
			set({ loading: false });
		}
	},
	addApplication: async (application: JobApplication) => {
		try {
			const response = await axios.post(
				"/api/new-application",
				application
			);

			if (response.status === 201) {
				set((state) => {
					const applications = [...state.applications, application];
					return {
						applications,
						...calculateDerivedState(applications),
					};
				});
			} else {
				throw new Error("Failed to add application");
			}
		} catch (error) {
			toast.error("Failed to add application");
			console.error("Failed to add application:", error);
		}
	},
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
						: application
				);
				return {
					applications,
					...calculateDerivedState(applications),
				};
			});

			const response = await axios.patch(
				`/api/archive-application?applicationId=${applicationId}`
			);

			if (response.status === 200) {
				toast.success("Application archived successfully");
			} else {
				throw new Error("Failed to archive application");
			}
		} catch (error) {
			toast.error("Failed to archive application");
			console.error("Failed to archive application:", error);
		}
	},
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
						: application
				);
				return {
					applications,
					...calculateDerivedState(applications),
				};
			});

			const response = await axios.post(
				`/api/restore?applicationId=${applicationId}`
			);

			if (response.status === 200) {
				toast.success("Application restored successfully");
			} else {
				throw new Error("Failed to restore application");
			}
		} catch (error) {
			toast.error("Failed to restore application");
			console.error("Failed to restore application:", error);
		}
	},
	deleteApplication: async (applicationId) => {
		try {
			set((state) => {
				const applications = state.applications.filter(
					(application) => application.id !== applicationId
				);
				return {
					applications,
					...calculateDerivedState(applications),
				};
			});

			const response = await axios.delete(
				`/api/delete-application?applicationId=${applicationId}`
			);

			if (response.status === 200) {
				toast.success("Application deleted successfully");
			} else {
				throw new Error("Failed to delete application");
			}
		} catch (error) {
			toast.error("Failed to delete application");
			console.error("Failed to delete application:", error);
		}
	},
}));
