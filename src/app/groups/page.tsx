"use client";

import useAuth from "@/hooks/useAuth";
import useGetGroups from "@/hooks/useGetGroups";
import { joinPublicGroup } from "@/lib/actions";

const GroupsPage = () => {
  const { groups } = useGetGroups(true);
  const user = useAuth();

  const handleJoinGroup = async (id?: string, member?: string | null) => {
    if (!id) {
      console.error("Group ID is undefined");
      return;
    }
    if (!member) {
      console.error("User displayName is undefined");
      return;
    }
    await joinPublicGroup(id, member);
  };

  return (
    <div>
      <h1>Public Study Groups</h1>
      {groups.length === 0 ? (
        <p>No groups available.</p>
      ) : (
        <ul>
          {groups.map((group) => (
            <li key={group.id || Math.random()} className="border-b py-4">
              <h2 className="text-xl font-semibold">
                Group Name: {group.groupName}
              </h2>
              <p>Group Description: {group.groupDescription}</p>
              <p>Admin: {group.admin}</p>

              {group.members?.length === 0 ? (
                <p>No members yet</p>
              ) : (
                <ul>
                  {group.members?.map((member, index) => (
                    <li key={`${group.id}-${index}`}>{member}</li>
                  ))}
                </ul>
              )}
              <button onClick={() => handleJoinGroup(group.id, user?.uid)}>
                Join Group
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GroupsPage;
