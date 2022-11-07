import { Observable } from 'rxjs';
import { Chat } from '../entities/chat.entity';
import { Message } from '../entities/message.entity';
import { UserProfileEntity } from './../entities/user-profile.entity';
export interface IChatService {
  createChat(otherUser: UserProfileEntity): Observable<string>;
  addChatNameAndPic(currentUserId: string, chats: Chat[]): Chat[];
  addMessage(chatId: string, message: string): Observable<any>;
  getChatMessages$(chatId: string,): Observable<Message[]>;
  isChatExists(otherUserId: string): Observable<string | null>;
}
