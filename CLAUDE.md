# CLAUDE.md

이 저장소의 작업 규칙은 **[docs/AI_RULES.md](docs/AI_RULES.md)** 하나에 정리되어 있습니다.
작업 시작 전에 반드시 읽고, 그 문서의 규칙을 그대로 따르세요.


# 작업 진행 규칙

## 자동 진행
- 파일 조회, 코드 수정, 신규 파일 생성, 테스트, 빌드, 린트 등 일반적인 개발 작업은 사용자 승인 없이 계속 진행한다.
- 작업 중 매 단계마다 진행 여부를 묻지 않는다.
- 구현 가능한 부분은 스스로 판단하여 연속해서 작업한다.

## 반드시 사용자에게 선택지를 제시해야 하는 경우
다음 사항은 임의로 결정하지 말고 작업 전에 사용자에게 선택지를 제시한다.

- DB 스키마 또는 데이터 구조 변경
- API 요청/응답 규격 변경
- 기존 기능의 동작 정책 변경
- 새로운 라이브러리/프레임워크 도입
- 삭제 또는 대규모 리팩토링
- 보안/인증/권한 정책 변경
- 여러 구현 방식 중 장단점이 명확히 존재하는 경우
- 기획적으로 결정이 필요한 사항
- 기존 사용자 경험(UX)이 변경되는 경우

이 경우 아래 형식으로 제시한다.

1안. 방법 A
- 장점:
- 단점:

2안. 방법 B
- 장점:
- 단점:

추천안:
- 추천 이유:

사용자가 선택하기 전에는 해당 결정이 필요한 구현을 진행하지 않는다.

## Git
- 커밋 / PR / 푸시에 AI 흔적 금지. author 는 항상 `jeff0410 <pazwsx@naver.com>`. `Co-Authored-By: Claude`, `Generated with` 류 문구 절대 금지.
- push / merge는 사용자 승인 없이 실행하지 않는다.


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
