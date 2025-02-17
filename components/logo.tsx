interface TrainwrecksTVLogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export function TrainwrecksTVLogo({ className, width = 4, height = 4 }: TrainwrecksTVLogoProps) {
  return (
    <div className={className}>
      <img src="/assets/images/train_logo_light.png" alt="TrainwrecksTV Logo" style={{ width: `${width}em`, height: `${height}em` }} />
    </div>
  );
}
