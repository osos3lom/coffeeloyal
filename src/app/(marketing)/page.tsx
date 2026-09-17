import Hero from "@/components/marketing/sections/Hero";
import TrustStrip from "@/components/marketing/sections/TrustStrip";
import MenuPreview from "@/components/marketing/sections/MenuPreview";
import LoyaltyBand from "@/components/marketing/sections/LoyaltyBand";
import StoresTeaser from "@/components/marketing/sections/StoresTeaser";
import BlogTeaser from "@/components/marketing/sections/BlogTeaser";

/**
 * Princes Coffee pitch demo:
 * Shortened landing page with 6 cohesive sections:
 * Hero -> TrustStrip -> MenuPreview -> LoyaltyBand -> StoresTeaser -> BlogTeaser
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <MenuPreview />
      <LoyaltyBand />
      <StoresTeaser />
      <BlogTeaser />
    </>
  );
}
