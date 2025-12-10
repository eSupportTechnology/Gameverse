<?php $__env->startComponent('mail::message'); ?>
# Verification Code

Your verification code is:

<?php $__env->startComponent('mail::panel'); ?>
**<?php echo new \Illuminate\Support\EncodedHtmlString($code); ?>**
<?php echo $__env->renderComponent(); ?>

This code will expire in 5 minutes.

Thanks,<br>
<?php echo new \Illuminate\Support\EncodedHtmlString(config('app.name')); ?>

<?php echo $__env->renderComponent(); ?>
<?php /**PATH F:\esupport\Gameverse\backend\resources\views/emails/verification_code.blade.php ENDPATH**/ ?>