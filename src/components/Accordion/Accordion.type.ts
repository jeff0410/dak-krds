import type { HTMLAttributes, ReactNode } from 'react';

export interface AccordionItemProps {
  id?: string;
  title: ReactNode | string;
  size?: 's' | 'm' | 'l';
  className?: string;
  children: ReactNode;
  childrenClassName?: string;
}

export interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
  items: AccordionItemProps[];
  variant?: 'line' | 'plain';
}

export interface ChevronIconProps {
  isOpen: boolean;
}

export interface InternalAccordionItemProps extends AccordionItemProps {
  isOpen: boolean;
  onClick: () => void;
}
