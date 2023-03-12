import { Component } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  openPage: string = 'home';

  switchRoute(newPage: string) {
    this.openPage = newPage;
  }
}
