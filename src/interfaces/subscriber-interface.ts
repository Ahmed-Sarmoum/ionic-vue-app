import { Post } from "./post-interface";
import { Profile } from "./profile-interface";

export interface Subscriber {
  profile: Profile
  posts: Post[]
}