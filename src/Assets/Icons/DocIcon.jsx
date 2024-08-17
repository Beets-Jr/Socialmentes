import React from 'react'
import { SvgIcon } from "@mui/material"

export const DocIcon = ({ color = '#454545', fontSize }) => { {/* Caso a cor não seja especificada, é a padrão de cinza */}
  return (
    <SvgIcon fontSize={fontSize}>
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="22" viewBox="0 0 18 22" fill="none">
        <path d="M1 5C1 2.79086 2.79086 1 5 1H9H11.0633C11.6568 1 12.2197 1.26365 12.5997 1.71963L16.5364 6.44373C16.836 6.80316 17 7.25623 17 7.7241V11V17C17 19.2091 15.2091 21 13 21H5C2.79086 21 1 19.2091 1 17V5Z" stroke={color} strokeWidth="1.5"/>
        <path d="M12 1.5V5C12 6.10457 12.8954 7 14 7H16.5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M5 11H13" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M5 16H9" stroke={color} strokeWidth="1.5" strokeLinecap="round"/> 
      </svg>
    </SvgIcon>
  )
}
