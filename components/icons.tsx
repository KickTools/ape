import * as React from "react";

import { IconSvgProps } from "@/types";

export const Logo: React.FC<IconSvgProps> = ({
  size = 36,
  width,
  height,
  ...props
}) => (
  <svg
    fill="none"
    height={size || height}
    viewBox="0 0 32 32"
    width={size || width}
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

export const DiscordIcon: React.FC<IconSvgProps> = ({
  size = 24,
  width,
  height,
  ...props
}) => {
  return (
    <svg
      height={size || height}
      viewBox="0 0 24 24"
      width={size || width}
      {...props}
    >
      <path
        d="M14.82 4.26a10.14 10.14 0 0 0-.53 1.1 14.66 14.66 0 0 0-4.58 0 10.14 10.14 0 0 0-.53-1.1 16 16 0 0 0-4.13 1.3 17.33 17.33 0 0 0-3 11.59 16.6 16.6 0 0 0 5.07 2.59A12.89 12.89 0 0 0 8.23 18a9.65 9.65 0 0 1-1.71-.83 3.39 3.39 0 0 0 .42-.33 11.66 11.66 0 0 0 10.12 0q.21.18.42.33a10.84 10.84 0 0 1-1.71.84 12.41 12.41 0 0 0 1.08 1.78 16.44 16.44 0 0 0 5.06-2.59 17.22 17.22 0 0 0-3-11.59 16.09 16.09 0 0 0-4.09-1.35zM8.68 14.81a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.93 1.93 0 0 1 1.8 2 1.93 1.93 0 0 1-1.8 2zm6.64 0a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.92 1.92 0 0 1 1.8 2 1.92 1.92 0 0 1-1.8 2z"
        fill="currentColor"
      />
    </svg>
  );
};

export const TwitterIcon: React.FC<IconSvgProps> = ({
  size = 24,
  width,
  height,
  ...props
}) => {
  return (
    <svg
      height={size || height}
      viewBox="0 0 24 24"
      width={size || width}
      {...props}
    >
      <path
        d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z"
        fill="currentColor"
      />
    </svg>
  );
};

export const VerifiedIcon: React.FC<IconSvgProps> = ({
  size = 28,
  width,
  height,
  ...props
}) => {
  return (
    <svg
      height={size || height}
      viewBox="0 0 48 48"
      width={size || width}
      {...props}
    >
      <path d="M0 0h48v48H0z" fill="none" />
      <path d="M24 2 6 10v12c0 11.11 7.67 21.47 18 24 10.33-2.53 18-12.89 18-24V10zm-4 32-8-8 2.83-2.83L20 28.34l13.17-13.17L36 18z" fill="#53fc18" />
    </svg>
  );
}

export const TwitchLogoIcon: React.FC<IconSvgProps> = ({
  size = 16,
  width,
  height,
  ...props
}) => {
  return (
    <svg
      height={size || height}
      width={size || width}
      viewBox="32 32 192 216"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path fill="none" d="M0 0h256v256H0z" /><path fill="currentColor" d="M208 32H48a16 16 0 0 0-16 16v144a16 16 0 0 0 16 16h16v32a7.9 7.9 0 0 0 4.6 7.2 6.8 6.8 0 0 0 3.4.8 7.5 7.5 0 0 0 5.1-1.9l45.8-38.1h42.2a15.8 15.8 0 0 0 10.2-3.7l42.9-35.8a15.7 15.7 0 0 0 5.8-12.2V48a16 16 0 0 0-16-16m-80 104a8 8 0 0 1-16 0V88a8 8 0 0 1 16 0Zm48 0a8 8 0 0 1-16 0V88a8 8 0 0 1 16 0Z" /></svg>
  );
};

export const KickLogoIcon: React.FC<IconSvgProps> = ({
  size = 14,
  width,
  height,
  ...props
}) => {
  return (
    <svg
      height={size || height}
      viewBox="-1 0 27 28"
      width={size || width}
      {...props}
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M1 0h8.767v5.795h2.822V2.822h2.973V0h8.616v8.616h-2.822v2.973h-2.972v2.822h2.972v2.973h2.822V26h-8.616v-2.822h-2.973v-2.972H9.767V26H1z" fill="currentColor" />
    </svg>
  );
}

export const EmailIcon: React.FC<IconSvgProps> = (props) => {
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      width="24"
      {...props}
    >
      <g fill="currentColor">
        <path d="M28 13a1 1 0 0 0-1 1v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-8a1 1 0 0 0-2 0v8a3 3 0 0 0 .88 2.12A3 3 0 0 0 6 25h20a3 3 0 0 0 2.12-.88A3 3 0 0 0 29 22v-8a1 1 0 0 0-1-1" />
        <path d="M15.4 18.8a1 1 0 0 0 1.2 0l11.81-8.86a1 1 0 0 0 .3-1.23 3 3 0 0 0-.59-.83A3 3 0 0 0 26 7H6a3 3 0 0 0-2.12.88 3 3 0 0 0-.59.83 1 1 0 0 0 .3 1.23ZM6 9h20a.9.9 0 0 1 .28 0L16 16.75 5.72 9A.9.9 0 0 1 6 9" />
      </g>
    </svg>
  );
};