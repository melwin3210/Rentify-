import { HeroSection } from "@/components/home/hero-section"
import { FeaturedProperties } from "@/components/home/featured-properties"
import { RecentProperties } from "@/components/home/recent-properties"
import SearchSectionI18n from "@/components/home/search-section-i18n"

export default function HomePage() {
  return (
    <div className="space-y-12">
      <HeroSection />
      <SearchSectionI18n />
      <FeaturedProperties />
      <RecentProperties />
    </div>
  )
}