import Button from "../common/button"

const EmptySuggestionBox = () => {
  return (
    <div className="flex flex-col items-center gap-y-12 justify-center bg-white h-[600px] rounded-lg">
      <img src="/public/assets/suggestions/illustration-empty.svg" alt="Empty suggestion" />

      <div className="flex flex-col gap-y-4 items-center max-w-[410px] text-center">
        <h1>There is no feedback yet.</h1>
        <p className="text-[16px] text-secondary-blue-dim">
          Got a suggestion? Found a bug that needs to be squashed? We love hearing about new ideas to improve our app.
        </p>
      </div>

      <Button>
        <img src="/public/assets/shared/icon-plus.svg" alt="Plus icon" width={12} />
        Add Feedback
      </Button>
    </div>
  )
}

export default EmptySuggestionBox