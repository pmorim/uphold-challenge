interface ShowAllProps {
  show: boolean;
  toggle(): void;
}

export function ShowAll({ show, toggle }: ShowAllProps) {
  return (
    <button
      onClick={toggle}
      className='text-white bg-uphold-text w-fit mx-auto rounded-full py-2 px-4'
    >
      {show ? 'Show fewer' : 'Show all'}
    </button>
  );
}
