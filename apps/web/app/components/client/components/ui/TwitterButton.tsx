import { Button, ButtonProps,TbBrandTwitterFilled } from '@repo/ui';

export function TwitterButton(props: ButtonProps & React.ComponentPropsWithoutRef<'button'>) {
  return (
    <Button
      leftSection={<TbBrandTwitterFilled style={{ width: '1rem', height: '1rem' }} color="#00ACEE" />}
      variant="default"
      {...props}
    />
  );
}