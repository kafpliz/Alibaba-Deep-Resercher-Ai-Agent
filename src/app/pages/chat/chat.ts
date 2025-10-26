import { AfterViewChecked, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TextareaModule } from 'primeng/textarea';
import { ChatService } from '../../core/api/chat.service';
import { IChat } from '../../shared/interface/chat.interface';
import { MarkdownPipe } from '../../shared/pipes/markdown-pipe';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-chat',
  imports: [TextareaModule, FormsModule, MarkdownPipe, CommonModule],
  templateUrl: './chat.html',
  styleUrl: './chat.scss'
})
export class Chat implements OnInit, AfterViewChecked {
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;
  #shouldScroll = false;
  chat: IChat[] = []
  text: string = ''
  #service = inject(ChatService)
  isLoading = false;

  ngOnInit(): void {
    this.loadHistory()
  }

  ngAfterViewChecked(): void {
    if (this.#shouldScroll) {
      this.scrollToBottom();
      this.#shouldScroll = false;
    }
  }

  private scrollToBottom() {
    try {
      const el = this.scrollContainer.nativeElement;
      el.scrollTop = el.scrollHeight;
    } catch (error) {
      console.log(error);

    }
  }

  private loadHistory() {
    this.#service.getHistory().subscribe({
      next: (data) => {
        this.chat = data
        this.#shouldScroll = true
      }, error: (error) => {
        console.log(error);

      }
    })
  }


  send() {
    if (this.isLoading) return
     if(this.text.trim().length == 0) return
    const question = this.text
    this.text = ''
    this.isLoading = true

    const tempMessage: IChat = {
      id: Date.now(),
      question: question,

    }
    this.chat.push(tempMessage)
    this.#shouldScroll = true

    this.#service.sendMessage(question).subscribe({
      next: (res) => {
        const index = this.chat.findIndex(item => item.id === tempMessage.id);
        if (index !== -1) {
          this.chat[index].answer = res.answer;
          this.#shouldScroll = true;
        }
        this.isLoading = false;
      },
      error: (err) => {
        const index = this.chat.findIndex(item => item.id === tempMessage.id);
        if (index !== -1) {
          this.chat[index].answer = 'Ошибка при отправке сообщения';
          this.#shouldScroll = true;
        }
        this.isLoading = false;
      }
    })

  }

  keyPress(e: KeyboardEvent) {
    if (this.isLoading) return
      if(this.text.trim().length == 0) return
    if (e.key == 'Enter' && !e.shiftKey && !e.ctrlKey) {
      e.preventDefault();
      const question = this.text
      this.text = ''
      this.isLoading = true

      const tempMessage: IChat = {
        id: Date.now(),
        question: question,
      }
      this.chat.push(tempMessage)
      this.#shouldScroll = true

      this.#service.sendMessage(question).subscribe({
        next: (res) => {
          const index = this.chat.findIndex(item => item.id === tempMessage.id);
          if (index !== -1) {
            this.chat[index].answer = res.answer;
            this.#shouldScroll = true;
          }
          this.isLoading = false;
        },
        error: (err) => {
          const index = this.chat.findIndex(item => item.id === tempMessage.id);
          if (index !== -1) {
            this.chat[index].answer = 'Ошибка при отправке сообщения';
            this.#shouldScroll = true;
          }
          this.isLoading = false;
        }
      })
    }



  }
}
