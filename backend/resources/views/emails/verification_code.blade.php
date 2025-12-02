@component('mail::message')
# Verification Code

Your verification code is:

@component('mail::panel')
**{{ $code }}**
@endcomponent

This code will expire in 5 minutes.

Thanks,<br>
{{ config('app.name') }}
@endcomponent
