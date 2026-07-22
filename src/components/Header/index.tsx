import { memo, type ReactNode, type HTMLAttributes } from "react";


export interface HeaderProps extends HTMLAttributes<HTMLElement> {
  title?: string;
  children?: ReactNode;
}

const Header = ({ title = "Music-Player", className = "", children, ...props }: HeaderProps) => {
  return (
    <header 
      className={`flex flex-col items-center justify-center gap-4 p-4 ${className}`.trim()}
      {...props}
    >
      <h1 className="text-2xl font-bold quill">{title}</h1>
      {children}
    </header>
  );
};

export default memo(Header);