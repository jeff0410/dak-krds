import { MainImagePath } from 'src/assets/main-assets-path';
import { Body } from '../Body';
import { Button } from '../Button';
import { Heading } from '../Heading';
import * as styles from './ErrorPage.module.css';
import { ErrorPageProps } from './ErrorPage.type';

export function ErrorPage({ onClick }: ErrorPageProps) {
  return (
    <div className={styles.ErrorPage}>
      <div>
        <img src={MainImagePath.ErrorImg} alt='에러이미지' width={180} />
      </div>
      <div className={styles.ErrorPageContent}>
        <Heading size={3}>시스템 오류가 발생했습니다. (500)</Heading>
        <Body>
          요청하신 작업을 처리하는 중 시스템에 문제가 발생했습니다.
          <br /> 잠시 후 다시 시도해 주세요. 문제가 지속되면 시스템 관리자에게 문의해 주세요.
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
