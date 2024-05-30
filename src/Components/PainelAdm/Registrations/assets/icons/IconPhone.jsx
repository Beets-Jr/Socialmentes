import { SvgIcon } from "@mui/material";

export const IconPhone = ({ sx, fontSize, color }) => {
    return (
        <SvgIcon fontSize={fontSize} sx={sx}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.23986 12.4999C6.79027 12.4967 4.44192 11.5222 2.7098 9.79009C0.977678 8.05797 0.0031751 5.70962 0 3.26003C0 2.52804 0.290781 1.82603 0.808373 1.30844C1.32597 0.790849 2.02797 0.500069 2.75996 0.500069C2.91496 0.498888 3.0697 0.512955 3.22195 0.542068C3.36914 0.563848 3.51383 0.600021 3.65395 0.650066C3.75249 0.684643 3.84031 0.744345 3.90871 0.823267C3.97711 0.902189 4.02372 0.997598 4.04394 1.10006L4.86593 4.70001C4.88808 4.79772 4.88542 4.89943 4.85817 4.99585C4.83092 5.09227 4.77996 5.18033 4.70993 5.252C4.63193 5.336 4.62593 5.342 3.88794 5.72599C4.47893 7.02249 5.51584 8.06365 6.8099 8.65995C7.19989 7.91596 7.20589 7.90996 7.28989 7.83196C7.36156 7.76194 7.44962 7.71097 7.54604 7.68372C7.64246 7.65648 7.74417 7.65381 7.84188 7.67596L11.4418 8.49795C11.541 8.52096 11.6327 8.56884 11.7083 8.63706C11.7839 8.70529 11.8408 8.79163 11.8738 8.88795C11.9245 9.03036 11.9626 9.17691 11.9878 9.32594C12.012 9.47673 12.024 9.62922 12.0238 9.78193C12.0128 10.5108 11.7138 11.2057 11.1922 11.7149C10.6706 12.2241 9.96878 12.5063 9.23986 12.4999Z" fill={color} />
            </svg>
        </SvgIcon>
    )
};