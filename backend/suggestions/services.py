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

def create_feedback(*, user, title, description, category):
    return models.Feedback.objects\
        .create(title=title, description=description, category=category,
                created_by=user)

def create_comment(*, user, feedbackId, body):
    return models.Comment.objects\
        .create(feedback_id=feedbackId, body=body, created_by=user)
