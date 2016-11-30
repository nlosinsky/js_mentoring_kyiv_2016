import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/';

document.addEventListener('deviceready', function () {
    platformBrowserDynamic().bootstrapModule(AppModule);
}, false);


