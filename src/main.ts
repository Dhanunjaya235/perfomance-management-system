import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouterOutlet } from '@angular/router';
import { routes } from './app/app.routes';
import { SearchedEmpService } from './app/services/searched-emp.service';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { SideNav } from './app/side-nav/side-nav.component';
import { LucideAngularModule, File, House, Menu, UserCheck } from 'lucide-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,SideNav,LucideAngularModule],
  providers:[SearchedEmpService],
  template: 
  `
  <app-side-nav>
  </app-side-nav>
  `
})
export class App {}

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch())
  ]
});
