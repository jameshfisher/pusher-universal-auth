# Universal Pusher auth endpoint

This server provides a Pusher auth endpoint which you can use in lieu of your own. Beware: because you send it your app secret, it is inherently insecure, and so should only be used for hacks and prototypes! You should consider the app secret compromised after using it here. Not deterred? Okay, here's how to use it:

```javascript
var pusher = new Pusher('YOUR_APP_KEY', {
encrypted: true,
authEndpoint: "https://pusher-universal-auth.herokuapp.com/pusher/auth",
auth: {
  params: {
    authWithAppId: "YOUR_APP_ID",
    authWithAppKey: "YOUR_APP_KEY",
    authWithAppSecret: "YOUR_APP_SECRET",
    authWithPresenceData: { // optional
      {
        user_id: 'unique_user_id',
        user_info: {
          name: 'Mr Pusher',
          twitter_id: '@pusher'
        }
      }
    }
  }
}
});
```
