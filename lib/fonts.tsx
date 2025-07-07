import { NextFontWithVariable } from 'next/dist/compiled/@next/font';
import { Rubik } from 'next/font/google';

const rubik: NextFontWithVariable = Rubik({
  subsets: ['latin'],
  variable: '--font-rubik',
});

export const fonts = {
  rubik,
};
