interface MenuProps {
  onApprove?: () => void;
  onReject?: () => void;
}

export default function PartyAdminDropdownContents({ onApprove, onReject }: MenuProps) {
  return (
    <div className='flex flex-col gap-2'>
      <button className='dropdown-menu-item' onClick={onApprove}>
        승인하기
      </button>
      <div className='border-b border-gray-300' />
      <button className='text-red-500 dropdown-menu-item' onClick={onReject}>
        반려하기
      </button>
    </div>
  );
}
