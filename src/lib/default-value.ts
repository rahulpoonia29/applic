export const defaultEditorContent = {
	type: "doc",
	content: [
		{
			type: "heading",
			attrs: {
				level: 3,
			},
			content: [
				{
					type: "text",
					marks: [
						{
							type: "bold",
						},
					],
					text: "Interview Format:",
				},
				{
					type: "text",
					text: " ",
				},
			],
		},
		{
			type: "paragraph",
			content: [
				{
					type: "text",
					text: "e.g., Phone call, Video conference, In-person",
				},
			],
		},
		{
			type: "heading",
			attrs: {
				level: 3,
			},
			content: [
				{
					type: "text",
					marks: [
						{
							type: "bold",
						},
					],
					text: "Platform/Location:",
				},
				{
					type: "text",
					text: " ",
				},
			],
		},
		{
			type: "paragraph",
			content: [
				{
					type: "text",
					text: "e.g., Zoom link, Office address",
				},
			],
		},
		{
			type: "heading",
			attrs: {
				level: 3,
			},
			content: [
				{
					type: "text",
					marks: [
						{
							type: "bold",
						},
					],
					text: "Preparation Notes:",
				},
			],
		},
		{
			type: "taskList",
			content: [
				{
					type: "taskItem",
					attrs: {
						checked: false,
					},
					content: [
						{
							type: "paragraph",
							content: [
								{
									type: "text",
									text: "Review key topics, Practice coding challenges",
								},
							],
						},
					],
				},
				{
					type: "taskItem",
					attrs: {
						checked: false,
					},
					content: [
						{
							type: "paragraph",
							content: [
								{
									type: "text",
									text: "Prepare questions for the interviewer",
								},
							],
						},
					],
				},
			],
		},
		{
			type: "heading",
			attrs: {
				level: 3,
			},
			content: [
				{
					type: "text",
					marks: [
						{
							type: "bold",
						},
					],
					text: "Follow-Up Plan:",
				},
			],
		},
		{
			type: "orderedList",
			attrs: {
				start: 1,
			},
			content: [
				{
					type: "listItem",
					content: [
						{
							type: "paragraph",
							content: [
								{
									type: "text",
									text: "Send thank-you email within 24 hours",
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
									type: "text",
									text: "Follow up on interview results if not heard back",
								},
							],
						},
					],
				},
			],
		},
		{
			type: "heading",
			attrs: {
				level: 3,
			},
			content: [
				{
					type: "text",
					marks: [
						{
							type: "bold",
						},
					],
					text: "Interview Outcomes:",
				},
			],
		},
		{
			type: "bulletList",
			content: [
				{
					type: "listItem",
					content: [
						{
							type: "paragraph",
							content: [
								{
									type: "text",
									text: "Received offer, Rejected, Awaiting feedback",
								},
							],
						},
					],
				},
			],
		},
		{
			type: "heading",
			attrs: {
				level: 3,
			},
			content: [
				{
					type: "text",
					marks: [
						{
							type: "bold",
						},
					],
					text: "Feedback Received:",
				},
			],
		},
		{
			type: "taskList",
			content: [
				{
					type: "taskItem",
					attrs: {
						checked: false,
					},
					content: [
						{
							type: "paragraph",
							content: [
								{
									type: "text",
									text: "e.g., Positive feedback on technical skills",
								},
							],
						},
					],
				},
				{
					type: "taskItem",
					attrs: {
						checked: false,
					},
					content: [
						{
							type: "paragraph",
							content: [
								{
									type: "text",
									text: "e.g., Suggestions for improvement",
								},
							],
						},
					],
				},
			],
		},
		{
			type: "heading",
			attrs: {
				level: 3,
			},
			content: [
				{
					type: "text",
					marks: [
						{
							type: "bold",
						},
					],
					text: "Next Steps:",
				},
				{
					type: "text",
					text: " ",
				},
			],
		},
		{
			type: "orderedList",
			attrs: {
				start: 1,
			},
			content: [
				{
					type: "listItem",
					content: [
						{
							type: "paragraph",
							content: [
								{
									type: "text",
									text: "Prepare for the next round of interviews",
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
									type: "text",
									text: "Reach out to a mentor for advice",
								},
							],
						},
					],
				},
			],
		},
	],
};
