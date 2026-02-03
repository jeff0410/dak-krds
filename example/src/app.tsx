import { Badge, Button } from "dak-krds";

export function App() {
	return (
		<div>
			<h1>DAK KRDS Design System - Button Test</h1>
			<p style={{ marginBottom: "40px", color: "#666" }}>
				Button 컴포넌트 디자인 테스트
			</p>

			<div className="section">
				<h2>Button Variants</h2>
				<div className="demo-box">
					<div
						className="component-row"
						style={{ display: "flex", gap: "10px", marginBottom: "20px" }}
					>
						<Button variant="primary">Primary Button</Button>
						<Button variant="secondary">Secondary Button</Button>
						<Button variant="outline">Outline Button</Button>
						<Button variant="danger">Danger Button</Button>
					</div>
				</div>
			</div>

			<div className="section">
				<h2>Button Sizes</h2>
				<div className="demo-box">
					<div
						className="component-row"
						style={{ display: "flex", gap: "10px", alignItems: "center" }}
					>
						<Button size="small" variant="primary">
							Small
						</Button>
						<Button size="medium" variant="primary">
							Medium
						</Button>
						<Button size="large" variant="primary">
							Large
						</Button>
					</div>
				</div>
			</div>

			<div className="section">
				<h2>Badge Test</h2>
				<div className="demo-box">
					<div
						className="component-row"
						style={{ display: "flex", gap: "10px" }}
					>
						<Badge variant="primary">Primary</Badge>
						<Badge variant="success">Success</Badge>
						<Badge variant="warning">Warning</Badge>
						<Badge variant="error">Error</Badge>
					</div>
				</div>
			</div>

			<div className="section">
				<h2>Disabled State</h2>
				<div className="demo-box">
					<div
						className="component-row"
						style={{ display: "flex", gap: "10px" }}
					>
						<Button variant="primary" disabled>
							Disabled Primary
						</Button>
						<Button variant="secondary" disabled>
							Disabled Secondary
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
