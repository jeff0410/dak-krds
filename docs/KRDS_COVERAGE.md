# KRDS 컴포넌트 커버리지

출처: [KRDS 컴포넌트 요약](https://www.krds.go.kr/html/site/component/component_summary.html)
기준 버전: `dak-krds@0.1.15`
최종 확인: 2026-08-11

**전체 55개 중 32개 구현 (58%) · 부분 구현 2개 · 미구현 21개**

구현 수치는 ✅ 만 셉니다. 🟡 는 별도로 표기합니다.

| 카테고리 | 구현 / 전체 | 비율 |
| --- | --- | --- |
| 선택 (Selection) | 5 / 5 | 100% |
| 입력 (Input) | 4 / 4 | 100% |
| 피드백 (Feedback) | 2 / 2 | 100% |
| 액션 (Action) | 2 / 3 | 67% |
| 레이아웃 및 표현 | 7 / 13 (🟡 1) | 54% |
| 탐색 (Navigation) | 6 / 6 | 100% |
| 아이덴티티 (Identity) | 4 / 4 | 100% |
| 도움 (Help) | 1 / 6 | 17% |
| 모바일 (Mobile) | 1 / 8 (🟡 1) | 13% |
| 설정 (Settings) | 0 / 2 | 0% |
| 콘텐츠 (Content) | 0 / 2 | 0% |
| **합계** | **32 / 55 (🟡 2)** | **58%** |

범례: ✅ 구현 · 🟡 부분 구현 · ❌ 미구현

---

## 아이덴티티 (Identity)

| 상태 | KRDS (KO) | KRDS (EN) | 프로젝트 컴포넌트 |
| --- | --- | --- | --- |
| ✅ | 공식 배너 | Masthead | `Masthead` |
| ✅ | 운영기관 식별자 | Identifier | `Identifier` |
| ✅ | 헤더 | Header | `Header` — 건너뛰기 링크 · 공식 배너 슬롯 · 유틸리티 · 아이콘 액션 · 2뎁스 메뉴 · 모바일 햄버거 |
| ✅ | 푸터 | Footer | `Footer` — 상단(로고·연락처) / 중단(유틸리티·소셜) / 하단(정책·저작권) |

## 탐색 (Navigation)

| 상태 | KRDS (KO) | KRDS (EN) | 프로젝트 컴포넌트 |
| --- | --- | --- | --- |
| ✅ | 건너뛰기 링크 | Skip link | `SkipLink` — 숨김/노출 변형, 최대 3개, 대상으로 포커스 이동 |
| ✅ | 메인 메뉴 | Main menu | `MainMenu` — 3뎁스 · 설명형 드롭다운 · Esc 시 트리거로 포커스 복귀 |
| ✅ | 브레드크럼 | Breadcrumb | `Breadcrumb` |
| ✅ | 사이드 메뉴 | Side navigation | `SideNavigation` — 헤더 · 2뎁스 · 다중 확장 · 구분선 |
| ✅ | 콘텐츠 내 탐색 | In-page navigation | `InPageNavigation` — 스크롤 추적 · sticky · 3단계 계층 |
| ✅ | 페이지네이션 | Pagination | `Pagination` |

## 레이아웃 및 표현 (Layout & Presentation)

| 상태 | KRDS (KO) | KRDS (EN) | 프로젝트 컴포넌트 |
| --- | --- | --- | --- |
| ❌ | 구조화 목록 | Structured list | |
| 🟡 | 긴급 공지 | Critical alerts | `Alert` — variant 기반 인라인 알림. 페이지 상단 긴급 공지 형태는 미구현 |
| ✅ | 달력 | Calendar | `ScheduleCalendar` |
| ❌ | 디스클로저 | Disclosure | `Accordion` 과 별개 컴포넌트 |
| ✅ | 모달 | Modal | `Modal`, `Portal` |
| ✅ | 배지 | Badge | `Badge` |
| ✅ | 아코디언 | Accordion | `Accordion` |
| ❌ | 이미지 | Image | |
| ✅ | 캐러셀 | Carousel | `Carousel` |
| ✅ | 탭 | Tab | `Tab`, `MScrollTab` |
| ✅ | 표 | Table | `Table`, `GroupedTable`, `MTable`, `MTableGuideWrapper` |
| ❌ | 텍스트 목록 | Text list | |
| ❌ | 파비콘 | Favicon | 가이드 성격, 컴포넌트 불필요할 수 있음 |

## 액션 (Action)

| 상태 | KRDS (KO) | KRDS (EN) | 프로젝트 컴포넌트 |
| --- | --- | --- | --- |
| ✅ | 링크 | Link | `Link` |
| ✅ | 버튼 | Button | `Button`, `LinkButton` |
| ❌ | 플로팅 버튼 | FAB | |

## 선택 (Selection)

| 상태 | KRDS (KO) | KRDS (EN) | 프로젝트 컴포넌트 |
| --- | --- | --- | --- |
| ✅ | 라디오 버튼 | Radio button | `RadioButton` |
| ✅ | 체크박스 | Checkbox | `Checkbox` |
| ✅ | 셀렉트 | Select | `Select`, `CitySelect` |
| ✅ | 태그 | Tag | `Tag`, `ChipGroup` |
| ✅ | 토글 스위치 | Toggle switch | `Switch` |

## 피드백 (Feedback)

| 상태 | KRDS (KO) | KRDS (EN) | 프로젝트 컴포넌트 |
| --- | --- | --- | --- |
| ✅ | 단계 표시기 | Step indicator | `StepIndicator`, `ProgressBar` |
| ✅ | 스피너 | Spinner | `Spinner`, `LoadingPage` |

## 도움 (Help)

| 상태 | KRDS (KO) | KRDS (EN) | 프로젝트 컴포넌트 |
| --- | --- | --- | --- |
| ❌ | 도움 패널 | Help panel | |
| ❌ | 따라하기 패널 | Tutorial panel | |
| ❌ | 맥락적 도움말 | Contextual help | |
| ❌ | 코치마크 | Coach mark | |
| ✅ | 툴팁 | Tooltip | `Tooltip` |
| ❌ | 음성지원 | TTS | |

## 입력 (Input)

| 상태 | KRDS (KO) | KRDS (EN) | 프로젝트 컴포넌트 |
| --- | --- | --- | --- |
| ✅ | 날짜 입력 필드 | Date input | `DatePicker`, `CustomDatePicker`, `TimeSelector` |
| ✅ | 텍스트 영역 | Textarea | `TextArea` |
| ✅ | 텍스트 입력 필드 | Text input | `TextInput`, `NumberInput`, `PhoneInput` |
| ✅ | 파일 업로드 | File upload | `FileUpload`, `FileButtonUpload` |

## 설정 (Settings)

| 상태 | KRDS (KO) | KRDS (EN) | 프로젝트 컴포넌트 |
| --- | --- | --- | --- |
| ❌ | 언어 변경 | Language switcher | |
| ❌ | 화면 크기 조정 | Resize | |

## 콘텐츠 (Content)

| 상태 | KRDS (KO) | KRDS (EN) | 프로젝트 컴포넌트 |
| --- | --- | --- | --- |
| ❌ | 접근 가능한 미디어 | Accessible multimedia | |
| ❌ | 숨긴 콘텐츠 | Visually hidden | `src/styles/a11y.module.css` 로 내부 공유 중. 공개 컴포넌트/유틸 미제공 |

## 모바일 (Mobile)

| 상태 | KRDS (KO) | KRDS (EN) | 프로젝트 컴포넌트 |
| --- | --- | --- | --- |
| ❌ | 범위슬라이드 | Range slider | |
| ❌ | 뒤로가기 버튼 | Back button | |
| 🟡 | 바텀시트 | Bottom sheet | `Drawer position="bottom"` 으로 부분 대체. 전용 컴포넌트 없음 |
| ❌ | 수량 토글 | Quantity toggle | `NumberInput` 과 다름 (−/+ 스테퍼) |
| ✅ | 토스트 | Toast | `ToastBar` |
| ❌ | 스낵바 | Snackbar | `ToastBar` 와 별개 |
| ❌ | 탭바 | Tab bars | `MScrollTab` 과 다름 (하단 고정 내비게이션) |
| ❌ | 스플래시 스크린 | Splash screen | |

---

## KRDS 외 추가 컴포넌트

KRDS 목록에는 없지만 이 라이브러리가 제공하는 것들입니다.

| 컴포넌트 | 용도 |
| --- | --- |
| `Display`, `Heading`, `Title`, `Body`, `Detail` | 타이포그래피 스케일 |
| `Label` | 폼 레이블 |
| `Icon` | 아이콘 세트 |
| `ErrorPage`, `Notfount` | 에러 / 404 페이지 |
| `Drawer` | 사이드 / 바텀 패널 |
| `CitySelect` | 행정구역 선택 |

---

## 우선순위 제안

**1순위 — 접근성 / 정부 사이트 필수**

- 숨긴 콘텐츠 (Visually hidden) — 내부 공유 모듈을 공개 컴포넌트로 승격

**2순위 — 사용 빈도 높음**

- 사이드 메뉴 (Side navigation)
- 메인 메뉴 (Main menu)
- 콘텐츠 내 탐색 (In-page navigation)
- 구조화 목록 (Structured list) / 텍스트 목록 (Text list)
- 디스클로저 (Disclosure)

**3순위 — 모바일 대응**

- 바텀시트 전용 컴포넌트
- 탭바 (Tab bars)
- 스낵바 (Snackbar)
- 범위슬라이드 (Range slider)
- 수량 토글 (Quantity toggle)

---

## 갱신 방법

컴포넌트를 추가하거나 제거하면 이 문서를 함께 갱신합니다.

1. 해당 카테고리 표의 상태와 컴포넌트 이름 갱신
2. 상단 커버리지 표의 수치 갱신
3. `기준 버전`, `최종 확인` 날짜 갱신
4. `src/components/index.ts` 에 export 되어 있는지 확인 — export 되지 않으면 구현되어도 사용자가 쓸 수 없으므로 ❌ 로 표기
