export function Skeleton() {
  return (
    <div className='animate-pulse flex flex-row items-center w-full py-4 px-5 pr-16'>
      <div className='rounded-full bg-gray-300 h-6 w-32' />
      <span className='flex-grow' />
      <div className='rounded-full bg-gray-300 h-6 w-6 mr-1' />
      <div className='rounded-full bg-gray-300 h-4 w-8' />
    </div>
  );
}
