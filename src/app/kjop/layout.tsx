import { SiteShell } from "@/app/(site)/site-shell";

export default function KjopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SiteShell>{children}</SiteShell>;
}
