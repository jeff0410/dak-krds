# DAK KRDS

**모두를 위한 디지털 서비스 경험**

DAK React UI Component Design System - [KRDS(Korea Design System)](https://www.krds.go.kr) 디자인 원칙을 준수하여 개발된 React 컴포넌트 라이브러리입니다.

국민 누구나 디지털 정부서비스 경험을 쉽게 누릴 수 있는 기준을 바탕으로, 일관성 있고 접근성 높은 사용자 인터페이스를 제공합니다.

## 디자인 원칙

DAK KRDS는 KRDS의 핵심 가치를 반영합니다:

- **디지털 포용**: 모든 사용자가 동일한 서비스를 경험할 수 있도록 설계
- **웹접근성**: WCAG 2.1 AA 수준의 접근성 준수
- **일관성**: 통일된 디자인 언어로 예측 가능한 사용자 경험 제공
- **사용성**: 직관적이고 쉬운 인터페이스 설계

## 특징

- 🏛️ **KRDS 준수**: 대한민국 공식 디자인 시스템 가이드 준수
- ♿️ **웹접근성**: 스크린 리더, 키보드 탐색 등 접근성 기능 완벽 지원
- 🎨 **디자인 토큰**: 일관성 있는 스타일 관리를 위한 디자인 토큰 시스템
- 📦 **TypeScript**: 완전한 타입 안정성 제공
- 🚀 **최적화**: Tree-shaking 지원으로 경량화된 번들
- 💅 **커스터마이징**: 프로젝트에 맞게 스타일 확장 가능
- 🌓 **다크모드**: 선명한 화면 모드 지원

## 설치

```bash
pnpm add dak-krds
# or
npm install dak-krds
# or
yarn add dak-krds
```

## 시작하기

### 사용법

```tsx
import { Button, TextInput, Badge, Modal } from 'dak-krds';

function App() {
  return (
    <div>
      <Badge variant="success">새로운 기능</Badge>
      <Button variant="primary" size="medium">
        시작하기
      </Button>
      <TextInput 
        label="이름"
        placeholder="이름을 입력하세요"
        required
      />
    </div>
  );
}
```

### 스타일 가져오기

컴포넌트 스타일을 사용하기 위해 CSS를 import 해주세요:

```tsx
import 'dak-krds/styles.css';
```

## 주요 구성

### 컴포넌트

사용자 인터페이스의 가장 작은 단위로 일관성 있게 사용되는 공통 요소들입니다.

#### 아이덴티티
- **Badge**: 상태나 레이블 표시
- **Tag**: 키워드나 분류 표시

#### 탐색
- **Breadcrumb**: 현재 위치를 나타내는 탐색 경로
- **Tab**: 콘텐츠 영역 전환
- **Pagination**: 페이지 단위 탐색

#### 액션
- **Button**: 사용자 행동 트리거
- **LinkButton**: 링크 형태의 버튼

#### 선택
- **Checkbox**: 다중 선택
- **RadioButton**: 단일 선택
- **Switch**: 토글 스위치
- **Select**: 드롭다운 선택
- **ChipGroup**: 칩 형태의 선택

#### 입력
- **TextInput**: 텍스트 입력
- **TextArea**: 여러 줄 텍스트 입력
- **NumberInput**: 숫자 입력
- **PhoneInput**: 전화번호 입력
- **DatePicker**: 날짜 선택
- **TimeSelector**: 시간 선택

#### 피드백
- **Alert**: 경고 메시지
- **Modal**: 모달 다이얼로그
- **ToastBar**: 토스트 알림
- **Spinner**: 로딩 인디케이터

#### 레이아웃 및 표현
- **Accordion**: 접을 수 있는 콘텐츠
- **Carousel**: 이미지 슬라이더
- **Table**: 데이터 테이블
- **Card**: 콘텐츠 컨테이너

#### 도움
- **Tooltip**: 도움말 툴팁

## 컴포넌트 가이드

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

## TypeScript 지원

모든 컴포넌트는 완전한 TypeScript 타입 정의를 제공합니다.

```tsx
import type { ButtonProps, TextInputProps, BadgeProps } from 'dak-krds';

const customButton: ButtonProps = {
  variant: 'primary',
  size: 'large',
  onClick: () => console.log('클릭됨'),
};
```

## 웹접근성

DAK KRDS는 웹접근성을 최우선으로 고려합니다:

- **WCAG 2.1 AA 수준**: 국제 웹 콘텐츠 접근성 가이드라인 준수
- **키보드 탐색**: 모든 인터랙티브 요소에 키보드 접근 가능
- **스크린 리더 지원**: ARIA 속성을 통한 보조 기술 지원
- **색상 대비**: 충분한 명도 대비로 가독성 보장
- **포커스 인디케이터**: 명확한 포커스 표시로 현재 위치 파악 용이

### 접근성 기능 예시

```tsx
<TextInput
  label="이메일"
  id="email-input"
  required
  error="이메일 형식이 올바르지 않습니다"
  aria-describedby="email-error"
/>

<Button
  aria-label="검색하기"
  onClick={handleSearch}
>
  검색
</Button>
```

## 디자인 토큰

일관성 있는 디자인을 위해 디자인 토큰을 사용합니다:

- **색상**: 브랜드 컬러, 시스템 컬러, 시맨틱 컬러
- **타이포그래피**: 폰트 크기, 줄 높이, 굵기
- **간격**: 여백, 패딩 시스템
- **형태**: 모서리, 테두리, 그림자
- **아이콘**: 150+ 개의 KRDS 기반 아이콘

## KRDS 준수

이 프로젝트는 [대한민국 정부 디자인 시스템 KRDS](https://www.krds.go.kr)의 다음 원칙을 준수합니다:

- **디자인 스타일**: 색상, 타이포그래피, 형태, 레이아웃, 아이콘
- **컴포넌트 가이드**: 표준 컴포넌트 규격 및 사용 패턴
- **기본 패턴**: 입력 폼, 목록 탐색, 피드백, 오류 처리
- **디지털 포용**: 모든 국민이 동일한 서비스를 경험할 수 있도록 설계

더 자세한 정보는 [KRDS 공식 웹사이트](https://www.krds.go.kr/html/site/index.html)를 참고하세요.

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
