import { Toaster } from 'sonner'

const AppToaster = () => {
  return (
    <Toaster
      position="top-right"
      richColors
      closeButton
      expand
      toastOptions={{
        style: {
          background: 'var(--toast-background)',
          border: '1px solid rgba(var(--brand-rgb), 0.35)',
          color: 'var(--toast-text)',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.35)',
        },
      }}
    />
  )
}

export default AppToaster
