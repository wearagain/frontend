interface HostedParty {
  id: string;
  title: string;
  date: string;
  location: string;
}

interface HostedPartyCardProps {
  party: HostedParty;
  onScanClick: (party: HostedParty) => void;
}

export const HostedPartyCard = ({ party, onScanClick }: HostedPartyCardProps) => {
  return (
    <div className='flex items-center justify-between bg-[var(--color-purple-dark)] rounded-2xl px-5 py-5'>
      <span className='text-white font-medium text-base'>{party.title}</span>
      <button
        onClick={() => onScanClick(party)}
        className='flex items-center gap-2 bg-white rounded-lg px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-100 transition-colors'
      >
        <QrIcon />
        QR 스캔
      </button>
    </div>
  );
};

// QR 아이콘 컴포넌트
const QrIcon = () => (
  <svg
    width='16'
    height='16'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <rect x='3' y='3' width='7' height='7' />
    <rect x='14' y='3' width='7' height='7' />
    <rect x='3' y='14' width='7' height='7' />
    <rect x='14' y='14' width='3' height='3' />
    <path d='M17 14h3v3' />
    <path d='M14 17h3v3' />
  </svg>
);

export type { HostedParty };

