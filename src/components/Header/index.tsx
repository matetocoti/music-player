import {  memo, type ReactNode } from "react";


export interface HeaderProps {
  title?: string;
  className?: string;
  children?: ReactNode;
}

const Header = ({ title = "Music-Player", className = "", children }: HeaderProps) => {
  return (
    <header className={className}>
      <h1>{title}</h1>
      {children}
    </header>
  );
};

export default memo(Header);