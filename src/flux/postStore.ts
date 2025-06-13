import { Post } from '../types/post';
import { makeAutoObservable, autorun } from 'mobx';
import {PostService} from "../service/postService";

export class PostStore {
    posts: Post[] = [];
    userPosts: Post[] = [];
    isLoading: boolean = false;
    error: string | null = null;
    totalLikes: number = 0;

    constructor() {
        makeAutoObservable(this);
    }

    setPosts(posts: Post[]) {
        this.posts = posts;
    }

    setUserPosts(posts: Post[]) {
        this.userPosts = posts;
    }

    setLoading(isLoading: boolean) {
        this.isLoading = isLoading;
    }

    setTotalLikes(likes: number) {
        this.totalLikes = likes;
    }

    setError(error: string | null) {
        this.error = error;
    }

    async fetchPosts() {
        this.setLoading(true);
        this.setError(null);

        try {
            const posts = await PostService.getAllPosts();
            this.setPosts(posts);
        } catch (error) {
            this.setError('Failed to fetch posts');
            console.error(error);
        } finally {
            this.setLoading(false);
        }
    }

    async fetchUserPosts(username: string): Promise<void> {
        this.setLoading(true);
        this.setError(null);
        try {
            const posts = await PostService.getPostsByUser(username);
            const totalLikes = await PostService.getAllLikes(posts);
            this.setUserPosts(posts);
            this.setTotalLikes(totalLikes);
        } catch (error) {
            this.setError('Failed to fetch user posts');
            console.error("Error fetching user posts:", error);
        } finally {
            this.setLoading(false);
        }
    }

    // Para suscripción a cambios
    subscribe(callback: () => void) {
        return autorun(() => {
            callback();
        });
    }
}

export const postStore = new PostStore();