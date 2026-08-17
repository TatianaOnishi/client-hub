export interface RainbowColor {
  value: string;
  label: string;
  hex: string;
}

export const RAINBOW_COLORS: RainbowColor[] = [
  { value: 'red', label: 'Vermelho', hex: '#E53935' },
  { value: 'orange', label: 'Laranja', hex: '#FB8C00' },
  { value: 'yellow', label: 'Amarelo', hex: '#FDD835' },
  { value: 'green', label: 'Verde', hex: '#43A047' },
  { value: 'blue', label: 'Azul', hex: '#1E88E5' },
  { value: 'indigo', label: 'Anil', hex: '#3949AB' },
  { value: 'violet', label: 'Violeta', hex: '#8E24AA' },
];