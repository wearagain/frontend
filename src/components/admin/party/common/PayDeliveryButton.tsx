export default function PayDeliveryButton({onOpen}: { onOpen?: (v?: boolean) => void })  {
  return (
    <button
      type='button'
      onClick={() => onOpen?.(true)}
      className='text-base font-medium'
    >
      상태 변경
    </button>
  )
}