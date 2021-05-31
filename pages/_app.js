import { useRouter } from "next/router";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "../components/GlobalStyle";
import { AuthProvider } from "../contexts/AuthContext";
import theme from "../utils/theme";

function MyApp({ Component, pageProps }) {



  return( 
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AuthProvider>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Cardo:ital,wght@0,400;0,700;1,400&family=Manrope:wght@200;300;400;800&display=swap" rel="stylesheet" />        
        <title>Finterest</title>
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
    )
}

export default MyApp
