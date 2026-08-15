<div align="center">

# DAK KRDS

**모두를 위한 디지털 서비스 경험**

[KRDS(Korea Design System)](https://www.krds.go.kr) 디자인 원칙을 준수하는 React UI 컴포넌트 라이브러리

[![npm version](https://img.shields.io/npm/v/dak-krds?color=0B50D0&label=npm)](https://www.npmjs.com/package/dak-krds)
[![license](https://img.shields.io/npm/l/dak-krds?color=0B50D0)](./LICENSE)
[![React](https://img.shields.io/badge/React-19+-0B50D0?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-0B50D0?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Storybook](https://img.shields.io/badge/Storybook-데모%20보기-FF4785?logo=storybook&logoColor=white)](https://jeff0410.github.io/dak-krds/)

**[컴포넌트 데모 보기 →](https://jeff0410.github.io/dak-krds/)**

</div>

---

국민 누구나 디지털 정부서비스를 쉽게 누릴 수 있는 기준을 바탕으로, 일관성 있고 접근성 높은 인터페이스를 제공합니다.

| | |
| --- | --- |
| 🏛️ **KRDS 준수** | 대한민국 공식 디자인 시스템 가이드 기반 |
| ♿️ **웹접근성** | WCAG 2.1 AA — 키보드 탐색 · 스크린 리더 지원 |
| 📦 **TypeScript** | 모든 컴포넌트에 타입 정의 제공, `any` 없음 |
| 🎨 **디자인 토큰** | CSS 변수 기반 색상 · 타이포그래피 · 간격 |
| 🚀 **Tree-shaking** | 컴포넌트 단위로 분할 배포 — 쓴 것만 번들에 포함 |
| 🧩 **KRDS 55개 전체** | 아이덴티티 · 탐색 · 레이아웃 · 액션 · 선택 · 피드백 · 도움 · 입력 · 설정 · 콘텐츠 · 모바일 |

---

## 목차

- [설치](#설치)
- [빠른 시작](#빠른-시작)
- [꼭 알아야 할 3가지](#꼭-알아야-할-3가지)
- [컴포넌트 사용법](#컴포넌트-사용법) — KRDS 55개 전체
- [번들 크기](#번들-크기)
- [전체 컴포넌트 목록](#전체-컴포넌트-목록)
- [TypeScript](#typescript)
- [웹접근성](#웹접근성)
- [변경 이력](./CHANGELOG.md)
- [팀](#팀)

---

## 설치

```bash
pnpm add dak-krds
```

<details>
<summary>npm · yarn 사용 시</summary>

```bash
npm install dak-krds
yarn add dak-krds
```

</details>

**요구사항** — React 19 이상, React DOM 19 이상 (peerDependency)

### 스타일

**CSS 는 컴포넌트를 import 하면 자동으로 함께 들어옵니다.** 별도 import 가 필요 없습니다.

번들러를 쓰지 않는 환경이거나 전체 스타일을 한 번에 넣고 싶다면 아래를 쓸 수 있습니다.

```tsx
import 'dak-krds/styles.css';
```

이 경우 사용하지 않는 컴포넌트의 CSS 까지 모두 포함됩니다.

---

## 빠른 시작

### 1. 컴포넌트 사용

```tsx
import { useState } from 'react';
import { Button, TextInput, Badge } from 'dak-krds';

function SignupForm() {
  const [name, setName] = useState('');

  return (
    <form>
      <Badge label="신규" variant="success" />

      <TextInput
        id="name"
        title="이름"
        placeholder="이름을 입력하세요"
        isRequired
        value={name}
        setValue={setName}
      />

      <Button variant="primary" size="m" onClick={() => alert(name)}>
        가입하기
      </Button>
    </form>
  );
}
```

---

## 꼭 알아야 할 3가지

처음 쓸 때 가장 많이 막히는 지점입니다.

### 1. 입력 컴포넌트는 `value` + `setValue` 입니다

`onChange`가 아니라 **setter 함수를 직접 넘깁니다.** `useState`의 setter를 그대로 전달하면 됩니다.

```tsx
const [email, setEmail] = useState('');

// ✅ 올바른 사용
<TextInput id="email" value={email} setValue={setEmail} />

// ❌ onChange 는 지원하지 않습니다
<TextInput id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
```

해당 컴포넌트 — `TextInput` · `TextArea` · `NumberInput` · `PhoneInput`

> `Select` · `Checkbox` · `Switch` 는 `onChange(값)` 형태를 씁니다. 이벤트 객체가 아니라 **값이 바로 전달**됩니다.

### 2. 레이블은 `label` 이 아니라 `title` 입니다

입력 계열 컴포넌트에서 화면에 보이는 레이블은 `title` prop 입니다.

```tsx
<TextInput id="phone" title="휴대전화" />
```

> `Select` 와 `Badge` 는 예외로 `label` 을 씁니다. 아래 [컴포넌트 사용법](#컴포넌트-사용법)의 예제를 참고하세요.

### 3. `id` 가 필수인 컴포넌트가 있습니다

접근성을 위해 레이블과 입력 요소를 연결해야 하므로 `id` 를 필수로 받습니다.

```tsx
<TextInput id="email" />      {/* 필수 */}
<TextArea id="memo" />        {/* 필수 */}
<Checkbox id="terms" ... />   {/* 필수 */}
```

---

## 컴포넌트 사용법

### Button

```tsx
import { Button } from 'dak-krds';

<Button variant="primary">확인</Button>
<Button variant="secondary">취소</Button>
<Button variant="danger">삭제</Button>
<Button variant="outline">더보기</Button>

{/* 크기 — xs · s · m(기본) · l · xl */}
<Button size="s">작게</Button>
<Button size="xl">크게</Button>

{/* 로딩 · 비활성 · 아이콘 */}
<Button loading loadingText="저장 중">저장</Button>
<Button disabled>비활성</Button>
<Button icon={<Icon icon="Search" size={20} />} iconPosition="left">
  검색
</Button>
```

| prop | 타입 | 기본값 |
| --- | --- | --- |
| `variant` | `primary` `secondary` `teriary` `text` `gray` `danger` `danger-secondary` `black` `success` `success-secondary` `warning` `outline` `transparent` `custom` | `primary` |
| `size` | `xs` `s` `m` `l` `xl` | `m` |
| `loading` | `boolean` | `false` |
| `disabled` | `boolean` | `false` |

### TextInput

```tsx
import { TextInput } from 'dak-krds';

const [value, setValue] = useState('');

<TextInput
  id="email"
  title="이메일"
  description="회사 메일을 입력해주세요"
  placeholder="email@example.com"
  isRequired
  value={value}
  setValue={setValue}
/>

{/* 유효성 오류 표시 */}
<TextInput
  id="password"
  type="password"
  title="비밀번호"
  isValid={false}
  error="8자 이상 입력해주세요"
  value={value}
  setValue={setValue}
/>

{/* 레이블을 왼쪽에 배치 */}
<TextInput
  id="name"
  title="이름"
  titlePosition="horizontal"
  value={value}
  setValue={setValue}
/>
```

### TextArea

```tsx
import { TextArea } from 'dak-krds';

<TextArea
  id="inquiry"
  title="문의 내용"
  placeholder="내용을 입력하세요"
  size="l"
  useCount
  maxLength={500}
  value={value}
  setValue={setValue}
/>
```

`useCount` 를 켜면 `maxLength` 기준 글자 수 카운터가 표시됩니다.

### Select

단일 선택과 다중 선택을 모두 지원합니다.

```tsx
import { Select } from 'dak-krds';

const options = [
  { value: 'ko', label: '한국어' },
  { value: 'en', label: 'English' },
];

{/* 단일 선택 */}
const [lang, setLang] = useState('ko');

<Select
  id="lang"
  label="언어"
  options={options}
  value={lang}
  onChange={setLang}
/>

{/* 다중 선택 */}
const [langs, setLangs] = useState<string[]>([]);

<Select
  id="langs"
  label="사용 언어"
  type="multi"
  options={options}
  value={langs}
  onChange={setLangs}
  multiDisplayStrategy="tags"
  maxTags={2}
/>
```

`multiDisplayStrategy` — `ellipsis`(기본) · `count`(`"한국어 외 2건"`) · `tags`

### Checkbox

`status` 는 `on` · `off` · `indeterminate` 3가지 상태를 가집니다.

```tsx
import { Checkbox, CheckboxGroup, type CheckboxStatus } from 'dak-krds';

const [status, setStatus] = useState<CheckboxStatus>('off');

<Checkbox
  id="terms"
  label="이용약관에 동의합니다"
  status={status}
  onChange={setStatus}
/>

{/* 그룹 */}
const [values, setValues] = useState<string[]>([]);

<CheckboxGroup
  options={[
    { value: 'email', label: '이메일 수신' },
    { value: 'sms', label: 'SMS 수신' },
  ]}
  values={values}
  onChange={setValues}
  direction="vertical"
/>
```

### Switch

```tsx
import { Switch } from 'dak-krds';

const [enabled, setEnabled] = useState(false);

<Switch
  label="알림 받기"
  labelPosition="right"
  status={enabled}
  onChange={setEnabled}
/>
```

### Badge · Tag

```tsx
import { Badge, Tag } from 'dak-krds';

{/* Badge — label 이 필수입니다 */}
<Badge label="진행중" variant="information" />
<Badge label="완료" variant="success" appearance="fill-soft" />
<Badge label="마감" variant="danger" size="s" />

{/* Tag — 삭제 가능한 형태 */}
<Tag label="React" />
<Tag label="TypeScript" variant="removable" onDelete={(l) => remove(l)} />
```

`Badge variant` — `default` `primary` `secondary` `information` `success` `warning` `point` `danger` `error`
`Badge appearance` — `stroke` `fill-strong` `fill-soft`

### Alert

```tsx
import { Alert } from 'dak-krds';

<Alert
  variant="warning"
  title="저장되지 않은 변경사항이 있습니다"
  description="페이지를 벗어나면 작성 중인 내용이 사라집니다."
/>
```

`variant` — `danger` `warning` `success` `information` `secondary`

### Modal

`ModalManager` 로 앱을 감싼 뒤, 어디서든 `modalService` 로 모달을 띄웁니다.

```tsx
import { ModalManager, modalService, SmallModal } from 'dak-krds';

// 1. 앱 최상단에 배치
function App() {
  return (
    <ModalManager>
      <Routes />
    </ModalManager>
  );
}

// 2. 어디서든 호출
modalService.push(
  <SmallModal>
    <SmallModal.Header>정말 삭제하시겠습니까?</SmallModal.Header>
    <SmallModal.Content>삭제한 내용은 되돌릴 수 없습니다.</SmallModal.Content>
    <SmallModal.Footer>
      <SmallModal.SecondaryButton onClick={() => modalService.pop()}>
        취소
      </SmallModal.SecondaryButton>
      <SmallModal.DangerousButton onClick={() => modalService.pop()}>
        삭제
      </SmallModal.DangerousButton>
    </SmallModal.Footer>
  </SmallModal>,
);

modalService.pop();      // 최상단 모달 닫기
modalService.popAll();   // 전부 닫기
```

**컨테이너를 넣어야 합니다.** `SmallModal` `MediumModal` `LargeModal` `DialogModal` 중
하나로 감싸세요. 이들이 배경 딤 · 가운데 정렬 · 초점 가둠 · Esc 닫기를 제공합니다.
`modalService.push(<div>…</div>)` 처럼 맨 요소를 넣으면 배경 없이 화면 왼쪽 위에
그대로 붙습니다.

네 종류 모두 같은 방식으로 씁니다. 제목은 `title` prop 으로 넘겨도 되고, 빨간 버튼은
`DangerButton` 으로 불러도 됩니다.

```tsx
<SmallModal.Header title="정말 삭제하시겠습니까?" />   {/* 위와 동일 */}
<SmallModal.DangerButton>삭제</SmallModal.DangerButton>  {/* 위와 동일 */}
```

### ToastBar

```tsx
import { ToastBarManager, toastbarService } from 'dak-krds';

// 1. 앱 최상단에 배치
<ToastBarManager />

// 2. 어디서든 호출
toastbarService.succeedMsg('저장되었습니다');
toastbarService.dangerMsg('삭제에 실패했습니다', '오류');
toastbarService.warningMsg('용량이 부족합니다');
toastbarService.infoMsg('업데이트가 있습니다');
```

### DatePicker

```tsx
import { CustomDatePicker, CustomRangeDatePicker } from 'dak-krds';

{/* 단일 날짜 */}
<CustomDatePicker
  id="date"
  label="예약일"
  value="2026-01-15"
  onChange={(date) => setDate(date)}
  pattern="yyyy-MM-dd"
/>

{/* 기간 */}
<CustomRangeDatePicker
  id="period"
  label="조회 기간"
  value={['2026-01-01', '2026-01-31']}
  onChange={(range) => setRange(range)}
  pattern="yyyy-MM-dd"
/>
```

### Pagination

```tsx
import { Pagination } from 'dak-krds';

<Pagination
  currentPage={page}
  totalPage={10}
  onChangePage={setPage}
/>
```

### Icon

290여 종의 KRDS 기반 아이콘을 제공합니다.

```tsx
import { Icon } from 'dak-krds';

<Icon icon="Search" size={24} />
<Icon icon="Close" size={20} color="var(--krds-color-gray-60)" />
```

---

### 페이지 골격 — Header · Footer

한 페이지를 구성하는 뼈대입니다. `Header` 는 건너뛰기 링크와 주메뉴를 안에 품고 있습니다.

```tsx
import { Header, Footer, Masthead, Identifier } from 'dak-krds';

<Header
  logo={<img src="/logo.svg" alt="안심예방접종" />}
  logoHref="/"
  masthead={<Masthead />}
  sticky="auto-hide"
  skipLinks={[
    { label: '본문 바로가기', targetId: 'main-content' },
    { label: '주메뉴 바로가기', targetId: 'gnb' },
  ]}
  utilityLinks={[
    { label: '로그인', href: '/login' },
    { label: '관련 사이트', href: 'https://www.krds.go.kr', external: true },
  ]}
  menu={[
    { label: '소개', href: '/about', current: true },
    {
      label: '서비스',
      description: '제공 서비스 안내',
      groups: [
        {
          label: '접종',
          items: [
            { label: '예방접종', href: '/vac' },
            { label: '이상반응', href: '/adr' },
          ],
        },
      ],
    },
  ]}
/>

<Footer
  logo={<img src="/logo-white.svg" alt="안심예방접종" />}
  contacts={[
    { label: '주소', value: '서울특별시 중구 세종대로 110' },
    { label: '대표전화', value: '02-1234-5678', href: 'tel:0212345678' },
  ]}
  utilityLinks={[
    { label: '질병관리청', href: 'https://www.kdca.go.kr', external: true },
  ]}
  policyLinks={[
    { label: '개인정보처리방침', href: '/privacy', emphasis: true },
    { label: '웹 접근성 정책', href: '/a11y' },
  ]}
  copyright="© Korea Disease Control and Prevention Agency."
  identifier={<Identifier organization="질병관리청" variant="dark" />}
/>
```

`Header sticky` — `none`(기본) · `always` · `auto-hide`(내리면 숨고 올리면 복귀)

### 탐색 — SkipLink · MainMenu · SideNavigation · InPageNavigation · Breadcrumb

```tsx
import {
  SkipLink,
  MainMenu,
  SideNavigation,
  InPageNavigation,
  Breadcrumb,
} from 'dak-krds';

{/* 문서 최상단. Header 를 쓰면 이미 포함돼 있습니다 */}
<SkipLink items={[{ label: '본문 바로가기', targetId: 'main-content' }]} />

<MainMenu
  items={[
    { label: '소개', href: '/about', current: true },
    { label: '서비스', items: [{ label: '예방접종', href: '/vac' }] },
  ]}
/>

<SideNavigation
  title="서비스 안내"
  titleHref="/service"
  items={[
    { label: '개요', href: '/service/intro' },
    {
      label: '접종 정보',
      items: [
        { label: '대상자', href: '/service/target', current: true },
        { label: '일정', href: '/service/schedule' },
      ],
    },
    { label: '문의', href: '/service/qna', dividerAfter: true },
  ]}
/>

{/* 스크롤에 따라 현재 위치를 표시합니다 */}
<InPageNavigation
  items={[
    { label: '신청 자격', targetId: 'eligibility' },
    { label: '제출 서류', targetId: 'documents', level: 2 },
  ]}
  offset={80}
/>

<Breadcrumb
  items={[
    { label: '홈', value: 'home' },
    { label: '서비스', value: 'service' },
  ]}
/>
```

### 레이아웃 — Accordion · Disclosure · Tabs · Table

```tsx
import { Accordion, Disclosure, Tabs, Table } from 'dak-krds';

<Accordion
  variant="line"
  items={[
    { id: 'q1', title: '접종 대상자는 누구인가요?', children: '만 65세 이상입니다.' },
    { id: 'q2', title: '비용이 있나요?', children: '무료입니다.' },
  ]}
/>

{/* 아코디언보다 가벼운 부가 정보. 기본은 접힘 */}
<Disclosure title="추가 안내 사항">
  본문을 보조하는 설명입니다.
</Disclosure>

<Tabs
  variant="underline"
  tabs={[
    { id: 'overview', label: '개요', content: '서비스 개요입니다.' },
    { id: 'howto', label: '이용방법', content: '이용 방법입니다.' },
  ]}
/>

<Table
  data={[{ no: '2026-001', name: '홍길동', status: '처리중' }]}
  columns={[
    { accessorKey: 'no', header: '접수번호' },
    { accessorKey: 'name', header: '성명' },
    { accessorKey: 'status', header: '상태' },
  ]}
/>
```

`Table` 의 `columns` 는 material-react-table 규격입니다. `key`/`label` 이 아니라 **`accessorKey`/`header`** 를 씁니다.

### 목록과 이미지 — StructuredList · TextList · Image · Carousel

```tsx
import { StructuredList, TextList, Image, Carousel } from 'dak-krds';

{/* 항목과 값을 짝지어 보여줍니다 (dl/dt/dd) */}
<StructuredList
  title="접수 정보"
  rows={[
    { term: '접수번호', description: '2026-08-0001' },
    { term: '처리상태', description: '검토 중' },
  ]}
/>

<TextList
  variant="ordered"
  items={[
    { content: '신청서를 작성합니다.' },
    {
      content: '서류를 첨부합니다.',
      items: [{ content: '신분증 사본' }],
    },
  ]}
/>

<Image
  src="/guide.png"
  alt="이용 안내"
  ratio="16:9"
  rounded
  caption="접종 절차 안내도"
  longDescription="접수부터 접종까지 네 단계를 도식으로 표현한 이미지입니다."
/>

{/* dataList 에 요소를 직접 넣습니다 */}
<Carousel
  dataList={[<div key="1">첫 번째</div>, <div key="2">두 번째</div>]}
  onChange={(index) => console.log(index)}
/>
```

`Image` 의 `longDescription` 은 `aria-describedby` 로 연결됩니다. 복잡한 이미지에 씁니다.

### 알림 — CriticalAlerts · Snackbar

```tsx
import { CriticalAlerts, Snackbar } from 'dak-krds';

{/* 본문 최상단 전체 폭. KRDS 규정상 닫기 버튼을 제공하지 않습니다 */}
<CriticalAlerts
  level="high"
  message="재난 상황 발생. 즉시 확인하세요."
  linkLabel="상세 보기"
  linkHref="/notice"
/>

{/* 되돌리기 같은 후속 행동이 필요할 때. 작업 버튼은 최대 1개 */}
<Snackbar
  open={open}
  title="저장했습니다"
  description="변경 내용이 반영됐습니다."
  actionLabel="되돌리기"
  onAction={handleUndo}
  onClose={() => setOpen(false)}
/>
```

`CriticalAlerts level` — `high`(재난·장애) · `medium`(사전 예고) · `low`(인지 필요)

`ToastBar` 와 `Snackbar` 는 KRDS 상 별개입니다. 작업 버튼이 필요하면 `Snackbar` 를 씁니다.

### 진행 표시 — StepIndicator · ProgressBar · Spinner

```tsx
import { StepIndicator, ProgressBar, Spinner } from 'dak-krds';

<StepIndicator
  steps={[
    { description: '약관 동의' },
    { description: '정보 입력' },
    { description: '완료' },
  ]}
  currentStepIndex={1}
  onClickStep={setStep}
  focusable
/>

<ProgressBar length={3} currentProgress={2} />

<Spinner size="m" />
```

`StepIndicator` 의 각 단계는 `label` 이 아니라 **`description`** 입니다.

### 도움 — Tooltip · ContextualHelp · HelpPanel · TutorialPanel · CoachMark

```tsx
import {
  Tooltip,
  ContextualHelp,
  HelpPanel,
  TutorialPanel,
  CoachMark,
} from 'dak-krds';

<Tooltip content="보조 설명입니다." placement="top-center">
  <button type="button">도움말</button>
</Tooltip>

{/* 사용자가 요청할 때만 열립니다. i(정보) 와 ?(도움) 두 유형 */}
<ContextualHelp variant="help" title="본인인증이란?" placement="bottom-start">
  휴대전화 또는 공동인증서로 본인을 확인하는 절차입니다.
</ContextualHelp>

<HelpPanel
  open={helpOpen}
  onClose={() => setHelpOpen(false)}
  title="도움말"
  links={[{ label: '자주 묻는 질문', href: '/faq' }]}
>
  화면 우측에 붙는 보조 패널입니다.
</HelpPanel>

<TutorialPanel
  open={tutorialOpen}
  onClose={() => setTutorialOpen(false)}
  title="신청 따라하기"
  steps={[
    { title: '1. 약관 동의', content: '필수 약관에 동의합니다.' },
    { title: '2. 정보 입력', content: '본인 정보를 입력합니다.' },
  ]}
/>

{/* 대상 요소를 스포트라이트로 강조합니다. 사용자가 요청할 때만 실행 */}
<CoachMark
  open={coachOpen}
  onClose={() => setCoachOpen(false)}
  steps={[
    {
      targetId: 'search-button',
      title: '1. 검색',
      instruction: '여기서 접종 기관을 찾습니다.',
    },
  ]}
/>
```

`Tooltip` 은 `text`/`position` 이 아니라 **`content`/`placement`** 를 씁니다.

### 모바일 — BottomSheet · TabBars · BackButton · QuantityToggle · RangeSlider · SplashScreen

```tsx
import {
  BottomSheet,
  TabBars,
  BackButton,
  QuantityToggle,
  RangeSlider,
  SplashScreen,
  Icon,
} from 'dak-krds';

<BackButton title="예방접종 상세" confirmMessage="작성 중인 내용이 사라집니다." />

<BottomSheet
  open={sheetOpen}
  onClose={() => setSheetOpen(false)}
  title="접종 기관 선택"
  description="가까운 기관을 선택하세요."
>
  <ul>{/* 목록 */}</ul>
</BottomSheet>

{/* 화면 하단 고정. 5개 이내로 제한됩니다 */}
<TabBars
  items={[
    { label: '홈', icon: <Icon icon="Home" size={22} />, href: '/', current: true },
    { label: '접종', icon: <Icon icon="Check" size={22} />, href: '/vac', badge: 3 },
  ]}
/>

<QuantityToggle label="접종 회차" value={count} onChange={setCount} min={1} max={5} unit="회" />

<RangeSlider label="검색 반경" value={radius} onChange={setRadius} min={0} max={100} step={10} unit="km" />

<SplashScreen logo={<img src="/logo.svg" alt="" />} message="불러오는 중입니다" />
```

### 설정과 접근성 — LanguageSwitcher · Resize · VisuallyHidden · AccessibleMedia · TextToSpeech

```tsx
import {
  LanguageSwitcher,
  Resize,
  VisuallyHidden,
  AccessibleMedia,
  TextToSpeech,
} from 'dak-krds';

{/* 언어가 둘이면 링크형, 셋 이상이면 드롭다운으로 자동 전환됩니다 */}
<LanguageSwitcher
  current={lang}
  onSelect={setLang}
  languages={[
    { code: 'ko', nativeName: '한국어' },
    { code: 'en', nativeName: 'English', localName: '영어' },
    { code: 'zh', nativeName: '中文', localName: '중국어' },
  ]}
/>

{/* 90 · 100 · 110 · 130 · 150% 다섯 단계 */}
<Resize value={scale} onChange={setScale} targetSelector="#main-content" />

<VisuallyHidden>스크린 리더 전용 안내</VisuallyHidden>

<AccessibleMedia
  src="/guide.mp4"
  title="이용 안내 영상"
  tracks={[
    { kind: 'captions', src: '/guide.ko.vtt', srcLang: 'ko', label: '한국어', default: true },
  ]}
  transcript="영상의 전체 대본입니다."
/>

<TextToSpeech targetSelector="#main-content" />
```

`TextToSpeech` 는 Web Speech API 를 지원하지 않는 환경에서는 렌더하지 않습니다.

### 파일 업로드 — FileUpload · FileButtonUpload

```tsx
import { DakFileUpload, FileButtonUpload, type DakFileItem } from 'dak-krds';

const [files, setFiles] = useState<DakFileItem[]>([]);

<DakFileUpload value={files} onChange={setFiles} maxFiles={3} accept=".pdf,.png" />

<FileButtonUpload label="파일 선택" accept=".pdf,.png" maxFiles={3} />
```

### 액션 — Link · LinkButton · FloatingButton

```tsx
import { Link, LinkButton, FloatingButton, Icon } from 'dak-krds';

<Link title="관련 사이트로 이동" useIcon>관련 사이트</Link>

<LinkButton href="/detail" title="자세히 보기" variant="accent">자세히 보기</LinkButton>

{/* 우측 하단 고정. 확장형은 3개까지 */}
<FloatingButton
  icon={<Icon icon="Plus" size={24} />}
  label="빠른 메뉴"
  actions={[
    { label: '맨 위로', icon: <Icon icon="ArrowUp" size={20} />, href: '#top' },
  ]}
/>
```

### 아이덴티티 — Masthead · Identifier · Favicon

```tsx
import { Masthead, Identifier, Favicon } from 'dak-krds';

{/* 공식 배너. 문서 최상단 */}
<Masthead maxWidth="1200px" />

{/* 운영기관 식별자. 푸터 마지막 구획에 둡니다 */}
<Identifier organization="질병관리청" logoSrc="/kdca.svg" variant="dark" />

{/* head 에 link · meta 를 넣습니다. 이미지는 서비스가 준비합니다 */}
<Favicon
  svg="/favicon.svg"
  light="/favicon-light.png"
  dark="/favicon-dark.png"
  appleTouchIcon="/apple-touch-icon.png"
  themeColor="#256ef4"
  sizes={[{ href: '/favicon-32.png', sizes: '32x32' }]}
/>
```

### RadioButton

```tsx
import { RadioButton, RadioButtonGroup } from 'dak-krds';

<RadioButtonGroup
  name="agree"
  options={[
    { value: 'yes', label: '동의' },
    { value: 'no', label: '미동의' },
  ]}
  selectedValue={value}
  onChange={setValue}
  direction="horizontal"
/>

<RadioButton name="single" value="only" checked label="단일 선택" onChange={setValue} />
```

### ChipGroup

```tsx
import { ChipGroup } from 'dak-krds';

<ChipGroup
  type="multi"
  options={[
    { value: 'react', label: 'React' },
    { value: 'ts', label: 'TypeScript' },
  ]}
  selected={selected}
  onChange={(value, checked) =>
    setSelected((list) =>
      checked ? [...list, value] : list.filter((v) => v !== value),
    )
  }
/>
```

`ChipGroup` 은 `chipList` 가 아니라 **`options`/`selected`/`onChange(value, checked)`** 를 씁니다.

---

## 번들 크기

컴포넌트 단위로 분할 배포되어 **쓴 것만 번들에 들어갑니다.** React 19 앱 기준 실측입니다.

| 가져온 것 | 번들 | dak-krds 몫 |
| --- | --- | --- |
| React 만 | 193.1 kB (gzip 60.6) | — |
| `Button` | 195.7 kB (gzip 61.9) | **+2.6 kB** |
| `Tooltip` | 195.5 kB (gzip 61.4) | **+2.3 kB** |
| `ScheduleCalendar` | 426.3 kB (gzip 130.9) | +233 kB |
| `Table` | 1,119.4 kB (gzip 326.0) | +926 kB |

대부분의 컴포넌트는 몇 kB 수준입니다. 다만 아래 넷은 무거운 외부 라이브러리를 함께 가져옵니다.

| 컴포넌트 | 함께 들어오는 것 |
| --- | --- |
| `Table` · `MTable` | material-react-table + MUI |
| `ScheduleCalendar` | FullCalendar |
| `ClickTooltip` · `HoverTooltip` | MUI |

`Tooltip` 은 MUI 를 쓰지 않습니다. MUI 기반이 필요할 때만 `ClickTooltip` · `HoverTooltip` 을 쓰세요.

---

## 전체 컴포넌트 목록

<details open>
<summary><b>입력</b></summary>

`TextInput` `TextArea` `NumberInput` `PhoneInput` `DatePicker` `CustomDatePicker` `CustomSingleDatePicker` `CustomRangeDatePicker` `TimeSelector` `FileUpload` `DakFileUpload` `FileButtonUpload`

</details>

<details>
<summary><b>선택</b></summary>

`Checkbox` `CheckboxGroup` `DakCheckBox` `DakCheckBoxGroup` `RadioButton` `RadioButtonGroup` `Switch` `Select` `Chip` `ChipGroup` `CitySelect`

</details>

<details>
<summary><b>액션</b></summary>

`Button` `LinkButton` `Link` `FloatingButton`

</details>

<details>
<summary><b>아이덴티티</b></summary>

`Masthead` `Identifier` `Header` `Footer`

</details>

<details>
<summary><b>탐색</b></summary>

`SkipLink` `MainMenu` `SideNavigation` `InPageNavigation` `Breadcrumb` `Tab` `Tabs` `TabPanel` `MScrollTab` `Pagination` `StepIndicator`

</details>

<details>
<summary><b>도움 · 설정 · 접근성</b></summary>

`ContextualHelp` `CoachMark` `HelpPanel` `TutorialPanel` `TextToSpeech` `LanguageSwitcher` `Resize` `VisuallyHidden` `AccessibleMedia`

</details>

<details>
<summary><b>모바일</b></summary>

`BottomSheet` `TabBars` `BackButton` `QuantityToggle` `RangeSlider` `Snackbar` `SplashScreen` `ToastBar`

</details>

<details>
<summary><b>피드백</b></summary>

`Alert` `Modal` `SmallModal` `MediumModal` `LargeModal` `DialogModal` `ToastBar` `ToastBarManager` `Spinner` `ProgressBar` `LoadingPage` `ErrorPage` `NotFountPage`

</details>

<details>
<summary><b>데이터 표시 · 레이아웃</b></summary>

`Table` `GroupedTable` `MTable` `Accordion` `Disclosure` `Carousel` `Drawer` `Portal` `Calendar` `ScheduleCalendar` `CustomEventCalendar` `StructuredList` `TextList` `Image` `CriticalAlerts` `Favicon`

</details>

<details>
<summary><b>타이포그래피 · 표시</b></summary>

`Display` `Heading` `Title` `Body` `Detail` `Label` `Badge` `Tag` `StatusLabel` `Icon`

</details>

<details>
<summary><b>도움</b></summary>

`Tooltip` `HoverTooltip` `ClickTooltip`

</details>

<details>
<summary><b>서비스 · 유틸리티</b></summary>

**서비스** — `modalService` `toastbarService` `dialogService` `customEventService`

**날짜** — `dateWithFormat` `parseStringToLocalDate` `daysBetweenTwoDate` `getFirstDayAndLastDayOfMonth` `getFirstAndLastDayOfWeek` 외

**공휴일** — `isKoreanHoliday` `getHolidayName` `koreanHolidays`

**기타** — `splitPhoneNumber` `birthDateFormat` `numberToHHMMSS` `cityData`

</details>

> KRDS 55개 표준 컴포넌트 대비 구현 현황은 [docs/KRDS_COVERAGE.md](docs/KRDS_COVERAGE.md) 에서 확인할 수 있습니다.

> 모든 컴포넌트는 [온라인 데모](https://jeff0410.github.io/dak-krds/)에서 바로 확인할 수 있습니다.
> 로컬에서 띄우려면 `pnpm run storybook` 을 실행하세요.
> 화면 변화를 자동으로 잡는 시각 회귀 테스트는 [docs/VISUAL_REGRESSION.md](docs/VISUAL_REGRESSION.md) 를 참고하세요.

---

## TypeScript

모든 컴포넌트의 props 타입을 함께 export 합니다.

```tsx
import type {
  ButtonProps,
  TextInputProps,
  SelectProps,
  CheckboxStatus,
} from 'dak-krds';

const submitButton: ButtonProps = {
  variant: 'primary',
  size: 'l',
  onClick: () => save(),
};
```

타입 이름은 대부분 `<컴포넌트명>Props` 규칙을 따릅니다.

---

## 웹접근성

WCAG 2.1 AA 수준을 기준으로 개발합니다.

- **키보드 탐색** — 모든 인터랙티브 요소에 키보드로 접근 가능
- **스크린 리더** — ARIA 속성으로 보조 기술 지원
- **색상 대비** — 충분한 명도 대비 확보
- **포커스 표시** — 현재 위치를 명확히 표시
- **자동 보완** — `id` · `title` · `alt` · `aria-*` 가 전달되지 않으면 자동 생성

```tsx
{/* 시각적 레이블 없이 스크린 리더용 설명만 제공 */}
<Checkbox id="row-1" title="1번 항목 선택" status={status} onChange={setStatus} />

{/* 아이콘 버튼에 접근성 이름 부여 */}
<Button aria-label="검색" icon={<Icon icon="Search" size={20} />} />
```

---

## 디자인 토큰

CSS 변수로 제공되어 그대로 가져다 쓸 수 있습니다.

```css
.my-component {
  color: var(--krds-color-gray-90);
  border: 1px solid var(--krds-color-gray-20);
  background: var(--krds-color-information-5);
}
```

색상 · 타이포그래피 · 간격 · 모서리 · 그림자 토큰을 지원합니다.

---

## KRDS 준수

이 프로젝트는 [대한민국 정부 디자인 시스템 KRDS](https://www.krds.go.kr)의 다음 원칙을 따릅니다.

- **디자인 스타일** — 색상, 타이포그래피, 형태, 레이아웃, 아이콘
- **컴포넌트 가이드** — 표준 컴포넌트 규격 및 사용 패턴
- **기본 패턴** — 입력 폼, 목록 탐색, 피드백, 오류 처리
- **디지털 포용** — 모든 국민이 동일한 서비스를 경험하도록 설계

---

## 팀

**TeamJeff**

[SUBIN](https://github.com/Da1re) ·
[yo-ong](https://github.com/yo-ong) ·
[imdam2](https://github.com/imdam2) ·
[jiyoon](https://github.com/yCZwIqY) ·
[안진형](https://github.com/AnJinHyeong) ·
[ranyoung.kim](https://github.com/fks1311) ·
[jeffkim](https://github.com/jeff0410)

---

## 라이센스

[MIT](./LICENSE) © TeamJeff
