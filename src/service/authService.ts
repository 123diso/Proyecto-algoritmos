import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    User as FirebaseUser,
    onAuthStateChanged,
    signOut,
    updateEmail,
    updatePassword
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { app, db } from './firebase';
import { User } from '../types/auth';
import {store} from "../flux/Store";
import {NavigateActions} from "../flux/Action";

const auth = getAuth(app);

export class AuthService {
    static async register(
        email: string,
        password: string,
        username: string,
        name: string,
        description: string
    ): Promise<User> {
        try {
            // 1. Crear usuario en Auth
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            // 2. Actualizar perfil básico
            if (userCredential.user) {
                await updateProfile(userCredential.user, {
                    displayName: name
                });
            }

            // 3. Crear documento en Firestore
            const userData =  {
                name: name,
                uid: userCredential.user.uid,
                username: username,
                email: email,
                avatar: "./assets/icons/ElipseProfile.png",
                notifications: {
                    notify_comments: true,
                    notify_mentions: true,
                    notify_likes: true,
                    notify_follows: true,
                    notify_new_followers: true
                },
                description: description
            };

            await setDoc(doc(db, 'users', userCredential.user.uid), userData);

            // 4. Retornar usuario combinado
            const user = {
                displayName: userCredential.user.displayName || undefined,
                ...userData
            };

            localStorage.setItem('isAuthenticated', 'true');
            store.setUserProfile(user.email, user.name, user.username, user.description, user.uid);
            NavigateActions.navigate('/main');
            return user;
        } catch (error) {
            console.error("Registration error:", error);
            throw error; // Re-lanzamos el error para que el Store lo maneje
        }
    }

    static async login(email: string, password: string): Promise<User> {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            // Obtener datos adicionales de Firestore
            const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));

            if (!userDoc.exists()) {
                throw new Error("User document not found");
            }

            const user = {
                uid: userCredential.user.uid,
                displayName: userCredential.user.displayName || undefined,
                email: userCredential.user.email || '',
                name: userDoc.data().name || undefined,
                username: userDoc.data().username || '',
                description: userDoc.data().description || '',
            };

            localStorage.setItem('isAuthenticated', 'true');
            store.setUserProfile(user.email, user.name, user.username, user.description, user.uid);
            NavigateActions.navigate('/main')
            return user;
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    }

    static async editProfile(email: string | undefined, password: string, username: string, name: string, description: string): Promise<User> {
        try {
            const user = auth.currentUser;

            if (!user) {
                throw new Error("No hay un usuario autenticado");
            }

            // Actualizar Auth
            if (email) {
                await updateEmail(user, email);
            }
            if (password) {
                await updatePassword(user, password);
            }

            // Actualizar Firestore
            const userData = {
                username: username.toLowerCase(),
                name: name || user.displayName,
                description: description || ''
            };

            await setDoc(doc(db, 'users', user.uid), userData, { merge: true });

            store.setUserProfile(user.email || '', user.displayName || '', username, '', user.uid);
            return {
                uid: user.uid,
                displayName: user.displayName || undefined,
                email: user.email || '',
                name: user.displayName || '',
                username: username,
                description: ''
            };
        } catch (error) {
            console.error("Edit profile error:", error);
            throw error;
        }
    }

    static async logout(): Promise<void> {
        try {
            await signOut(auth);
            localStorage.setItem('isAuthenticated', 'false');
            NavigateActions.navigate('/');
        } catch (error) {
            console.error("Logout error:", error);
            throw error;
        }
    }

    static onAuthStateChanged(callback: (user: User | null) => void): () => void {
        return onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                try {
                    // Obtener datos adicionales de Firestore
                    const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));

                    if (userDoc.exists()) {
                        callback({
                            uid: firebaseUser.uid,
                            displayName: firebaseUser.displayName || undefined,
                            email: firebaseUser.email,
                            name: firebaseUser.displayName,
                            username: userDoc.data().username,
                            description: userDoc.data().description || '',
                        });
                    } else {
                        callback(this.transformBasicUser(firebaseUser));
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                    callback(this.transformBasicUser(firebaseUser));
                }
            } else {
                callback(null);
            }
        });
    }

    private static transformBasicUser(firebaseUser: FirebaseUser): User {
        return {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName || undefined
        };
    }
}