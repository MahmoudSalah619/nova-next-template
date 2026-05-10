export default function Icon({ name, size = 20 }: any) {
  return <span style={{ width: size, height: size, display: 'inline-block' }}>[{name}]</span>;
}
