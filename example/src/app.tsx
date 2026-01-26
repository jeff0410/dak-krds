import { useState } from 'react';
import {
  Button,
  Input,
  Card,
  Badge,
  Checkbox,
  Switch,
  Select,
  TextArea,
  type SelectOption,
} from 'dak-krds';

export function App() {
  const [inputValue, setInputValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('ko');

  const languageOptions: SelectOption[] = [
    { value: 'ko', label: '한국어' },
    { value: 'en', label: 'English' },
    { value: 'ja', label: '日本語' },
    { value: 'zh', label: '中文' },
  ];

  return (
    <div>
      <h1>DAK KRDS Design System</h1>
      <p style={{ marginBottom: '40px', color: '#666' }}>
        모던하고 사용하기 쉬운 React UI 컴포넌트 라이브러리
      </p>

      <div className="section">
        <h2>Button</h2>
        <div className="demo-box">
          <h3>Variants</h3>
          <div className="component-row">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button disabled>Disabled</Button>
          </div>

          <h3>Sizes</h3>
          <div className="component-row">
            <Button size="small">Small</Button>
            <Button size="medium">Medium</Button>
            <Button size="large">Large</Button>
          </div>
        </div>
      </div>

      <div className="section">
        <h2>Badge</h2>
        <div className="demo-box">
          <h3>Variants</h3>
          <div className="component-row">
            <Badge variant="primary">Primary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="info">Info</Badge>
          </div>

          <h3>Sizes</h3>
          <div className="component-row">
            <Badge size="small">Small</Badge>
            <Badge size="medium">Medium</Badge>
            <Badge size="large">Large</Badge>
          </div>
        </div>
      </div>

      <div className="section">
        <h2>Card</h2>
        <div className="demo-box">
          <div className="component-column">
            <Card variant="default" padding="medium">
              <h3>Default Card</h3>
              <p>기본 배경색이 적용된 카드입니다.</p>
            </Card>

            <Card variant="bordered" padding="medium">
              <h3>Bordered Card</h3>
              <p>테두리가 있는 카드입니다.</p>
            </Card>

            <Card variant="elevated" padding="medium">
              <h3>Elevated Card</h3>
              <p>그림자 효과가 있는 카드입니다.</p>
            </Card>
          </div>
        </div>
      </div>

      <div className="section">
        <h2>Input</h2>
        <div className="demo-box">
          <div className="component-column">
            <Input
              label="이름"
              placeholder="이름을 입력하세요"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />

            <Input
              label="이메일"
              type="email"
              placeholder="email@example.com"
              helperText="이메일 형식으로 입력해주세요"
            />

            <Input
              label="비밀번호"
              type="password"
              error="비밀번호가 일치하지 않습니다"
            />

            <Input
              label="비활성화"
              value="수정할 수 없습니다"
              disabled
            />
          </div>
        </div>
      </div>

      <div className="section">
        <h2>TextArea</h2>
        <div className="demo-box">
          <div className="component-column">
            <TextArea
              label="메시지"
              placeholder="메시지를 입력하세요"
              value={textareaValue}
              onChange={(e) => setTextareaValue(e.target.value)}
              rows={4}
            />

            <TextArea
              label="설명"
              helperText="최소 10자 이상 입력해주세요"
              rows={3}
            />
          </div>
        </div>
      </div>

      <div className="section">
        <h2>Select</h2>
        <div className="demo-box">
          <div className="component-column">
            <Select
              label="언어 선택"
              options={languageOptions}
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
            />

            <Select
              label="국가"
              options={languageOptions}
              helperText="사용 가능한 언어를 선택하세요"
            />
          </div>
        </div>
      </div>

      <div className="section">
        <h2>Checkbox</h2>
        <div className="demo-box">
          <div className="component-column">
            <Checkbox
              label="이용약관에 동의합니다"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />

            <Checkbox
              label="마케팅 정보 수신에 동의합니다"
              defaultChecked
            />

            <Checkbox
              label="필수 항목입니다"
              error="이 항목은 필수입니다"
            />

            <Checkbox
              label="비활성화된 체크박스"
              disabled
            />
          </div>
        </div>
      </div>

      <div className="section">
        <h2>Switch</h2>
        <div className="demo-box">
          <div className="component-column">
            <Switch
              label="알림 받기"
              checked={isSwitchOn}
              onChange={(e) => setIsSwitchOn(e.target.checked)}
            />

            <Switch
              label="다크 모드"
              defaultChecked
            />

            <Switch
              label="자동 저장"
              disabled
            />
          </div>
        </div>
      </div>

      <div className="section">
        <Card variant="elevated" padding="large">
          <h2>Interactive Demo</h2>
          <div className="component-column">
            <Input
              label="입력 값"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <p>현재 입력 값: {inputValue || '(비어있음)'}</p>

            <Checkbox
              label="체크박스 상태"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            <p>체크박스: {isChecked ? '✓ 선택됨' : '✗ 선택 안됨'}</p>

            <Switch
              label="스위치 상태"
              checked={isSwitchOn}
              onChange={(e) => setIsSwitchOn(e.target.checked)}
            />
            <p>스위치: {isSwitchOn ? '🟢 켜짐' : '🔴 꺼짐'}</p>

            <Select
              label="선택된 언어"
              options={languageOptions}
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
            />
            <p>선택된 언어 코드: {selectedLanguage}</p>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default App;
