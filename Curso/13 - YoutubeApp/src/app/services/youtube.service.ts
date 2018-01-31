import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class YoutubeService {

    private readonly YOUTUBE_URL = 'https://www.googleapis.com/youtube/v3';
    private readonly API_KEY = 'AIzaSyCVgxDcNPK6NOmh1yLeXB3mAxS0Mcd86pw';
    private readonly PLAYLIST_ID = 'UUuaPTYj15JSkETGnEseaFFg';
    private nextPagewToken;


    constructor(private http: HttpClient) {

    }

    getVideos() {

        let url = `${this.YOUTUBE_URL}/playlistItems`;

        let params = new HttpParams()
            .set('part', 'snippet')
            .set('maxResults', '10')
            .set('playlistId', this.PLAYLIST_ID)
            .set('key', this.API_KEY);

        if (this.nextPagewToken) {
            params = params.set('pageToken', this.nextPagewToken);
        }


        return this.http.get(url, {params: params}).map((res: any) => {
            this.nextPagewToken = res.nextPageToken;

            let videos: any [] = [];

            for (let video of res.items) {
                videos.push(video.snippet);
            }

            return videos;
        });
    }


}
