import React, { useEffect, useState } from 'react'
import cn from 'classnames';
import GoBackButton from '../components/common/go-back-button'
import { Link } from 'react-router-dom'
import Button from '../components/common/button'
import plusIconImg from '../assets/shared/icon-plus.svg'
import RoadmapCard from '../components/roadmap/roadmap-card';
import axios from '../utils/axios-instance';
import { useDispatch, useSelector } from 'react-redux';
import { openSignInModal } from '../redux/reducers/modal-slice';

const RoadmapPage = () => {
  const [mobileSelectedColumnId, setMobileSelectedColumnId] = useState(3);
  const [columnsData, setColumnData] = useState([
    {
      id: 2,
      label: "Planned",
      value: "planned",
      description: "Ideas prioritized for research",
      feedbacks: [],
    },
    {
      id: 3,
      label: "In-Progress",
      value: 'in-progress',
      description: "Features currently being developed",
      feedbacks: [],
    },
    {
      id: 4,
      label: "Live",
      value: 'live',
      description: "Released features",
      feedbacks: [],
    },
  ]);

  const mobileSelectedColumn = columnsData.find(column => column.id == mobileSelectedColumnId);

  const statusBorderClassMap = {
    planned: 'border-light-orange',
    'in-progress': 'border-purple',
    live: 'border-sky-blue'
  };

  const fetchFeedbacks = async() => {
    const data = (await axios.get("/feedbacks/roadmap-feedbacks/")).data;

    let newColumnsData = [...columnsData];
    newColumnsData = newColumnsData.map(column => {
      let newColumn = {...column};
      newColumn.feedbacks = data.filter(item => item.status === column.id);
      return newColumn;
    })

    setColumnData(newColumnsData);
  }

  useEffect(() => {
    fetchFeedbacks()
  }, [])

  const {isAuthenticated} = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const isAuthCheck = (fn) => {
    return function(...args) {
      if (isAuthenticated) {
        fn(...args);
      } else {
        dispatch(openSignInModal())
      }
    }
  }

  const onUpvoteClick = isAuthCheck(async(productId) => {
    // Api call
    const data = (await axios.post(`/feedbacks/${productId}/toggle-upvote/`)).data;

    let newColumnsData = [...columnsData];

    newColumnsData = newColumnsData.map(column => {
      let newColumn = {...column};
      newColumn.feedbacks = newColumn.feedbacks.map(feedback => {
        if (feedback.id === productId) {
          let newProduct = {...feedback};
          newProduct.upvote_count = data.upvote_count;
          newProduct.upvoted_by_current_user = data.upvoted_by_current_user;
          return newProduct;
        }

        return feedback;
      })

      return newColumn;
    })

    setColumnData(newColumnsData);
  });

  const categoryValueToName = {
    1: 'Feature',
    2: 'UI',
    3: 'UX',
    4: 'Enhancement',
    5: 'Bug'
  };

  return (
    <div className="bg-lightest-blue min-h-screen">
      <div className='max-w-6xl mx-auto md:px-10 md:py-14'>
        {/* Header */}
        <div className="flex items-center justify-between bg-darkest-blue px-6 py-[26px] md:rounded-lg">
          <div className="flex flex-col gap-y-[3px]">
            <GoBackButton className="text-white" />
            <h3 className="text-white md:text-2xl">Roadmap</h3>
          </div>

          <Link to="/feedback/add">
            <Button>
              <img src={plusIconImg} alt="Plus icon" width={12} />
              Add Feedback
            </Button>
          </Link>
        </div>

        {/* Mobile Column Nav */}
        <div className="flex justify-between font-bold text-[13px] text-secondary-blue text-center border-b md:hidden">
          {
            columnsData.map(column => (
              <div
                key={column.id}
                onClick={() => setMobileSelectedColumnId(column.id)}
                className={
                  cn(`flex-1 py-5 cursor-pointer ${statusBorderClassMap[mobileSelectedColumn.value]}`,
                    {"opacity-40": mobileSelectedColumnId !== column.id,
                    'border-b-[4.5px]': mobileSelectedColumnId === column.id})}
              >
                <h5>{column.label} ({column.feedbacks.length})</h5>
              </div>
            ))
          }
        </div>

        {/* Mobile Column */}
        <div className="flex flex-col gap-y-6 p-6 md:hidden">
          <div className="flex flex-col gap-y-2">
            <h3>{mobileSelectedColumn.label} ({mobileSelectedColumn.feedbacks.length})</h3>
            <p className='text-sm text-secondary-blue-dim'>
              {mobileSelectedColumn.description}
            </p>
          </div>

          <div className="flex flex-col gap-y-6">
            {
              mobileSelectedColumn.feedbacks.map(feedback => (
                <RoadmapCard
                  key={feedback.id}
                  id={feedback.id}
                  statusValue={mobileSelectedColumn.value}
                  statusLabel={mobileSelectedColumn.label}
                  title={feedback.title}
                  description={feedback.description}
                  upvoteCount={feedback.upvote_count}
                  isUpvotedByCurrentUser={feedback.upvoted_by_current_user}
                  category={categoryValueToName[feedback.category]}
                  commentCount={feedback.comment_count}
                  onUpvoteClick={() => onUpvoteClick(feedback.id)}
                />
              ))
            }
          </div>
        </div>

        {/* Tablet & Above Columns */}
        <div className="hidden py-8 gap-x-2.5 md:flex lg:gap-x-8">
          {
            columnsData.map(column => (
              <div className="flex flex-1 flex-col gap-y-6" key={column.id}>
                <div className="flex flex-col gap-y-2">
                  <h3>{column.label} ({column.feedbacks.length})</h3>
                  <p className='text-sm text-secondary-blue-dim'>
                    {column.description}
                  </p>
                </div>

                <div className="flex flex-col gap-y-4">
                  {
                    column.feedbacks.map(feedback => (
                      <RoadmapCard
                        key={feedback.id}
                        id={feedback.id}
                        statusValue={column.value}
                        statusLabel={column.label}
                        title={feedback.title}
                        description={feedback.description}
                        upvoteCount={feedback.upvote_count}
                        isUpvotedByCurrentUser={feedback.upvoted_by_current_user}
                        category={categoryValueToName[feedback.category]}
                        commentCount={feedback.comment_count}
                        onUpvoteClick={() => onUpvoteClick(feedback.id)}
                      />
                    ))
                  }
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default RoadmapPage