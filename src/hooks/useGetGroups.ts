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
          group.admin !== user?.displayName && 
          !group.members?.includes(user?.displayName ?? '') && 
          group.groupPrivacy !== 'Private'
        );
        setGroups(filteredGroupData);
      } else {
        const ownGroup = groupsData.filter((group) => 
          group.admin === user?.displayName || 
          group.members?.includes(user?.displayName ?? '') 
        );
        setGroups(ownGroup);
      }
    };

    fetchGroups();
  }, [user?.displayName, publicGroup]);

  return { groups };
}

export default useGetGroups;
