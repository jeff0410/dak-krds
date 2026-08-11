# DAK KRDS AI 작업 규칙 (단일 원본)

이 문서가 **모든 AI 도구(Cursor / Claude Code / Codex)의 유일한 규칙 원본**입니다.
`CLAUDE.md`, `AGENTS.md`, `.cursorrules`, `.cursor/rules/*.mdc` 는 모두 이 문서를 가리키는 얇은 진입점일 뿐입니다.
규칙을 바꿀 때는 **이 파일만** 수정합니다.

---

## 1. Git 규칙 — AI 흔적 금지

커밋 / PR / 푸시에 AI가 만들었다는 흔적을 **절대** 남기지 않습니다.

**금지 사항**

- 커밋 메시지 본문/푸터의 `🤖 Generated with Claude Code`, `Co-Authored-By: Claude ...`
- `Co-Authored-By:` 로 들어가는 모든 AI 계정
- PR 본문의 `Generated with`, `Made by AI`, 도구 링크, AI 배지
- 커밋 메시지 안의 "AI가", "Claude가", "Cursor로" 같은 서술

**필수 사항**

- 작성자는 항상 아래 값으로 고정합니다.

  ```
  user.name  = jeff0410
  user.email = pazwsx@naver.com
  ```

- 커밋 메시지는 사람이 쓴 것처럼 한 줄 요약 + (필요 시) 본문만 씁니다.
- 커밋 메시지 형식은 저장소 기존 이력을 따릅니다.

  ```
  Feat: customDatePicker 추가
  Fix: Tooltip 컴포넌트 이동 후 빌드 오류 수정
  Chore: 버전 0.1.11로 업데이트
  ```

  접두사: `Feat:` `Fix:` `Chore:` `Refactor:` `Docs:` `Style:` `Test:`

**커밋 전 자가 점검**

```bash
git log -1 --pretty=full
```

`Author` / `Committer` 가 `jeff0410 <pazwsx@naver.com>` 이고, 메시지에 AI 관련 문자열이 없어야 합니다.

**커밋 / 푸시 / PR 생성은 사용자가 명시적으로 요청할 때만 수행합니다.**

---

## 2. 주석 금지

- 코드에 주석을 달지 않습니다. 한 줄 주석(`//`), 블록 주석(`/* */`), JSX 주석(`{/* */}`) 모두 금지입니다.
- 설명이 필요하면 주석 대신 **이름**으로 드러냅니다. 변수명, 함수명, 작은 함수로의 분리를 사용합니다.
- 예외는 두 가지뿐입니다.
  - 라이브러리 동작에 필요한 지시자 주석 (`@ts-expect-error`, `eslint-disable`, `biome-ignore`)
  - 파일 상단의 라이선스 헤더
- 기존 코드에 있던 주석을 임의로 지우지는 않습니다. 다만 **새로 쓰거나 수정한 코드에는 주석을 추가하지 않습니다.**
- 설명이 꼭 필요한 로직이면 주석 대신 `docs/` 아래 md 문서로 남깁니다.

---

## 3. 공통화는 항상 md로 정리

리팩토링 / 신규 개발 중 **공통화한 것이 생기면 반드시 문서화**합니다.

**문서화 대상**

- 공통 컴포넌트, 공통 훅, 공통 유틸, 공통 타입
- 공통 CSS 토큰 / 믹스인 / 클래스
- 중복 로직을 하나로 합친 모든 결과물

**작성 위치**

- 인덱스: `docs/COMMON.md` — 공통화된 항목 한 줄 요약 + 상세 문서 링크
- 상세: `docs/common/<주제>.md` — 주제별 상세 문서

**상세 문서에 반드시 포함할 항목**

1. 무엇을 공통화했는가
2. 어디에 있는가 (경로)
3. 왜 공통화했는가 (합쳐진 중복 지점)
4. 사용법 (코드 예시)
5. 주의사항 / 확장 방법

공통화 작업과 문서 작성은 **같은 커밋**에 포함합니다.

---

## 4. 반복 작업 감지 → md 제안

같은 작업이나 같은 요구사항이 반복되면 AI가 **먼저 캐치해서 문서화를 제안**합니다.

**제안 트리거**

- 같은 종류의 요청이 3회 이상 반복됨
- 여러 파일에 같은 패턴을 반복해서 적용하고 있음
- 사용자가 같은 지적/수정을 반복함
- 여러 단계짜리 절차를 두 번 이상 수행함

**제안 방식**

작업을 멈추지 말고, 작업을 끝낸 뒤 한 문장으로 묻습니다.

> "OO 작업이 N번 반복됐습니다. `docs/guides/OO.md` 로 정리해둘까요?"

승인하면 문서를 만들고 `docs/COMMON.md` 또는 해당 인덱스에 링크를 추가합니다.
거절하면 다시 묻지 않습니다.

---

## 5. 설치해서 바로 쓰는 DX

이 저장소는 npm 패키지(`dak-krds`)입니다. **설치한 사용자의 편의**를 항상 우선합니다.

- **Public API 는 루트에서 나갑니다.** 새 컴포넌트/훅은 `src/index.ts` 에 반드시 등록합니다. 사용자가 `dak-krds/dist/...` 같은 내부 경로를 알 필요가 없어야 합니다.

  ```tsx
  import { Button, TextInput } from 'dak-krds';
  import 'dak-krds/styles.css';
  ```

- **타입은 완전하게.** 모든 public props 는 export 된 타입을 가집니다. `any` 금지.
- **props 는 최소 필수로.** 합리적인 기본값을 주고, `id` / `title` / `alt` 같은 접근성 속성은 안 넘어오면 자동 생성합니다.
- **Breaking change 를 피합니다.** 불가피하면 README 에 마이그레이션 안내를 적고 minor 버전을 올립니다.
- **Tree-shaking 을 깨지 않습니다.** 부수효과 있는 top-level 코드 금지.
- **peerDependencies 를 dependencies 로 옮기지 않습니다.** (`react`, `react-dom`)
- 새 컴포넌트를 추가하면 README 의 컴포넌트 목록과 사용 예시를 함께 갱신합니다.
- 배포 전 확인: `pnpm run typecheck && pnpm run lint && pnpm run build`

---

## 6. 계정 정보 저장

사용자가 계정 / 토큰 / 접속 정보를 주면 **되묻지 말고 즉시 저장**하고, 다음부터는 저장된 값을 사용합니다.

- 저장 위치: **`docs/ACCOUNTS.md`** (이 파일은 `.gitignore` 에 등록되어 있어 커밋되지 않습니다)
- 형식은 `docs/ACCOUNTS.example.md` 를 따릅니다.
- 파일이 없으면 example 을 복사해서 만듭니다.
- 이미 저장된 항목은 **다시 묻지 않습니다.** 먼저 `docs/ACCOUNTS.md` 를 읽고, 없을 때만 묻습니다.
- 값이 바뀌면 기존 항목을 덮어씁니다. 중복 항목을 만들지 않습니다.

**보안 주의**

- `docs/ACCOUNTS.md` 는 평문입니다. 절대 커밋하거나, 붙여넣거나, 로그/PR/이슈에 출력하지 마세요.
- 커밋 전 항상 확인: `git status --porcelain | grep ACCOUNTS` → 결과가 나오면 커밋 중단.
- 실제 비밀값은 `.env` / 시스템 키체인 / CI 시크릿에 두는 것이 안전합니다. `docs/ACCOUNTS.md` 는 어떤 계정을 어디에 쓰는지 기억하기 위한 용도로만 쓰고, 고위험 값(결제/운영 DB/배포 키)은 여기 두지 마세요.

---

## 7. 버전 자동 증가

**PR 을 생성할 때마다 `package.json` 의 patch 버전을 1 올립니다.** 사용자가 따로 요청하지 않아도 항상 수행합니다.

- `0.1.13` 상태에서 다음 PR 은 `0.1.14`, 그다음 PR 은 `0.1.15` 입니다.
- **PR 하나당 정확히 한 번만** 올립니다. 같은 PR 에 커밋을 더 쌓아도 다시 올리지 않습니다.
- 문서만 고치는 PR 도 동일하게 올립니다.
- 버전 변경은 그 PR 안에 포함시킵니다. 별도 PR 로 분리하지 않습니다.

**사용자가 버전을 지정한 경우**

> "버전 0.2.0 으로 해주세요"

- 지정된 값을 그대로 씁니다.
- 이 지정은 **해당 PR 1회에만** 적용됩니다. 다음 PR 부터는 다시 자동 patch 증가로 돌아갑니다.

---

## 8. 릴리즈 / npm 배포

**GitHub Release 를 발행하면 `.github/workflows/release.yml` 이 npm 에 자동 배포합니다.**

**릴리즈 절차**

1. `package.json` 버전이 배포하려는 값인지 확인합니다.
2. GitHub 에서 Release 를 발행합니다. 태그는 반드시 `v<package.json version>` 형식입니다.

   ```
   package.json 0.1.14  →  태그 v0.1.14
   ```

3. 워크플로가 태그와 `package.json` 버전 일치를 검증한 뒤 typecheck / build 를 거쳐 배포합니다. (build 는 `prepublishOnly` 에서 실행됩니다.)

**주의**

- 태그와 `package.json` 버전이 다르면 워크플로가 **실패하고 배포되지 않습니다.** 잘못된 버전이 npm 에 올라가는 것을 막기 위한 의도된 동작입니다.
- 인증은 **npm OIDC Trusted Publisher** 를 씁니다. `NPM_TOKEN` 같은 시크릿은 저장하지 않으며, 워크플로에 토큰을 추가하지 마세요.
- 워크플로 파일명 `release.yml` 은 npm Trusted Publisher 설정에 등록된 값입니다. **파일명을 바꾸면 npm 쪽 설정도 같이 바꿔야** 배포가 계속 동작합니다.
- publish 스텝만 `npm publish` 를 씁니다. pnpm 은 OIDC 배포가 아직 불안정하므로 install / typecheck / lint 에만 사용합니다.
- 배포 시 provenance(공급망 서명)는 npm 이 자동으로 생성합니다. `--provenance` 플래그를 붙이지 않습니다.

---

## 코드 컨벤션

### 언어 / 기본

- TypeScript 사용. `any` 금지.
- 함수형 컴포넌트만 사용.
- 함수는 작고 읽기 쉽게.
- 기존 프로젝트 구조를 따름. 기존 코드와 이 규칙이 충돌하면 **이 규칙이 우선**.

### 파일명

- 새로 만드는 모든 파일은 **PascalCase**: `CustomDatePicker.tsx`, `UseDatePicker.ts`
- 배럴 파일만 예외: `index.ts`

### export 규칙

| 확장자 | 규칙 | 금지 |
| --- | --- | --- |
| `.tsx` | named function export만 | arrow function, default export |
| `.ts` | `const` + arrow function export만 | function 선언식, default export |
| `index.ts` | `export { X } from "./X";` 재export만 | default export |

```tsx
export function Sample() {
  return <div></div>;
}
```

```ts
export const sample = () => {
  return {};
};
```

외부로 무언가를 export 하는 모든 폴더에는 `index.ts` 가 있어야 합니다.

### 스타일

- CSS Modules 필수. 파일명은 PascalCase.
- `import styles from "./ComponentName.module.css";`
- `styles.className` 형태로 사용.

### 접근성 / 웹표준

- WCAG 2.1 AA 기준을 지킵니다. (KRDS 디자인 시스템 준수 라이브러리)
- 시맨틱 태그를 씁니다.
- `id`, `title`, `alt`, `aria-*` 는 props 로 안 들어오면 자동 생성해서 적용합니다.
- 키보드 탐색과 포커스 표시를 보장합니다.

### 컴포넌트별

- Button 컴포넌트는 반드시 `button` 태그를 사용하고 `type="button"` 으로 고정합니다.

### 컴포넌트 폴더 구조

```
src/components/ComponentName/
  ComponentName.tsx
  ComponentName.module.css
  UseComponentName.ts
  index.ts
```

---

## 작업 마무리 체크리스트

- [ ] 새/수정 코드에 주석이 없다
- [ ] 파일명 PascalCase, export 규칙 준수
- [ ] 공통화한 게 있으면 `docs/COMMON.md` 갱신
- [ ] 새 public API 는 `src/index.ts` 에 등록
- [ ] `pnpm run typecheck` `pnpm run lint` 통과
- [ ] 커밋 메시지에 AI 흔적 없음, author 가 jeff0410
- [ ] `docs/ACCOUNTS.md` 가 스테이징에 없음
- [ ] PR 생성 시 `package.json` patch 버전을 1 올렸음 (PR 당 1회)
