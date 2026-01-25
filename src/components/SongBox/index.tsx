import { memo, type ReactNode } from 'react';
import Song from '../../domain/models/Song';
import './SongBox.css';

interface SongBoxProps {
    song: Song;
    className?: string;
    children?: ReactNode;
}

// Helper function to format duration from seconds to "MM:SS"
const formatDuration = (seconds?: number) => {
    if (!seconds || seconds <= 0) return null;
    const minutes = Math.floor(seconds / 60);
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${secs}`;
};


const SongBox = ({ song, className = '', children }: SongBoxProps) => {
    const containerClass = ['song-box', className].filter(Boolean).join(' ').trim();
    const duration = formatDuration(song.duration);

    return (
        <article className={containerClass}>
            <header>
                <h3 className="song-title">{song.title}</h3>
                <p className="song-artist">{song.artist}</p>
            </header>

            {song.album && <p className="song-album"><em>{song.album}</em></p>}
            {duration && <p className="song-duration">Duration: {duration}</p>}

            {children}
        </article>
    );
};

SongBox.displayName = 'SongBox';
export default memo(SongBox);