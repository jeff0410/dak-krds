import {
  Badge,
  Body,
  Button,
  Checkbox,
  Heading,
  RadioButton,
  Spinner,
  Tag,
  TextArea,
  TextInput,
  Title,
} from "dak-krds";
import { useState } from "react";

export function App() {
  const [checkboxValue, setCheckboxValue] = useState<"on" | "off">("off");
  const [switchValue, setSwitchValue] = useState(false);
  const [radioValue, setRadioValue] = useState("option1");
  const [textValue, setTextValue] = useState("");
  const [textareaValue, setTextareaValue] = useState("");

  return (
    <div style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
      <Title size={1}>DAK KRDS Design System</Title>
      <Body size={1}>컴포넌트 테스트 페이지</Body>

      <div style={{ marginTop: "40px" }}>
        <Heading size={2}>Button</Heading>
        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            marginTop: "20px",
          }}
        >
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="danger">Danger</Button>
        </div>
        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            marginTop: "10px",
          }}
        >
          <Button size="s">Small</Button>
          <Button size="m">Medium</Button>
          <Button size="l">Large</Button>
          <Button disabled>Disabled</Button>
        </div>
      </div>

      <div style={{ marginTop: "40px" }}>
        <Heading size={2}>Badge</Heading>
        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            marginTop: "20px",
          }}
        >
          <Badge label="Primary" variant="primary" />
          <Badge label="Success" variant="success" />
          <Badge label="Warning" variant="warning" />
          <Badge label="Error" variant="error" />
        </div>
      </div>

      <div style={{ marginTop: "40px" }}>
        <Heading size={2}>Tag</Heading>
        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            marginTop: "20px",
          }}
        >
          <Tag label="Default Tag" />
          <Tag label="Primary Tag" />
          <Tag label="Success Tag" />
        </div>
      </div>

      <div style={{ marginTop: "40px" }}>
        <Heading size={2}>Checkbox</Heading>
        <div style={{ marginTop: "20px" }}>
          <Checkbox
            id="checkbox-test"
            status={checkboxValue}
            onChange={(status) => setCheckboxValue(status as "on" | "off")}
            label="체크박스 테스트"
          />
        </div>
      </div>
      <div style={{ marginTop: "40px" }}>
        <Heading size={2}>RadioButton</Heading>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            marginTop: "20px",
          }}
        >
          <RadioButton
            id="radio1"
            name="radio-test"
            value="option1"
            checked={radioValue === "option1"}
            onChange={(value) => setRadioValue(value as "option1" | "option2")}
            label="옵션 1"
          />
          <RadioButton
            id="radio2"
            name="radio-test"
            value="option2"
            checked={radioValue === "option2"}
            onChange={(value) => setRadioValue(value as "option1" | "option2")}
            label="옵션 2"
          />
        </div>
      </div>

      <div style={{ marginTop: "40px" }}>
        <Heading size={2}>TextInput</Heading>
        <div style={{ marginTop: "20px" }}>
          <TextInput
            id="text-input"
            value={textValue}
            setValue={(value) => setTextValue(value)}
            placeholder="텍스트를 입력하세요"
          />
        </div>
      </div>

      <div style={{ marginTop: "40px" }}>
        <Heading size={2}>TextArea</Heading>
        <div style={{ marginTop: "20px" }}>
          <TextArea
            id="textarea"
            value={textareaValue}
            setValue={(value) => setTextareaValue(value)}
            placeholder="여러 줄 텍스트를 입력하세요"
          />
        </div>
      </div>

      <div style={{ marginTop: "40px" }}>
        <Heading size={2}>Spinner</Heading>
        <div
          style={{
            display: "flex",
            gap: "20px",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <Spinner size="s" />
          <Spinner size="m" />
          <Spinner size="l" />
        </div>
      </div>

      <div style={{ marginTop: "40px", marginBottom: "40px" }}>
        <Heading size={2}>Typography</Heading>
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <Title size={1}>Title Size 1</Title>
          <Title size={2}>Title Size 2</Title>
          <Heading size={1}>Heading Size 1</Heading>
          <Heading size={2}>Heading Size 2</Heading>
          <Body size={1}>Body Size 1</Body>
          <Body size={2}>Body Size 2</Body>
        </div>
      </div>
    </div>
  );
}

export default App;
