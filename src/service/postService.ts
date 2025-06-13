import {
  doc, setDoc, getDocs, collection, query, where,
  getDoc, updateDoc, arrayUnion, arrayRemove, addDoc
} from "firebase/firestore";
import { db } from './firebase';
import { Post, Comment } from '../types/post';

export const uploadImageApiKey = 'f8470ec8c7ba18ab724093d56f7ae76c';

export class PostService {
  static async createPost(
    user: string,
    content: string,
    place?: string,
    comments?: string[],
    likes?: number,
  ): Promise<string> {
    try {
      const postData = {
        user,
        content,
        createdAt: new Date().toISOString(),
        place,
        comments: comments || [],
        likes: likes || 0,
      };

      const postRef = await addDoc(collection(db, 'posts'), postData);
      return postRef.id;
    } catch (error) {
      console.error("Error creating post:", error);
      throw error;
    }
  }

  static async getPostsByUser(user: string): Promise<Post[]> {
    try {
      const q = query(collection(db, 'posts'), where('user', '==', user));
      const querySnapshot = await getDocs(q);
      const posts: Post[] = [];

      querySnapshot.forEach((doc) => {
        posts.push({ id: doc.id, ...doc.data() } as unknown as Post);
      });
      return posts;
    } catch (error) {
      console.error("Error fetching user posts:", error);
      throw error;
    }
  }

  static async getPostById(postId: string): Promise<Post> {
    try {
      const postRef = doc(db, 'posts', postId);
      const postSnapshot = await getDoc(postRef);

      if (postSnapshot.exists()) {
        return { id: postSnapshot.id, ...postSnapshot.data() } as unknown as Post;
      } else {
        throw new Error("Post not found");
      }
    } catch (error) {
      console.error("Error fetching post by ID:", error);
      throw error;
    }
  }

  static async getAllPosts(): Promise<Post[]> {
    try {
      const postsSnapshot = await getDocs(collection(db, 'posts'));
      const posts: Post[] = [];

      postsSnapshot.forEach(doc => {
        posts.push({ id: doc.id, ...doc.data() } as Post);
      });

      return posts;
    } catch (error) {
      console.error("Error fetching all posts:", error);
      throw error;
    }
  }
  public static async uploadToImgBB(file: any): Promise<string> {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch(`https://api.imgbb.com/1/upload?key=${uploadImageApiKey}`, {
      method: 'POST',
      body: formData
    });

    const data = await response.json();
    console.log(data);
    return data.data.url;
  }

  static async setImageToPost(postId: string, file: any): Promise<string> {
    try {
      const imageUrl = await this.uploadToImgBB(file);
      const postRef = doc(db, 'posts', postId);
      await setDoc(postRef, { imageUrl }, { merge: true });
      return imageUrl;
    } catch (error) {
      console.error("Error uploading image to post:", error);
      throw error;
    }
  }

  static async sumLikes(postId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const postRef = doc(db, 'posts', postId);
        const postSnapshot = await getDoc(postRef);

        if (postSnapshot.exists()) {
          const postData = postSnapshot.data() as Post;
          const newLikes = (postData.likes || 0) + 1;

          await setDoc(postRef, { likes: newLikes }, { merge: true });
          resolve();
        } else {
          reject(new Error("Post not found"));
        }
      } catch (error) {
        console.error("Error updating likes:", error);
        reject(error);
      }
    });
  }

  static async toggleLike(postId: string, userId: string): Promise<number> {
    try {
      const postRef = doc(db, 'posts', postId);
      const postSnap = await getDoc(postRef);

      if (!postSnap.exists()) {
        throw new Error("Post not found");
      }

      const postData = postSnap.data();
      const likes = postData.likes || 0;
      const likedBy = postData.likedBy || [];

      let newLikes;
      let newLikedBy;

      if (likedBy.includes(userId)) {
        newLikes = likes - 1;
        newLikedBy = arrayRemove(userId);
      } else {
        newLikes = likes + 1;
        newLikedBy = arrayUnion(userId);
      }

      await updateDoc(postRef, {
        likes: newLikes,
        likedBy: newLikedBy
      });
      location.reload();
      return newLikes;
    } catch (error) {
      console.error("Error toggling like:", error);
      throw error;
    }
  }

  static async addComment(postId: string, comment: Comment): Promise<void> {
    try {
      const postRef = doc(db, 'posts', postId);
      await updateDoc(postRef, {
        comments: arrayUnion(comment)
      });
    } catch (error) {
      console.error("Error adding comment:", error);
      throw error;
    }
  }

  static async getPostWithComments(postId: string): Promise<Post> {
    try {
      const postRef = doc(db, 'posts', postId);
      const postSnap = await getDoc(postRef);

      if (!postSnap.exists()) {
        throw new Error("Post not found");
      }

      return { id: postSnap.id, ...postSnap.data() } as Post;
    } catch (error) {
      console.error("Error getting post:", error);
      throw error;
    }
  }

  static async getAllLikes(userPosts: Post[]): Promise<number> {
    return userPosts.reduce((acc, post) => {
      return acc + (post.likes || 0);
    }, 0);
  }
}
