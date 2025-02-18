'use client';

import LogoutButton from '@/components/LogoutButton';
import Modal from '@/components/Modal';
import useAuth from '@/hooks/useAuth';
import useGetGroups from '@/hooks/useGetGroups';
import { createGroup, joinPrivateGroup } from '@/lib/actions';
import { Group, PrivateGroup } from '@/types/types';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Page = () => {
  const user = useAuth();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isPrivateModalOpen, setIsPrivateModalOpen] = useState<boolean>(false);
  const { groups } = useGetGroups(false);
  const [formData, setFormData] = useState<Group>({
    adminUid: user?.uid,
    groupName: '',
    groupDescription: '',
    groupPrivacy: '',
    admin: user?.displayName,
    groupPassword: '',
  })

  const [privateFormData, setPrivateFormData] = useState<PrivateGroup>({
    groupName: '',
    groupPassword: '',
  })

  const handlePrivateInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setPrivateFormData(prevState => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value,
    }));
  };

  useEffect(() => {
    if (user) {
      setFormData(prevData => ({
        ...prevData,
        admin: user.displayName || null,
        adminUid: user.uid
      }));
    }
  }, [user]);

  if (!user) { 
    return <p>Please sign in to access the dashboard. <LogoutButton /></p>;
  }

  const handleCreateGroup = async () => {
    await createGroup(formData);
  }

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const togglePrivateModal = () => {
    setIsPrivateModalOpen(!isPrivateModalOpen);
  };

  const handleJoinPrivateGroup = async() => {
    await joinPrivateGroup(privateFormData, user?.uid);
  }

  return (
    <div>
      <p>Welcome, {user.displayName || "User"}!</p>
      <p>Email: {user.email}</p>
      <p>ID: {user.uid}</p>
      <Link href='/groups'>View Groups</Link>

      <p>My Groups:</p>
      {groups.length === 0 ? (
        <p>No groups available.</p>
      ) : (
        <ul>
          {groups.map((group : Group) => (
            <li key={group.id} className="border-b py-4">
              <h2 className="text-xl font-semibold">
                Group Name: {group.groupName}
              </h2>
              <p>Group Description: {group.groupDescription}</p>
              <p>Admin: {group.admin}</p>

              {group.members && group.members.length === 0 ? (
                <p>No members yet</p>
              ) : (
                <ul>
                  {group.members?.map((member : string, index : number) => (
                    <li key={index}>{member}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={toggleModal}
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Create Group
      </button>

      <button
        onClick={togglePrivateModal}
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Join Private Group
      </button>

      <LogoutButton />
      <Modal isOpen={isModalOpen} onClose={toggleModal}>
        <h2>Create Your Own Study Group!</h2>
        <div>
          <label htmlFor="Name">Group Name</label>
          <input type='text' id='groupName' value={formData.groupName} onChange={handleInputChange}  />
        </div>
        <div>
          <label htmlFor="Description">Group Description</label>
          <input type='text' id='groupDescription' value={formData.groupDescription} onChange={handleInputChange}  />
        </div>
        <div>
          <label htmlFor="Privacy">Group Privacy</label>
          <select name='Privacy' id='groupPrivacy' value={formData.groupPrivacy} onChange={handleInputChange}>
            <option value="Public">Public</option>
            <option value="Private">Private</option>
          </select>
        </div>
        {formData.groupPrivacy === 'Private' ? (
          <div>
            <label htmlFor="Password">Group Password</label>
            <input type='text' id='groupPassword' value={formData.groupPassword || ''} onChange={handleInputChange}  />
          </div>
        ) : (<></>)}
        <button onClick={handleCreateGroup}>Create Group</button>
      </Modal>

      <Modal isOpen={isPrivateModalOpen} onClose={togglePrivateModal}>
        <h2>Join Private Group</h2>
        <div>
          <label htmlFor="Name">Group Name</label>
          <input type='text' id='groupName' value={privateFormData.groupName} onChange={handlePrivateInputChange}  />
        </div>
        <div>
          <label htmlFor="Description">Group Password</label>
          <input type='text' id='groupPassword' value={privateFormData.groupPassword} onChange={handlePrivateInputChange}  />
        </div>
        <button onClick={handleJoinPrivateGroup}>Join Group</button>
      </Modal>
    </div>
  );
};

export default Page;
