
export interface Post {
    id: number;
    title: string;
    content: string;
}

export interface Comment {
    id: number;
    post_id: number;
    user_id: number;
    content: string;
}
