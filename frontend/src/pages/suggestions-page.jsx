import { useEffect, useState } from "react";
import Modal from "../components/common/modal";
import ColorBox from "../components/suggestions/color-box";
import EmptySuggestionBox from "../components/suggestions/empty-suggestion-box";
import MobileNavbar from "../components/suggestions/mobile-navbar";
import RoadMapBox from "../components/suggestions/roadmap-box";
import SuggestionCard from "../components/suggestions/suggestion-card";
import SuggestionsHeader from "../components/suggestions/suggestions-header";
import TagsBox from "../components/suggestions/tags-box";
import { useDispatch, useSelector } from "react-redux";
import axios from "../utils/axios-instance";
import { loadFeedbacks, loadRoadmapBoxData } from "../redux/reducers/feedback-slice";


const SuggestionsPage = () => {
  const { feedbacks, filters } = useSelector((state) => state.feedback);
  const dispatch = useDispatch();

  const [signInModalOpen, setSignInModalOpen] = useState(false);

  const fetchFeedbacks = async() => {
    let url = "/feedbacks/";
    const urlParams = new URLSearchParams();
    urlParams.append("sortBy", filters.sortBy);
    urlParams.append("category", filters.category);

    url += `?${urlParams.toString()}`

    const data = (await axios.get(url)).data;
    dispatch(loadFeedbacks(data));
  }

  const categoryValueToName = {
    1: 'Feature',
    2: 'UI',
    3: 'UX',
    4: 'Enhancement',
    5: 'Bug'
  };

  const statusNameToValue = {
    'Suggestion': 1,
    'Planned': 2,
    'In-Progress': 3,
    'Live': 4
  }

  const getCategoryName = (categoryValue) => {
    return categoryValueToName[categoryValue];
  }


  const fetchRoadmapCounts = async () => {
    const data = (await axios.get("/feedbacks/roadmap-count/")).data;

    const getCountFromData = (data, statusName) => {
      const statusValue = statusNameToValue[statusName];
      const count = data.find(item => item.status === statusValue).count;
      return count;
    }

    const roadmapData = {
      isLoading: false,
      data: {
        Planned: getCountFromData(data, 'Planned'),
        'In-Progress': getCountFromData(data, 'In-Progress'),
        Live: getCountFromData(data, 'Live')
      }
    }

    dispatch(loadRoadmapBoxData(roadmapData));
  }

  useEffect(() => {
    fetchFeedbacks();
  }, [filters])

  useEffect(() => {
    fetchRoadmapCounts();
  }, [])

  return (
    <div className="bg-light-blue min-h-screen">
      <div className="container max-w-6xl mx-auto md:px-10">
        <div className="flex flex-col items-start md:gap-y-10 md:py-14 lg:gap-x-[30px] lg:flex-row lg:py-24">

          {/* Mobile Navbar */}
          <MobileNavbar />

          {/* Sidebar for Tablet and above */}
          <aside className="hidden flex-row min-w-full gap-x-2.5 md:flex lg:gap-y-6 lg:flex-col lg:min-w-[255px]">
            <ColorBox />
            <TagsBox />
            <RoadMapBox />
          </aside>

          {/* Main content */}
          <main className="w-full flex flex-col gap-y-8 md:gap-y-6 pb-10">
            <SuggestionsHeader />

            {/* Suggestions */}
            <div className="flex flex-col gap-y-5 px-6 md:px-0">
              {feedbacks.length > 0 ? (
                feedbacks.map(product => (
                  <SuggestionCard
                    key={product.id}
                    id={product.id}
                    upvotesCount={product.upvote_count}
                    isUpvotedByCurrentUser={product.upvoted_by_current_user}
                    title={product.title}
                    description={product.description}
                    category={getCategoryName(product.category)}
                    commentsCount={product.comment_count}
                  />
                ))
              ) : (
                <EmptySuggestionBox />
              )}
            </div>
          </main>
        </div>
      </div>

      <Modal isOpen={signInModalOpen} onClose={() => setSignInModalOpen(false)} />
    </div>
  );
};

export default SuggestionsPage;
