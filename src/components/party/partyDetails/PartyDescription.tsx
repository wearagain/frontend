interface PartyDescriptionProps {
  description: string;
}

export const PartyDescription = ({ description }: PartyDescriptionProps) => {
  return (
    <section className='mt-6 pb-6 border-b-2 border-b-gray-200'>
      <h2 className='font-semibold mb-2 text-base'>소개</h2>
      <p className='text-sm text-gray-700 leading-relaxed whitespace-pre-line'>{description}</p>
    </section>
  );
};
