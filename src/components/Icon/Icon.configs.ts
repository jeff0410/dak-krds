export const ICON_CONFIG = {
  multiColor: ['Annotation', 'SystemDanger', 'SystemSuccess', 'SystemWarning', 'SystemInfo'],
  stroke: ['Check', 'CheckCircle', 'RoundCheck', 'GuideCheck'],
} as const;

export type IconCategory = keyof typeof ICON_CONFIG;
