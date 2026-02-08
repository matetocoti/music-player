import Song from "../domain/models/Song";

const songsDB: Song[] = [
    new Song({ id: "1", title: "Imagine", artist: "John Lennon", album: "Imagine", duration: 183 }),
    new Song({ id: "2", title: "Bohemian Rhapsody", artist: "Queen", album: "A Night at the Opera", duration: 354 }),
    new Song({ id: "3", title: "Hotel California", artist: "Eagles", album: "Hotel California", duration: 391 }),
    new Song({ id: "4", title: "Billie Jean", artist: "Michael Jackson", album: "Thriller", duration: 294 }),
    new Song({ id: "5", title: "Smells Like Teen Spirit", artist: "Nirvana", album: "Nevermind", duration: 301 }),

    new Song({ id: "6", title: "Hey Jude", artist: "The Beatles", album: "Hey Jude", duration: 431 }),
    new Song({ id: "7", title: "Like a Rolling Stone", artist: "Bob Dylan", album: "Highway 61 Revisited", duration: 369 }),
    new Song({ id: "8", title: "I Can't Get No Satisfaction", artist: "The Rolling Stones", album: "Out of Our Heads", duration: 222 }),
    new Song({ id: "9", title: "God Only Knows", artist: "The Beach Boys", album: "Pet Sounds", duration: 175 }),
    new Song({ id: "10", title: "Stairway to Heaven", artist: "Led Zeppelin", album: "Led Zeppelin IV", duration: 482 }),

    new Song({ id: "11", title: "Let It Be", artist: "The Beatles", album: "Let It Be", duration: 243 }),
    new Song({ id: "12", title: "Purple Haze", artist: "Jimi Hendrix", album: "Are You Experienced", duration: 170 }),
    new Song({ id: "13", title: "Wish You Were Here", artist: "Pink Floyd", album: "Wish You Were Here", duration: 334 }),
    new Song({ id: "14", title: "Comfortably Numb", artist: "Pink Floyd", album: "The Wall", duration: 384 }),
    new Song({ id: "15", title: "Heroes", artist: "David Bowie", album: "Heroes", duration: 372 }),

    new Song({ id: "16", title: "Born to Run", artist: "Bruce Springsteen", album: "Born to Run", duration: 269 }),
    new Song({ id: "17", title: "What's Going On", artist: "Marvin Gaye", album: "What's Going On", duration: 233 }),
    new Song({ id: "18", title: "Superstition", artist: "Stevie Wonder", album: "Talking Book", duration: 251 }),
    new Song({ id: "19", title: "No Woman, No Cry", artist: "Bob Marley", album: "Natty Dread", duration: 255 }),
    new Song({ id: "20", title: "One Love", artist: "Bob Marley", album: "Exodus", duration: 176 }),

    new Song({ id: "21", title: "Thriller", artist: "Michael Jackson", album: "Thriller", duration: 357 }),
    new Song({ id: "22", title: "Beat It", artist: "Michael Jackson", album: "Thriller", duration: 258 }),
    new Song({ id: "23", title: "Take On Me", artist: "a-ha", album: "Hunting High and Low", duration: 225 }),
    new Song({ id: "24", title: "Every Breath You Take", artist: "The Police", album: "Synchronicity", duration: 253 }),
    new Song({ id: "25", title: "With or Without You", artist: "U2", album: "The Joshua Tree", duration: 296 }),

    new Song({ id: "26", title: "Sweet Child O' Mine", artist: "Guns N' Roses", album: "Appetite for Destruction", duration: 356 }),
    new Song({ id: "27", title: "Livin' on a Prayer", artist: "Bon Jovi", album: "Slippery When Wet", duration: 250 }),
    new Song({ id: "28", title: "Don't Stop Believin'", artist: "Journey", album: "Escape", duration: 251 }),
    new Song({ id: "29", title: "Africa", artist: "Toto", album: "Toto IV", duration: 295 }),
    new Song({ id: "30", title: "Take Me Home, Country Roads", artist: "John Denver", album: "Poems, Prayers & Promises", duration: 191 }),

    new Song({ id: "31", title: "Hallelujah", artist: "Leonard Cohen", album: "Various Positions", duration: 283 }),
    new Song({ id: "32", title: "Yesterday", artist: "The Beatles", album: "Help!", duration: 125 }),
    new Song({ id: "33", title: "Karma Police", artist: "Radiohead", album: "OK Computer", duration: 262 }),
    new Song({ id: "34", title: "Creep", artist: "Radiohead", album: "Pablo Honey", duration: 238 }),
    new Song({ id: "35", title: "Losing My Religion", artist: "R.E.M.", album: "Out of Time", duration: 269 }),

    new Song({ id: "36", title: "Wonderwall", artist: "Oasis", album: "(What's the Story) Morning Glory?", duration: 258 }),
    new Song({ id: "37", title: "Back in Black", artist: "AC/DC", album: "Back in Black", duration: 255 }),
    new Song({ id: "38", title: "Highway to Hell", artist: "AC/DC", album: "Highway to Hell", duration: 208 }),
    new Song({ id: "39", title: "Paint It Black", artist: "The Rolling Stones", album: "Aftermath", duration: 201 }),
    new Song({ id: "40", title: "Gimme Shelter", artist: "The Rolling Stones", album: "Let It Bleed", duration: 270 }),

    new Song({ id: "41", title: "All Along the Watchtower", artist: "Jimi Hendrix", album: "Electric Ladyland", duration: 240 }),
    new Song({ id: "42", title: "Sultans of Swing", artist: "Dire Straits", album: "Dire Straits", duration: 347 }),
    new Song({ id: "43", title: "Time", artist: "Pink Floyd", album: "The Dark Side of the Moon", duration: 413 }),
    new Song({ id: "44", title: "Money", artist: "Pink Floyd", album: "The Dark Side of the Moon", duration: 382 }),
    new Song({ id: "45", title: "Riders on the Storm", artist: "The Doors", album: "L.A. Woman", duration: 430 }),

    new Song({ id: "46", title: "Light My Fire", artist: "The Doors", album: "The Doors", duration: 431 }),
    new Song({ id: "47", title: "Piano Man", artist: "Billy Joel", album: "Piano Man", duration: 339 }),
    new Song({ id: "48", title: "Uptown Girl", artist: "Billy Joel", album: "An Innocent Man", duration: 197 }),
    new Song({ id: "49", title: "Free Fallin'", artist: "Tom Petty", album: "Full Moon Fever", duration: 262 }),
    new Song({ id: "50", title: "American Girl", artist: "Tom Petty", album: "Tom Petty and the Heartbreakers", duration: 214 }),

    new Song({ id: "51", title: "Born to Be Wild", artist: "Steppenwolf", album: "Steppenwolf", duration: 210 }),
    new Song({ id: "52", title: "Sweet Home Chicago", artist: "Robert Johnson", album: "King of the Delta Blues Singers", duration: 180 }),
    new Song({ id: "53", title: "All Night Long", artist: "Lionel Richie", album: "All the Great Hits", duration: 294 }),
    new Song({ id: "54", title: "Uptown Funk", artist: "Bruno Mars", album: "8701", duration: 269 }),
    new Song({ id: "55", title: "Blinding Lights", artist: "The Weeknd", album: "After Hours", duration: 200 }),

    new Song({ id: "56", title: "Shape of You", artist: "Ed Sheeran", album: "÷", duration: 234 }),
    new Song({ id: "57", title: "Someone Like You", artist: "Adele", album: "21", duration: 285 }),
    new Song({ id: "58", title: "Bad Guy", artist: "Billie Eilish", album: "When We All Fall Asleep, Where Do We Go?", duration: 194 }),
    new Song({ id: "59", title: "Levitating", artist: "Dua Lipa", album: "Future Nostalgia", duration: 203 }),
    new Song({ id: "60", title: "Good as Hell", artist: "Lizzo", album: "Cuz I Love You", duration: 162 }),

    new Song({ id: "61", title: "Wonderland", artist: "Taylor Swift", album: "1989", duration: 210 }),
    new Song({ id: "62", title: "Street Spirit", artist: "Radiohead", album: "The Bends", duration: 351 }),
    new Song({ id: "63", title: "Sultana", artist: "Skye", album: "Just Skye", duration: 245 }),
    new Song({ id: "64", title: "Dreams", artist: "Fleetwood Mac", album: "Rumours", duration: 196 }),
    new Song({ id: "65", title: "Gold Dust Woman", artist: "Fleetwood Mac", album: "Rumours", duration: 305 }),

    new Song({ id: "66", title: "Black Magic Woman", artist: "Santana", album: "Abraxas", duration: 313 }),
    new Song({ id: "67", title: "Smooth", artist: "Santana", album: "Supernatural", duration: 253 }),
    new Song({ id: "68", title: "Whole Lotta Love", artist: "Led Zeppelin", album: "Led Zeppelin II", duration: 333 }),
    new Song({ id: "69", title: "Black Dog", artist: "Led Zeppelin", album: "Led Zeppelin IV", duration: 296 }),
    new Song({ id: "70", title: "Paradise City", artist: "Guns N' Roses", album: "Appetite for Destruction", duration: 334 }),

    new Song({ id: "71", title: "Master of Puppets", artist: "Metallica", album: "Master of Puppets", duration: 515 }),
    new Song({ id: "72", title: "Enter Sandman", artist: "Metallica", album: "The Black Album", duration: 334 }),
    new Song({ id: "73", title: "Screaming in the Night", artist: "Europe", album: "The Final Countdown", duration: 299 }),
    new Song({ id: "74", title: "Tainted Love", artist: "Soft Cell", album: "Non-Stop Erotic Cabaret", duration: 274 }),
    new Song({ id: "75", title: "Mickey", artist: "Toni Basil", album: "Word Up!", duration: 202 }),

    new Song({ id: "76", title: "Girls Just Want to Have Fun", artist: "Cyndi Lauper", album: "She's So Unusual", duration: 240 }),
    new Song({ id: "77", title: "Eye of the Tiger", artist: "Survivor", album: "Eye of the Tiger", duration: 246 }),
    new Song({ id: "78", title: "We Are the Champions", artist: "Queen", album: "News of the World", duration: 178 }),
    new Song({ id: "79", title: "Another One Bites the Dust", artist: "Queen", album: "The Game", duration: 216 }),
    new Song({ id: "80", title: "Under Pressure", artist: "Queen", album: "Hot Space", duration: 248 }),

    new Song({ id: "81", title: "Smells Like Life", artist: "David Bowie", album: "Space Oddity", duration: 264 }),
    new Song({ id: "82", title: "Crazy", artist: "Gnarls Barkley", album: "St. Elsewhere", duration: 182 }),
    new Song({ id: "83", title: "Zombie", artist: "The Cranberries", album: "No Need to Argue", duration: 294 }),
    new Song({ id: "84", title: "Girls", artist: "The 1975", album: "The 1975", duration: 243 }),
    new Song({ id: "85", title: "Antihero", artist: "Taylor Swift", album: "Midnights", duration: 216 }),

    new Song({ id: "86", title: "Vogue", artist: "Madonna", album: "I'm Breathless", duration: 297 }),
    new Song({ id: "87", title: "Like a Prayer", artist: "Madonna", album: "Like a Prayer", duration: 324 }),
    new Song({ id: "88", title: "Toxic", artist: "Britney Spears", album: "In the Zone", duration: 200 }),
    new Song({ id: "89", title: "My Heart Will Go On", artist: "Celine Dion", album: "Titanic: Music from the Motion Picture", duration: 238 }),
    new Song({ id: "90", title: "When Will I Be Loved", artist: "Everly Brothers", album: "The Golden Voice of", duration: 248 }),

    new Song({ id: "91", title: "No Diggity", artist: "BG Knocc Out", album: "Loc'ed After Dark", duration: 242 }),
    new Song({ id: "93", title: "Dance the Night Away", artist: "Van Halen", album: "Van Halen II", duration: 219 }),
    new Song({ id: "94", title: "Jump", artist: "Van Halen", album: "1984", duration: 203 }),
    new Song({ id: "95", title: "Panama", artist: "Van Halen", album: "1984", duration: 333 }),

    new Song({ id: "99", title: "Bridge Over Troubled Water", artist: "Simon & Garfunkel", album: "Bridge Over Troubled Water", duration: 310 }),
    new Song({ id: "100", title: "The Sound of Silence", artist: "Simon & Garfunkel", album: "Sounds of Silence", duration: 260 }),
];

export default songsDB;
