from django import http
from suggestions import models
from django.utils import timezone

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

def create_comment(*, user, feedbackId, body, reply_to_comment_id=None):
    reply_to_comment = None
    reply_to_user = None

    if reply_to_comment_id:
        reply_to_comment = models.Comment.objects.get(id=reply_to_comment_id)
        reply_to_user = reply_to_comment.created_by

        if reply_to_comment.reply_to_comment:
            reply_to_comment = reply_to_comment.reply_to_comment

        if int(reply_to_comment.feedback_id) != int(feedbackId):
            raise http.HttpResponseBadRequest

    return models.Comment.objects\
        .create(feedback_id=feedbackId, body=body, created_by=user,
                reply_to_comment=reply_to_comment, reply_to_user=reply_to_user)


def edit_feedback(*, user, feedbackId, title, description, category, status):
    feedback = models.Feedback.objects.get(id=feedbackId)

    feedback.title = title
    feedback.description = description
    feedback.category = category

    if user.is_superuser:
        feedback.status = status
    
    feedback.save()

    return feedback

def delete_feedback(*, user, feedbackId):
    feedback = models.Feedback.objects.get(id=feedbackId)

    feedback.deleted_at = timezone.now()
    feedback.deleted_by = user

    feedback.save()

    return feedback
