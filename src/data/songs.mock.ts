import Song from "../domain/models/Song";
const songsDB: Song[] = [
    new Song({
        id: '1',
        title: 'Imagine',
        artist: 'John Lennon',
        album: 'Imagine',
        duration: 183,
    }),
    new Song({
        id: '2',
        title: 'Bohemian Rhapsody',
        artist: 'Queen',
        album: 'A Night at the Opera',
        duration: 354,
    }),
    new Song({
        id: '3',
        title: 'Hotel California',
        artist: 'Eagles',
        album: 'Hotel California',
        duration: 391,
    }),
    new Song({
        id: '4',
        title: 'Billie Jean',
        artist: 'Michael Jackson',
        album: 'Thriller',
        duration: 294,
    }),
    new Song({
        id: '5',
        title: 'Smells Like Teen Spirit',
        artist: 'Nirvana',
        album: 'Nevermind',
        duration: 301,
    }),
];
export default songsDB;