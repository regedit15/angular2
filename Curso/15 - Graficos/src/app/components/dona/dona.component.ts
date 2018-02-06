import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-dona',
    templateUrl: './dona.component.html',
    styleUrls: ['./dona.component.css']
})
export class DonaComponent implements OnInit {

    // Doughnut
    public doughnutChartLabels = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
    public doughnutChartData = [350, 450, 100];
    public doughnutChartType = 'doughnut';

    constructor() {
    }

    ngOnInit() {
    }

    // events
    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }

    public random() {

        this.doughnutChartData = [
            Math.round(Math.random() * 100),
            Math.round(Math.random() * 100),
            Math.round(Math.random() * 100),
        ];
    }
}
