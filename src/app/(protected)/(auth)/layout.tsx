export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="min-h-full w-full flex items-center p-2 md:p-4 justify-center bg-accent">
			{children}
		</div>
	);
}
