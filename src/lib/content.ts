export const defaultEditorContent = {
	type: "doc",
	content: [
		{
			type: "heading",
			attrs: { level: 2 },
			content: [{ text: "Application Info", type: "text" }],
		},
		{
			type: "paragraph",
			content: [
				{
					text: "Here you can add any info or details about your Job application.",
					type: "text",
				},
			],
		},
		{ type: "paragraph", content: [{ text: "Features", type: "text" }] },
		{
			type: "orderedList",
			attrs: { start: 1, tight: true },
			content: [
				{
					type: "listItem",
					content: [
						{
							type: "paragraph",
							content: [
								{
									text: "Slash menu & bubble menu",
									type: "text",
								},
							],
						},
					],
				},
				{
					type: "listItem",
					content: [
						{
							type: "paragraph",
							content: [
								{
									text: "Image uploads (drag & drop / copy & paste, or select from slash menu) ",
									type: "text",
								},
							],
						},
					],
				},
				{
					type: "listItem",
					content: [
						{
							type: "paragraph",
							content: [
								{
									text: "Add Youtube Videos from the command slash menu:",
									type: "text",
								},
							],
						},
						{
							type: "youtube",
							attrs: {
								src: "https://youtu.be/0siE31sqz0Q?si=azf89W7X74fWGQNA",
								start: 0,
								width: 640,
								height: 480,
							},
						},
					],
				},
				{
					type: "listItem",
					content: [
						{
							type: "paragraph",
							content: [
								{
									text: "Mathematical symbols with LaTeX expression (Any fancy money math you want 🙃):",
									type: "text",
								},
							],
						},
					],
				},
			],
		},
		{
			type: "bulletList",
			attrs: { tight: true },
			content: [
				{
					type: "listItem",
					content: [
						{
							type: "paragraph",
							content: [
								{ type: "math", attrs: { latex: "E = mc^2" } },
								{ text: " ", type: "text" },
							],
						},
					],
				},
				{
					type: "listItem",
					content: [
						{
							type: "paragraph",
							content: [
								{ text: " ", type: "text" },
								{
									type: "math",
									attrs: { latex: "a^2 = \\sqrt{b^2 + c^2}" },
								},
							],
						},
					],
				},
				{
					type: "listItem",
					content: [
						{
							type: "paragraph",
							content: [
								{
									type: "math",
									attrs: {
										latex: "\\hat{f} (\\xi)=\\int_{-\\infty}^{\\infty}f(x)e^{-2\\pi ix\\xi}dx",
									},
								},
							],
						},
					],
				},
				{
					type: "listItem",
					content: [
						{
							type: "paragraph",
							content: [
								{
									type: "math",
									attrs: {
										latex: "A=\\begin{bmatrix}a&b\\\\c&d \\end{bmatrix}",
									},
								},
							],
						},
					],
				},
			],
		},
		{ type: "horizontalRule" },
		{ type: "paragraph" },
		{
			type: "heading",
			attrs: { level: 3 },
			content: [
				{
					text: "Preparation Notes:",
					type: "text",
					marks: [{ type: "bold" }],
				},
			],
		},
		{
			type: "taskList",
			content: [
				{
					type: "taskItem",
					attrs: { checked: true },
					content: [
						{
							type: "paragraph",
							content: [
								{
									text: "Review key topics, Practice coding challenges",
									type: "text",
								},
							],
						},
					],
				},
				{
					type: "taskItem",
					attrs: { checked: false },
					content: [
						{
							type: "paragraph",
							content: [
								{
									text: "Prepare questions for the interviewer",
									type: "text",
								},
							],
						},
					],
				},
			],
		},
		{
			type: "heading",
			attrs: { level: 3 },
			content: [
				{
					text: "Follow-Up Plan:",
					type: "text",
					marks: [{ type: "bold" }],
				},
			],
		},
		{
			type: "orderedList",
			attrs: { start: 1, tight: false },
			content: [
				{
					type: "listItem",
					content: [
						{
							type: "paragraph",
							content: [
								{
									text: "Send thank-you email within 24 hours",
									type: "text",
								},
							],
						},
					],
				},
				{
					type: "listItem",
					content: [
						{
							type: "paragraph",
							content: [
								{
									text: "Follow up on interview results if not heard back",
									type: "text",
								},
							],
						},
					],
				},
			],
		},
		{
			type: "heading",
			attrs: { level: 3 },
			content: [
				{
					text: "Interview Outcomes:",
					type: "text",
					marks: [{ type: "bold" }],
				},
			],
		},
		{
			type: "bulletList",
			attrs: { tight: false },
			content: [
				{
					type: "listItem",
					content: [
						{
							type: "paragraph",
							content: [
								{
									text: "Received offer, Rejected, Awaiting feedback",
									type: "text",
								},
							],
						},
					],
				},
			],
		},
		{
			type: "heading",
			attrs: { level: 3 },
			content: [
				{
					text: "Feedback Received:",
					type: "text",
					marks: [{ type: "bold" }],
				},
			],
		},
		{
			type: "taskList",
			content: [
				{
					type: "taskItem",
					attrs: { checked: true },
					content: [
						{
							type: "paragraph",
							content: [
								{
									text: "Positive feedback on technical skills",
									type: "text",
								},
							],
						},
					],
				},
				{
					type: "taskItem",
					attrs: { checked: false },
					content: [
						{
							type: "paragraph",
							content: [
								{
									text: "Suggestions for improvement",
									type: "text",
								},
							],
						},
					],
				},
			],
		},
		{
			type: "heading",
			attrs: { level: 3 },
			content: [
				{
					text: "Next Steps:",
					type: "text",
					marks: [{ type: "bold" }],
				},
				{ text: " ", type: "text" },
			],
		},
		{
			type: "orderedList",
			attrs: { start: 1, tight: false },
			content: [
				{
					type: "listItem",
					content: [
						{
							type: "paragraph",
							content: [
								{
									text: "Prepare for the next round of interviews",
									type: "text",
								},
							],
						},
					],
				},
				{
					type: "listItem",
					content: [
						{
							type: "paragraph",
							content: [
								{
									text: "Reach out to a mentor for advice",
									type: "text",
								},
							],
						},
					],
				},
			],
		},
	],
};
