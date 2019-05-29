import React from 'react'

export const ArrowRightIcon = ({ fill = 'black' }) => (
  <svg width="35" height="7" viewBox="0 0 35 7" version="1.1">
    <g fill="none">
      <g>
        <path
          d="M 3.5 0L 6.53109 5.25L 0.468911 5.25L 3.5 0Z"
          transform="matrix(0 1 -1 0 35 0)"
          fill={fill}
        />
        <line
          y1="-0.5"
          x2="30"
          y2="-0.5"
          transform="translate(0 4)"
          stroke={fill}
        />
      </g>
    </g>
  </svg>
)

export const CheckIcon = ({ fill = 'white' }) => (
  <svg width="18" height="14" viewBox="0 0 18 14" version="1.1">
    <g fill="none">
      <g id="check">
        <path
          id="Shape"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M 5.6 10.6L 1.4 6.4L 0 7.8L 5.6 13.4L 17.6 1.4L 16.2 0L 5.6 10.6Z"
          transform="translate(0.399902 0.600098)"
          fill={fill}
        />
      </g>
    </g>
  </svg>
)

export const ExIcon = ({ fill = 'black' }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" version="1.1">
    <g fill="none">
      <path
        id="Stroke 1"
        d="M 0 0L 24 0L 24 24L 0 24L 0 0Z"
        strokeWidth="0"
        stroke={fill}
        strokeOpacity="0.01"
      />
      <path
        id="Shape"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M 14 1.4L 12.6 0L 7 5.6L 1.4 0L 0 1.4L 5.6 7L 0 12.6L 1.4 14L 7 8.4L 12.6 14L 14 12.6L 8.4 7L 14 1.4Z"
        transform="translate(5 5)"
        fill={fill}
      />
    </g>
  </svg>
)

export const ChevronDownIcon = () => (
  <svg width="24" height="25" viewBox="0 0 24 25" version="1.1">
    <g fill="none">
      <g id="chevron-down-icon">
        <path
          id="Stroke 1"
          d="M 0 0L 24 0L 24 24L 0 24L 0 0Z"
          transform="translate(0 1)"
          stroke="black"
          strokeOpacity="0.01"
          strokeWidth="0"
        />
        <path
          id="&#239;&#132;&#135;"
          d="M 12.0034 0.998282C 12.0034 0.902062 11.9553 0.793814 11.8832 0.72165L 11.2818 0.120276C 11.2096 0.0481109 11.1014 0 11.0052 0C 10.9089 0 10.8007 0.0481109 10.7285 0.120276L 6.00172 4.84708L 1.27491 0.120276C 1.20275 0.0481109 1.0945 0 0.998282 0C 0.890034 0 0.793814 0.0481109 0.721649 0.120276L 0.120275 0.72165C 0.0481099 0.793814 0 0.902062 0 0.998282C 0 1.0945 0.0481099 1.20275 0.120275 1.27491L 5.72509 6.87973C 5.79725 6.95189 5.9055 7 6.00172 7C 6.09794 7 6.20619 6.95189 6.27835 6.87973L 11.8832 1.27491C 11.9553 1.20275 12.0034 1.0945 12.0034 0.998282Z"
          transform="translate(6 9)"
          fill="black"
        />
      </g>
    </g>
  </svg>
)

export const PencilIcon = () => (
  <svg width="17" height="17" viewBox="0 0 17 17">
    <g fill="none">
      <path
        id="Vector"
        d="M 16.7 4C 17.1 3.6 17.1 3 16.7 2.6L 14.4 0.3C 14 -0.1 13.4 -0.1 13 0.3L 11 2.3L 14.7 6L 16.7 4ZM 13.7 7L 10 3.3L 0 13.3L 0 17L 3.7 17L 13.7 7Z"
        fill="black"
      />
    </g>
  </svg>
)

export const SubmittedCheckIcon = () => (
  <svg
    width="90"
    height="90"
    viewBox="0 0 90 90"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="0.75"
      y="0.75"
      width="88.5"
      height="88.5"
      rx="14.25"
      stroke="black"
      strokeWidth="1.5"
    />
    <path
      d="M25.0713 47.4684L39.7878 60.4284L64.9284 29.5713"
      stroke="black"
      strokeWidth="1.5"
    />
  </svg>
)

export const CloseIcon = ({ fill = '#868F97' }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
      fill={fill}
    />
  </svg>
)

export const CreateIcon = ({ fill = '#479FFA' }) => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4 7H1C0.447715 7 0 6.55228 0 6C0 5.44772 0.447715 5 1 5H4C4.55228 5 5 5.44772 5 6C5 6.55228 4.55228 7 4 7Z"
      fill={fill}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 6C12 5.44772 11.5523 5 11 5H8C7.44772 5 7 5.44772 7 6C7 6.55228 7.44772 7 8 7H11C11.5523 7 12 6.55228 12 6Z"
      fill={fill}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7 11V8C7 7.44772 6.55228 7 6 7C5.44772 7 5 7.44772 5 8V11C5 11.5523 5.44772 12 6 12C6.55228 12 7 11.5523 7 11Z"
      fill={fill}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7 4V1C7 0.447715 6.55228 0 6 0C5.44772 0 5 0.447715 5 1V4C5 4.55228 5.44772 5 6 5C6.55228 5 7 4.55228 7 4Z"
      fill={fill}
    />
  </svg>
)

export const GoToIcon = ({ fill = '#868F97' }) => (
  <svg
    width="10"
    height="7"
    viewBox="0 0 10 7"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.37273 0V2.625H0V4.375H6.37273V7L10 3.5L6.37273 0Z"
      fill={fill}
    />
  </svg>
)
