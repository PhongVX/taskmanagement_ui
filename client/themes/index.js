import defaultTheme from './default'
import { createMuiTheme } from "@material-ui/core";

const overrides = {

};

export default {
  default: createMuiTheme({ ...defaultTheme, ...overrides })
};
