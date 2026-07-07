interface Props {
  message: string
  onRetry: () => void
}

export default function ApiErrorState({ message, onRetry }: Props) {
  return (
    <div className="panel p-6 text-center">
      <p className="font-mono text-red-400 text-sm mb-4">[ FAIL ] {message}</p>
      <button onClick={onRetry} className="btn-secondary">
        [ ./retry.sh ]
      </button>
    </div>
  )
}
