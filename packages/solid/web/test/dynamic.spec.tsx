/* @jsxImportSource solid-js */
import { createRoot, createSignal, Component, JSX } from "../../src";
import { Dynamic } from "../src";

describe("Testing Dynamic control flow", () => {
  let div: HTMLDivElement, disposer: () => void;

  interface DynamicProps {
    title: string;
  }
  const [comp, setComp] = createSignal<Component<DynamicProps> | keyof JSX.IntrinsicElements>(),
    [name, setName] = createSignal("Smith");
  const Component = () => (
      <div ref={div}>
        <Dynamic component={comp()} title={name()} />
      </div>
    ),
    CompA: Component<DynamicProps> = props => <div>Hi {props.title}</div>,
    CompB: Component<DynamicProps> = props => <span>Yo {props.title}</span>;

  test("Create Dynamic control flow", () => {
    createRoot(dispose => {
      disposer = dispose;
      <Component />;
    });

    expect(div.innerHTML).toBe("");
  });

  test("Toggle Dynamic control flow", () => {
    setComp(CompA);
    expect(div.innerHTML).toBe("<div>Hi Smith</div>");
    setName("Smithers");
    expect(div.innerHTML).toBe("<div>Hi Smithers</div>");
    setComp(CompB);
    expect(div.innerHTML).toBe("<span>Yo Smithers</span>");
    setComp("h1");
    expect(div.innerHTML).toBe(`<h1 title="Smithers"></h1>`);
    setName("Sunny")
    expect(div.innerHTML).toBe(`<h1 title="Sunny"></h1>`);
  });

  test("dispose", () => disposer());
});
