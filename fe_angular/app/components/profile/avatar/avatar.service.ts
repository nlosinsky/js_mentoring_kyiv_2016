import { Injectable } from '@angular/core';
import { AvatarParts } from './avatar-parts.constant';
import * as FileSaver from 'file-saver';


interface AvatarParts {
    path: string,
    index: number
}

@Injectable()
export class AvatarService {
    private head: AvatarParts = {
        path: '',
        index: 0
    };
    private clothes: AvatarParts = {
        path: '',
        index: 1
    };
    private hair: AvatarParts = {
        path: '',
        index: 2
    };
    private eyebrows: AvatarParts = {
        path: '',
        index: 3
    };
    private eyes: AvatarParts = {
        path: '',
        index: 4
    };
    private nose: AvatarParts = {
        path: '',
        index: 5
    };
    private mouth: AvatarParts = {
        path: '',
        index: 6
    };
    private canvas: any;
    private avatarFolder = 'avatar';
    private showPartsList = ['head', 'clothes', 'hair', 'eyebrows', 'eyes', 'nose', 'mouth'];

    constructor() {}

    setCanvas(canvas: any): AvatarService {
        this.canvas = canvas;
        this.canvas.renderOnAddition = false;
        this.canvas.selection = false;

        return this;
    }

    initAvatar(): AvatarService {
        this.getShowPartsList().forEach((part: string) => {
            this[part].path = this._getRandomElement(AvatarParts[part]);
            this._setPart(this[part]);
        });

        return this;
    };

    getShowPartsList(): string[] {
        return this.showPartsList;
    }

    getPartsList(parts: string): Array<string> {
        return AvatarParts[parts].map((el) => this._constructImgPath(el));
    }

    changePart(part: string, key: string): void {
        if (!this[key]) {
            return;
        }

        this[key].path = this._getImageNameFromPath(part);
        this._setPart(this[key]);
    }

    downloadAvatar(): void {
        this.canvas.clone((tmpCanvas) => {
            let targetSize = 150;

            tmpCanvas.setWidth(targetSize);
            tmpCanvas.setHeight(targetSize);
            tmpCanvas.setZoom(targetSize / this.canvas.width);

            tmpCanvas.contextContainer.canvas.toBlob((blob) => {
                FileSaver.saveAs(blob, 'avatar.png');
            });
        });
    }

    runAnimation(dir): void {
        let pathsCount = this.canvas.getObjects().length;
        let minScale = 1;
        let maxScale = 1.07;

        this.canvas.forEachObject((img, i) => {
            let defaultScale = this.canvas.width / img.width;

            img.animate({
                scaleX: dir ? defaultScale * maxScale : defaultScale * minScale,
                scaleY: dir ? defaultScale * maxScale : defaultScale * minScale
            }, {
                duration: 1000,
                onChange: this.canvas.renderAll.bind(this.canvas),
                onComplete:() => {
                    if (i === (pathsCount - 1)) {
                        this.runAnimation(!dir);
                    }

                }
            });
        });
    }

    dispose(): void {
        this.canvas.dispose();
    }

    isActivePart(part: string, key: string): boolean {
        return this[key] && this[key].path === this._getImageNameFromPath(part);
    }

    _setPart(part: AvatarParts):void {
        let { path, index } = part;

        fabric.Image.fromURL(this._constructImgPath(path), (img) => {
            img.scale(this.canvas.width / img.width);
            this.canvas.insertAt(img, index, true);
        });
    }

    _constructImgPath(path: string): string {
        return `${this.avatarFolder}/${path}`;
    }

    _getImageNameFromPath(path: string): string {
        return path.slice(path.lastIndexOf('/') + 1);
    }

    _getRandomElement(arr: Array<string>): string {
        return arr[Math.floor(Math.random() * arr.length)]
    }
}