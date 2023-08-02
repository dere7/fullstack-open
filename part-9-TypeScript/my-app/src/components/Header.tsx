interface HeaderProp {
  courseName: string;
}

export const Header = ({ courseName }: HeaderProp) => <h1>{courseName}</h1>;
