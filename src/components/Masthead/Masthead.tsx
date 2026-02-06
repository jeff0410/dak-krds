import flagUrl from "./flag.svg?url";
import * as style from './Masthead.module.css';

export const Masthead = () => {
	return (
		<div className={style.masthead}>
			<img src={flagUrl} alt="대한민국 국기" className={style.flag} />
			<span className={style.label}>
				이 누리집은 대한민국 공식 전자정부 누리집입니다.
			</span>
		</div>
	);
};
