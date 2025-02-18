import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { Group } from "@/types/types";

export const createGroup = async (group: Group) => {
  const { groupName, groupDescription, groupPrivacy, admin, groupPassword } =
    group;
  try {
    const group = await addDoc(collection(db, "groups"), {
      groupName,
      groupDescription,
      groupPrivacy,
      admin,
      groupPassword,
    });
    console.log(group);
  } catch (error) {
    console.log(error);
  }
};

export const getPublicGroups = async (): Promise<Group[]> => {
  try {
    const groupCollectionRef = collection(db, "groups");
    const groupSnapshot = await getDocs(groupCollectionRef);

    return groupSnapshot.docs
      .map((doc) => {
        const data = doc.data() as Group; 
        return {
          id: doc.id,
          ...data,
        };
      })
  } catch (error) {
    console.error(error);
    return [];
  }
};
