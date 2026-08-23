export interface WorkspaceMember {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "Owner" | "Member";
  joinedAt: string;
}