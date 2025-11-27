import * as React from 'react'
import { cn } from '@/lib/utils'

export interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <label className="flex items-center cursor-pointer">
        <div className="relative">
          <input type="checkbox" className="sr-only" ref={ref} {...props} />
          <div
            className={cn(
              'block w-14 h-8 rounded-full transition',
              props.checked ? 'bg-primary' : 'bg-gray-300',
              className
            )}
          />
          <div
            className={cn(
              'absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition',
              props.checked ? 'transform translate-x-6' : ''
            )}
          />
        </div>
        {label && <span className="ml-3 text-sm font-medium">{label}</span>}
      </label>
    )
  }
)
Switch.displayName = 'Switch'

export { Switch }
