type SongProps = {
    id: string;
    title: string;
    artist: string;
    album?: string;
    duration?: number; // seconds
    url?: string;
};

class Song {
    readonly id: string;
    title: string;
    artist: string;
    album: string;
    duration: number;
    url: string;

    constructor({ id, title, artist, album = '', duration = 0, url = '' }: SongProps) {
        if (!id || !title || !artist) {
            throw new Error('id, title and artist are required');
        }
        if (duration < 0) {
            throw new Error('duration must be non-negative');
        }

        this.id = id;
        this.title = title;
        this.artist = artist;
        this.album = album;
        this.duration = duration;
        this.url = url;
    }
    
    // serializes the Song to a plain object
    toJSON(): SongProps {
        return {
            id: this.id,
            title: this.title,
            artist: this.artist,
            album: this.album,
            duration: this.duration,
            url: this.url
        };
    }

    // returns a new Song with applied changes (immutable update)
    with(changes: Partial<SongProps>): Song {
        return new Song({ ...this.toJSON(), ...changes });
    }
}

export default Song;