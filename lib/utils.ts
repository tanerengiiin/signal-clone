import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Message } from "./types";
import { format, isToday, isThisWeek, formatDistanceToNow } from 'date-fns';
import { enUS, tr } from 'date-fns/locale';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fetcher = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();

  return data;
};

export const formatDate = (dateString:number|undefined) => {
  const date = new Date(dateString??'');

  if (isToday(date)) {
    return format(date, 'HH:mm', { locale: enUS });
  }

  if (isThisWeek(date)) {
    return format(date, 'EEE', { locale: enUS }); 
  }

  return format(date, 'd MMM', { locale: enUS });
};