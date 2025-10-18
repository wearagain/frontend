import { type LucideIcon } from "lucide-react";
import { type SVGProps, type ComponentType } from "react";
import { cn } from "@/lib/utils";

interface SigninSocialButtonProps {
  icon: LucideIcon | ComponentType<SVGProps<SVGSVGElement>>;
  bgColor: string;
  size?: string;
  onClick?: () => void;
}

const SigninSocialButton = ({
  icon: Icon,
  bgColor,
  size = "w-12 h-12",
  onClick,
}: SigninSocialButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center justify-center rounded-full transition-all hover:opacity-90",
        bgColor,
        size
      )}
    >
      <Icon className='w-5 h-5' />
    </button>
  );
};

export default SigninSocialButton;
