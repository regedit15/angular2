import {Component, OnInit} from '@angular/core';
import {YoutubeService} from '../../services/youtube.service';

declare var $: any;

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    videos;
    videoSeleccionado;

    constructor(private youtubeService: YoutubeService) {

    }

    ngOnInit() {
        this.youtubeService.getVideos().subscribe((videos: any) => {
            this.videos = videos;
        });
    }

    verVideoClick(video) {
        this.videoSeleccionado = video;

        $('#myModal').modal();
    }

    cerrarModalClick() {
        this.videoSeleccionado = null;
        $('#myModal').modal('hide');
    }

    cargarMasClick() {
        this.youtubeService.getVideos().subscribe((videos: any) => {
            this.videos = this.videos.concat(videos);
            // this.videos.push.apply(this.videos, videos);

        });
    }

}
