export type Cat = {
  url: string;
  id: string;
  height: number;
  width: number;
  favorite?: boolean;
};

export type Favorite = {
  id: number;
  user_id: string;
  image_id: string;
  sub_id: string | null;
  created_at: string;
  image: {
    id: string;
    url: string;
  };
};
