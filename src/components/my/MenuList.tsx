import MenuItem from "@/components/common/header/hamburger/MenuItem";
import { myMenuGroups } from "@/components/my/config/menuGroups.ts";

export default function MenuList() {
  return (
    <nav className='flex flex-col gap-4 my-5 font-medium px-5 pb-8'>
      {myMenuGroups.map((group) => (
        <section key={group.title} className='flex flex-col gap-1'>
          <p className='font-medium text-sm text-[#555558]'>{group.title}</p>
          {group.items.map((item) => (
            <MenuItem key={`${group.title}-${item.label}`} item={item} onClose={() => {}} />
          ))}
        </section>
      ))}
    </nav>
  );
}
