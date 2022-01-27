import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { trigger, animate, transition, style } from '@angular/animations';

@Component({
    selector: 'app-confirm-modal', 
    templateUrl: './confirm-modal.component.html',
    styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent implements OnInit {
    @Input() confirmTitle: any;
    @Input() confirmMessage: any;
    @Output() close = new EventEmitter<void>();
    @Output() confirmed = new EventEmitter<string>();

    ngOnInit(): void { }

    onCloseClick() {
        this.close.emit();
    }

    onConfirm(): void {
        this.confirmed.next("confirmed");
    }
    

}