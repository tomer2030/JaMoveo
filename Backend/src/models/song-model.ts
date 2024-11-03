
// Interface for what will can contain a word
interface WordModel {
    lyrics: string;
    chord?: string;
}

// Interface for the details about the song
interface SongDetailsModel{
    name: string,
    author: string
}

class SongModel {

    public details: SongDetailsModel;
    public song: WordModel[][];


    public constructor(song: SongModel){
        this.details = song.details;
        this.song = song.song;
    }
}

export default SongModel;