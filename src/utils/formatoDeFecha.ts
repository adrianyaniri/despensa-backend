export function TransformDate(value: string): Date {
  const [day, month, year] = value.split('/');
  return new Date(`${year}-${month}-${day}`);
}
