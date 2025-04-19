import { Component, input, InputSignal,ViewChild  } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { Ripple } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { StyleClass } from 'primeng/styleclass';
import { Drawer } from 'primeng/drawer';
@Component({
  selector: 'app-sidebar',
  imports: [RouterLink , RouterLinkActive,DrawerModule, ButtonModule, Ripple, AvatarModule, StyleClass],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  islogged:InputSignal<boolean> = input.required();
  @ViewChild('drawerRef') drawerRef!: Drawer;

    closeCallback(e:any): void {
        this.drawerRef.close(e);
    }

    visible: boolean = false;

}
