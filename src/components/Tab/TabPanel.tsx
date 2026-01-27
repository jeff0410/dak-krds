import { ReactNode } from 'react';
import * as style from './Tab.module.css';

interface TabPanelProps {
  children: ReactNode;
  id: string;
  tabId: string;
  isSelected: boolean;
}

export function TabPanel({ children, id, tabId, isSelected }: TabPanelProps) {
  return (
    <div
      role='tabpanel'
      id={id}
      aria-labelledby={tabId} // 연결된 탭 ID
      className={`${isSelected ? '' : style.hidden} ${style.tabpannelLayout}`} // 선택된 탭만 표시
    >
      {children}
    </div>
  );
}
