# 스토리북 · 시각 회귀

컴포넌트를 눈으로 확인하는 카탈로그(Storybook)와, 그 카탈로그를 기준선 삼아
"의도하지 않은 화면 변화"를 잡아내는 회귀 테스트(Playwright)를 함께 둔다.

공개 주소: **<https://jeff0410.github.io/dak-krds/>**

`main` 에 반영되면 `.github/workflows/storybook.yml` 이 스토리북을 빌드해 GitHub
Pages 로 올린다. `package.json` 의 `homepage` 가 같은 주소를 가리키므로 npm
패키지 페이지에도 링크가 뜬다.

## 명령

| 명령 | 하는 일 |
| --- | --- |
| `pnpm run storybook` | 개발 서버(6006). 컴포넌트를 브라우저에서 확인한다. |
| `pnpm run build-storybook` | 정적 산출물을 `storybook-static/` 에 만든다. |
| `pnpm run test:visual` | 스토리북을 새로 빌드한 뒤 기준선과 비교한다. |
| `pnpm run test:visual:update` | 기준선을 다시 만든다. **화면 변화가 의도한 것일 때만.** |
| `pnpm run verify` | 린트 · 타입 · 단위테스트 · 빌드 · 산출물 · 문서 검증을 한 번에. |

`test:visual` 은 항상 스토리북을 먼저 빌드한다. 빌드를 건너뛰면 **바뀌기 전 화면을
검사하고 통과**하므로, 도구가 있으나 마나가 된다.

## 구성

- 스토리: `src/stories/*.stories.tsx` — KRDS 6개 묶음
- 기준선: `tests/visual/__snapshots__/` — 스토리 × 데스크톱/모바일 (현재 43 × 2 = 86장)
- 설정: `.storybook/`, `playwright.config.ts`
- 테스트: `tests/visual/stories.spec.ts` — `storybook-static/index.json` 을 읽어
  스토리 목록을 자동으로 훑는다. 스토리를 추가하면 테스트도 자동으로 늘어난다.

두 뷰포트 모두 **Chromium** 으로 맞춘다. 기기 프리셋(`devices["iPhone …"]`)은
WebKit 을 끌어와 브라우저 편차가 섞이므로 폭·배율만 가져온다.

- 데스크톱 1280×800
- 모바일 390×844 (배율 2)

## 허용 오차

```
maxDiffPixels: 20
threshold: 0.1
```

비율(`maxDiffPixelRatio`)로 두면 넓은 화면에서 작은 변화가 묻힌다. 실제로 1% 로
두었을 때 배지 배경색을 통째로 바꿨는데도 데스크톱이 통과했다. 절대값으로 바짝
조인다.

## 기준선이 흔들리지 않게

스토리에서 **네트워크 · 시간 · 난수**를 쓰지 않는다. 매번 다른 화면이 나오면
기준선을 잡을 수 없고, 결국 "실패해도 무시하는 테스트"가 된다.

이미지와 영상은 `src/stories/assets.ts` 의 data URI 를 쓴다. 예전에는 외부
placehold.co / MDN 영상을 참조해 실행할 때마다 결과가 달랐다.

## 이 도구가 진짜로 잡는지 확인한 방법

검사기가 틀리면 없느니만 못하다. 그래서 실제로 스타일을 망가뜨려 보고 잡히는지
확인했다.

| 주입한 변화 | 실패한 스토리 |
| --- | --- |
| 배지 배경색 → 빨강 | 2 |
| 버튼 모서리 6px → 2px | 6 |
| 버튼 좌측 여백 +1px | 15 |
| (원복) | 0 — 전부 통과 |

동일 상태로 연속 실행해 매번 전부 통과하는 것도 확인했다. 오탐과 미탐을 함께 본 셈이다.

`maxDiffPixels` 를 200 으로 두었을 때는 모서리 6px→2px 변화가 통과했다.
"통과했다"가 아니라 "못 잡았다"였고, 지금 값은 그걸 잡도록 조인 결과다.

## CI 에 넣지 않는 이유

기준선은 이 macOS + Chromium 조합에서 만들었다. 리눅스 러너는 글꼴 렌더링이 달라
전부 실패한다. 넣으려면 렌더링 환경을 고정한 도커 이미지가 필요하다.

지금은 **로컬 게이트**다. 스타일이나 마크업을 건드린 PR 을 올리기 전에
`pnpm run test:visual` 을 돌린다. 릴리스 워크플로에는 `verify` 계열만 들어간다.

## 접근성 패널

`@storybook/addon-a11y` 가 붙어 있어 스토리마다 axe 결과를 패널에서 볼 수 있다.
자동 실패 게이트는 아니며, 자동 검사는 `src/components/__tests__/accessibility.test.tsx`
(vitest) 가 맡는다.
