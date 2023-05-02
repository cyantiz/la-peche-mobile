import { GlobalThemeOverrides } from 'naive-ui'
import { Color } from './color'

const themeOverrides: GlobalThemeOverrides = {
    common: {
        baseColor: Color.AlmostWhite,
        textColorBase: Color.RaisinBlack,
        primaryColor: Color.BitterSweet,
        primaryColorHover: Color.BitterSweetHover,
        primaryColorPressed: Color.BitterSweetPressed,
        primaryColorSuppl: Color.BitterSweetHover,
        textColor1: Color.RaisinBlack,
        textColor2: Color.RaisinBlack,
        textColor3: Color.RaisinBlack,
        fontFamily: 'Roboto, sans-serif',
        borderRadius: '8px',
    },
    LoadingBar: {
        height: '3px',
    },
    Menu: {
        itemColorActive: Color.BitterSweet,
        itemColorActiveHover: Color.BitterSweetHover,
        itemColorActiveCollapsed: Color.BitterSweet,
        itemIconColorActive: Color.AlmostWhite,
        itemIconColorActiveHover: Color.AlmostWhite,
        itemTextColorActive: Color.AlmostWhite,
        itemTextColorActiveHover: Color.AlmostWhite,
        itemColorHover: Color.AlmostWhite,
    },
    Button: {
        border: '2px solid #000000',
        borderHover: '2px solid #000000',
        borderPressed: '2px solid #000000',
        borderFocus: '2px solid #000000',
        borderPrimary: '2px solid #000000',
        borderHoverPrimary: '2px solid #000000',
        borderFocusPrimary: '2px solid #000000',
        borderPressedPrimary: '2px solid #000000',
        borderSuccess: '2px solid #000000',
        borderHoverSuccess: '2px solid #000000',
        borderFocusSuccess: '2px solid #000000',
        borderPressedSuccess: '2px solid #000000',
    },
    Input: {
        border: '2px solid #000000',
        borderHover: '2px solid ' + Color.BitterSweet,
        borderFocus: '2px solid ' + Color.BitterSweet,
        borderError: '2px solid ' + Color.Cherry,
        borderHoverError: '2px solid ' + Color.Cherry,
        borderFocusError: '2px solid ' + Color.Cherry,
        borderDisabled: '2px solid ' + Color.Inactive,
        borderWarning: '2px solid ' + Color.YellowGreenCrayola,
        borderHoverWarning: '2px solid ' + Color.YellowGreenCrayola,
        borderFocusWarning: '2px solid ' + Color.YellowGreenCrayola,

        boxShadowFocusError: '2px -2px 0 0 ' + Color.Cherry,
        boxShadowFocusWarning: '2px -2px 0 0 ' + Color.YellowGreenCrayola,
        boxShadowFocus: '2px -2px 0 0 ' + Color.BitterSweet,
    },
    Dialog: {
        borderRadius: '16px',
        closeColorHover: 'rgba(0, 0, 0, 0)',
    },
}

export default themeOverrides
