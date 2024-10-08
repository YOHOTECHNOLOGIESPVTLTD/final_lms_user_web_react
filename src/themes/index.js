import { createTheme } from "@mui/material/styles";

// assets
import colors from "../assets/scss/_themes-vars.module.scss";

// project imports
import componentStyleOverrides from "./compStyleOverride";
import themePalette from "./palette";
import themeTypography from "./typography";

/**
 * Represent theme style and structure as per Material-UI
 * @param {JsonObject} customization customization parameter object
 */

export const theme = (customization) => {
  const color = colors;

  const themeOption = {
    colors: color,
    heading: customization?.darkMode ? "#fcfcfc" : color.grey900,
    paper: customization?.darkMode ? "#2F3349" : color.paper,
    backgroundDefault: color.paper,
    background: customization?.darkMode ? "#25293C" : color.primaryLight,
    darkTextPrimary: customization?.darkMode ? "#fcfcfc" : color.grey700,
    darkTextSecondary: color.grey400,
    textDark: color.grey900,
    menuSelected: color.secondaryDark,
    menuSelectedBack: color.secondaryLight,
    divider: color.grey200,
    customization,
  };

  const themeOptions = {
    direction: "ltr",
    palette: themePalette(themeOption),
    spacing: (factor) => `${0.25 * factor}rem`,
    mixins: {
      toolbar: {
        minHeight: "48px",
        padding: "16px",
        "@media (min-width: 600px)": {
          minHeight: "48px",
        },
      },
    },
    typography: themeTypography(themeOption),
    custom: {
      buttonStyles: {
        button1: {
          borderRadius: "8px",
          padding: "9px 24px",
          fontSize: "14px",
          fontWeight: 500,
          lineHeight: "22px",
        },
      },
    },
  };

  const themes = createTheme(themeOptions);
  themes.components = componentStyleOverrides(themeOption);

  return themes;
};

export default theme;
