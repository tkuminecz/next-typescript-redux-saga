import { createMuiTheme, createGenerateClassName } from '@material-ui/core/styles'
import { SheetsRegistry } from 'jss'

const theme = createMuiTheme({
  palette: {},
  typography: {
    useNextVariants: true
  }
})

function createPageContext () {
  return {
    theme,
    sheetsManager: new Map(),
    sheetsRegistry: new SheetsRegistry(),
    generateClassName: createGenerateClassName()
  }
}

let pageContext: any

export default function getPageContext () {
  if (!(process as any).browser) {
    return createPageContext()
  }

  if (!pageContext) {
    pageContext = createPageContext()
  }

  return pageContext
}
