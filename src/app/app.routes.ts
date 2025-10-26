import { Routes } from '@angular/router';
import { Chat } from './pages/chat/chat';
import { authGuard } from './core/guards/auth-guard';
import { Main } from './pages/main/main';
import { Error } from './pages/error/error';

export const routes: Routes = [
    { path: '', component: Chat, canActivate: [authGuard] },
    { path: 'chat', component: Chat, canActivate: [authGuard] },
    { path: '**', component: Error }
];
