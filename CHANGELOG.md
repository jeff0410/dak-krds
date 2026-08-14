# 변경 이력

이 문서는 사용자에게 영향이 있는 변경만 적습니다.
버전 규칙은 [유의적 버전](https://semver.org/lang/ko/)을 따릅니다.

## 1.0.7

### 고침

아이콘만 있는 버튼에 이름이 없어 스크린 리더가 "버튼" 이라고만 읽던 곳을 고쳤습니다.
WCAG 2.1 의 SC 4.1.2 에 해당합니다.

- `Drawer` 의 닫기 버튼
- `CustomDatePicker` 의 달력 열기 버튼 (단일 · 범위 모두)

## 1.0.6

### 고침

`Tooltip` 을 키보드로도 열 수 있게 했습니다. 이전에는 마우스를 올렸을 때만 열려서
키보드 사용자는 내용을 볼 수 없었습니다. WCAG 2.1 의 2.1.1(키보드)과
1.4.13(Content on Hover or Focus)에 해당합니다.

- 초점을 받으면 열리고, 초점을 잃으면 닫힙니다
- `Esc` 로 닫을 수 있습니다. 초점은 그대로 남습니다
- 안에 버튼 · 링크처럼 이미 초점을 받는 요소가 있으면 그대로 두고, 없을 때만
  감싸는 영역이 대신 초점을 받습니다. 버튼을 감싸도 탭 정거장이 늘지 않습니다
- 닫혀 있을 때 `aria-describedby` 가 존재하지 않는 요소를 가리키던 것을 고쳤습니다
- 툴팁에 맞지 않는 `aria-haspopup` 을 제거했습니다

## 1.0.5

### 고침

스토리에 없어서 그동안 검사되지 않던 곳에서 명도 대비 미달을 더 찾아 고쳤습니다.

- `Button` 의 `success-secondary` 글자색을 `success-50` 에서 `success-60` 으로
  바꿨습니다. 4.12:1 이었습니다. `primary` · `danger` 의 secondary 가 이미 60 단계를
  쓰고 있어 일관성도 함께 맞췄습니다
- `Select` 의 placeholder 글자색을 `gray-40` 에서 `gray-60` 으로 바꿨습니다. 3.08:1
  이었습니다
- `TextInput` `TextArea` 의 입력칸 placeholder 도 같은 이유로 `gray-60` 으로
  바꿨습니다

## 1.0.4

### 고침

명도 대비가 WCAG 2.1 AA 기준(4.5:1)에 미달하던 곳을 고쳤습니다.

- `Badge` 의 `default` 변형 글자색을 `gray-50` · `gray-40` 에서 `gray-60` 으로
  바꿨습니다. 채움 배경에서 3.67:1, 선 배경에서 3.08:1 이었습니다
- `TextInput` · `TextArea` · `PhoneInput` 의 `description` 글자색을 `gray-40` 에서
  `gray-60` 으로 바꿨습니다. 3.08:1 이었습니다

배지의 유채색 변형(primary · success · danger 등)은 전 조합이 기준을 넘겨 그대로입니다.

## 1.0.3

### 고침

`Button` 의 `success` 배경을 한 단계 진하게(`success-40` → `success-50`) 바꿨습니다.
흰 글자와의 명도 대비가 3.09:1 로 WCAG 2.1 AA 기준(4.5:1)에 미달했습니다. 이제
4.57:1 로, `primary`(4.55:1) `danger`(4.56:1) 와 같은 수준입니다.

hover 와 active 도 한 단계씩 밀어 상호작용 단계 간격을 유지했습니다.

### 더함

- 모든 컴포넌트를 확인할 수 있는 온라인 카탈로그를 공개했습니다 —
  <https://jeff0410.github.io/dak-krds/>

## 1.0.1

### 고침

좁은 화면에서 가로 스크롤이 생기던 문제를 고쳤습니다. KRDS 는 표와 이미지를
제외하고 단일 방향 스크롤을 요구합니다.

- `PhoneInput` — 세 칸이 각각 최소 6rem 을 요구해 340px 아래로 줄지 않았습니다.
  480px 이하에서 칸이 줄어들도록 했습니다
- `Tabs` — 탭이 넘쳐도 줄어들지 않아 바깥을 밀어냈습니다. 넘칠 때 가로로
  스크롤합니다
- `Pagination` — 쪽 번호가 줄바꿈되지 않았습니다. 480px 이하에서 줄바꿈하고
  이전 · 다음 버튼의 여백을 줄입니다

375px · 320px 뷰포트에서 문서 폭이 뷰포트와 일치함을 확인했습니다.

---

## 1.0.0

첫 정식 버전입니다. [KRDS](https://www.krds.go.kr) 55개 컴포넌트를 모두 제공합니다.

### 컴포넌트

11개 카테고리 **55 / 55 (100%)** 를 채웠습니다.

| 카테고리 | 개수 | 주요 컴포넌트 |
| --- | --- | --- |
| 아이덴티티 | 4 | `Masthead` `Identifier` `Header` `Footer` |
| 탐색 | 6 | `SkipLink` `MainMenu` `SideNavigation` `InPageNavigation` `Breadcrumb` `Pagination` |
| 레이아웃 및 표현 | 13 | `StructuredList` `CriticalAlerts` `Disclosure` `Modal` `Badge` `Accordion` `Image` `Carousel` `Tabs` `Table` `TextList` `Favicon` |
| 액션 | 3 | `Link` `Button` `FloatingButton` |
| 선택 | 5 | `RadioButton` `Checkbox` `Select` `Tag` `Switch` |
| 피드백 | 2 | `StepIndicator` `Spinner` |
| 도움 | 6 | `HelpPanel` `TutorialPanel` `ContextualHelp` `CoachMark` `Tooltip` `TextToSpeech` |
| 입력 | 4 | `DatePicker` `TextArea` `TextInput` `FileUpload` |
| 설정 | 2 | `LanguageSwitcher` `Resize` |
| 콘텐츠 | 2 | `AccessibleMedia` `VisuallyHidden` |
| 모바일 | 8 | `RangeSlider` `BackButton` `BottomSheet` `QuantityToggle` `ToastBar` `Snackbar` `TabBars` `SplashScreen` |

### 접근성

- 아이콘만 있는 버튼, 여러 칸으로 나뉜 입력에 모두 접근 이름을 붙였습니다
- `CriticalAlerts` 세 단계 모두 WCAG 2.1 AA 명도 대비를 만족합니다
- `SkipLink` · `InPageNavigation` 은 이동할 때 대상으로 초점을 옮깁니다
- `MainMenu` 는 Escape 로 닫을 때 상위 트리거로 초점을 되돌립니다
- 모든 링크 그룹에 `nav[aria-label]` 을, 활성 항목에 `aria-current` 를 붙였습니다

### 패키징

- 컴포넌트 단위로 분할 배포됩니다. `Button` 하나를 가져오면 **2.6 kB** 만 늘어납니다
- 컴포넌트를 가져오면 필요한 CSS 가 함께 들어옵니다. 별도 import 가 필요 없습니다
- KRDS 지정 글꼴(Pretendard GOV 가변)을 동봉합니다
- ESM · CJS · 타입 정의를 모두 제공합니다

### 품질 장치

배포 전에 아래를 모두 통과해야 npm 에 올라갑니다.

- 접근성 · 스모크 테스트 **71건**
- 배포 산출물 검증 **20건** — 전역 CSS 유실, 아이콘 문자열화, 글꼴 경로 깨짐 등 실제로 났던 사고를 검사합니다
- 문서 정합성 검사 — README 예제의 prop 이 실제 타입과 일치하는지, 55개가 모두 예제를 갖는지 확인합니다

---

## 0.1.x 에서 올라올 때

0.1.x 를 쓰고 계셨다면 아래를 확인하세요.

### `Display` 의 기본 태그가 `div` 로 바뀝니다

크기 단계를 고르는 컴포넌트인데 `h1` 으로 고정돼 있어, 한 화면에 여러 개를 쓰면 `h1` 이 여러 개 생겼습니다.

```tsx
<Display size="l">큰 문구</Display>            {/* div */}
<Display as="h1" size="l">페이지 제목</Display>  {/* 제목이 필요하면 지정 */}
```

문서 구조가 필요하면 `Heading`(`size` 로 h1~h5)을 쓰거나 `as` 로 지정하세요. 시각적 크기와 스타일은 그대로입니다.

### `Masthead` 마크업이 한 겹 늘어납니다

`padding-left` 가 고정돼 있어 어떤 레이아웃과도 정렬이 맞지 않았습니다. 바깥은 전체 폭 배경, 안쪽은 `max-width` 컨테이너로 나눴습니다.

```tsx
<Masthead />                    {/* 기본 1200px */}
<Masthead maxWidth="1400px" />  {/* 레이아웃에 맞춰 조정 */}
```

마스트헤드를 CSS 로 직접 덮어쓰던 코드가 있다면 셀렉터를 확인하세요.

### `require` 대상 파일명이 바뀝니다

`dist/index.js` → `dist/index.cjs`. `require('dak-krds')` 는 그대로 동작하며, 내부 경로를 직접 참조하던 경우에만 영향이 있습니다.

### 0.1.x 에서 고쳐진 것들

1.0.0 에는 아래 수정이 모두 들어 있습니다.

- **설치 후 빌드 실패** — `material-react-table` 의 peer 범위가 열려 있어 MUI 버전이 어긋났습니다
- **글꼴 미적용** — `@font-face` 9개가 패키지 밖 경로를 가리켜 전부 404 였습니다
- **아이콘 미표시** — SVG 가 컴포넌트가 아닌 문자열로 번들돼 아이콘을 쓰는 17개 컴포넌트가 깨졌습니다
- **전역 스타일 소실** — 진입점이 트리셰이킹되며 디자인 토큰과 글꼴이 함께 사라졌습니다 (Vite 8)
- **Tree-shaking 미동작** — 단일 번들이라 컴포넌트 하나만 써도 전체가 들어왔습니다
