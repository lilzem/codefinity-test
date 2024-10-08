import { FC, useEffect, useState } from 'react';
import { Input, Tab } from '@/components/ui';
import { Status, User } from '@/types';
import axios from '@/api/axios';
import { ChatPreview } from './ChatPreview';
import { useEvents } from '@/contexts/SocketContext';
import { useAuthStore } from '@/store/auth';

const TABS = ['Online', 'All'];

export const AllChats: FC = () => {
  const [activeTab, setActiveTab] = useState<string>(TABS[0]);
  const [search, setSearch] = useState<string>('');
  const [users, setUsers] = useState<User[]>();
  const [filtered, setFiltered] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuthStore((state) => state);

  useEvents(
    {
      userChanged: (changedUser) => {
        if (user?.id === changedUser.id) {
          return;
        }

        const _users = [...(users ?? [])];
        const index = _users?.findIndex((u) => u.id === changedUser.id);

        if (index !== -1) {
          _users[index] = changedUser;
        } else {
          _users.push(changedUser);
        }

        setUsers(_users);
      },
    },
    [user, users],
  );

  useEffect(() => {
    setIsLoading(true);

    axios.get('/api/users').then(({ data }) => setUsers(data));

    setIsLoading(false);
  }, []);

  const filterUsers = (search: string) => {
    setSearch(search);

    const filtered = users?.filter((user) => user.name?.toLowerCase().includes(search?.toLowerCase()));

    setFiltered(filtered as User[]);
  };

  const filteredUsers = () => {
    if (activeTab === TABS[1]) {
      return filtered?.length ? filtered : users;
    }

    return filtered?.length
      ? filtered?.filter((user) => user.status === Status.ONLINE)
      : users?.filter((user) => user.status === Status.ONLINE);
  };

  return isLoading ? (
    'Loading...'
  ) : (
    <div className="min-w-[300px] relative flex flex-col justify-between pb-[20px]">
      <div className="flex items-center justify-between rounded-se-md">
        {TABS.map((tab, index) => (
          <Tab key={index} active={activeTab === tab} title={tab} onClick={() => setActiveTab(tab)} />
        ))}
      </div>
      <div className="py-3 px-4 flex flex-col flex-1 max-h-[590px] gap-2 overflow-auto">
        {filteredUsers()?.map((user) => <ChatPreview key={user.id} user={user} />)}
      </div>
      <div className="px-4">
        <Input className="w-[100%]" placeholder="Search..." value={search} handleChange={filterUsers} />
      </div>
    </div>
  );
};
