import {AfterViewInit, Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  ngAfterViewInit() {
    const erikaImage = document.getElementById('erika-image');
    if (erikaImage) {
      setTimeout(() => {
        erikaImage.style.height = '50px';
      }, 1000);
    }
  }
}
