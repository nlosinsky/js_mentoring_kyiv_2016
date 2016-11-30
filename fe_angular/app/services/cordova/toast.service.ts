import { Injectable } from '@angular/core';

@Injectable()
export class CordovaToastService {
    constructor() { }

    showError(message: string): void {
        window.plugins.toast.showWithOptions({
            message,
            duration: 'short',
            position: 'top',
            styling: {
                backgroundColor: '#EA0000',
                textColor: '#FFFFFF',
                opacity: 0.9,
                textSize: 20,
                cornerRadius: 10
            }
        });
    }

    showSuccess(message): void {
        window.plugins.toast.showWithOptions({
            message,
            duration: 'short',
            position: 'top',
            styling: {
                backgroundColor: '#067D00',
                textColor: '#FFFFFF',
                opacity: 0.9,
                textSize: 20,
                cornerRadius: 10
            }
        });
    }
}