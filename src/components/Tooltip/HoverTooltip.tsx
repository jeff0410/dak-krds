import type { HoverTooltipProps, TooltipPosition } from './HoverTooltip.type';
import { Tooltip, type TooltipProps, tooltipClasses } from '@mui/material';
import { styled } from '@mui/material/styles';

const CustomTooltip = styled(
  ({
    className,
    maxWidth,
    zIndex,
    ...props
  }: TooltipProps & { maxWidth?: number; zIndex?: number }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ),
)<{ maxWidth?: number; zIndex?: number }>(({ maxWidth = 360, zIndex }) => ({
  zIndex,
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#fff',
    color: 'var(--krds-color-gray-90)',
    border: '1px solid var(--krds-color-gray-20)',
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 400,
    maxWidth: maxWidth,
    whiteSpace: 'normal',
    boxShadow: `
      0px 4px 8px rgba(0, 0, 0, 0.08),
      0px 0px 2px rgba(0, 0, 0, 0.05)
    `,
    padding: '16px',
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: '#fff',
    '&::before': {
      border: '1px solid var(--krds-color-gray-20)',
    },
  },
}));

export const HoverTooltip = ({
  children,
  text,
  position = 'top-center',
  maxWidth,
  zIndex,
  triggerTitle,
}: HoverTooltipProps) => {
  const positionMap: Record<TooltipPosition, TooltipProps['placement']> = {
    'top-left': 'top-start',
    'top-center': 'top',
    'top-right': 'top-end',
    'bottom-left': 'bottom-start',
    'bottom-center': 'bottom',
    'bottom-right': 'bottom-end',
    'right-top': 'right-start',
    'right-center': 'right',
    'right-bottom': 'right-end',
    'left-top': 'left-start',
    'left-center': 'left',
    'left-bottom': 'left-end',
  };

  return (
    <CustomTooltip
      title={text}
      arrow
      placement={positionMap[position]}
      maxWidth={maxWidth}
      zIndex={zIndex}>
      <div tabIndex={0} role={'button'} aria-label={triggerTitle}>
        {children}
      </div>
    </CustomTooltip>
  );
};
