import { memo, type ReactNode } from "react";

interface FooterProps {
  textContent?: ReactNode;
  children?: ReactNode;
  className?: string;
}

const Footer = ({ textContent, children, className = "" }: FooterProps) => {
  const currentYear = new Date().getFullYear();
  const defaultText = `© ${currentYear} Sua Empresa. Todos os direitos reservados.`;
  const content = children ?? textContent ?? defaultText;
  if (!content) return null;
  return (
    <footer 
      className={`w-full border-t border-neutral-200 bg-white py-6 transition-colors duration-300 dark:border-neutral-800 dark:bg-neutral-950 ${className}`}
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-4 md:px-6">
        <div className="text-sm font-medium tracking-tight text-neutral-500 dark:text-neutral-400">
          {content}
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);