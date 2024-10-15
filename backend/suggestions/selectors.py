from django.db.models import Count, Value, Subquery, Exists, OuterRef
from suggestions import models

def feedback_list(*, user):
    extra_annotates = {}

    if user.is_authenticated:
        extra_annotates['upvoted_by_current_user'] = \
            Exists(models.Comment.objects.filter(feedback_id=OuterRef('pk'),
                                                 created_by=user))
    else:
        extra_annotates['upvoted_by_current_user'] = Value(False)

    list_of_feedbacks = models.Feedback.objects\
        .annotate(upvote_count=Count('upvotes'),
                  comment_count=Count("comments"))\
        .annotate(**extra_annotates)

    return list_of_feedbacks
