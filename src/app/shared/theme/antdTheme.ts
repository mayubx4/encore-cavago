import colors from './colors';

export default {
  token: {
    colorPrimary: colors.primary[500],
  },
  components: {
    Button: {
      algorithm: true,
      fontWeight: '400',
      fontSize: 'small',
      colorBorder: colors.neutrals[600],
      colorText: colors.neutrals[600],
      colorLink: colors.neutrals[600],
      colorLinkHover: colors.neutrals[800],
      defaultHoverColor: colors.neutrals[800],
      colorPrimaryHover: colors.neutrals[800],
    },
  },
};
