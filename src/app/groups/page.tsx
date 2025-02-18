"use client";

import useGetGroups from "@/hooks/useGetGroups";

const GroupsPage = () => {
  const { groups } = useGetGroups(true);

  return (
    <div>
      <h1>Public Study Groups</h1>

      {groups.length === 0 ? (
        <p>No groups available.</p>
      ) : (
        <ul>
          {groups.map((group) => (
            <li key={group.id} className="border-b py-4">
              <h2 className="text-xl font-semibold">
                Group Name: {group.groupName}
              </h2>
              <p>Group Description: {group.groupDescription}</p>
              <p>Admin: {group.admin}</p>

              {group.members.length === 0 ? (
                <p>No members yet</p>
              ) : (
                <ul>
                  {group.members.map((member : string, index : number) => (
                    <li key={index}>{member}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GroupsPage;
