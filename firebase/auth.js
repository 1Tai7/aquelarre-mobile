import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { db, auth } from "./config";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

const writeUserData = async ({
  userId,
  name,
  alias,
  email,
  imageUrl,
  password,
}) => {
  const dataRef = doc(db, "usuarios", userId);
  await setDoc(dataRef, {
    name,
    alias,
    email,
    photoURL: imageUrl,
    password,
  });

  const data = await getUserData({ userId });

  return data;
};

const getUserData = async ({ userId }) => {
  const dataRef = doc(db, "usuarios", userId);
  const docSnap = await getDoc(dataRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    return docSnap.data();
  } else {
    console.log("No such document!");
  }
};

const updateUserData = async ({
  userId,
  name,
  alias,
  email,
  imageUrl,
  password,
}) => {
  const dataDocRef = doc(db, "usuarios", userId);

  await updateDoc(dataDocRef, {
    name,
    alias,
    email,
    imageUrl,
    password,
  });

  const data = await getUserData({ userId });

  return data;
};

export const registerWithEmailAndPassword = async ({
  email,
  password,
  displayName,
  photoUrl,
  name,
}) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await updateProfile(user, {
      displayName,
      photoURL: photoUrl,
    });

    const data = await writeUserData({
      userId: user.uid,
      name,
      alias: user.displayName,
      email: user.email,
      imageUrl: user.photoURL,
      password,
    });

    return { user: { ...user, ...data } };
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log({ errorCode, errorMessage });
  }
};

export const loginWithEmailAndPassword = async ({ email, password }) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    const data = await getUserData({ userId: user.uid });
    console.log("PPP", data);
    return { user: { ...user, ...data } };
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log({ errorCode, errorMessage });
  }
};

export const updateWithEmailAndPassword = async ({
  email,
  password,
  displayName,
  photoUrl,
  name,
}) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    await updateProfile(user, {
      displayName,
      photoURL: photoUrl,
    });

    const data = await updateUserData({
      userId: user.uid,
      email,
      password,
      email,
      alias: displayName,
      imageUrl: photoUrl,
      name,
    });

    return { user: { ...user, ...data } };
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log({ errorCode, errorMessage });
  }
};
