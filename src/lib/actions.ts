import { addDoc, arrayUnion, collection, doc, getDocs, query, where, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
import { Group, PrivateGroup } from "@/types/types";

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

export const joinPublicGroup = async (id: string, member: string) => {
  try {
    console.log("Joining group:", id, "Member:", member);
    
    if (!id || !member) {
      throw new Error("Invalid group ID or member name");
    }

    const docRef = doc(db, "groups", id);
    await updateDoc(docRef, {
      members: arrayUnion(member),
    });

    console.log("Successfully joined group");
  } catch (error) {
    console.error("Error joining group:", error);
  }
};

export const joinPrivateGroup = async(privateGroup : PrivateGroup, member: string|null|undefined) => {

  const { groupName, groupPassword } = privateGroup;
  const groupReference = collection(db, "groups");

  const q = query(
    groupReference,
    where("groupName", "==", groupName),
    where("groupPassword", "==", groupPassword),
    where("groupPrivacy", "==", "Private")
  );

  const querySnapshot = await getDocs(q);

  if(querySnapshot.empty){
    return "No Groups Found";
  }

  const doc = querySnapshot.docs[0];

  await updateDoc(doc.ref, {
    members: arrayUnion(member)
  })
}