from django.db.models import Count, Value, Exists, OuterRef
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
            Exists(models.Comment.objects.filter(feedback_id=OuterRef('pk'),
                                                 created_by=user))
    else:
        extra_annotates['upvoted_by_current_user'] = Value(False)
    
    list_of_feedbacks = models.Feedback.objects\
        .annotate(upvote_count=Count('upvotes'),
                  comment_count=Count("comments"))\
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