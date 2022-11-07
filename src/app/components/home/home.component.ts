import { ChatService } from './../../services/chat/chat.service';
import { UserProfileEntity } from './../../entities/user-profile.entity';
import { AfterContentInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { combineLatestWith, startWith, map, switchMap, of, tap } from 'rxjs';
import { UserService } from './../../services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // hard coded = u can delete those 3 lines !
  contacts: string[] = ["mohamed", "birali"];
  filtered: string[] = [];
  startFilter:boolean = false;
  // end hard coded

  // get element from the view
  @ViewChild('endOfConversation')
  endOfConversation!: ElementRef;

  // test
  // end test

  search = new FormControl('');
  contactListControl = new FormControl('');
  sendInputControl = new FormControl('');

  user$ = this.userService.currentProfile$;
  users$ = this.userService.allUsers$;
  filterUsers$ = this.users$.pipe(
                              combineLatestWith(
                                this.user$,
                                this.search.valueChanges, // to trigger emediatly when click
                              ),
                              map(([users, user, searchedString]) => users.filter(u => u.displayName?.toLowerCase().includes(searchedString.toLowerCase()) && u.uid !== user?.uid && searchedString.length > 0 ))
                              );
  myChats$ = this.chatService.allChats$;

  selectedChat$ = this.contactListControl.valueChanges.pipe(
    combineLatestWith(this.myChats$),
    map(([chatId, chats])=> chats.find(c => c.id === chatId)),
  );
  messages$ = this.contactListControl.valueChanges.pipe(
    map(chatId => chatId), // is not necessary
    switchMap((chatId) => this.chatService.getChatMessages$(chatId)),
    tap(() => { this.scrollToBottom(); })
  );

  constructor(private readonly userService: UserService, private readonly chatService: ChatService) {}


  ngOnInit(): void {
    this.filtered = this.contacts;
    this.scrollToBottom();
  }

  onSelectedChat(chatId: string): void {
    this.contactListControl.setValue(chatId);
  }

  clearInput() {
    this.sendInputControl.setValue('');
  }

  scrollToBottom() {
    setTimeout(() => {
      if(this.endOfConversation) {
        this.endOfConversation.nativeElement.scrollIntoView(
          { behavior: 'smooth' }
        );
      }
    }, 100);
  }

  sendMessage() {
    const chatId = this.contactListControl.value;
    const message = this.sendInputControl.value;
    if(chatId && message) {
      this.chatService.addMessage(chatId, message).subscribe(
        () => {
          this.scrollToBottom();
        }
      );
    }
    this.clearInput();
  }

  // to delete
  searchContacts(searchContact: string) {
    if(searchContact !== '') {
      this.startFilter = true;
    } else {
      this.startFilter = false;
      this.filtered.filter((contact:string) => contact.includes(searchContact));
    }
  }

  onCreateChat(otherUser: UserProfileEntity){
    // alert('clicked !');
    this.chatService.isChatExists(otherUser?.uid).pipe(
      switchMap((chatId) => {
        if(chatId) {
          return of(chatId);
        } else {
          return this.chatService.createChat(otherUser); // createChat() returns a string
        }
      }),
    ).subscribe(
      (chatId) => this.contactListControl.setValue(chatId)
    );
  }



}
