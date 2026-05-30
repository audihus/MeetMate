export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Meeting {
  id: string;
  title: string;
  description?: string;
  date: string;
  startTime: string;
  endTime?: string;
  participants: string[];
}
