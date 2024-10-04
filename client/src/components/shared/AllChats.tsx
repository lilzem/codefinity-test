import { FC, useState } from 'react';
import { Tab } from '@/components/ui';
import { ChatPreview, Status } from './ChatPreview';

const TABS = ['Online', 'All'];

export const AllChats: FC = () => {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  return (
    <div className="min-w-[300px]">
      <div className="flex items-center justify-between rounded-se-md">
        {TABS.map((tab) => (
          <Tab active={activeTab === tab} title={tab} onClick={() => setActiveTab(tab)} />
        ))}
      </div>

      <div className="py-3 pl-4 flex flex-col overflow-auto max-h-[680px]">
        <ChatPreview status={Status.offline} />
        <ChatPreview status={Status.online} />
        <ChatPreview status={Status.offline} />
        <ChatPreview status={Status.online} />
        <ChatPreview status={Status.offline} />
        <ChatPreview status={Status.online} />
      </div>
    </div>
  );
};
