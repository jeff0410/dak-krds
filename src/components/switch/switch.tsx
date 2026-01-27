import { uniqueId } from 'lodash-es';
import { SwitchLabel, SwitchTrack } from './components';
import * as style from './Switch.module.css';
import type { SwitchProps } from './Switch.type';

/**
 * Switch 컴포넌트 😸
 *
 * @param status        스위치 on/off 상태 (default: false)
 * @param onChange      상태 변경 시 호출되는 콜백 함수
 * @param size          스위치 크기 ('md' | 'lg', default: 'md')
 * @param label         스위치 옆에 표시할 라벨 텍스트
 * @param labelPosition 라벨 위치 ('left' | 'right', default: 'right')
 * @param disabled      비활성화 여부 (default: false)
 * @param showIcon      스위치 thumb에 아이콘 표시 여부 (default: false)
 * @param className     최상위 div에 적용할 커스텀 클래스
 * @param barWidth      스위치 바 너비 (px 단위, size에 따라 기본값 다름)
 * @param barHeight     스위치 바 높이 (px 단위, size에 따라 기본값 다름)
 * @param thumbSize     스위치 동그라미 크기 (px 단위, size에 따라 기본값 다름)
 * @param labelClassName 라벨에 적용할 커스텀 클래스
 * @param labelSize     라벨 폰트 사이즈 (default: size에 따라 's' 또는 'm')
 * @param labelWeight   라벨 폰트 두께
 * @param isClickableLabel 라벨 클릭 시 스위치 토글 여부 (default: true)
 * @param inputClassName input 요소에 적용할 커스텀 클래스 (접근성 필요할때 사용!)
 *
 */

export function Switch({
  id,
  status = false,
  onChange = () => {},
  size = 'm',
  label,
  labelPosition = 'right',
  disabled = false,
  useIcon = false,
  checkedIcon,
  uncheckedIcon,
  className = '',
  barWidth,
  barHeight,
  thumbSize,
  labelClassName,
  labelSize,
  labelWeight,
  inputClassName,
  isLabelClickable = true,
}: SwitchProps) {
  const switchId = id || `switch-${uniqueId()}`;
  const defaultLabelSize = size === 'l' ? 'm' : 's';

  const handleLabelClick = () => {
    if (isLabelClickable && !disabled) {
      onChange(!status);
    }
  };

  return (
    <div className={className}>
      <div className={`${style.switchContainer} ${disabled ? style.disabled : ''}`}>
        {labelPosition === 'left' && (
          <SwitchLabel
            label={label}
            position='left'
            size={labelSize || defaultLabelSize}
            weight={labelWeight}
            className={labelClassName}
            isClickable={isLabelClickable}
            onClick={handleLabelClick}
            disabled={disabled}
            htmlFor={switchId}
          />
        )}

        <SwitchTrack
          id={switchId}
          label={typeof label === 'string' ? label : undefined}
          status={status}
          disabled={disabled}
          onChange={onChange}
          size={size}
          useIcon={useIcon}
          checkedIcon={checkedIcon}
          uncheckedIcon={uncheckedIcon}
          barWidth={barWidth}
          barHeight={barHeight}
          thumbSize={thumbSize}
          inputClassName={inputClassName}
        />

        {labelPosition === 'right' && (
          <SwitchLabel
            label={label}
            position='right'
            size={labelSize || defaultLabelSize}
            weight={labelWeight}
            className={labelClassName}
            isClickable={isLabelClickable}
            onClick={handleLabelClick}
            htmlFor={switchId}
          />
        )}
      </div>
    </div>
  );
}
