import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "../components/GlobalStyle";
import { AuthProvider } from "../contexts/AuthContext";
import theme from "../utils/theme";

function MyApp({ Component, pageProps }) {
  return( 
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
    )
}

export default MyApp
