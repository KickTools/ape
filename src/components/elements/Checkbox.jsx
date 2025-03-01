// src/components/elements/Checkbox.jsx
import { useState, useEffect } from 'react';

const colorMap = {
  apeRed: 'text-apeRed focus:ring-apeRed hover:bg-apeRed/10',
  apeBlue: 'text-apeBlue focus:ring-apeBlue hover:bg-apeBlue/10',
  apeGreen: 'text-apeGreen focus:ring-apeGreen hover:bg-apeGreen/10',
  kick: 'text-kick focus:ring-kick hover:bg-kick/10',
  twitch: 'text-twitch focus:ring-twitch hover:bg-twitch/10',
  discord: 'text-discord focus:ring-discord hover:bg-discord/10',
  foreground: 'text-foreground-700 focus:ring-foreground-700 hover:bg-foreground-700/10',
  background: 'text-background-300 focus:ring-background-300 hover:bg-background-300/10',
};

export default function Checkbox({
  color,
  checked = false,
  onChange,
  children,
}) {
  const [isChecked, setIsChecked] = useState(checked);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const handleChange = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    if (onChange) {
      onChange(newChecked);
    }
  };

  const baseClass =
    'w-6 h-6 bg-background-300/5 border-foreground-700/70 rounded-xl focus:ring-2 transition duration-150 ease-in-out';

  return (
    <div className="flex items-center me-2">
      <input
        type="checkbox"
        id={`checkbox-${children}`}
        checked={isChecked}
        onChange={handleChange}
        className={`${baseClass} ${colorMap[color] || ''}`}
      />
      <label className="text-sm ms-2" htmlFor={`checkbox-${children}`}>
        {children}
      </label>
    </div>
  );
}