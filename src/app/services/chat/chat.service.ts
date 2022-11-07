import { UserService } from 'src/app/services/user/user.service';
import { addDoc, doc, collection, collectionData, Firestore, query, where, Timestamp, updateDoc, orderBy } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable, take, concatMap, map } from 'rxjs';
import { UserProfileEntity } from 'src/app/entities/user-profile.entity';
import { IChatService } from 'src/app/interfaces/chat.service.interface';
import { Chat } from 'src/app/entities/chat.entity';
import { Message } from 'src/app/entities/message.entity';

@Injectable({
  providedIn: 'root'
})
export class ChatService implements IChatService{

  chatsCollection: string = 'chats';
  messageCollection: string = 'messages';

  constructor(private readonly firestore: Firestore, private readonly userService: UserService) { }

  isChatExists(otherUserId: string): Observable<string | null> {
    return this.allChats$.pipe(
      take(1),
      map((chats) => {
        for(let i=0; i<chats.length; i++) {
          if(chats[i].userIds.includes(otherUserId)){
            return chats[i].id;
          }
        }
        return null;
      }),
    );
  }

  getChatMessages$(chatId: string): Observable<Message[]> {
    const refMsg = collection(this.firestore, this.chatsCollection, chatId, this.messageCollection);
    // TODO: https://firebase.google.com/docs/firestore/query-data/query-cursors
    const queryAll = query(refMsg, orderBy('sentDate', 'asc'));
    return collectionData(queryAll) as Observable<Message[]>;
  }

  addMessage(chatId: string, message: string): Observable<any> {
    const ref = collection(this.firestore, this.chatsCollection, chatId, this.messageCollection);
    const chatRef = doc(this.firestore, this.chatsCollection, chatId);
    const sentMsgDate = Timestamp.fromDate(new Date());
    return this.userService.currentProfile$.pipe(
      take(1),
      concatMap((user)=> addDoc(ref, {
        text: message,
        senderId: user?.uid,
        sentDate: sentMsgDate,
      })),
      concatMap(() => updateDoc(chatRef, {lastMessage: message, lastMessageDate: sentMsgDate})),
    );
  }

  addChatNameAndPic(currentUserId: string, chats: Chat[]): Chat[] {
    chats.forEach(chat => {
      const otherIndex = chat.userIds.indexOf(currentUserId) === 0 ? 1 : 0;
      const { displayName, photoURL } = chat.users[otherIndex];
      chat.chatName = displayName;
      chat.chatPic = photoURL;
    });
    return chats;
  }

  createChat(otherUser: UserProfileEntity): Observable<string> {
    const ref = collection(this.firestore, this.chatsCollection)
    return this.userService.currentProfile$.pipe(
      // now we have the current user (user who's connected = currentProfile) and the other user we want to chat with (otherUser)
      take(1),
      concatMap((user) => addDoc(ref, {
        userIds: [ user?.uid, otherUser?.uid ],
        users: [
          {
            displayName: user?.displayName ?? '',
            photoURL: user?.photoURL,
          },
          {
            displayName: otherUser?.displayName ?? '',
            photoURL: otherUser?.photoURL,
          },
        ]
      })),
      map(ref => ref.id),
    );
  }

  get allChats$(): Observable<Chat[]> {
    const ref = collection(this.firestore, this.chatsCollection);
    return this.userService.currentProfile$.pipe(
      concatMap((user)=>{
        const myQuery = query(ref, where('userIds', 'array-contains', user!.uid));
        // alert('not found 3  query');

        return collectionData(myQuery, { idField: 'id' }).pipe(
          map(chats => this.addChatNameAndPic(user!.uid, chats as Chat[]))) as Observable<Chat[]>;
      }),
    );
  }

}
