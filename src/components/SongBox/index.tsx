import { memo, useMemo, type ReactNode } from 'react';
import Song from '../../domain/models/Song';
import './SongBox.css';

interface SongBoxProps {
    song: Song;
    className?: string;
    children?: ReactNode;
}

const formatDuration = (seconds?: number | null): string | null => {
    if (!seconds || seconds <= 0) return null;
    const minutes = Math.floor(seconds / 60);
    const secs = String(seconds % 60).padStart(2, '0');
    return `${minutes}:${secs}`;
};

const joinClasses = (...parts: Array<string | undefined>) => parts.filter(Boolean).join(' ').trim();



const SongBox = ({ song, className, children }: SongBoxProps) => {
    const containerClass = useMemo(() => joinClasses('song-box', className), [className]);

    const { title, artist, album = 'Unknown Album' } = song;
    const duration = useMemo(() => formatDuration(song.duration), [song.duration]);

    return (
        <article className={containerClass}>
            <header className="song-header">
                <h3 className="song-title">{title}</h3>
                <p className="song-artist">{artist}</p>
            </header>

            <p className="song-album">
                <em>{album}</em>
            </p>

            <p className="song-duration">
                Duration: {duration ?? 'Unknown Duration'}
            </p>

            {children}
        </article>
    );
};
SongBox.displayName = 'SongBox';
export default memo(SongBox);