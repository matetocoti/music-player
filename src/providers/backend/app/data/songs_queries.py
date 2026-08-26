class SongsQueries:
    CREATE_TABLE = """
        CREATE TABLE IF NOT EXISTS songs (
            id TEXT PRIMARY KEY,
            title TEXT NOT NULL,
            artist TEXT NOT NULL,
            album TEXT NOT NULL DEFAULT '',
            duration INTEGER NOT NULL DEFAULT 0,
            url TEXT NOT NULL DEFAULT ''
        )
    """

    COUNT_ALL = "SELECT COUNT(*) FROM songs"

    INSERT = """
        INSERT OR REPLACE INTO songs (id, title, artist, album, duration, url)
        VALUES (:id, :title, :artist, :album, :duration, :url)
    """

    COUNT_BY_SEARCH = """
        SELECT COUNT(*) FROM songs
        WHERE CASEFOLD(title) LIKE CASEFOLD(?)
           OR CASEFOLD(artist) LIKE CASEFOLD(?)
    """

    LIST = """
        SELECT id, title, artist, album, duration
        FROM songs
        WHERE CASEFOLD(title) LIKE CASEFOLD(?)
           OR CASEFOLD(artist) LIKE CASEFOLD(?)
        ORDER BY CAST(id AS INTEGER), id
        LIMIT ? OFFSET ?
    """

    GET_BY_ID = """
        SELECT id, title, artist, album, duration
        FROM songs
        WHERE id = ?
        LIMIT 1
    """