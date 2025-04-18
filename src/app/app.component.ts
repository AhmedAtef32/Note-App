import { FlowbiteService } from './Shared/services/flowbite/flowbite.service';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'note_App';

  constructor(private FlowbiteService: FlowbiteService) {}

  ngOnInit(): void {
    this.FlowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }
}
