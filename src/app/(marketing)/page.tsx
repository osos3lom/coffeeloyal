import Hero from "@/components/marketing/sections/Hero";
import TrustStrip from "@/components/marketing/sections/TrustStrip";
import Heritage from "@/components/marketing/sections/Heritage";
import CraftPillars from "@/components/marketing/sections/CraftPillars";
import MenuPreview from "@/components/marketing/sections/MenuPreview";
import LoyaltyBand from "@/components/marketing/sections/LoyaltyBand";
import GalleryStrip from "@/components/marketing/sections/GalleryStrip";
import StoresTeaser from "@/components/marketing/sections/StoresTeaser";

/**
 * The narrative arc, in order:
 * premium -> heritage -> craft -> hospitality -> loyalty -> action.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Heritage />
      <CraftPillars />
      <MenuPreview />
      <LoyaltyBand />
      <GalleryStrip />
      <StoresTeaser />
    </>
  );
}
