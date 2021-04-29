import { ThemeProvider } from "styled-components";
import { AuthProvider } from "../contexts/AuthContext";
import theme from "../utils/theme";

function MyApp({ Component, pageProps }) {
  return( 
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
    )
}

export default MyApp
