"use client";

import { useEffect } from "react";
import { useDocument } from "./useDocument";

type Props = {};

function DocumentProvider({}: Props) {
	const { fetchDocuments } = useDocument();
	useEffect(() => {
		fetchDocuments();
	}, [fetchDocuments]);

	return null;
}
export default DocumentProvider;
