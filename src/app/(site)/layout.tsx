import { SiteShell } from "@/app/(site)/site-shell";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SiteShell>{children}</SiteShell>;
}
