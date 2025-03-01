// src/assets/icons/index.jsx
import React from "react";

// Size mapping based on Tailwind text sizes (converted to pixel values)
const sizeMap = {
  xs: "12px",
  sm: "14px",
  base: "16px",
  lg: "18px",
  xl: "20px",
  "2xl": "24px",
  "3xl": "30px",
  "4xl": "36px",
  "5xl": "48px",
  "6xl": "60px",
  "7xl": "72px",
  "8xl": "96px",
  "9xl": "128px"
};

const BrandKick = ({ size = "base", color = "current", className = "" }) => {
  const sizeValue = sizeMap[size] || sizeMap["base"];
  const colorClass = color === "current" ? "" : `text-${color}`;
  const combinedClassName =
    `${colorClass} icon icon-tabler icons-tabler-filled ${className}`.trim();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      width={sizeValue}
      height={sizeValue}
      className={combinedClassName}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M9 3a1 1 0 0 1 1 1v3h1v-1a1 1 0 0 1 .883 -.993l.117 -.007h1v-1a1 1 0 0 1 .883 -.993l.117 -.007h6a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-1v1a1 1 0 0 1 -.883 .993l-.117 .007h-1v2h1a1 1 0 0 1 .993 .883l.007 .117v1h1a1 1 0 0 1 .993 .883l.007 .117v4a1 1 0 0 1 -1 1h-6a1 1 0 0 1 -1 -1v-1h-1a1 1 0 0 1 -.993 -.883l-.007 -.117v-1h-1v3a1 1 0 0 1 -.883 .993l-.117 .007h-5a1 1 0 0 1 -1 -1v-16a1 1 0 0 1 1 -1z" />
    </svg>
  );
};

const BrandTwitch = ({ size = "base", color = "current", className = "" }) => {
  const sizeValue = sizeMap[size] || sizeMap["base"];
  const colorClass = color === "current" ? "" : `text-${color}`;
  const combinedClassName =
    `${colorClass} icon icon-tabler icons-tabler-outline icon-tabler-brand-twitch ${className}`.trim();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      width={sizeValue}
      height={sizeValue}
      className={combinedClassName}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M4 5v11a1 1 0 0 0 1 1h2v4l4 -4h5.584c.266 0 .52 -.105 .707 -.293l2.415 -2.414c.187 -.188 .293 -.442 .293 -.708v-8.585a1 1 0 0 0 -1 -1h-14a1 1 0 0 0 -1 1z" />
      <path d="M16 8l0 4" />
      <path d="M12 8l0 4" />
    </svg>
  );
};

const BrandDiscord = ({ size = "base", color = "current", className = "" }) => {
  const sizeValue = sizeMap[size] || sizeMap["base"];
  const colorClass = color === "current" ? "" : `text-${color}`;
  const combinedClassName =
    `${colorClass} icon icon-tabler icons-tabler-filled icon-tabler-brand-discord ${className}`.trim();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      width={sizeValue}
      height={sizeValue}
      className={combinedClassName}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M14.983 3l.123 .006c2.014 .214 3.527 .672 4.966 1.673a1 1 0 0 1 .371 .488c1.876 5.315 2.373 9.987 1.451 12.28c-1.003 2.005 -2.606 3.553 -4.394 3.553c-.732 0 -1.693 -.968 -2.328 -2.045a21.512 21.512 0 0 0 2.103 -.493a1 1 0 1 0 -.55 -1.924c-3.32 .95 -6.13 .95 -9.45 0a1 1 0 0 0 -.55 1.924c.717 .204 1.416 .37 2.103 .494c-.635 1.075 -1.596 2.044 -2.328 2.044c-1.788 0 -3.391 -1.548 -4.428 -3.629c-.888 -2.217 -.39 -6.89 1.485 -12.204a1 1 0 0 1 .371 -.488c1.439 -1.001 2.952 -1.459 4.966 -1.673a1 1 0 0 1 .935 .435l.063 .107l.651 1.285l.137 -.016a12.97 12.97 0 0 1 2.643 0l.134 .016l.65 -1.284a1 1 0 0 1 .754 -.54l.122 -.009zm-5.983 7a2 2 0 0 0 -1.977 1.697l-.018 .154l-.005 .149l.005 .15a2 2 0 1 0 1.995 -2.15zm6 0a2 2 0 0 0 -1.977 1.697l-.018 .154l-.005 .149l.005 .15a2 2 0 1 0 1.995 -2.15z" />
    </svg>
  );
};

const BrandX = ({ size = "base", color = "current", className = "" }) => {
  const sizeValue = sizeMap[size] || sizeMap["base"];
  const colorClass = color === "current" ? "" : `text-${color}`;
  const combinedClassName =
    `${colorClass} icon icon-tabler icons-tabler-filled icon-tabler-brand-x ${className}`.trim();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      width={sizeValue}
      height={sizeValue}
      className={combinedClassName}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M8.267 3a1 1 0 0 1 .73 .317l.076 .092l4.274 5.828l5.946 -5.944a1 1 0 0 1 1.497 1.32l-.083 .094l-6.163 6.162l6.262 8.54a1 1 0 0 1 -.697 1.585l-.109 .006h-4.267a1 1 0 0 1 -.73 -.317l-.076 -.092l-4.276 -5.829l-5.944 5.945a1 1 0 0 1 -1.497 -1.32l.083 -.094l6.161 -6.163l-6.26 -8.539a1 1 0 0 1 .697 -1.585l.109 -.006h4.267z" />
    </svg>
  );
};

const BrandYoutube = ({ size = "base", color = "current", className = "" }) => {
  const sizeValue = sizeMap[size] || sizeMap["base"];
  const colorClass = color === "current" ? "" : `text-${color}`;
  const combinedClassName =
    `${colorClass} icon icon-tabler icons-tabler-filled ${className}`.trim();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      width={sizeValue}
      height={sizeValue}
      className={combinedClassName}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 3a5 5 0 0 1 5 5v8a5 5 0 0 1 -5 5h-12a5 5 0 0 1 -5 -5v-8a5 5 0 0 1 5 -5zm-9 6v6a1 1 0 0 0 1.514 .857l5 -3a1 1 0 0 0 0 -1.714l-5 -3a1 1 0 0 0 -1.514 .857z" />
    </svg>
  );
};

const ButtonClose = ({ size = "base", color = "current", className = "" }) => {
  const sizeValue = sizeMap[size] || sizeMap["base"];
  const colorClass = color === "current" ? "" : `text-${color}`;
  const combinedClassName =`${colorClass} icon icon-tabler icons-tabler-filled icon-tabler-square-rounded-x ${className}`.trim();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={sizeValue}
      height={sizeValue}
      viewBox="0 0 24 24"
      fill={color}
      className={combinedClassName}
    >
      <path d="M12 2l.324 .001l.318 .004l.616 .017l.299 .013l.579 .034l.553 .046c4.785 .464 6.732 2.411 7.196 7.196l.046 .553l.034 .579c.005 .098 .01 .198 .013 .299l.017 .616l.005 .642l-.005 .642l-.017 .616l-.013 .299l-.034 .579l-.046 .553c-.464 4.785 -2.411 6.732 -7.196 7.196l-.553 .046l-.579 .034c-.098 .005 -.198 .01 -.299 .013l-.616 .017l-.642 .005l-.642 -.005l-.616 -.017l-.299 -.013l-.579 -.034l-.553 -.046c-4.785 -.464 -6.732 -2.411 -7.196 -7.196l-.046 -.553l-.034 -.579a28.058 28.058 0 0 1 -.013 -.299l-.017 -.616c-.003 -.21 -.005 -.424 -.005 -.642l.001 -.324l.004 -.318l.017 -.616l.013 -.299l.034 -.579l.046 -.553c.464 -4.785 2.411 -6.732 7.196 -7.196l.553 -.046l.579 -.034c.098 -.005 .198 -.01 .299 -.013l.616 -.017c.21 -.003 .424 -.005 .642 -.005zm-1.489 7.14a1 1 0 0 0 -1.218 1.567l1.292 1.293l-1.292 1.293l-.083 .094a1 1 0 0 0 1.497 1.32l1.293 -1.292l1.293 1.292l.094 .083a1 1 0 0 0 1.32 -1.497l-1.292 -1.293l1.292 -1.293l.083 -.094a1 1 0 0 0 -1.497 -1.32l-1.293 1.292l-1.293 -1.292l-.094 -.083z" fill="currentColor" strokeWidth={0} />
    </svg>
  );
}

const Lock = ({ size = "base", color = "current", className = "" }) => {
  const sizeValue = sizeMap[size] || sizeMap["base"];
  const colorClass = color === "current" ? "" : `text-${color}`;
  const combinedClassName =
    `${colorClass} icon icon-tabler icons-tabler-filled ${className}`.trim();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      width={sizeValue}
      height={sizeValue}
      className={combinedClassName}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 2a5 5 0 0 1 5 5v3a3 3 0 0 1 3 3v6a3 3 0 0 1 -3 3h-10a3 3 0 0 1 -3 -3v-6a3 3 0 0 1 3 -3v-3a5 5 0 0 1 5 -5m0 12a2 2 0 0 0 -1.995 1.85l-.005 .15a2 2 0 1 0 2 -2m0 -10a3 3 0 0 0 -3 3v3h6v-3a3 3 0 0 0 -3 -3" />
    </svg>
  );
};

const User = ({ size = "base", color = "current", className = "" }) => {
  const sizeValue = sizeMap[size] || sizeMap["base"];
  const colorClass = color === "current" ? "" : `text-${color}`;
  const combinedClassName =
    `${colorClass} icon icon-tabler icons-tabler-filled icon-tabler-user ${className}`.trim();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      width={sizeValue}
      height={sizeValue}
      className={combinedClassName}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 2a5 5 0 1 1 -5 5l.005 -.217a5 5 0 0 1 4.995 -4.783z" />
      <path d="M14 14a5 5 0 0 1 5 5v1a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-1a5 5 0 0 1 5 -5h4z" />
    </svg>
  );
};

const ShieldCheck = ({ size = "base", color = "current", className = "" }) => {
  const sizeValue = sizeMap[size] || sizeMap["base"];
  const colorClass = color === "current" ? "" : `text-${color}`;
  const combinedClassName =
    `${colorClass} icon icon-tabler icons-tabler-filled icon-tabler-shield-check ${className}`.trim();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      width={sizeValue}
      height={sizeValue}
      className={combinedClassName}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M11.998 2l.118 .007l.059 .008l.061 .013l.111 .034a.993 .993 0 0 1 .217 .112l.104 .082l.255 .218a11 11 0 0 0 7.189 2.537l.342 -.01a1 1 0 0 1 1.005 .717a13 13 0 0 1 -9.208 16.25a1 1 0 0 1 -.502 0a13 13 0 0 1 -9.209 -16.25a1 1 0 0 1 1.005 -.717a11 11 0 0 0 7.531 -2.527l.263 -.225l.096 -.075a.993 .993 0 0 1 .217 -.112l.112 -.034a.97 .97 0 0 1 .119 -.021l.115 -.007zm3.71 7.293a1 1 0 0 0 -1.415 0l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.32 1.497l2 2l.094 .083a1 1 0 0 0 1.32 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z" />
    </svg>
  );
};

const Checked = ({ size = "base", color = "current", className = "" }) => {
  const sizeValue = sizeMap[size] || sizeMap["base"];
  const colorClass = color === "current" ? "" : `text-${color}`;
  const combinedClassName =
    `${colorClass} icon icon-tabler icons-tabler-outline icon-tabler-checkbox ${className}`.trim();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      width={sizeValue}
      height={sizeValue}
      className={combinedClassName}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 11l3 3l8 -8" /><path d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9" />
    </svg>
  );
};

const CaretUp = ({ size = "base", color = "current", className = "" }) => {
  const sizeValue = sizeMap[size] || sizeMap["base"];
  const colorClass = color === "current" ? "" : `text-${color}`;
  const combinedClassName =
    `${colorClass} icon icon-tabler icons-tabler-filled icon-tabler-caret-up ${className}`.trim();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={sizeValue}
      height={sizeValue}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={combinedClassName}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M11.293 7.293a1 1 0 0 1 1.32 -.083l.094 .083l6 6l.083 .094l.054 .077l.054 .096l.017 .036l.027 .067l.032 .108l.01 .053l.01 .06l.004 .057l.002 .059l-.002 .059l-.005 .058l-.009 .06l-.01 .052l-.032 .108l-.027 .067l-.07 .132l-.065 .09l-.073 .081l-.094 .083l-.077 .054l-.096 .054l-.036 .017l-.067 .027l-.108 .032l-.053 .01l-.06 .01l-.057 .004l-.059 .002h-12c-.852 0 -1.297 -.986 -.783 -1.623l.076 -.084l6 -6z" />
    </svg>
  );
};

const Send = ({ size = "base", color = "current", className = "" }) => {
  const sizeValue = sizeMap[size] || sizeMap["base"];
  const colorClass = color === "current" ? "" : `text-${color}`;
  const combinedClassName =
    `${colorClass} icon icon-tabler icons-tabler-outline icon-tabler-send ${className}`.trim();

  return (
    <svg
      width={sizeValue}
      height={sizeValue}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={combinedClassName}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M10 14l11 -11" />
      <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" />
    </svg>
  );
};

const Ape = ({ size = "base", color = "current", className = "" }) => {
  const sizeValue = sizeMap[size] || sizeMap["base"];
  const colorClass = color === "current" ? "" : `text-${color}`;
  const combinedClassName =
    `${colorClass} ${className}`.trim();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      viewBox="0 0 800 800"
      fill="currentColor"
      width={sizeValue}
      height={sizeValue}
      className={combinedClassName}
    >
      <path d="M503 339c-28.65-20.2-17.61-52.05-52-83-17.82-16.04-37.82-22.81-51-26-5.51-28.58-11.01-57.17-16.52-85.75-4.54-23.58-20.78-27.3-27.26-29.7-8.79-3.25-17.06-2.52-22.22-1.55-44.35 4.29-58.15 15.71-62 26-2.09 5.59-1.11 10.5-6 18-7.88 12.09-19.28 12.94-22 23-.97 3.6-.78 8.18 2 14-13.75-3.67-26.17 2.84-29 12-2.48 8.04 3.14 15.84 4 17-6.67.33-13.33.67-20 1-1.33 2.67-8.91 18.61-2 37 7.81 20.79 27.61 27.26 30 28l6 62c-7.24 9.23-19.65 27.59-25 54-4.42 21.82-2.2 40.1 0 51-16.42 20.4-38.49 52.77-54 97a326.937 326.937 0 0 0-14.48 57.66c-2.83 18.12 11.15 34.51 29.49 34.72 17.99.21 35.99.41 53.98.62 2.28-3.44 9.94-15.96 8-33-1.62-14.24-9.04-23.61-12-27 12.96-9.74 34.46-28.77 49.39-59.7 8.01-16.6 11.91-32 13.88-43.96l11.34-11.97c-3.54 27.3-5.53 49.35-6.71 65.18-2.33 31.23-1.42 36.73-5.9 50.45-5.55 16.98-12.21 24.92-9.21 37.05 3.46 13.98 16.68 23.7 21.28 23.64l53.92-.69c1.22-.61 16.15-8.36 18-24 1.7-14.43-8.45-29.43-24.89-34.39 14.61-22.01 29.27-43.99 43.96-65.93 7.96-11.9 15.94-23.79 23.93-35.67a88.233 88.233 0 0 0 28 22 88.05 88.05 0 0 0 33 9 376.01 376.01 0 0 1 12 44c2.91 13.99 4.8 27.07 6 39l-17.01 9.45a21.533 21.533 0 0 0-11 16.93l-.44 4.93c-.75 8.4 5.99 15.57 14.42 15.35 21.68-.56 43.35-1.11 65.03-1.67l18-65c10.33 11 20.67 22 31 33-.6.31-9.46 5.14-10.32 15.25-.63 7.38 3.28 14.57 9.95 18.3 20.79-.18 41.58-.37 62.37-.55l22-34c-6.33-21-12.67-42-19-63-1.45-.01-21.7-.45-33-18-11.88-18.45-2.46-38.08-2-39 4.65-4.04 16.3-15.27 21-34 3.54-14.13 1.49-25.98 0-32-4.58-24.46-14.76-54.6-40-70-34.66-21.15-65.42 5.24-96.98-17z" />
    </svg>
  );
};

const ProgressHelp = ({ size = "base", color = "current", className = "" }) => {

  const sizeValue = sizeMap[size] || sizeMap["base"];
  const colorClass = color === "current" ? "" : `text-${color}`;
  const combinedClassName = `${colorClass} ${className}`.trim();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={sizeValue}
      height={sizeValue}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${combinedClassName} icon icon-tabler icons-tabler-outline icon-tabler-progress-help`}
      style={{ width: sizeValue, height: sizeValue }}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 16v.01" />
      <path d="M12 13a2 2 0 0 0 .914 -3.782a1.98 1.98 0 0 0 -2.414 .483" />
      <path d="M10 20.777a8.942 8.942 0 0 1 -2.48 -.969" />
      <path d="M14 3.223a9.003 9.003 0 0 1 0 17.554" />
      <path d="M4.579 17.093a8.961 8.961 0 0 1 -1.227 -2.592" />
      <path d="M3.124 10.5c.16 -.95 .468 -1.85 .9 -2.675l.169 -.305" />
      <path d="M6.907 4.579a8.954 8.954 0 0 1 3.093 -1.356" />
    </svg>
  );
};

const DeviceGamepad3 = ({ size = "base", color = "current", className = "" }) => {

  const sizeValue = sizeMap[size] || sizeMap["base"];
  const colorClass = color === "current" ? "" : `text-${color}`;
  const combinedClassName = `${colorClass} ${className}`.trim();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={sizeValue}
      height={sizeValue}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`${combinedClassName} icon icon-tabler icons-tabler-filled icon-tabler-device-gamepad-3`}
      style={{ width: sizeValue, height: sizeValue }}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12.707 14.293l3 3a1 1 0 0 1 .293 .707v2a2 2 0 0 1 -2 2h-4a2 2 0 0 1 -2 -2v-2a1 1 0 0 1 .293 -.707l3 -3a1 1 0 0 1 1.414 0m-6.707 -6.293a1 1 0 0 1 .707 .293l3 3a1 1 0 0 1 0 1.414l-3 3a1 1 0 0 1 -.707 .293h-2a2 2 0 0 1 -2 -2v-4a2 2 0 0 1 2 -2zm14 0a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-2a1 1 0 0 1 -.707 -.293l-3 -3a1 1 0 0 1 0 -1.414l3 -3a1 1 0 0 1 .707 -.293zm-6 -6a2 2 0 0 1 2 2v2a1 1 0 0 1 -.293 .707l-3 3a1 1 0 0 1 -1.414 0l-3 -3a1 1 0 0 1 -.293 -.707v-2a2 2 0 0 1 2 -2z" />
    </svg>
  );
};

const Trophy = ({ size = "base", color = "current", className = "" }) => {

  const sizeValue = sizeMap[size] || sizeMap["base"];
  const colorClass = color === "current" ? "" : `text-${color}`;
  const combinedClassName = `${colorClass} ${className}`.trim();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={sizeValue}
      height={sizeValue}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`${combinedClassName} icon icon-tabler icons-tabler-filled icon-tabler-trophy`}
      style={{ width: sizeValue, height: sizeValue }}
    >
    <path d="M17 3a1 1 0 0 1 .993 .883l.007 .117v2.17a3 3 0 1 1 0 5.659v.171a6.002 6.002 0 0 1 -5 5.917v2.083h3a1 1 0 0 1 .117 1.993l-.117 .007h-8a1 1 0 0 1 -.117 -1.993l.117 -.007h3v-2.083a6.002 6.002 0 0 1 -4.996 -5.692l-.004 -.225v-.171a3 3 0 0 1 -3.996 -2.653l-.003 -.176l.005 -.176a3 3 0 0 1 3.995 -2.654l-.001 -2.17a1 1 0 0 1 1 -1h10zm-12 5a1 1 0 1 0 0 2a1 1 0 0 0 0 -2zm14 0a1 1 0 1 0 0 2a1 1 0 0 0 0 -2z" /> 
    </svg>
  );
};

const Photo = ({ size = "base", color = "current", className = "" }) => {

  const sizeValue = sizeMap[size] || sizeMap["base"];
  const colorClass = color === "current" ? "" : `text-${color}`;
  const combinedClassName = `${colorClass} ${className}`.trim();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={sizeValue}
      height={sizeValue}
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="none"
      className={`${combinedClassName} icon icon-tabler icons-tabler-filled icon-tabler-photo`}
      style={{ width: sizeValue, height: sizeValue }}
    >
    <path d="M8.813 11.612c.457 -.38 .918 -.38 1.386 .011l.108 .098l4.986 4.986l.094 .083a1 1 0 0 0 1.403 -1.403l-.083 -.094l-1.292 -1.293l.292 -.293l.106 -.095c.457 -.38 .918 -.38 1.386 .011l.108 .098l4.674 4.675a4 4 0 0 1 -3.775 3.599l-.206 .005h-12a4 4 0 0 1 -3.98 -3.603l6.687 -6.69l.106 -.095zm9.187 -9.612a4 4 0 0 1 3.995 3.8l.005 .2v9.585l-3.293 -3.292l-.15 -.137c-1.256 -1.095 -2.85 -1.097 -4.096 -.017l-.154 .14l-.307 .306l-2.293 -2.292l-.15 -.137c-1.256 -1.095 -2.85 -1.097 -4.096 -.017l-.154 .14l-5.307 5.306v-9.585a4 4 0 0 1 3.8 -3.995l.2 -.005h12zm-2.99 5l-.127 .007a1 1 0 0 0 0 1.986l.117 .007l.127 -.007a1 1 0 0 0 0 -1.986l-.117 -.007z" />
    </svg>
  );
};

// Bundle all icons into a single object
const Icons = {
  BrandKick,
  BrandTwitch,
  BrandDiscord,
  BrandX,
  BrandYoutube,
  ButtonClose,
  Lock,
  User,
  ShieldCheck,
  Checked,
  CaretUp,
  Send,
  Ape,
  ProgressHelp,
  DeviceGamepad3,
  Trophy,
  Photo
};

export default Icons;
