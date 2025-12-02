import { useMatches } from "react-router-dom";
import { HeaderBase, HeaderBack, HeaderClose, HeaderTitle } from "@/layouts/components/header";
import HeaderBackClose from "@/layouts/components/header/HeaderBackClose.tsx";
import HeaderAdmin from "@/layouts/components/header/HeaderAdmin.tsx";

export type HeaderType = "base" | "back" | "close" | "title" | "guide" | "backClose";
export type HeaderAdminType = "adminBase";

export interface HeaderHandle {
  type: HeaderType | HeaderAdminType;
  label?: string;
  showBack?: boolean;
  onClose?: () => void;
  to?: string;
}

export interface HeaderRule {
  component: React.FC<any>;
  props?: HeaderHandle;
}

export function useHeader(): HeaderRule | null {
  const matches = useMatches();

  const header = matches
    .map((m) => (m.handle as { header?: HeaderHandle })?.header)
    .filter(Boolean)
    .at(-1);

  if (!header) return null;

  const componentMap: Record<HeaderType | HeaderAdminType, React.FC<any>> = {
    base: HeaderBase,
    back: HeaderBack,
    close: HeaderClose,
    title: HeaderTitle,
    backClose: HeaderBackClose,
    adminBase: HeaderAdmin,
  };

  const Component = componentMap[header.type];
  if (!Component) return null;

  return {
    component: Component,
    props: header,
  };
}
