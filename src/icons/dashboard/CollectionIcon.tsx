const CollectionIcon = ({ className }: { className: string }) => {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.5 6.875C17.5 4.80393 15.7511 3.125 13.5938 3.125C11.9807 3.125 10.5961 4.06356 10 5.40285C9.40393 4.06356 8.01927 3.125 6.40625 3.125C4.24889 3.125 2.5 4.80393 2.5 6.875C2.5 12.8921 10 16.875 10 16.875C10 16.875 17.5 12.8921 17.5 6.875Z"
        stroke="white"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CollectionIcon;
