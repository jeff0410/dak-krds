import type {TabsProps} from 'src/components';

export interface MTabScrollWrapperProps extends TabsProps {
  scrollByAmount?: number;
  autoScroll?: boolean; // 선택한 탭으로 자동 스크롤
}