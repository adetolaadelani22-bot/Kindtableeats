import React from "react";
import { HeroSection } from "../components/home/HeroSection";
import { TrustStrip } from "../components/home/TrustStrip";
import { WhySection } from "../components/home/WhySection";
import { CategoryGrid } from "../components/home/CategoryGrid";
import { FeaturedSection } from "../components/home/FeaturedSection";
import { StoryFeature } from "../components/home/StoryFeature";
import { CooksSpotlight } from "../components/home/CooksSpotlight";
import { HowItWorksSection } from "../components/home/HowItWorksSection";
import { MarketplaceHighlights } from "../components/home/MarketplaceHighlights";

export const Home: React.FC = () => {
  return (
    <div className="bg-[#F8F5EF] overflow-hidden">
      <HeroSection />
      <TrustStrip />
      <WhySection />
      <CategoryGrid />
      <MarketplaceHighlights />
      <FeaturedSection />
      <StoryFeature />
      <CooksSpotlight />
      <HowItWorksSection />
    </div>
  );
};
