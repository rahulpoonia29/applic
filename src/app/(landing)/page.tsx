import { HeroSection } from "./_components/hero-section";
import { ProductFeatures } from "./_components/product-features";
import { ProductShowcaseVideo } from "./_components/product-showcase-video";

export default function Home() {
	return (
		<div className="flex min-h-full flex-col justify-center gap-10 overflow-y-auto pb-10 pt-36 md:gap-20 md:pt-52 lg:items-center">
			<div className="flex w-full items-center justify-center">
				<HeroSection />
			</div>
			<ProductShowcaseVideo />
			<ProductFeatures />
		</div>
	);
}
