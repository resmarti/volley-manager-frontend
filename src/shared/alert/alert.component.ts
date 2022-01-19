import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { trigger, animate, transition, style } from '@angular/animations';

@Component({
    selector: 'app-alert', 
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
    @Input() alert: any;
    @Input() fading: any;
    @Input() type: any;
    @Output() close = new EventEmitter<void>();

    ngOnInit(): void {
        if(this.fading) {
            setTimeout(() => this.close.emit(), 3000);
        }
    }

    onCloseClick() {
        this.close.emit();
    }
    

}