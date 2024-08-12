import { JobApplication } from "@/types/JobApplication";
import axios from "axios";
import { create } from "zustand";

type useApplicationProps = {
	applications: JobApplication[];
	archivedApplications: JobApplication[];
	archivedCount: number;
	loading: boolean;
	fetchApplications: () => Promise<void>;
	addApplication: (application: JobApplication) => Promise<void>;
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
					applications: [
						...state.applications,
						response.data.application,
					],
				}));
			}
		} catch (error) {
			console.error("Failed to add application:", error);
		}
	},
}));

// Use the Zustand store in your components and manage subscriptions accordingly
