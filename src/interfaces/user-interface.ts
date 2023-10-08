import { Post } from "./post-interface";
import { Profile } from "./profile-interface";
import { Subscriber } from "./subscriber-interface";

export interface User {
  profile: Profile;
  posts: Post[];
  subscribers: Subscriber[];
}