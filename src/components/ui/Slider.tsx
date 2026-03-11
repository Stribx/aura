import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn } from '@/utils/cn';

interface SliderProps extends Omit<React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>, 'value' | 'defaultValue' | 'onValueChange' | 'onChange'> {
  variant?: 'purple' | 'white';
  label?: string;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
}

export function Slider({
  className,
  variant = 'purple',
  label,
  onChange,
  value,
  defaultValue,
  max = 100,
  min = 0,
  step = 1,
  ...props
}: SliderProps) {
  const handleValueChange = (values: number[]) => {
    onChange?.(values[0]);
  };

  const trackColor = variant === 'purple' 
    ? 'bg-gradient-to-r from-purple-500 to-cyan-400' 
    : 'bg-white';

  const sliderValue = value !== undefined ? [value] : undefined;
  const sliderDefaultValue = defaultValue !== undefined ? [defaultValue] : undefined;

  return (
    <SliderPrimitive.Root
      className={cn(
        'relative flex w-full touch-none select-none items-center h-5 group cursor-pointer',
        className
      )}
      value={sliderValue}
      defaultValue={sliderDefaultValue}
      max={max}
      min={min}
      step={step}
      onValueChange={handleValueChange}
      aria-label={label}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-white/10">
        <SliderPrimitive.Range className={cn('absolute h-full', trackColor)} />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb 
        className={cn(
          "block h-3 w-3 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-all",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500",
          "disabled:pointer-events-none disabled:opacity-50",
          "opacity-0 group-hover:opacity-100 transition-opacity"
        )} 
      />
    </SliderPrimitive.Root>
  );
}
