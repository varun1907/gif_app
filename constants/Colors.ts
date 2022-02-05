const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

export default {
  light: {
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
  headerBg:"#3296e9",
  white:"#FFFFFF",
  white_rgba:(aplha:any) =>  { return `rgba(255,255,255,${aplha})`},
  gray:"#cecece",
  black:"#000000",
  imageBg:"#e1e4e8"
};
