import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";

@Component({
    selector: 'app-alert-modal', 
    templateUrl: './alert-modal.component.html',
    styleUrls: ['./alert-modal.component.css']
})
export class AlertModalComponent implements OnInit {
    @Input() error: any;
    @Output() close = new EventEmitter<void>();

    ngOnInit(): void {
        setTimeout(() => this.close.emit(), 3000);
    }

    onCloseClick() {
        this.close.emit();
    }
    

}