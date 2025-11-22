import {
    HeaderBase,
    HeaderBack,
    HeaderClose,
    HeaderGuide,
    HeaderTitle,
} from "@/layouts/components/header";

interface HeaderRule<Props = Record<string, unknown>> {
    component: React.FC<Props>;
    props?: Props;
}

export const headerConfig: Record<string, HeaderRule> = {
    "/": {component: HeaderBase},
    "/onboarding": {component: HeaderGuide},
    "/detail": {component: HeaderBack, props: {label: "상세 보기"}},
    "/modal": {component: HeaderClose, props: {onClose: () => window.history.back()}},
    "/party/:id/apply": {component: HeaderTitle},
    "/party/:id/apply/complete": {component: HeaderClose},
    "/party/apply": {component: HeaderBase, props: {label: "신청내역", showBack: true}},
    "/party/apply/:id": {component: HeaderBase, props: {label: "신청내역", showBack: true}},
    "/community/exchange": {component: HeaderBase, props: {label: "수선의류 교환", showBack: true}},
    "/community/exchange/list": {component: HeaderBase, props: {label: "수선의류 교환", showBack: true}},
};

export function getHeaderByPath(pathname: string): HeaderRule | null {
    const exact = headerConfig[pathname];
    if (exact) return exact;

    const matched = Object.keys(headerConfig).find((key) => pathname.startsWith(key));
    return matched ? headerConfig[matched] : null;
}
