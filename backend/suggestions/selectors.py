from django.db.models import Count, Value, Exists, OuterRef
from django.http import Http404
from suggestions import models

def feedback_list(*, user, filters=None):
    if filters is None:
        filters = {}
    
    # Defaults
    sortBy = '-upvote_count'
    extra_filters = {}
    extra_annotates = {}

    if filters.get('sortBy'):
        sortByMap = {
            'most-upvotes': '-upvote_count',
            'least-upvotes': 'upvote_count',
            'most-comments': '-comment_count',
            'least-comments': 'comment_count'
        }
        sortBy = sortByMap[filters['sortBy']]
    
    if filters.get('category') and filters['category'] != 'all':
        categoryValueMap = {
            'ui': models.Feedback.UI,
            'ux': models.Feedback.UX,
            'enhancement': models.Feedback.ENHANCEMENT,
            'bug': models.Feedback.BUG,
            'feature': models.Feedback.FEATURE
        }

        extra_filters['category'] = categoryValueMap[filters['category']]

    if user.is_authenticated:
        extra_annotates['upvoted_by_current_user'] = \
            Exists(models.UpvoteAction.objects.filter(feedback_id=OuterRef('pk'),
                                                      created_by=user))
    else:
        extra_annotates['upvoted_by_current_user'] = Value(False)
    
    list_of_feedbacks = models.Feedback.objects\
        .annotate(upvote_count=Count('upvotes', distinct=True))\
        .annotate(comment_count=Count("comments", distinct=True))\
        .annotate(**extra_annotates)\
        .filter(**extra_filters)\
        .order_by(sortBy)

    return list_of_feedbacks

def roadmap_count_list():
    statuses = [models.Feedback.PLANNED, models.Feedback.IN_PROGRESS,
                models.Feedback.LIVE]
    status_count_map = dict(models.Feedback.objects
        .filter(status__in=statuses)
        .values_list("status")
        .annotate(count=Count('id')))

    status_count_list = []

    for status in statuses:
        status_count_list.append({
            'status': status,
            'count': status_count_map.get(status, 0)
        })

    return status_count_list

def feedback_upvote_data(*, user, feedbackId):
    is_upvoted_by_current_user = False

    if user.is_authenticated:
        is_upvoted_by_current_user = models.UpvoteAction.objects\
            .filter(feedback_id=feedbackId, created_by=user).exists()

    total_upvotes = models.UpvoteAction.objects\
        .filter(feedback_id=feedbackId).count()
    
    return (total_upvotes, is_upvoted_by_current_user)


def roadmap_feedback_list(*, user):
    extra_annotates = {}

    if user.is_authenticated:
        extra_annotates['upvoted_by_current_user'] = \
            Exists(models.UpvoteAction.objects.filter(feedback_id=OuterRef('pk'),
                                                      created_by=user))
    else:
        extra_annotates['upvoted_by_current_user'] = Value(False)
    
    roadmap_statuses = [models.Feedback.PLANNED, models.Feedback.IN_PROGRESS,
                        models.Feedback.LIVE]
    
    list_of_feedbacks = models.Feedback.objects\
        .filter(status__in=roadmap_statuses)\
        .annotate(upvote_count=Count('upvotes', distinct=True))\
        .annotate(comment_count=Count("comments", distinct=True))\
        .annotate(**extra_annotates)\
        .order_by('-upvote_count')
    
    return list_of_feedbacks

def feedback_with_comments(*, user, feedbackId):
    feedback_qs_list = list(models.Feedback.objects
        .filter(id=feedbackId)
        .values("id", "title", "description", "category", "created_by"))
    
    if not feedback_qs_list:
        raise Http404
    
    feedback = feedback_qs_list[0]

    if user.is_authenticated:
        feedback['upvoted_by_current_user'] = \
            models.UpvoteAction.objects\
            .filter(feedback_id=feedback['id'], created_by=user)\
            .exists()
    else:
        feedback['upvoted_by_current_user'] = False

    feedback['upvote_count'] = \
        models.UpvoteAction.objects\
        .filter(feedback_id=feedback['id'])\
        .count()

    feedback['comment_count'] = \
        models.Comment.objects\
        .filter(feedback_id=feedback['id'])\
        .count()
    
    all_comments = list(models.Comment.objects\
        .filter(feedback_id=feedback['id'])
        .order_by('created_at')
        .values("id", "body", "created_by_id", "reply_to_comment", "reply_to_user__username",
                "created_at", "created_by__name", "created_by__username",
                "created_by__profile_picture"))
    
    main_comments = [comment for comment in all_comments if comment['reply_to_comment'] == None]

    for main_comment in main_comments:
        replies = [comment for comment in all_comments if comment['reply_to_comment'] == main_comment['id']]
        main_comment['replies'] = replies
    
    feedback['comments'] = main_comments

    return feedback