import { useMatches } from "react-router-dom";
import {
  HeaderBase,
  HeaderBack,
  HeaderClose,
  HeaderGuide,
  HeaderBackClose,
  HeaderAdmin,
  HeaderAdminClose,
} from "@/layouts/components/header";

export type HeaderType = "base" | "back" | "close" | "guide" | "backClose";
export type HeaderAdminType = "adminBase" | "adminClose";

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
    guide: HeaderGuide,
    backClose: HeaderBackClose,
    adminBase: HeaderAdmin,
    adminClose: HeaderAdminClose,
  };

  const Component = componentMap[header.type];
  if (!Component) return null;

  return {
    component: Component,
    props: header,
  };
}
