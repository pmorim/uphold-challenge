export function Skeleton() {
  const width = Math.round(Math.random() * 3 + 7);

  return (
    <div className='animate-pulse flex flex-row items-center w-full py-4 px-5 pr-16'>
      <div className={`rounded-full bg-gray-300 h-6 w-[${width}rem]`} />
      <span className='flex-grow' />
      <div className='rounded-full bg-gray-300 h-6 w-6 mr-1' />
      <div className='rounded-full bg-gray-300 h-4 w-8' />
    </div>
  );
}
