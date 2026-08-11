# CLAUDE.md

이 저장소의 작업 규칙은 **[docs/AI_RULES.md](docs/AI_RULES.md)** 하나에 정리되어 있습니다.
작업 시작 전에 반드시 읽고, 그 문서의 규칙을 그대로 따르세요.

Cursor / Claude Code / Codex 모두 동일한 문서를 참조합니다. 규칙 변경은 `docs/AI_RULES.md` 에서만 합니다.

## 핵심 요약

1. 커밋 / PR / 푸시에 AI 흔적 금지. author 는 항상 `jeff0410 <pazwsx@naver.com>`. `Co-Authored-By: Claude`, `Generated with` 류 문구 절대 금지.
2. 코드에 주석을 달지 않는다.
3. 공통화한 것은 항상 `docs/COMMON.md` 에 정리한다.
4. 반복 작업 / 반복 요구사항을 감지하면 "md로 만들까요?" 라고 먼저 제안한다.
5. 설치한 사용자가 편하도록 public API 는 `src/index.ts` 루트 export 로 노출한다.
6. 계정 정보를 받으면 즉시 `docs/ACCOUNTS.md` (gitignored) 에 저장하고 다음부터 다시 묻지 않는다.

## 프로젝트

`dak-krds` — KRDS 기반 React UI 컴포넌트 디자인 시스템 (npm 배포 라이브러리)

```bash
pnpm install
pnpm run build       # vite build
pnpm run dev         # watch build
pnpm run dev:test    # example 앱 실행
pnpm run lint
pnpm run typecheck
```

- 컴포넌트: `src/components/PascalCase/`
- 공개 진입점: `src/index.ts`
- 스타일: CSS Modules + `src/styles/`

## 문서

- [docs/AI_RULES.md](docs/AI_RULES.md) — 작업 규칙 원본
- [docs/COMMON.md](docs/COMMON.md) — 공통화 인덱스
- [docs/KRDS_COVERAGE.md](docs/KRDS_COVERAGE.md) — KRDS 55개 컴포넌트 대비 구현 현황
