import ColorBox from "../components/suggestions/color-box"
import RoadMapBox from "../components/suggestions/roadmap-box"
import SuggestionsHeader from "../components/suggestions/suggestions-header"
import TagsBox from "../components/suggestions/tags-box"

const SuggestionsPage = () => {
  return (
    <div className="bg-light-blue min-h-screen">
      <div className="container max-w-6xl mx-auto px-3">
        <div className="flex flex-col py-24 items-start md:gap-x-[30px] md:flex-row">
          <aside className="min-w-[255px] flex flex-col space-y-6">
            <ColorBox />
            <TagsBox />
            <RoadMapBox />
          </aside>

          <main className="w-full flex flex-col gap-y-6">
            <SuggestionsHeader />
          </main>
        </div>
      </div>
    </div>
  )
}

export default SuggestionsPage