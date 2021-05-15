import { useRouter } from "next/router";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "../components/GlobalStyle";
import { AuthProvider } from "../contexts/AuthContext";
import theme from "../utils/theme";

function MyApp({ Component, pageProps }) {

  const router = useRouter();
  console.log(router)

  const setTitle = () => {
    switch(router.asPath) {
      case('/home'):
        return 'Feed';
        break;
      case('/profile'):
        return 'Profile';
        break;
      case('/login'):
        return 'Log In';
        break;
      case('/signup'):
        return 'Sign Up';
        break;
    }
  };

  let title = setTitle();


  return( 
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AuthProvider>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;800&display=swap" rel="stylesheet" />
        <title>Finterest | {title}</title>
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
    )
}

export default MyApp
