"use client";
import { defaultEditorContent } from "@/lib/content";
import {
	EditorBubble,
	EditorCommand,
	EditorCommandEmpty,
	EditorCommandItem,
	EditorCommandList,
	EditorContent,
	type EditorInstance,
	EditorRoot,
	type JSONContent,
} from "novel";
import { ImageResizer, handleCommandNavigation } from "novel/extensions";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { defaultExtensions } from "./extensions";
import { ColorSelector } from "./selectors/color-selector";
import { LinkSelector } from "./selectors/link-selector";
import { NodeSelector } from "./selectors/node-selector";
import { MathSelector } from "./selectors/math-selector";
import { Separator } from "@/components/ui/separator";

import { handleImageDrop, handleImagePaste } from "novel/plugins";
import { uploadFn } from "./image-upload";
import { TextButtons } from "./selectors/text-buttons";
import { slashCommand, suggestionItems } from "./slash-command";
import onContentSave from "@/lib/save-content";
import axios from "axios";

const hljs = require("highlight.js");

const extensions = [...defaultExtensions, slashCommand];

export default function TailwindAdvancedEditor({
	applicationId,
}: {
	applicationId: number;
}) {
	const [initialContent, setInitialContent] = useState<null | JSONContent>(
		null,
	);
	const [saveStatus, setSaveStatus] = useState("Saved");
	const [charsCount, setCharsCount] = useState();

	const [openNode, setOpenNode] = useState(false);
	const [openColor, setOpenColor] = useState(false);
	const [openLink, setOpenLink] = useState(false);

	const fetchAndSetContent = async () => {
		try {
			setSaveStatus("Fetching");
			const response = await axios.get(
				"/api/get-content?applicationId=" + applicationId,
			);
			if (response.status !== 200) {
				throw new Error("Failed to fetch content");
			}

			const content = await response.data.content;

			// Save fetched content to localStorage
			window.localStorage.setItem(
				`application${applicationId}-content`,
				JSON.stringify(content),
			);
			// Set the initial content state
			setInitialContent(content);
			setSaveStatus("Saved");
		} catch (error) {
			console.error("Error fetching content:", error);
			// If fetching fails, set default content
			setInitialContent(defaultEditorContent);
			setSaveStatus("Error");
		}
	};

	//Apply Codeblock Highlighting on the HTML from editor.getHTML()
	const highlightCodeblocks = (content: string) => {
		const doc = new DOMParser().parseFromString(content, "text/html");
		doc.querySelectorAll("pre code").forEach((el) => {
			// @ts-ignore
			// https://highlightjs.readthedocs.io/en/latest/api.html?highlight=highlightElement#highlightelement
			hljs.highlightElement(el);
		});
		return new XMLSerializer().serializeToString(doc);
	};

	const debouncedUpdates = useDebouncedCallback(
		async (editor: EditorInstance) => {
			const json = editor.getJSON();
			setCharsCount(editor.storage.characterCount.words());
			window.localStorage.setItem(
				`application${applicationId}-content`,
				JSON.stringify(json),
			);

			/// Uncomment this to save the content in localStorage as HTML and Markdown
			// window.localStorage.setItem(
			// 	"html-content",
			// 	highlightCodeblocks(editor.getHTML()),
			// );

			// window.localStorage.setItem(
			// 	"markdown",
			// 	editor.storage.markdown.getMarkdown(),
			// );
			setSaveStatus("Saved");
		},
		500,
	);

	useEffect(() => {
		console.log("initialContent before", initialContent);
		fetchAndSetContent();
		console.log("initialContent after", initialContent);
	}, []);

	// Only render the editor when the initial content is available
	if (!initialContent) return <div>Loading...</div>;

	return (
		<div className="relative w-full max-w-screen-lg">
			<div className="absolute right-5 top-5 z-10 mb-5 flex gap-2">
				<div className="rounded-lg bg-accent px-4 py-1 text-sm text-muted-foreground">
					{saveStatus}
				</div>
				<div
					className={
						charsCount
							? "rounded-lg bg-accent px-2 py-1 text-sm text-muted-foreground"
							: "hidden"
					}
				>
					{charsCount} Words
				</div>
				<div
					className="cursor-pointer rounded-lg bg-primary px-4 py-1 text-sm text-primary-foreground"
					onClick={async () => {
						setSaveStatus("Saving");
						await debouncedUpdates.flush();
						const content = await window.localStorage.getItem(
							`application${applicationId}-content`,
						);
						if (
							content &&
							content !== JSON.stringify(initialContent)
						) {
							setInitialContent(JSON.parse(content));
							await onContentSave(
								applicationId,
								JSON.parse(content),
							);
						}

						setSaveStatus("Saved");
					}}
				>
					Save Draft
				</div>
			</div>
			<EditorRoot>
				<EditorContent
					initialContent={initialContent}
					extensions={extensions}
					className="relative min-h-[500px] w-full max-w-screen-lg border-muted bg-background sm:mb-[calc(20vh)] sm:rounded-lg sm:border sm:shadow-lg"
					editorProps={{
						handleDOMEvents: {
							keydown: (_view, event) =>
								handleCommandNavigation(event),
						},
						handlePaste: (view, event) =>
							handleImagePaste(view, event, uploadFn),
						handleDrop: (view, event, _slice, moved) =>
							handleImageDrop(view, event, moved, uploadFn),
						attributes: {
							class: "prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full p-8 pt-14",
						},
					}}
					onUpdate={({ editor }) => {
						debouncedUpdates(editor);
						setSaveStatus("Unsaved");
					}}
					slotAfter={<ImageResizer />}
				>
					<EditorCommand className="z-50 h-auto max-h-[330px] overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all">
						<EditorCommandEmpty className="px-2 text-muted-foreground">
							No results
						</EditorCommandEmpty>
						<EditorCommandList>
							{suggestionItems.map((item) => (
								<EditorCommandItem
									value={item.title}
									onCommand={(val) => item.command?.(val)}
									className="flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent"
									key={item.title}
								>
									<div className="flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background">
										{item.icon}
									</div>
									<div>
										<p className="font-medium">
											{item.title}
										</p>
										<p className="text-xs text-muted-foreground">
											{item.description}
										</p>
									</div>
								</EditorCommandItem>
							))}
						</EditorCommandList>
					</EditorCommand>

					<EditorBubble
						tippyOptions={{
							placement: "top",
						}}
						className="flex w-fit max-w-[90vw] overflow-hidden rounded-md border border-muted bg-background shadow-xl"
					>
						<Separator orientation="vertical" />
						<NodeSelector
							open={openNode}
							onOpenChange={setOpenNode}
						/>
						<Separator orientation="vertical" />

						<LinkSelector
							open={openLink}
							onOpenChange={setOpenLink}
						/>
						<Separator orientation="vertical" />
						<MathSelector />
						<Separator orientation="vertical" />
						<TextButtons />
						<Separator orientation="vertical" />
						<ColorSelector
							open={openColor}
							onOpenChange={setOpenColor}
						/>
					</EditorBubble>
				</EditorContent>
			</EditorRoot>
		</div>
	);
}
