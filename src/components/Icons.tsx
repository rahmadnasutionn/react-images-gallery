import * as React from 'react'

export function Airplane({
  className,
  width = 15,
  height = 15,
}: {
  className?: string,
  width?: number,
  height?: number,

}) {
  return (
    <svg className={className} width={width || 15} height={height || 15} viewBox="0 0 27 24" fill="#3E86F5" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
      <rect width="26.7" height="24" fill="url(#pattern0)"/>
      <defs>
        <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
          <use xlinkHref="#image0_2_37" transform="matrix(0.00898876 0 0 0.01 0.0505618 0)"/>
        </pattern>
        <image id="image0_2_37" width="100" height="100" xlinkHref="data:image/png;base64,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"/>
      </defs>
    </svg>
  )
}

export const BurgerIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className || "h-6 w-6"}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M4 6h16M4 12h16m-7 6h7"
    />
  </svg>
);

export function Search({
  className,
}: {
  className?: string
}) {
  return (
    <svg className={className || 'w-6 h-6'} viewBox="0 0 54 55" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="21.5" stroke="white" stroke-width="5"/>
      <line x1="37.7678" y1="39.2322" x2="51.7678" y2="53.2322" stroke="white" stroke-width="5"/>
    </svg>
  )
};

export const Star = React.memo<{ className?: string }>(function Star({
  className
}) {
  return (
    <svg
      className={className}
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='currentColor'
      role='presentation'
    >
      <path d='M12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72 3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5z'></path>
    </svg>
  )
})