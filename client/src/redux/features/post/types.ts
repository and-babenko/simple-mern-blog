export interface IPostItem {
  author: string;
  comments: [];
  imgUrl: string;
  text: string;
  title: string;
  userName: string;
  views: number;
  createdAt: string;
  _id: string;
}

export type PostsSliceType = {
  posts: [] | IPostItem[];
  popularPosts: [] | IPostItem[];
  loading: boolean;
};
