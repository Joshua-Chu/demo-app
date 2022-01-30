type ContainerProps = {
  children: React.ReactNode
}

export const Container = ({ children }: ContainerProps) => {
  return <main className="pt-[88px]">{children}</main>
}
