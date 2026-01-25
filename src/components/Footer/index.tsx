import {  memo, type ReactNode } from "react";

interface FooterProps {
  textContent?: ReactNode;
  children?: ReactNode;
  className?: string;
}

const Footer = ({ textContent='2026', children, className}: FooterProps) => {
  // Prioritize children over textContent  
  const content = children ?? textContent ?? null;

  return (
    <footer className={className}>
      {content ? <p>{content}</p> : null}
    </footer>
  );
};

export default memo(Footer);