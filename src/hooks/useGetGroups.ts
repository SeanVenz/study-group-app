"use client";

import { getPublicGroups } from "@/lib/actions";
import { Group } from "@/types/types";
import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";

function useGetGroups(publicGroup: boolean) {
  const user = useAuth();
  const [groups, setGroups] = useState<Group[]>([]);

  useEffect(() => {
    const fetchGroups = async () => {
      const groupsData = await getPublicGroups();

      if (publicGroup) {
        const filteredGroupData = groupsData.filter((group) =>  
          !group.members?.includes(user?.uid ?? '') && 
          group.groupPrivacy !== 'Private' && group.adminUid !== user?.uid
        );
        setGroups(filteredGroupData);
      } else {
        const ownGroup = groupsData.filter((group) => 
          group.adminUid === user?.uid || 
          group.members?.includes(user?.uid ?? '') 
        );
        setGroups(ownGroup);
      }
    };

    fetchGroups();
  }, [user?.displayName, publicGroup, user?.uid]);

  return { groups };
}

export default useGetGroups;
