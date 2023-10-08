import { Comment } from "./comment-interface";

export interface Post {
  photo: string;
  date: string;
  likes: string;
  description: string;
  userId: number;
  comments: Comment;
  id: number;
}