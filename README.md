<div align="center">

# DAK KRDS

**모두를 위한 디지털 서비스 경험**

[KRDS(Korea Design System)](https://www.krds.go.kr) 디자인 원칙을 준수하는 React UI 컴포넌트 라이브러리

[![npm version](https://img.shields.io/npm/v/dak-krds?color=0B50D0&label=npm)](https://www.npmjs.com/package/dak-krds)
[![license](https://img.shields.io/npm/l/dak-krds?color=0B50D0)](./LICENSE)
[![React](https://img.shields.io/badge/React-19+-0B50D0?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-0B50D0?logo=typescript&logoColor=white)](https://www.typescriptlang.org)

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
| 🧩 **80+ 컴포넌트** | 입력 · 탐색 · 피드백 · 데이터 표시 |

---

## 목차

- [설치](#설치)
- [빠른 시작](#빠른-시작)
- [꼭 알아야 할 3가지](#꼭-알아야-할-3가지)
- [컴포넌트 사용법](#컴포넌트-사용법)
- [전체 컴포넌트 목록](#전체-컴포넌트-목록)
- [TypeScript](#typescript)
- [웹접근성](#웹접근성)
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
import { ModalManager, modalService } from 'dak-krds';

// 1. 앱 최상단에 배치
function App() {
  return (
    <ModalManager>
      <Routes />
    </ModalManager>
  );
}

// 2. 어디서든 호출
modalService.push(<div>정말 삭제하시겠습니까?</div>);
modalService.pop();      // 최상단 모달 닫기
modalService.popAll();   // 전부 닫기
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

`Button` `LinkButton` `Link`

</details>

<details>
<summary><b>탐색</b></summary>

`Breadcrumb` `Tab` `Tabs` `TabPanel` `MScrollTab` `Pagination` `StepIndicator` `Masthead`

</details>

<details>
<summary><b>피드백</b></summary>

`Alert` `Modal` `SmallModal` `MediumModal` `LargeModal` `DialogModal` `ToastBar` `ToastBarManager` `Spinner` `ProgressBar` `LoadingPage` `ErrorPage` `NotFountPage`

</details>

<details>
<summary><b>데이터 표시 · 레이아웃</b></summary>

`Table` `GroupedTable` `MTable` `Accordion` `Carousel` `Drawer` `Portal` `Calendar` `ScheduleCalendar` `CustomEventCalendar`

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
