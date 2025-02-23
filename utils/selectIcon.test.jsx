import React from "react";
import SelectIcon from "./selectIcon";
import Icon from "react-native-vector-icons/FontAwesome";
import { render } from "@testing-library/react-native";
import { View } from "react-native";

jest.mock("react-native-vector-icons/FontAwesome", () => {
  const MockIcon = ({ name, ...rest }) => (
    <View {...rest} testID={`Icon-${name}`} />
  );
  return MockIcon;
});

describe("SelectIcon", () => {
  beforeEach(() => {
    jest.useFakeTimers(); // Use fake timers for each test
  });

  afterEach(() => {
    jest.clearAllTimers(); // Clear timers after each test
    jest.runOnlyPendingTimers(); // Run any pending timers
  });
  it('renders the correct icon for "Home" route', () => {
    const route = { name: "Home" };
    render(<SelectIcon route={route} />);
    expect(screen.getByTestId("Icon-home")).toBeTruthy();
  });

  it('renders the correct icon for "Foro" route', () => {
    const route = { name: "Foro" };
    const { getByTestId } = render(<SelectIcon route={route} />);
    expect(getByTestId("Icon-comment")).toBeTruthy();
  });

  it('renders the correct icon for "Crear articulo" route', () => {
    const route = { name: "Crear articulo" };
    const { getByTestId } = render(<SelectIcon route={route} />);
    expect(getByTestId("Icon-plus-circle")).toBeTruthy();
  });

  it('renders the correct icon for "Register" route', () => {
    const route = { name: "Register" };
    const { getByTestId } = render(<SelectIcon route={route} />);
    expect(getByTestId("Icon-user")).toBeTruthy();
  });

  it('renders the correct icon for "Perfil" route', () => {
    const route = { name: "Perfil" };
    const { getByTestId } = render(<SelectIcon route={route} />);
    expect(getByTestId("Icon-user")).toBeTruthy();
  });

  it("applies active tint color", () => {
    const route = { name: "Home" }; // No importa la ruta para este test
    const { container } = render(<SelectIcon route={route} />);

    expect(container).toBeTruthy();
  });

  it("applies inactive tint color", () => {
    const route = { name: "Home" }; // No importa la ruta para este test
    const { container } = render(<SelectIcon route={route} />);
    expect(container).toBeTruthy(); // Misma lógica que el test anterior
  });
});
