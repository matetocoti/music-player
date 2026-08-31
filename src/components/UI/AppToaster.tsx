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
          background: '#111827',
          border: '1px solid rgba(16, 185, 129, 0.35)',
          color: '#f4f4f5',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.35)',
        },
      }}
    />
  )
}

export default AppToaster
