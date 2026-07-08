import { ReduxProvider } from "@/redux/ReduxProvider";
import { dir } from "i18next";
import { ToastProvider } from "@/components/layout/ToastProvider";
import { PageLoader } from "@/components/shared/PageLoader";
import "./globals.scss";

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lng: string }>;
}) {
  const { lng } = await params;

  return (
    <html lang={lng} dir={dir(lng)}>
      <body dir={dir(lng)}>
        <ReduxProvider>
          {children}
          <ToastProvider />
          <PageLoader />
        </ReduxProvider>
      </body>
    </html>
  );
}
