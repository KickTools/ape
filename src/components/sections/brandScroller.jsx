"use client";

import brandLogos from "@/assets/logos";

const LogoScroller = () => {
  const logos = Object.values(brandLogos);
  const logoList = [...logos, ...logos];

  return (
    <div className="relative">
      <div className="w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
        <ul className="flex items-center gap-32 animate-[var(--animate-scroll)] list-none">
          {logoList.map((Logo, index) => (
            <li key={index} className="h-20 flex-shrink-0">
              <Logo className="h-full w-auto" color="currentColor" />
            </li>
          ))}
        </ul>
      </div>
      <div className="absolute left-0 right-0 -top-16 h-[2px] bg-gradient-to-r from-transparent via-transparent to-transparent"></div> {/* Top fading line */}
      <div className="absolute left-0 right-0 -bottom-16 h-[2px] bg-gradient-to-r from-transparent via-transparent to-transparent"></div> {/* Bottom fading line */}
    </div>
  );
};

export default LogoScroller;