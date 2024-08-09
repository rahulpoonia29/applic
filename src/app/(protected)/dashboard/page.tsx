import ApplicationGroup from "@/components/Application/ApplicationGroup";
import { Bookmark } from "lucide-react";
import React from "react";

type Props = {};

function page({}: Props) {
	return (
		<div className="w-full px-3 xl:px-10 py-2 xl:py-3 flex space-x-4 justify-start items-center">
			<ApplicationGroup icon={Bookmark} category={"Bookmarked"} count={2} />
		</div>
	);
}

export default page;
