import { useMatches } from "react-router-dom";
import { HeaderBase, HeaderBack, HeaderClose, HeaderTitle } from "@/layouts/components/header";

export type HeaderType = "base" | "back" | "close" | "title" | "guide" | "none";

export interface HeaderHandle {
  type: HeaderType;
  label?: string;
  showBack?: boolean;
  onClose?: () => void;
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

  const componentMap: Record<HeaderType, React.FC<any>> = {
    base: HeaderBase,
    back: HeaderBack,
    close: HeaderClose,
    title: HeaderTitle,
  };

  const Component = componentMap[header.type];
  if (!Component) return null;

  return {
    component: Component,
    props: header,
  };
}
