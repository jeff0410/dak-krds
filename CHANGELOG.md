# 변경 이력

이 문서는 사용자에게 영향이 있는 변경만 적습니다.
버전 규칙은 [유의적 버전](https://semver.org/lang/ko/)을 따릅니다.

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
