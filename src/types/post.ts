export interface Comment {
    id: string;
    userId: string;
    user: string;
    avatar: string;
    text: string;
    createdAt: string;
    likes: number;
    likedBy: string[];
}

export interface Post {
    id: string;
    userId: string;
    user: string;
    content: string;
    imageUrl?: string;
    place?: string;
    createdAt: string;
    updatedAt?: string;
    likes: number;
    likedBy: string[];
    comments: Comment[];
}