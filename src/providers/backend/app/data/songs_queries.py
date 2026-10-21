class SongsQueries:
    CREATE_TABLE = """
        CREATE TABLE IF NOT EXISTS songs (
            id TEXT PRIMARY KEY,
            title TEXT NOT NULL,
            artist TEXT NOT NULL,
            album TEXT NOT NULL DEFAULT '',
            duration INTEGER NOT NULL DEFAULT 0,
            url TEXT NOT NULL DEFAULT '',
            category TEXT NOT NULL DEFAULT '',
            favorite INTEGER NOT NULL DEFAULT 0 CHECK (favorite IN (0, 1))
        )
    """

    COUNT_ALL = "SELECT COUNT(*) FROM songs"

    LIST_CATEGORIES = """
        SELECT DISTINCT category
        FROM songs
        WHERE TRIM(category) <> ''
        ORDER BY CASEFOLD(category)
    """

    INSERT = """
        INSERT OR REPLACE INTO songs
            (id, title, artist, album, duration, url, category, favorite)
        VALUES
            (:id, :title, :artist, :album, :duration, :url, :category, :favorite)
    """

    COUNT = """
        SELECT COUNT(*) FROM songs
        WHERE {filters}
    """

    LIST = """
        SELECT id, title, artist, album, duration, category, favorite
        FROM songs
        WHERE {filters}
        ORDER BY {order_by} {order_direction}, id {order_direction}
        LIMIT ? OFFSET ?
    """

    GET_BY_ID = """
        SELECT id, title, artist, album, duration, category, favorite
        FROM songs
        WHERE id = ?
        LIMIT 1
    """

    UPDATE = """
        UPDATE songs
        SET title = :title,
            artist = :artist,
            album = :album,
            duration = :duration,
            url = :url,
            category = :category,
            favorite = :favorite
        WHERE id = ?
    """