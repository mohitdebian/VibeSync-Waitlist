export interface Song {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  duration: number; // in seconds
}

export interface User {
  id: string;
  name: string;
  avatarUrl: string;
  status: 'online' | 'offline' | 'listening';
  currentSong?: Song;
}

export interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  text: string;
  timestamp: Date;
}

export enum AppView {
  LANDING = 'LANDING',
  APP_DASHBOARD = 'APP_DASHBOARD'
}