import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileComponent } from './profile.component'

import { profileRouting } from './profile.routes'
import { AvatarComponent } from './avatar/avatar.component';
import { AvatarService } from './avatar/avatar.service';

@NgModule({
    imports: [
        profileRouting,
        CommonModule
    ],
    declarations: [
        ProfileComponent,
        AvatarComponent
    ],
    providers: [
        AvatarService
    ]
})

export class ProfileModule {}