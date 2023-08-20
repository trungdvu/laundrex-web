import {
  Popover as HUIPopover,
  PopoverButtonProps,
  PopoverPanelProps,
  Transition,
} from '@headlessui/react';
import { useState } from 'react';
import { PopperProps, usePopper } from 'react-popper';
import { twMerge } from 'tailwind-merge';

type Props = {
  placement?: PopperProps<any>['placement'];
  buttonProps?: PopoverButtonProps<'button'> & { className?: string };
  panelProps?: PopoverPanelProps<'div'> & { className?: string };
  buttonChild?: React.ReactNode;
  panelChild?: React.ReactNode;
};

export default function Popover({
  placement = 'top',
  buttonProps = {},
  panelProps = {},
  buttonChild,
  panelChild,
}: Props) {
  const { className: buttonClassName, ...restButtonProps } = buttonProps;
  const {
    className: panelClassName,
    style: panelStyle,
    ...restPanelProps
  } = panelProps;
  const [referenceElement, setReferenceElement] =
    useState<HTMLButtonElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null,
  );
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement,
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 16],
        },
      },
    ],
  });

  return (
    <HUIPopover>
      {({ open }) => (
        <>
          <HUIPopover.Button
            className={twMerge(open && 'focus:outline-none', buttonClassName)}
            ref={setReferenceElement}
            {...restButtonProps}
          >
            {buttonChild}
          </HUIPopover.Button>
          <Transition
            enter="transition ease-out duration-normal"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition ease-in duration-fast"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <HUIPopover.Panel
              className={twMerge(
                'bg-base rounded-lg shadow-normal',
                panelClassName,
              )}
              ref={setPopperElement}
              style={Object.assign(panelStyle || {}, styles.popper)}
              {...restPanelProps}
              {...attributes.popper}
            >
              {panelChild}
            </HUIPopover.Panel>
          </Transition>
        </>
      )}
    </HUIPopover>
  );
}
