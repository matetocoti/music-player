import { memo } from "react";
import "./SearchBar.css";

interface SearchBarProps {
  search: string;
  onSearchChange: (newSearch: string) => void;
}

const SearchBar = ({ search, onSearchChange }: SearchBarProps) => {
    return (
        <div className="search-bar-container">
            <input
                className="search-bar"
                type="text"
                placeholder={'\u{1F50D} Search by title or artist'} 
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
            />
        </div>
    );
}

export default memo(SearchBar);