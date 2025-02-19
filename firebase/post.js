import { db } from "./config";
import {
  addDoc,
  getDocs,
  collection,
  query,
  where,
  orderBy,
} from "firebase/firestore";

export const createPost = async ({ userId, autor, title, tags, text }) => {
  const postRef = collection(db, "posts");
  const newTags = tags.split(",").map((tag) => tag.trim());
  const data = await addDoc(postRef, {
    userId,
    autor,
    title,
    tags: newTags,
    text,
  });

  return data;
};

export const getPostById = async ({ userId }) => {
  try {
    const q = query(collection(db, "posts"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const posts = [];
    querySnapshot.forEach((doc) => {
      posts.push({ id: doc.id, ...doc.data() });
    });
    return posts;
  } catch (error) {
    console.error("Error getting posts:", error);
    return [];
  }
};

export const getPosts = async () => {
  try {
    const q = query(collection(db, "posts"));
    const querySnapshot = await getDocs(q);
    const posts = [];
    querySnapshot.forEach((doc) => {
      posts.push(doc.data());
    });
    return posts;
  } catch (error) {
    console.error("Error al obtener posts:", error);
    return [];
  }
};
