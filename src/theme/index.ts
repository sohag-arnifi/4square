"use client";
import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface Theme {
    colorConstants: {
      defaultFontColor: string;
      bgColorLightGray: string;
      primaryBlue?: string;
      primaryDarkBlue?: string;
      darkBlue?: string;
      brown?: string;
      white?: string;
      bgLightBlue?: string;
      royalBlue?: string;
      visibleGray?: string;
      visibleDarkGray?: string;
      softRed?: string;
      lightRoyalBlue?: string;
      purple?: string;
      bluishBlack?: string;
      bluishPurple?: string;
      snowPink?: string;
      black?: string;
      green?: string;
      cyan?: string;
      midnightBlue?: string;
      grey?: string;
      lightGrey?: string;
      lightGreen?: string;
      greyBg?: string;
      doneGreen?: string;
      crossRed?: string;
      darkGray?: string;
      bgBluishGray?: string;
      mediumGray?: string;
      whitishGray?: string;
      borderColor?: string;
      lightPurple?: string;
      fadedBlue?: string;
      borderedGray?: string;
      weakRed?: string;
      discountGreen?: string;
      lightGreenBackground?: string;
      linkBlue?: string;
      purplishBlue?: string;
      opacedBlue?: string;
      silverGray?: string;
      darkBluishBlack?: string;
      orange?: string;
      backGray?: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    colorConstants?: {
      defaultFontColor?: string;
      bgColorLightGray?: string;
      primaryBlue?: string;
      primaryDarkBlue?: string;
      darkBlue?: string;
      white?: string;
      bgLightBlue?: string;
      royalBlue?: string;
      lightRoyalBlue?: string;
      purple?: string;
      bluishBlack?: string;
      bluishPurple?: string;
      snowPink?: string;
      black?: string;
      green?: string;
      cyan?: string;
      midnightBlue?: string;
      grey?: string;
      lightGrey?: string;
      lightGreen?: string;
      greyBg?: string;
      doneGreen?: string;
      crossRed?: string;
      lightPurple?: string;
      darkGray?: string;
      bgBluishGray?: string;
      whitishGray?: string;
      mediumGray?: string;
      borderColor?: string;
      fadedBlue?: string;
      visibleGray?: string;
      softRed?: string;
      brown?: string;
      visibleDarkGray?: string;
      borderedGray?: string;
      weakRed?: string;
      discountGreen?: string;
      lightGreenBackground?: string;
      linkBlue?: string;
      purplishBlue?: string;
      opacedBlue?: string;
      silverGray?: string;
      darkBluishBlack?: string;
      orange?: string;
      backGray?: string;
    };
  }
}

declare module "@mui/material/styles" {
  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    button16: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    button16: true;
  }
}

const defaultFontColor = "#212529";
const softRed = "F15656";
const brown = "#333";
const visibleGray = "#666666";
const bgColorLightGray = "#786DB1";
const primaryBlue = "#3955D9";
const bgBluishGray = "#D7DDF7";
const primaryDarkBlue = "#0C0048";
const whitishGray = "#FAFAFA";
const darkBlue = "rgba(12, 0, 72, 0.80)";
const bgLightBlue = "#F3F9FF";
const royalBlue = "#3955D9";
const lightRoyalBlue = "#4281E9";
const white = "white";
const mediumGray = "#757575";
const borderedGray = "#E5E5E5";
const purple = "rgba(12, 0, 72, 0.60)";
const bluishPurple = "rgba(12, 0, 68, 0.75)";
const bluishBlack = "rgba(6, 17, 38, 0.80)";
const snowPink = "#FFFAFA";
const black = "#000";
const green = "#0F6339";
const fadedBlue = "#6177E1";
const opacedBlue = "#061126CC";
const borderColor = "#E9E9E9;";
const cyan = "#00D1CD";
const midnightBlue = "rgba(12, 0, 68, 0.80)";
const grey = "rgba(6, 17, 38, 0.60)";
const lightGrey = "rgba(6, 17, 38, 0.40)";
const lightGreen = "#00E4B2";
const greyBg = "#F5F5F5";
const doneGreen = "#21A454";
const crossRed = "#D82F36";
const lightPurple = "#9E99B6";
const darkGray = "#333";
const backGray = "#212529";
const visibleDarkGray = "#666";
const weakRed = "#F15656";
const discountGreen = "#36A067";
const lightGreenBackground = "#E5FAFA";
const linkBlue = "#0853FD";
const purplishBlue = "#3D336D";
const darkBluishBlack = "#3D336D";
const silverGray = "#e8e8e8";
const orange = "#F7993B";

const theme = createTheme({
  palette: {
    primary: {
      main: primaryBlue,
    },
    secondary: {
      main: primaryDarkBlue,
    },
    info: {
      main: bgLightBlue,
    },
  },

  typography: {
    fontFamily: ["Inter", "switzer"].join(","),
    h1: {
      fontFamily: "Inter",
      fontWeight: 500,
      fontSize: "46px",
    },
    h2: {
      fontFamily: "Inter",
      fontWeight: 600,
      fontSize: "40px",
    },
    h3: {
      fontFamily: "Inter",
      fontWeight: 600,
      fontSize: "28px",
      lineHeight: "36px",
    },
    h4: {
      fontFamily: "Inter",
      fontWeight: 600,
      fontSize: "18px",
      lineHeight: "20px",
    },
    h5: {
      fontFamily: "Inter",
      fontWeight: 600,
      fontSize: "16px",
    },
    h6: {
      fontFamily: "Inter",
      fontWeight: 600,
      fontSize: "12px",
    },
    subtitle1: {
      fontFamily: "Inter",
      fontSize: "16px",
      fontWeight: 400,
      lineHeight: "22px",
    },
    allVariants: {
      color: defaultFontColor,
    },
    body2: {
      fontFamily: "Inter",
      fontWeight: 400,
      fontSize: "18px",
      lineHeight: "27px",
    },
    body1: {
      fontFamily: "Inter",
      fontWeight: 400,
      fontSize: "14px",
      lineHeight: "21px",
    },
    button16: {
      // Let’s Talk
      fontFamily: "Inter",
      fontWeight: 600,
      fontSize: "16px",
    },
  },

  colorConstants: {
    bgColorLightGray,
    primaryBlue,
    primaryDarkBlue,
    defaultFontColor,
    darkBlue,
    borderColor,
    white,
    bgLightBlue,
    royalBlue,
    lightRoyalBlue,
    purple,
    bluishBlack,
    bluishPurple,
    borderedGray,
    snowPink,
    opacedBlue,
    black,
    green,
    discountGreen,
    lightGreenBackground,
    cyan,
    midnightBlue,
    linkBlue,
    grey,
    purplishBlue,
    lightGrey,
    backGray,
    weakRed,
    lightGreen,
    greyBg,
    doneGreen,
    crossRed,
    lightPurple,
    darkGray,
    bgBluishGray,
    whitishGray,
    mediumGray,
    fadedBlue,
    visibleDarkGray,
    visibleGray,
    softRed,
    brown,
    darkBluishBlack,
    silverGray,
    orange,
  },
});

export default theme;
