export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex min-h-full w-full items-center justify-center bg-accent p-2 md:p-4">
			{children}
		</div>
	);
}
