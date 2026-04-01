# ☁ CloudPress — Cloudflare Pages WordPress 호스팅 랜딩 페이지

Cloudflare Pages에 배포하는 고성능 WordPress 호스팅 서비스 랜딩 페이지입니다.

## 📁 파일 구조

```
cloudpress/
├── index.html          # 메인 랜딩 페이지
├── style.css           # 전체 스타일시트
├── script.js           # 인터랙션 및 애니메이션
├── 404.html            # 커스텀 404 에러 페이지
├── _headers            # Cloudflare Pages 보안 헤더
├── _redirects          # Cloudflare Pages 리다이렉트 규칙
├── robots.txt          # 검색엔진 크롤러 설정
├── sitemap.xml         # XML 사이트맵
├── manifest.json       # PWA 웹앱 매니페스트
└── README.md           # 이 파일
```

## 🚀 Cloudflare Pages 배포 방법

### 1. Git 저장소 연결

```bash
git init
git add .
git commit -m "Initial CloudPress landing page"
git remote add origin https://github.com/your-username/cloudpress.git
git push -u origin main
```

### 2. Cloudflare Pages 설정

1. [Cloudflare Dashboard](https://dash.cloudflare.com) → **Pages** 메뉴 이동
2. **Create a project** → **Connect to Git** 선택
3. GitHub 저장소 연결
4. 빌드 설정:
   - **Framework preset**: None (정적 사이트)
   - **Build command**: (비워두기)
   - **Build output directory**: `/` (루트)
5. **Save and Deploy** 클릭

### 3. 커스텀 도메인 연결

1. Pages 프로젝트 → **Custom domains** 탭
2. **Set up a custom domain** 클릭
3. 도메인 입력 (예: `cloudpress.io`)
4. DNS 레코드 자동 생성됨

## ⚙️ 기술 스택

| 항목 | 기술 |
|------|------|
| 호스팅 | Cloudflare Pages |
| CDN | Cloudflare Global Network (300+ PoP) |
| DDoS 방어 | Cloudflare Magic Transit (자동) |
| SSL | Cloudflare Universal SSL (자동) |
| 폰트 | Syne + DM Sans (Google Fonts) |
| 빌드 도구 | 없음 (순수 HTML/CSS/JS) |

## 🛡️ 보안 헤더 (`_headers`)

`_headers` 파일에 다음 보안 헤더가 자동 적용됩니다:
- `X-Frame-Options: DENY` — 클릭재킹 방지
- `X-Content-Type-Options: nosniff` — MIME 스니핑 방지
- `Strict-Transport-Security` — HTTPS 강제
- `Referrer-Policy` — 리퍼러 정보 제한
- `Permissions-Policy` — 불필요한 API 접근 차단

## 🎨 디자인 시스템

### 컬러 팔레트

```css
--bg: #0a0a0f          /* 배경 (최어두움) */
--surface: #161625     /* 카드 배경 */
--accent: #f97316      /* 브랜드 오렌지 */
--text-1: #f8f8ff      /* 주 텍스트 */
--text-2: #a0a0b8      /* 보조 텍스트 */
```

### 폰트

- **Syne** — 제목, 숫자, 버튼 (display)
- **DM Sans** — 본문, UI 텍스트 (body)

## 📱 반응형 지원

- **Desktop**: 1200px+
- **Tablet**: 768px ~ 1199px
- **Mobile**: ~767px

## ✨ 주요 기능

- 커스텀 마우스 커서 (데스크탑)
- 스크롤 리빌 애니메이션 (IntersectionObserver)
- 연간/월간 요금 토글 (애니메이션)
- FAQ 아코디언
- 실시간 카운터 애니메이션
- 배경 파티클 / 오브 효과
- 페이지 로드 프로그레스 바
- 접근성 고려 (aria 속성, 키보드 네비게이션)
- `prefers-reduced-motion` 지원

## 📄 라이선스

MIT License — 자유롭게 수정 및 배포 가능합니다.
