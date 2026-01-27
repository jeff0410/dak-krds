# DAK KRDS

DAK React UI Component Design System - 모던하고 사용하기 쉬운 React 컴포넌트 라이브러리입니다.

## 특징

- 🎨 모던한 디자인
- 📦 TypeScript 지원
- 🎯 완전한 타입 안정성
- 🚀 Tree-shaking 지원
- 💅 커스터마이징 가능한 스타일
- ⚡️ 경량화된 번들 사이즈

## 설치

```bash
pnpm add dak-krds
# or
npm install dak-krds
# or
yarn add dak-krds
```

## 사용법

```tsx
import { Button, Input, Card, Badge } from 'dak-krds';

function App() {
  return (
    <Card variant="elevated" padding="large">
      <Badge variant="success">새로운 기능</Badge>
      <Button variant="primary" size="medium">
        시작하기
      </Button>
      <Input 
        label="이름"
        placeholder="이름을 입력하세요"
      />
    </Card>
  );
}
```

## 컴포넌트

### Button

버튼 컴포넌트는 3가지 variant와 3가지 size를 지원합니다.

```tsx
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>

<Button size="small">Small</Button>
<Button size="medium">Medium</Button>
<Button size="large">Large</Button>

<Button disabled>Disabled</Button>
```

### Input

입력 필드 컴포넌트입니다.

```tsx
<Input 
  label="이메일"
  type="email"
  placeholder="email@example.com"
/>

<Input 
  label="비밀번호"
  type="password"
  error="비밀번호가 일치하지 않습니다"
/>

<Input 
  label="이름"
  helperText="실명을 입력해주세요"
/>
```

### Card

컨텐츠를 그룹화하는 카드 컴포넌트입니다.

```tsx
<Card variant="default" padding="medium">
  기본 카드
</Card>

<Card variant="bordered" padding="large">
  테두리가 있는 카드
</Card>

<Card variant="elevated" padding="small">
  그림자가 있는 카드
</Card>
```

### Badge

상태를 표시하는 배지 컴포넌트입니다.

```tsx
<Badge variant="primary">Primary</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="error">Error</Badge>
<Badge variant="info">Info</Badge>

<Badge size="small">Small</Badge>
<Badge size="medium">Medium</Badge>
<Badge size="large">Large</Badge>
```

### Checkbox

체크박스 컴포넌트입니다.

```tsx
<Checkbox label="약관에 동의합니다" />

<Checkbox 
  label="마케팅 수신 동의"
  defaultChecked
/>

<Checkbox 
  label="필수 항목"
  error="필수 항목입니다"
/>
```

### Switch

토글 스위치 컴포넌트입니다.

```tsx
<Switch label="알림 받기" />

<Switch 
  label="다크 모드"
  defaultChecked
/>

<Switch 
  label="자동 저장"
  disabled
/>
```

### Select

드롭다운 선택 컴포넌트입니다.

```tsx
const options = [
  { value: 'ko', label: '한국어' },
  { value: 'en', label: 'English' },
  { value: 'ja', label: '日本語' },
];

<Select 
  label="언어"
  options={options}
  defaultValue="ko"
/>

<Select 
  label="국가"
  options={options}
  error="국가를 선택해주세요"
/>
```

### TextArea

여러 줄 입력 컴포넌트입니다.

```tsx
<TextArea 
  label="메시지"
  placeholder="메시지를 입력하세요"
  rows={5}
/>

<TextArea 
  label="내용"
  resize="vertical"
  helperText="최소 10자 이상 입력해주세요"
/>

<TextArea 
  label="설명"
  error="내용이 너무 짧습니다"
/>
```

## TypeScript

모든 컴포넌트는 완전한 TypeScript 타입 정의를 제공합니다.

```tsx
import type { ButtonProps, InputProps, CardProps } from 'dak-krds';

const customButton: ButtonProps = {
  variant: 'primary',
  size: 'large',
  onClick: () => console.log('클릭됨'),
};
```

## 팀

**TeamJeff**

이 프로젝트는 다음 팀원들과 함께 개발되었습니다:

- [SUBIN](https://github.com/Da1re)
- [yo-ong](https://github.com/yo-ong)
- [imdam2](https://github.com/imdam2)
- [jiyoon](https://github.com/yCZwIqY)
- [안진형](https://github.com/AnJinHyeong)
- [ranyoung.kim](https://github.com/fks1311)
- [jeffkim](https://github.com/jeff0410)

## 라이센스

MIT
