import { HeaderBase, HeaderBack, HeaderClose, HeaderGuide } from "@/layouts/components/header";

interface HeaderRule<Props = Record<string, unknown>> {
  component: React.FC<Props>;
  props?: Props;
}

export const headerConfig: Record<string, HeaderRule> = {
  "/": { component: HeaderBase },
  "/onboarding": { component: HeaderGuide },
  "/detail": { component: HeaderBack, props: { label: "상세 보기" } },
  "/modal": { component: HeaderClose, props: { onClose: () => window.history.back() } },
};

export function getHeaderByPath(pathname: string): HeaderRule | null {
  const exact = headerConfig[pathname];
  if (exact) return exact;

  const matched = Object.keys(headerConfig).find((key) => pathname.startsWith(key));
  return matched ? headerConfig[matched] : null;
}
