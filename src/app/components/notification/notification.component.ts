import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { NotificationService } from '../../services/notification.service';
import { Notification, NotificationType } from "../notification/notification";
import { NgFor, NgClass, NgTemplateOutlet } from '@angular/common';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss'],
    standalone: true,
    imports: [NgFor, NgClass, NgTemplateOutlet]
})
export class NotificationComponent {
  notifications: Notification[] = [];
  private _subscription!: Subscription;

  constructor(private _notificationSvc: NotificationService) {
  }

  private _addNotification(notification: Notification) {

    this.notifications.push(notification);
    // console.log('this.notifications', this.notifications);
    if (notification.timeout !== 0) {
      setTimeout(() => this.close(notification), notification.timeout);

    }
  }

  ngOnInit(): void {
    // console.log('inside component');
    this._subscription = this._notificationSvc.getObservable().subscribe(notification => this._addNotification(notification));

  }

  
  close(notification: Notification) {
    this.notifications = this.notifications.filter(notif => notif.id !== notification.id);
  }


  className(notification: Notification): string {

    let style: string;

    switch (notification.type) {

      case NotificationType.success:
        style = 'success';
        break;

      case NotificationType.warning:
        style = 'warning';
        break;

      case NotificationType.error:
        style = 'error';
        break;

      default:
        style = 'info';
        break;
    }

    return style;
  }

  ngOnDestroy() {
    if (this._subscription != undefined) {
      this._subscription.unsubscribe();
    }

  }
}
