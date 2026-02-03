import type {MTableGuideWrapperProps} from 'src/components/MTableGuideWrapper';
import styles from './MTableGuideWrapper.module.css';
import {useState} from 'react';
import {Icon} from 'src/components';

export function MTableGuideWrapper({children}: MTableGuideWrapperProps) {
  const [show, setShow] = useState(true);

  return <div className={styles.wrapperContainer}>
    {children}
    {show && <div className={styles.overlay} onMouseUp={() => setShow(false)}>
        <div className={styles.icons}>
            <Icon className={styles.rightIcon} icon={'BtnShortcut'} size={16}
                  color={'var(--krds-color-gray-0)'}/>
          {/*TODO: 아이콘 변경*/}
            <Icon icon={'PopoverInfo'} size={16} color={'var(--krds-color-gray-0)'}/>
            <Icon icon={'BtnShortcut'} size={16} color={'var(--krds-color-gray-0)'}/>
        </div>
        <div className={styles.description}> 좌우 스크롤로 자세한 정보를 확인해 주세요.</div>
        <div className={styles.subDescription}>이 메시지는 터치하면 사라집니다.</div>
    </div>}
  </div>;
}
