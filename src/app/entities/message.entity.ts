import { Timestamp } from "@angular/fire/firestore";

export class Message {
  senderId!: string;
  text!: string;
  sentDate?: Date & Timestamp;
}
