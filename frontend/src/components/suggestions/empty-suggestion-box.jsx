import Button from "../common/button"
import emptyIllustrationImg from '../../assets/suggestions/illustration-empty.svg';
import plusIconImg from '../../assets/shared/icon-plus.svg'
import { Link } from "react-router-dom";

const EmptySuggestionBox = () => {
  return (
    <div className="flex flex-col items-center gap-y-12 justify-center bg-white h-[600px] rounded-lg">
      <img src={emptyIllustrationImg} alt="Empty suggestion" />

      <div className="flex flex-col gap-y-4 items-center px-6 md:px-0 md:max-w-[410px] text-center">
        <h1>There is no feedback yet.</h1>
        <p className="text-[16px] text-secondary-blue-dim">
          Got a suggestion? Found a bug that needs to be squashed? We love hearing about new ideas to improve our app.
        </p>
      </div>

      <Link to="/feedback/add">
        <Button>
          <img src={plusIconImg} alt="Plus icon" width={12} />
          Add Feedback
        </Button>
      </Link>
    </div>
  )
}

export default EmptySuggestionBox