import React from 'react'
import { alertInterface, alertIcons } from '../utility/interfaces'

const icons:alertIcons = {
    success: (<svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>),
    error: (<svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>),
    info: (<svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01M12 3a9 9 0 100 18 9 9 0 000-18z" /></svg>),
    warning: (<svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>),
  }

/**
 * 
 * @param message - Message to be displayed in the alert
 * @param type - Type of alert (the colour of the alert changes depending on type)
 * @remark - Available types: success (Green), error(red), info(blue) warning(yellow) 
 * @returns 
 */
export const Alert = ({message, type}:alertInterface) => {
  return (
    <div className={`alert alert-${type}`}>
        {icons[type]}
        <span>{message}</span>
    </div>
  )
}
