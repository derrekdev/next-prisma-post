export type postProps = {
  id?: number;
  title: string;
  content?: string;
  published: boolean;
  authorId?: number;
  Author?: authorProps;
};

export type tagProps = {
  id?: number;
  tagName: string;
};

export type authorProps = {
  id?: number;
  name: string;
};
