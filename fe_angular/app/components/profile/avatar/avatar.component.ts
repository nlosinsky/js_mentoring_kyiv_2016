import { Component, OnInit, OnDestroy } from '@angular/core';
import { AvatarService } from './avatar.service';

@Component({
    templateUrl: './avatar.component.html',
    styleUrls: ['avatar.component.css']
})
export class AvatarComponent implements OnInit, OnDestroy {
    public parts: Array<string>;
    public activeTab: string;
    public tabs: string[];

    constructor(
        private avatarService: AvatarService
    ) {}

    ngOnInit() {
        this.avatarService
            .setCanvas(new fabric.StaticCanvas('canvas', {
                backgroundColor: '#fff'
            }))
            .initAvatar();

        this.tabs = this.avatarService.getShowPartsList();
        this.activeTab = this.tabs[0];
        this.changePartsList();
    }

    ngOnDestroy() {
        this.avatarService.dispose();
    }

    setTab(tab: string): void {
        this.activeTab = tab;

        this.changePartsList();
    }

    changePartsList():void {
        this.parts = this.avatarService.getPartsList(this.activeTab);
    }

    isActiveTab(tab: string): boolean {
        return this.activeTab === tab;
    }

    downloadAvatar(): void {
        this.avatarService.downloadAvatar();
    }

    runAnimation(): void {
        this.avatarService.runAnimation(true);
    }

    isActivePart(part: string): boolean {
        return this.avatarService.isActivePart(part, this.activeTab);
    }

    changePart(part: string): void {
        this.avatarService.changePart(part, this.activeTab);
    }
}