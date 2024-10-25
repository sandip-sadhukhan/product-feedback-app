from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class FeedbackObjectsManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(deleted_at=None)

class FeedbackCompleteManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset()

class Feedback(models.Model):
    FEATURE = 1
    UI = 2
    UX = 3
    ENHANCEMENT = 4
    BUG = 5

    CATEGORY_CHOICES = (
        (FEATURE, "Feature"),
        (UI, "UI"),
        (UX, "UX"),
        (ENHANCEMENT, "Enhancement"),
        (BUG, "Bug")
    )

    SUGGESTION = 1
    PLANNED = 2
    IN_PROGRESS = 3
    LIVE = 4

    STATUS_CHOICES = (
        (SUGGESTION, "Suggestion"),
        (PLANNED, "Planned"),
        (IN_PROGRESS, "In-Progress"),
        (LIVE, "Live")
    )

    title = models.CharField(max_length=200)
    description = models.TextField()
    category = models.PositiveSmallIntegerField(choices=CATEGORY_CHOICES)
    status = models.PositiveSmallIntegerField(choices=STATUS_CHOICES,
                                              default=SUGGESTION)
    created_by = models.ForeignKey(User, related_name="created_feedbacks",
                                   on_delete=models.SET_NULL, null=True,
                                   blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    deleted_at = models.DateTimeField(null=True, blank=True)
    deleted_by = models.ForeignKey(User, on_delete=models.SET_NULL,
                                   related_name="deleted_feedbacks",
                                   null=True, blank=True)
    
    objects = FeedbackObjectsManager()
    complete = FeedbackCompleteManager()

    def __str__(self):
        return self.title


class UpvoteAction(models.Model):
    feedback = models.ForeignKey(Feedback, on_delete=models.CASCADE,
                                 related_name="upvotes")
    created_by = models.ForeignKey(User, related_name="upvotes",
                                   on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.created_by.name} upvoted feedback id {self.feedback_id}"


class Comment(models.Model):
    feedback = models.ForeignKey(Feedback, on_delete=models.CASCADE,
                                 related_name="comments")
    body = models.CharField(max_length=250)

    # Main reply id under which all replies are there
    reply_to_comment = models.ForeignKey("suggestions.Comment",
        on_delete=models.CASCADE, related_name="reply_comments",
        null=True, blank=True)
    reply_to_user = models.ForeignKey(User, related_name="replied_comments",
                                      on_delete=models.CASCADE, null=True,
                                      blank=True)

    created_by = models.ForeignKey(User, related_name="comments",
                                   on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('-created_at',)
    
    def __str__(self):
        return f"#{self.id} {self.created_by.name} commented on feedback id {self.feedback_id}"