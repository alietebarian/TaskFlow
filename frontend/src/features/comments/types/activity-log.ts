export interface ActivityLogEntry {
  id: string;
  action: string;
  details: string | null;
  userFirstName: string;
  userLastName: string;
  createdAt: string;
}
