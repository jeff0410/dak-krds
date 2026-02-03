import { MainImagePath } from 'src/assets/main-assets-path';
import { Body } from '../Body';
import { Button } from '../Button';
import { Heading } from '../Heading';
import styles from './NotFountPage.module.css';
import { NotFountPageProps } from './NotFountPage.type';

export function NotFountPage({ onClick }: NotFountPageProps) {
  return (
    <div className={styles.NotFountPage}>
      <div>
        <img src={MainImagePath.ErrorImg} alt='에러이미지' width={180} />
      </div>
      <div className={styles.NotFountPageContent}>
        <Heading size={3}>페이지를 찾을 수 없습니다. (404)</Heading>
        <Body>
          요청하신 페이지가 존재하지 않거나 삭제되었습니다.
          <br /> 입력한 주소가 정확한지 확인해 주세요.
        </Body>
      </div>
      <div>
        <Button
          label='이전 페이지'
          variant='teriary'
          height='64px'
          width='170px'
          onClick={onClick}
        />
      </div>
    </div>
  );
}
