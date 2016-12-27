import {
    Component,
    OnInit,
    ViewChild,
    ElementRef,
    AfterViewInit
} from '@angular/core';

@Component({
    selector: 'carousel',
    templateUrl: 'carousel.component.html',
    styleUrls: ['carousel.component.css']
})
export class CarouselComponent implements OnInit, AfterViewInit {
    @ViewChild('slides') slidesRef: ElementRef;

    nodeSlides: Array<Element>;
    imgPrefixes: Array<String>;
    counter: number = 0;
    amount: number;
    current: Element;

    constructor() { }

    ngOnInit() {
        this.imgPrefixes = ['img_1', 'img_2', 'img_3'];
    }

    ngAfterViewInit() {
        this.nodeSlides = this.slidesRef.nativeElement.children;
        this.amount = this.nodeSlides.length;
        this.current = this.nodeSlides[0];

        this.navigateTo(0);
    }

    prevSlide() {
        this.navigateTo(-1);
    }

    nextSlide() {
        this.navigateTo(1);
    }

    imgNameBuilder(prefix: String, resolution: String) {
        return `${prefix}_${resolution}.jpg`;
    }

    navigateTo(direction: number):void {
        this.counter = this.counter + direction;

        if (direction === -1 && this.counter < 0) {
            this.counter = this.amount - 1;
        }

        if (direction === 1 && !this.nodeSlides[this.counter]) {
            this.counter = 0;
        }

        this.current = this.nodeSlides[this.counter];
    }

    isActiveSlide(slideIndex: number):boolean {
        return (this.nodeSlides) ? this.current === this.nodeSlides[slideIndex] : false;
    }
}