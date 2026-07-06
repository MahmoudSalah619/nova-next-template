import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

export default async function MainLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lng: string }>;
}) {
  const { lng } = await params;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar lng={lng} />
      <main className="flex-1">{children}</main>
      <Footer/>
    </div>
  )
}