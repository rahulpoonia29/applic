import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/store/useModal";
import { Button } from "../ui/button";
import ApplicationDetails from "../application/applicationDetails";

type Props = {};

function ApplicationDetailsMobile({}: Props) {
	const { type, onClose, isOpen, data } = useModal();
	const isModalOpen = isOpen && type === "application-details";

	return (
		<Dialog open={isModalOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[600px]">
				<DialogHeader>
					<DialogTitle>New Application</DialogTitle>
					<DialogDescription>
						Add a new job application
					</DialogDescription>
				</DialogHeader>
				{data.application ? (
					<ApplicationDetails application={data.application} />
				) : (
					<div>
						<p>No Application Found</p>
						<Button onClick={() => onClose()}>Close</Button>
					</div>
				)}
			</DialogContent>
			<DialogFooter></DialogFooter>
		</Dialog>
	);
}

export default ApplicationDetailsMobile;
