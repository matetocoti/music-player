import { useEffect, useState } from "react";

export const getMaxGridColumns = (width: number): number => {
  if (width < 640) return 1;
  if (width < 769) return 2;
  if (width < 1024) return 4;
  if (width < 1280) return 5;
  return 6;
};

export const getDefaultGridColumns = (width: number): number => {
  if (width < 640) return 1;
  if (width < 769) return 2;
  if (width < 1200) return 3;
  if (width < 1920) return 3;
  return 6;
};

export const getDefaultPageSize = (width: number): number => (
  getDefaultGridColumns(width) === 1 ? 9 : 12
);

const useResponsiveGridColumns = (): number => {
  const [maxColumns, setMaxColumns] = useState(() => (
    typeof window === "undefined" ? 6 : getMaxGridColumns(window.innerWidth)
  ));

  useEffect(() => {
    const updateMaxColumns = () => {
      setMaxColumns(getMaxGridColumns(window.innerWidth));
    };

    updateMaxColumns();
    window.addEventListener("resize", updateMaxColumns);
    return () => window.removeEventListener("resize", updateMaxColumns);
  }, []);

  return maxColumns;
};

export default useResponsiveGridColumns;


