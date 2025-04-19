import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";

@Component({
  selector: 'app-blank',
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './blank.component.html',
  styleUrl: './blank.component.css'
})
export class BlankComponent {

}
