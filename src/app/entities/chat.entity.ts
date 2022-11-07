import { Timestamp } from "@angular/fire/firestore";
import { UserProfileEntity } from "./user-profile.entity";

export class Chat {
  id!: string;
  lastMessage?: string;
  lastMessageDate?: Date & Timestamp;
  userIds!: string[];
  users!: UserProfileEntity[];

  chatPic?: string;
  chatName?: string;
}
