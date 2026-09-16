
import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
  template: `Welcome to {{course}}`
})
export class Profile {
  salutation = "Hello";
  course = "Angular";
}
