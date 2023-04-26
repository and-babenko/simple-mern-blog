export interface ICommentItem {
  comment: string;
  author: string;
}

export interface ICreateCommentData {
  postId: string;
  comment: string;
}

export type CommentSliceType = {
  comments: ICommentItem[] | [];
  loading: boolean;
};
