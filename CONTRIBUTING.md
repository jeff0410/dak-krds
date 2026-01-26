# 기여 가이드

DAK KRDS에 기여해주셔서 감사합니다! 🎉

## 개발 환경 설정

### 필수 요구사항

- Node.js 18 이상
- pnpm 8 이상

### 설치

```bash
# 저장소 클론
git clone https://github.com/yourusername/dak-krds.git
cd dak-krds

# 의존성 설치
pnpm install

# 빌드
pnpm run build
```

## 개발 워크플로우

### 1. 새 컴포넌트 추가

새 컴포넌트를 추가할 때는 다음 구조를 따릅니다:

```
src/components/
  └── component-name/
      ├── component-name.tsx    # 컴포넌트
      ├── component-name.css    # 스타일
      ├── use-component-name.ts # 훅 (필요한 경우)
      └── index.ts              # export
```

### 2. 컴포넌트 작성 규칙

#### TSX 컴포넌트

```tsx
import React from 'react';
import './component-name.css';

export interface ComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outlined';
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
}

export function Component({
  variant = 'default',
  size = 'medium',
  className = '',
  children,
  ...props
}: ComponentProps) {
  const classNames = [
    'dak-component',
    `dak-component--${variant}`,
    `dak-component--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames} {...props}>
      {children}
    </div>
  );
}
```

#### 커스텀 훅

```tsx
export const useComponentName = () => {
  // 로직
  return { /* 반환 값 */ };
};
```

### 3. CSS 작성 규칙

- 모든 클래스는 `dak-` 접두사 사용
- BEM 네이밍 컨벤션 사용 (예: `dak-button--primary`)
- 변수 대신 직접 값 사용 (간단함 유지)

```css
.dak-component {
  /* 기본 스타일 */
}

.dak-component--variant {
  /* variant 스타일 */
}

.dak-component--size {
  /* size 스타일 */
}
```

### 4. Export 추가

컴포넌트를 추가한 후 `src/components/index.ts`에 export를 추가합니다:

```typescript
export * from './component-name';
```

### 5. 테스트

빌드가 성공하는지 확인:

```bash
pnpm run build
```

예제 앱에서 테스트:

```bash
cd example
pnpm install
pnpm run dev
```

## 코드 스타일

- TypeScript strict 모드 사용
- 함수형 컴포넌트 사용 (`export function ComponentName()`)
- 커스텀 훅은 화살표 함수 사용 (`export const useHook = () => {}`)
- Props는 interface로 정의
- 파일명은 kebab-case 사용

## Pull Request

1. 기능 브랜치 생성: `git checkout -b feature/new-component`
2. 변경사항 커밋: `git commit -m "Add: NewComponent"`
3. 브랜치 푸시: `git push origin feature/new-component`
4. Pull Request 생성

### 커밋 메시지 규칙

- `Add: 새 기능`
- `Fix: 버그 수정`
- `Update: 기능 개선`
- `Refactor: 리팩토링`
- `Docs: 문서 수정`
- `Style: 스타일 변경`

## 질문이 있으신가요?

이슈를 생성하거나 이메일로 연락주세요!
