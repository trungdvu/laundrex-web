import React, { DetailedHTMLProps, InputHTMLAttributes, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import IconButton from '../buttons/icon-button';
import Icon from '../icons/icon';

type Props = {
  label?: string;
  hideLabelOnMobile?: boolean;
  wrapperClassName?: string;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement | null, Props>(
  (
    {
      label,
      hideLabelOnMobile,
      type: typeProp,
      className,
      wrapperClassName,
      ...rest
    },
    ref,
  ) => {
    const isPasswordType = typeProp === 'password';
    const [showPassword, setShowPassword] = useState(false);
    const type = isPasswordType
      ? showPassword
        ? 'text'
        : 'password'
      : typeProp;

    const handleToggleShowPassword = () => {
      setShowPassword((pre) => !pre);
    };

    return (
      <label className={twMerge('relative flex flex-col', wrapperClassName)}>
        {!!label && (
          <span
            className={twMerge(
              'mb-2 text-base',
              hideLabelOnMobile && 'hidden lg:block',
            )}
          >
            {label}
          </span>
        )}
        <div className="relative w-full">
          <input
            {...rest}
            className={twMerge(
              'auto-complete-input peer w-full rounded-sm border border-normal bg-transparent p-4 text-base transition duration-normal placeholder:font-normal placeholder:text-secondary-normal hover:bg-hover-normal focus:border-brand-normal focus:bg-hover-normal focus:outline-none focus:ring-1 focus:ring-brand-normal',
              isPasswordType && 'pr-14',
              className,
            )}
            type={type}
            ref={ref}
          />
          {isPasswordType && (
            <div className="absolute right-2 top-1/2 z-10 -translate-y-1/2">
              <IconButton
                className="p-2"
                type="button"
                onClick={handleToggleShowPassword}
              >
                <Icon name={showPassword ? 'eye' : 'eye-close'} />
              </IconButton>
            </div>
          )}
        </div>
      </label>
    );
  },
);

Input.displayName = 'Input';

export default Input;
