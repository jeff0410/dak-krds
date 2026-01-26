# NPM 배포 가이드

## 사전 준비

1. **NPM 계정 생성**
   - https://www.npmjs.com/ 에서 계정 생성
   - 이메일 인증 완료

2. **NPM 로그인**
   ```bash
   npm login
   ```

## 배포 단계

### 1. 버전 업데이트

패키지 버전을 업데이트합니다:

```bash
# 패치 버전 (0.1.0 -> 0.1.1)
pnpm version patch

# 마이너 버전 (0.1.0 -> 0.2.0)
pnpm version minor

# 메이저 버전 (0.1.0 -> 1.0.0)
pnpm version major
```

### 2. 빌드 확인

배포 전에 항상 빌드를 실행하여 오류가 없는지 확인합니다:

```bash
pnpm run build
```

### 3. 배포

NPM에 패키지를 배포합니다:

```bash
npm publish --access public
```

> 처음 배포하는 경우 `--access public` 플래그가 필요합니다.

### 4. 배포 확인

배포가 완료되면 다음 명령으로 확인할 수 있습니다:

```bash
npm view dak-krds
```

## 테스트

배포 후 다른 프로젝트에서 테스트:

```bash
# 새 프로젝트 생성
mkdir test-dak-krds
cd test-dak-krds
pnpm init
pnpm add dak-krds react react-dom

# 사용 테스트
```

## 업데이트 주기

- 버그 수정: 패치 버전
- 새 기능 추가: 마이너 버전
- Breaking changes: 메이저 버전

## 체크리스트

배포 전 확인사항:

- [ ] 모든 테스트 통과
- [ ] README.md 업데이트
- [ ] CHANGELOG.md 업데이트 (선택사항)
- [ ] 버전 번호 업데이트
- [ ] 빌드 성공 확인
- [ ] package.json의 정보 확인
- [ ] Git 커밋 및 태그
