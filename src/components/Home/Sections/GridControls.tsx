import { Grid2X2 } from "lucide-react";

import useResponsiveGridColumns from "../../../hooks/useResponsiveGridColumns";
import { clampGridColumns, getAvailableGridColumns } from "../../../utils/library";
import Select from "../../UI/Select";

interface GridControlsProps {
  columns: number;
  onColumnsChange: (columns: number) => void;
}

const GridControls = ({ columns, onColumnsChange }: GridControlsProps) => {
  const maxColumns = useResponsiveGridColumns();
  const availableColumns = getAvailableGridColumns(maxColumns);

  return (
    <div className="flex items-center gap-2 rounded-2xl border border-zinc-200/70 bg-white/70 px-3 py-2 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
      <Grid2X2 className="h-4 w-4 shrink-0 text-emerald-500" aria-hidden="true" />
      <label className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
        <span>Cols</span>
        <Select
          value={String(clampGridColumns(columns, maxColumns))}
          onChange={(value) => onColumnsChange(Number(value))}
          ariaLabel="Grid columns"
          options={availableColumns.map((value) => ({ value: String(value), label: String(value) }))}
          className="border border-zinc-200 px-1.5 py-1 dark:border-zinc-700"
        />
      </label>
      <span className="text-zinc-300 dark:text-zinc-700">x</span>
    </div>
  );
};

export default GridControls;