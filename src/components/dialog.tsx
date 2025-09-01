import * as DialogRadix from "@radix-ui/react-dialog";
import cn from "classnames";
import Card from "./card";
import Text from "./text";
import ButtonIcon from "./button-icon";
import Divider from "./divider";
import XIcon from "../assets/icons/x.svg?react";

export const Dialog = DialogRadix.Root;

export const DialogTrigger = DialogRadix.Trigger;

export const DialogClose = DialogRadix.Close;

export function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogRadix.Overlay>) {
  return (
    <DialogRadix.Overlay
      className={cn(
        `
          fixed inset-0 z-50 bg-background-secondary/60
          backdrop-blur-sm
          data-[state=open]:animate-in
          data-[state=open]:fade-in-0 
          data-[state=closed]:animate-out
          data-[state=closed]:fade-out-0
        `,
        className
      )}
      {...props}
    />
  );
}

export function DialogContent({
  className,
  ref,
  children,
  ...props
}: React.ComponentProps<typeof DialogRadix.Content>) {
  return (
    <DialogRadix.Portal>
      <DialogOverlay />
      <DialogRadix.Content
        ref={ref}
        aria-describedby={undefined}
        className={cn(
          `
            fixed left-[50%] top-[50%] w-full max-w-[32rem] 
            z-[60] translate-x-[-50%] translate-y-[-50%]
            data-[state=open]:animate-in
            data-[state=open]:fade-in-0 
            data-[state=open]:slide-in-from-bottom-[48%]
            data-[state=closed]:animate-out
            data-[state=closed]:fade-out-0
            data-[state=closed]:slide-out-to-bottom-[48%]
          `,
          className
        )}
        {...props}
      >
        <Card size="lg" variant="primary">
          {children}
        </Card>
      </DialogRadix.Content>
    </DialogRadix.Portal>
  );
}

export function DialogHeader({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <>
      <header
        className={cn(
          `
          flex items-center justify-between
        `,
          className
        )}
        {...props}
      >
        <DialogRadix.Title>
          <Text variant="heading-medium" className="flex-1">
            {children}
          </Text>
        </DialogRadix.Title>
        <DialogClose asChild>
          <ButtonIcon icon={XIcon} variant="ghost" />
        </DialogClose>
      </header>
      <Divider className="mt-1.5 mb-5" />
    </>
  );
}

export function DialogBody({
  children,
  ...props
}: React.ComponentProps<"div">) {
  return <div {...props}>{children}</div>;
}

export function DialogFooter({
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div {...props}>
      <Divider className="mt-5 mb-1.5" />
      <footer className="flex items-center justify-end gap-3">
        {children}
      </footer>
    </div>
  );
}