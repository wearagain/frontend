import type { LucideIcon } from "lucide-react";
import { Home, Users, MessageSquare, Ticket, User } from "lucide-react";

export interface NavItem {
  label: string;
  path: string;
  icon?: LucideIcon;
  auth?: boolean;
}

export const mainMenu: NavItem[] = [
  { label: "홈", path: "/home", icon: Home },
  { label: "파티", path: "/party", icon: Users },
  { label: "커뮤니티", path: "/community", icon: MessageSquare },
  { label: "티켓", path: "/ticket", icon: Ticket },
  { label: "마이페이지", path: "/mypage", icon: User, auth: true },
];
