import classNames from 'classnames';
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
      <label
        className={twMerge(
          classNames('relative flex flex-col'),
          wrapperClassName,
        )}
      >
        {!!label && (
          <span
            className={classNames('mb-2 text-base', {
              'hidden lg:block': hideLabelOnMobile,
            })}
          >
            {label}
          </span>
        )}
        <div className="relative w-full">
          <input
            {...rest}
            className={classNames(
              'auto-complete-input peer w-full rounded-sm border border-grey-dark bg-transparent p-4 text-base transition duration-fast placeholder:font-normal placeholder:text-grey-main hover:bg-base-lighter hover:bg-opacity-10 focus:border-brand-main focus:bg-base-lighter focus:bg-opacity-10 focus:outline-none focus:ring-1 focus:ring-brand-main',
              {
                'pr-14': isPasswordType,
              },
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
