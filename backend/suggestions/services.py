from suggestions import models

def toggle_upvote(*, user, feedbackId):
    upvote_action_qs = models.UpvoteAction.objects\
        .filter(feedback_id=feedbackId, created_by=user)

    if upvote_action_qs.exists():
        upvote_action_qs.delete()
        return False
    else:
        models.UpvoteAction.objects.create(feedback_id=feedbackId,
                                           created_by=user)
        return True
