# 작업 기록 — 2026-08-11 ~ 08-12

`dak-krds` 를 KRDS 55개 컴포넌트 전체 제공 + 정식 1.0.0 까지 끌어올린 이틀간의 기록입니다.
무엇을 했는지보다 **무엇이 문제였고 어떻게 알아냈는지**에 무게를 뒀습니다.

---

## 1. 한눈에

| | 시작 (0.1.14) | 현재 (1.0.1) |
| --- | --- | --- |
| KRDS 커버리지 | 26 / 55 (47%) | **55 / 55 (100%)** |
| README 사용법 | 12 / 54 | **54 / 54** |
| 자동화 테스트 | 0건 | **71건** + 산출물 검증 20건 |
| 설치 후 빌드 | **실패** | 정상 |
| 아이콘 렌더 | **전부 깨짐** | 정상 |
| KRDS 지정 글꼴 | **한 번도 적용 안 됨** | 적용 |
| `Button` 번들 비용 | 877 kB | **2.6 kB** |
| 모바일 가로 스크롤 | 375px 에서 9px, 320px 에서 79px | **0** |

머지된 PR **#4 ~ #14 (11건)**, 커밋 25개, npm 배포 `0.1.15` · `0.1.17` · `0.1.18` · `0.1.20` · `1.0.0`.

---

## 2. 발견한 결함

전부 **실제로 설치해서 써 보다가** 나왔습니다. 코드를 읽어서 찾은 것은 하나도 없습니다.

### 🔴 설치하면 빌드가 실패했다

`material-react-table` 의 peer 범위가 `>=6` 으로 열려 있어 `@mui/icons-material` 이 v9 로 잡혔고, 우리가 쓰던 `@mui/material` v6 와 충돌했습니다.

```
"createSvgIcon" is not exported by "@mui/material/SvgIcon"
```

npm · pnpm 양쪽에서 재현됐습니다. MUI 계열 5종을 v6 으로 고정해 해결했습니다. → `0.1.15`

### 🔴 KRDS 지정 글꼴이 한 번도 적용된 적이 없었다

`@font-face` 9개가 `../../../../../lib/assets/font/*.otf` 를 가리키고 있었습니다. 패키지 바깥 경로라 소비자 환경에서 전부 404 였고, **로컬에도 그 경로가 존재하지 않았습니다.**

가변 글꼴 `PretendardGOVVariable.woff2` 를 동봉하고 `@font-face` 를 하나로 합쳤습니다. Vite 라이브러리 모드가 CSS `url()` 을 base64 로 인라인해 CSS 가 7.3 MB 가 되는 문제가 있어, 글꼴을 별도 파일로 내보내는 빌드 플러그인을 붙였습니다. → `0.1.15`

### 🔴 아이콘이 전부 깨져 있었다

빌드에 svgr 이 없어 `import Home from "...home.svg"` 가 **data URI 문자열**이 되는데, `Icon` 은 이를 React 컴포넌트로 렌더했습니다. 태그명 자리에 문자열이 들어가 DOM 이 거부했습니다.

```
InvalidCharacterError: "data:image/svg+xml,%3csvg..."
```

배포본 `0.1.14` 를 받아 확인한 결과 **그때도 동일하게 깨져 있었습니다.** 아이콘을 쓰는 17개 컴포넌트가 영향을 받았습니다. → `0.1.18`

### 🔴 Vite 8 에서 전역 스타일이 통째로 사라졌다

```
--krds-color-primary-50 : (미정의)
:root 규칙 : 0개
@font-face : 0개
```

`dist/index.mjs` 는 디자인 토큰 · 글꼴 · 리셋을 불러오는 **유일한** 모듈인데, 재export 배럴이라 `sideEffects` 목록에 없어 트리셰이킹 대상이었습니다. 번들러가 배럴을 지우면서 전역 CSS 도 함께 사라졌습니다.

`0.1.17` 에서 도입한 모듈 분할 구조의 부작용이고, Vite 7(rollup) 은 배럴을 남겨 당시 검증에서 드러나지 않았습니다. → `1.0.0`

### 🟠 공식 배너가 어디에도 정렬되지 않았다

`Masthead` 에 `padding-left: 22.5rem` 이 하드코딩돼 있었습니다. KRDS 공식 사이트와 좌표를 비교한 결과:

| | 배너 문구 | 로고 | 차이 |
| --- | --- | --- | --- |
| KRDS 공식 | 113px | 113px | 0px |
| dak-krds | 392px | 130px | **262px** |

바깥은 전체 폭 배경, 안쪽은 `max-width` 컨테이너로 나눴습니다. → `1.0.0`

### 🟡 접근성 결함

| 결함 | 내용 |
| --- | --- |
| `Display` 가 `h1` 고정 | 크기 단계를 고르는 컴포넌트인데 문서 구조를 강제. 한 화면에 셋 쓰면 `h1` 이 셋 |
| 입력 5건 무명 | `titleAttr` 이 `title` 로만 들어감. 접근 이름 계산에서 최하위 순위 |
| 아이콘 버튼 6건 무명 | 캘린더 열기 · 이전/다음 달 버튼이 `<svg>` 만 담고 있었음 |
| `CriticalAlerts` 주의 단계 | 대비 3.48:1 — WCAG AA(4.5:1) 미달 |

→ `1.0.0`

### 🟡 좁은 화면에서 가로 스크롤

| 뷰포트 | 초과 |
| --- | --- |
| 375px | 9px |
| 320px | 79px |

`PhoneInput`(칸마다 `min-width: 6rem`), `Tabs`(축소·스크롤 수단 없음), `Pagination`(줄바꿈 안 됨)이 원인이었습니다. `StepIndicator` · `Table` 은 스크롤 컨테이너 안이라 정상이었습니다. → `1.0.1` (미배포)

---

## 3. 잘못 짚었다가 바로잡은 것

기록해 둘 가치가 있는 오판입니다.

### "Tree-shaking 이 안 된다" — 틀렸다

`Button` 하나만 import 해도 번들이 877 kB 라고 보고했는데, **그 안에 React 193 kB 가 들어 있었습니다.** 실제 dak-krds 몫은 **2.6 kB** 입니다.

실측표:

| 가져온 것 | 번들 | dak-krds 몫 |
| --- | --- | --- |
| React 만 | 193.1 kB | — |
| `Button` | 195.7 kB | +2.6 kB |
| `Tooltip` | 195.5 kB | +2.3 kB |
| `ScheduleCalendar` | 426.3 kB | +233 kB |
| `Table` | 1,119.4 kB | +926 kB |

무거운 것은 넷뿐이고 그 컴포넌트를 쓰는 사람만 부담합니다.

### "README 가 실제 API 와 어긋난다" — 절반만 맞았다

검사해 보니 README 예제 자체는 정확했습니다. 제가 부딪혔던 `Pagination` · `Tooltip` · `StepIndicator` · `ChipGroup` · `Carousel` 은 **README 에 아예 없던 컴포넌트**였습니다. 진짜 문제는 오류가 아니라 **누락**이었습니다 (12/54).

### `TextInput` · `TextArea` export 누락 — 오탐

`forwardRef` 컴포넌트라 `typeof` 가 `object` 인 것이 정상입니다. 판정 기준이 틀렸습니다.

### `Heading` 의 `level` prop DOM 유출 — 오탐

`Heading` 의 prop 은 `level` 이 아니라 `size` 입니다. 제가 테스트 코드에서 잘못 넘긴 것이었습니다.

### optional peerDependencies — 시도했으나 쓸 수 없었다

무거운 의존성을 optional peer 로 돌리면 설치 용량이 **249 MB → 34 MB** 로 줄었습니다. 그러나 설치하지 않은 소비자는 `Button` 하나만 써도 빌드가 깨졌습니다.

```
"styled" is not exported by "__vite-optional-peer-dep:@mui/material/styles"
```

루트 배럴이 모든 컴포넌트를 재export 하므로 번들러가 `ClickTooltip` 모듈까지 반드시 해석하고, 트리셰이킹으로 지워지기 **전에** 이름 검사에서 실패합니다. 되돌렸습니다.

---

## 4. 추가한 컴포넌트 — 29종

| 카테고리 | 추가한 것 |
| --- | --- |
| 아이덴티티 | `Identifier` `Header` `Footer` `Favicon` |
| 탐색 | `SkipLink` `MainMenu` `SideNavigation` `InPageNavigation` |
| 레이아웃 및 표현 | `Disclosure` `CriticalAlerts` `StructuredList` `TextList` `Image` |
| 액션 | `FloatingButton` |
| 도움 | `ContextualHelp` `CoachMark` `HelpPanel` `TutorialPanel` `TextToSpeech` |
| 설정 | `LanguageSwitcher` `Resize` |
| 콘텐츠 | `VisuallyHidden` `AccessibleMedia` |
| 모바일 | `BottomSheet` `TabBars` `BackButton` `QuantityToggle` `RangeSlider` `Snackbar` `SplashScreen` |

KRDS 명세를 페이지마다 확인하고 규정을 코드로 옮겼습니다.

- `CriticalAlerts` — "숨기기 버튼을 제공하지 않는다" 를 그대로 지켜 닫기 버튼이 없습니다
- `TabBars` — 5개 제한을 `slice(0, 5)` 로 강제합니다
- `CoachMark` — 첫 단계엔 이전 없음, 마지막은 마치기, 단일 단계는 확인
- `LanguageSwitcher` — 2개면 링크형, 3개 이상이면 드롭다운으로 자동 전환
- `SkipLink` · `InPageNavigation` — 이동 시 대상으로 초점을 실제로 옮깁니다

### 기존 컴포넌트 정리

- `Header` 가 `SkipLink` 와 `MainMenu` 를 쓰도록 바꿔 197줄 → 116줄
- 반복되던 `sr-only` 정의를 `styles/a11y.module.css` 로 모으고, 이후 `VisuallyHidden` 으로 승격
- `Header` 에 `sticky="auto-hide"` 추가 — KRDS 사이트처럼 내리면 숨고 올리면 복귀

---

## 5. 도입한 품질 장치

이번에 겪은 사고들이 **다시 들어와도 CI 가 잡도록** 만들었습니다. 이전에는 테스트 파일이 0개였고 `test` 스크립트조차 없었습니다.

### 단위 테스트 71건

`vitest` + `@testing-library/react`.

- 접근성 17건 — `Display` 태그, 입력·버튼의 접근 이름, `SkipLink` 초점 이동, `CriticalAlerts` 규정, 랜드마크 구조, 외부 링크 처리
- 스모크 54건 — KRDS 55개가 모두 공개돼 있고 렌더 중 예외를 내지 않는지

### 배포 산출물 검증 20건 (`verify:dist`)

단위 테스트로는 잡히지 않는 포장 단계 사고를 막습니다. 검사 항목이 전부 실제로 났던 사고입니다.

| 검사 | 대응 사고 |
| --- | --- |
| 진입점이 전역 CSS 를 불러오는가 | Vite 8 전역 스타일 소실 |
| Icon 세트가 컴포넌트인가 | 아이콘 data URI |
| 글꼴이 실재 경로를 가리키는가 | `@font-face` 404 |
| 산출 CSS 가 평문인가 | 소비자 재해싱으로 스타일 누락 |
| exports 대상 실재 · 소스맵 미포함 · 모듈 분할 | — |

### 문서 정합성 검사 (`verify:docs`)

README 예제의 prop 이 실제 타입에 있는지 타입 수준에서 확인하고, KRDS 55개가 모두 예제를 갖는지 봅니다.

### 릴리즈 파이프라인

`release.yml` 에 `test` · `verify:docs` · `build` · `verify:dist` 를 넣었습니다. **배포 전에 걸립니다.**

### 검사 도구도 검증했다

도구가 틀리면 없느니만 못하므로, 고쳤던 버그를 **일부러 되돌려** 잡히는지 확인했습니다.

```
sideEffects 에서 진입점 제거  → 산출물 검증 실패 1건
Display 를 h1 으로 되돌림      → 테스트 2건 실패
TextInput 의 aria-label 제거   → 테스트 3건 실패
Tooltip prop 을 틀리게 적음    → 문서 검사 실패
컴포넌트 예제 삭제             → 문서 검사 실패
```

만들면서 두 번 틀렸습니다. `declare const` 로 타입 단언을 걸어 **값 검사가 없어 통과**하던 것, 속성 추출기가 **중첩 JSX 의 속성까지** 잡아 오탐 6건을 내던 것. 둘 다 회귀 테스트를 돌려보고서야 알았습니다.

---

## 6. 샘플 프로젝트

`~/Documents/jeff/utils/dak-krds-sample`

2026-08-12 기준 최신 스택으로 만들었습니다. React 19.2.8 · Vite 8.2.1 · Tailwind CSS 4.3.3 · TypeScript 7.0.2 · pnpm.

**npm 레지스트리에서 실제로 설치해** 쓰는 구조입니다. 소스 직접 참조나 워크스페이스 링크가 아니라, `exports` · `files` · `sideEffects` 같은 배포 설정이 전부 검증되는 조건입니다.

`Header`(마스트헤드 · 건너뛰기 링크 · 3뎁스 주메뉴) · `SideNavigation` · `InPageNavigation` · `Footer` · `TabBars` · `FloatingButton` 을 실제 레이아웃으로 적용하고, 본문은 KRDS 카테고리별 9개 섹션으로 아래로 스크롤하며 전부 볼 수 있게 했습니다.

```bash
cd ~/Documents/jeff/utils/dak-krds-sample
pnpm dev
```

**이 샘플이 결함을 찾은 도구였습니다.** 아이콘 깨짐, 전역 CSS 소실, 마스트헤드 정렬, 모바일 가로 스크롤 모두 여기서 나왔습니다.

---

## 7. 지금 상태

| 항목 | 상태 |
| --- | --- |
| `main` | `d9442206` · 버전 `1.0.1` |
| npm `latest` | `1.0.0` |
| 열린 PR | 없음 |
| **`1.0.1` 배포** | **미완료 — 태그 발행 직전에 멈춤** |

`1.0.1` 은 모바일 가로 스크롤 수정입니다. 배포하려면 `v1.0.1` 태그를 밀면 워크플로가 검증 후 npm 에 올립니다.

---

## 8. 남은 것

### 검증하지 못한 영역

- **실제 스크린 리더** — SenseReader · VoiceOver · TalkBack. 지금까지는 자동 검사(접근 이름 · 랜드마크 · 대비)만 했습니다
- **Chrome 외 브라우저** — `browserslist` 미선언

### 판단이 필요한 것

**설치 용량 249 MB.** 그중 @mui 만 155 MB 입니다. `Table` 을 안 쓰는 서비스도 전부 내려받습니다. 실사용 번들은 이미 최적이라 성능 문제는 아니고, CI 캐시와 설치 시간 부담입니다.

줄이려면 무거운 컴포넌트를 루트 배럴에서 빼고 서브경로(`dak-krds/table` 등)로 분리해야 합니다. **public API 변경**이라 메이저 올림이 필요합니다. 논의 끝에 **현행 유지**로 결정했습니다.

### 이 저장소 밖

`~/Documents/jeff/rtmc/project/` 아래 13개 저장소에 커밋 규칙 문서(`.cursor/rules/git-commit.mdc` · `CLAUDE.md` · `.gitignore`)를 작성해 뒀습니다. `dak-rtmc-home` · `dak-user-web` 두 곳은 직접 커밋하신 것으로 보이고, 나머지 11개는 워킹 트리에 남아 있습니다.

---

## 9. 배운 것

**설치해서 써 보지 않으면 모른다.** 이번에 찾은 치명적 결함 넷은 전부 소비자 환경을 만들어 돌려보다 나왔습니다. `typecheck` · `lint` · `build` 는 전부 통과하고 있었습니다.

**빌드 설정과 테스트 설정이 갈라지면 사고가 반복된다.** 테스트를 처음 돌렸을 때 아이콘 버그가 그대로 재현됐습니다 — `vitest` 에 svgr 이 없었기 때문입니다. `build/svgr-plugins.ts` 로 묶어 같은 설정을 쓰게 했습니다.

**검증 도구도 검증해야 한다.** 문서 검사를 만들면서 두 번 틀렸고, 회귀를 일부러 만들어보지 않았다면 "통과" 라는 거짓 신호를 믿을 뻔했습니다.

**측정하지 않고 진단하면 틀린다.** "Tree-shaking 이 안 된다"는 React 크기를 라이브러리 몫으로 착각한 것이었습니다. 3순위 작업 전에 실측하지 않았다면 불필요한 breaking change 를 밀어붙였을 것입니다.
