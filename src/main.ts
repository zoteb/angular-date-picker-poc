import './polyfills';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule).then(ref => {
  // Ensure Angular destroys itself on hot reloads.
  // @ts-ignore
  if (window['ngRef']) {
    // @ts-ignore
    window['ngRef'].destroy();
  }
  // @ts-ignore
  window['ngRef'] = ref;

  // Otherwise, log the boot error
}).catch(err => console.error(err));