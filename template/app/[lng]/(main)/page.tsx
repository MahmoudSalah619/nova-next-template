import { PageWrapper } from "@/components/layout/PageWrapper";
import { HeroBanner } from "@/components/sections/home/HeroBanner";
import { FeaturesSection } from "@/components/sections/home/FeaturesSection";

export default async function Home({
  params,
}: {
  params: Promise<{ lng: string }>;
}) {
  const { lng } = await params;

  return (
    <PageWrapper>
      <HeroBanner lng={lng} />
      <FeaturesSection />
    </PageWrapper>
  );
}
