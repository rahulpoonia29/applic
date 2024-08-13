import { JobApplication } from "@/types/JobApplication";
import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";

type useApplicationProps = {
	applications: JobApplication[];
	archivedApplications: JobApplication[];
	archivedCount: number;
	loading: boolean;
	fetchApplications: () => Promise<void>;
	addApplication: (application: JobApplication) => Promise<void>;
	archiveApplication: (applicationId: string) => Promise<void>;
};

export const useApplication = create<useApplicationProps>((set) => ({
	applications: [],
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
				applications: applications.filter(
					(app) => app.status !== "archived"
				),
				archivedApplications: applications.filter(
					(app) => app.status === "archived"
				),
				archivedCount: applications.filter(
					(app) => app.status === "archived"
				).length,
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
				set((state) => ({
					applications: [...state.applications, application],
				}));
			}
		} catch (error) {
			console.error("Failed to add application:", error);
		}
	},
	archiveApplication: async (applicationId: string) => {
		try {
			set((state) => ({
				applications: state.applications.map((application) =>
					application.id === applicationId
						? { ...application, status: "archived" }
						: application
				),
				archivedCount: state.archivedCount + 1,
			}));
			toast.success("Application archived successfully");

			const response = await axios.patch(
				`/api/archive-application?applicationId=${applicationId}`
			);

			if (response.status !== 200) {
				toast.error("Failed to archive application");
				set((state) => ({
					applications: state.applications.map((application) =>
						application.id === applicationId
							? { ...application, status: "applied" }
							: application
					),
					archivedCount: state.archivedCount
						? state.archivedCount - 1
						: 0,
				}));
			}
		} catch (error) {
			console.error("Failed to archive application:", error);
		}
	},
}));

// Use the Zustand store in your components and manage subscriptions accordingly
