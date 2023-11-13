import { Component } from '@angular/core';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  faInstagram = faInstagram;
  faGithub = faGithub;
  faLinkedin = faLinkedin;
  isMouseOverGithub = false;
  isMouseOverLinkedin = false
  isMouseOverInstagram = false;

    onGithubMouseEnter() {
      this.isMouseOverGithub = true;
    }
    onGithubMouseLeave() {
      this.isMouseOverGithub = false;
    }

    onLinkedinMouseEnter() {
      this.isMouseOverLinkedin = true;
    }
    onLinkedinMouseLeave() {
      this.isMouseOverLinkedin = false;
    }

    onInstagramMouseEnter() {
      this.isMouseOverInstagram = true;
    }
    onInstagramMouseLeave() {
      this.isMouseOverInstagram = false;
    }
  
}
