import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';

@Component({
    selector: 'bubblechart',
    templateUrl: 'bubblechart.component.html',
    styleUrls: ['bubblechart.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class BubbleComponent implements OnInit, OnChanges {
    @ViewChild('bubblechart') private chartContainer: ElementRef;
    @Input() private data: Array<any>;

    private chart: any;

    constructor() { }

    ngOnInit() {
        if (this.data) {
            this.createChart();
        }
    }

    ngOnChanges() {
        if (this.chart) {
            this.createChart();
        }
    }

    createChart() {
        let element = this.chartContainer.nativeElement;

        let svg = d3.select(element).append('svg')
            .attr('width', element.offsetWidth)
            .attr('height', element.offsetWidth);
        let diameter = +svg.attr('width');
        let format = d3.format(',d');

        this.chart = svg.append('g').attr('transform', 'translate(2,2)');

        let pack = d3.pack()
            .size([diameter - 4, diameter - 4]);

        let root = d3.hierarchy(this.data)
            .sum((d: any) => d.size)
            .sort((a, b) => (b.value - a.value));

        let node = this.chart.selectAll('.node')
            .data(pack(root).descendants())
            .enter().append('g')
            .attr('class', (d) => d.children ? 'node' : 'leaf node')
            .attr('transform', (d) => `translate(${d.x},${d.y})`);

        node.append('title')
            .text((d: any) => (d.data.name + '\n' + format(d.value)));

        node.append('circle')
            .attr('r', (d) => d.r);

        node.filter((d) => !d.children)
            .append('text')
            .attr('dy', '0.3em')
            .text((d: any) => d.data.name.substring(0, d.r / 3));
    }
}