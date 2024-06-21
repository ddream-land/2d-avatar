import { FC } from "react";

interface HeaderProps {}

const Header: FC<HeaderProps> = ({}) => {
  return (
    <>
      <nav className="sticky top-0 w-full h-20 px-6 bg-zinc-800 flex justify-between items-center ">
        <div className=""></div>
      </nav>
    </>
  );
};

export default Header;
