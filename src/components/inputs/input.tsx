import React, { DetailedHTMLProps, InputHTMLAttributes, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import IconButton from '../buttons/icon-button';
import Icon from '../icons/icon';

type Props = {
  label?: string;
  hideLabelOnMobile?: boolean;
  wrapperClassName?: string;
  supportText?: string;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement | null, Props>(
  (
    {
      label,
      hideLabelOnMobile,
      type: typeProp,
      className,
      disabled,
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
              'mb-1',
              hideLabelOnMobile && 'hidden lg:block',
              disabled && 'text-disabled-normal',
            )}
          >
            {label}
          </span>
        )}
        <div className="relative w-full">
          <input
            {...rest}
            className={twMerge(
              'auto-complete-input peer w-full rounded-sm border border-normal bg-transparent px-4 py-3 text-base transition duration-normal placeholder:font-normal placeholder:text-secondary-normal md:py-4',
              isPasswordType && 'pr-14',
              disabled &&
                'border-disabled-normal bg-disabled-normal text-white',
              className,
            )}
            type={type}
            ref={ref}
            disabled={disabled}
          />
          {isPasswordType && (
            <div className="absolute right-2 top-1/2 z-10 -translate-y-1/2">
              <IconButton type="button" onClick={handleToggleShowPassword}>
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
