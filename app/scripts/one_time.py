
===Todo features end-to-end(priority)===
- finish calendar (guru/student availability) [come back to this!]
- push notifications
- timer (javascript)
- guru re-request
- forms css

===feature (functionality / interface )===
[major, server] - calendar
    - spec it out [9:48]
        - data-model  (request_calendar, proposal_calendar)
            - Calendar
                - time_zone
                - status
                - request_id / request
                - start_day
                - number_of_days
                - time_created
                - time_modified
            - Events
                - start_date
                - end_date
                - location
        - rest-api
            - student adds calendar
            - student modifies calendar
            - guru readjusts calendar
        - client-side (when get here scope it out)
            - calendar view
            - edit-mode (+ save)
            - view-mode

    - implement server side
    - client-side
[medium] -- add your own major/course / university
[settings for guru courses + major]
[major, server] - push notification
[minor] - create an account promo code
[minor] - forgot password
[minor, client] - student's time does not update like it should'

===bug===
[minor, client] - $scope.user is not an object
[minor, client] - user geocode error + set location not set after that
[minor] - remove clear local cache (logout)
[minor] - login should go to login
[minor] - after become a guru is & asked to log in, it should go to want to make some moolah
[minor, client] - student client looks hella jank after they add their card
[minor] - student / guru relationships are created twice
[medium, client] - student client looks hella jank after they add their card
[medium, server] - timezone not supported

===ux / appearance / style / enhancements===

===performance===
[major] add loaders where they need to be
[medium] - get rid of all the other requests (CDN or package together)


==enhancement==
[medium] if location not found, let user enter their location after default is the university location
[client, minor] switch debit card phone input to pin mode
[client, minor] background location, when to turn off & on
[calendar for gurus, students, etc]

==edge cases==
- what if user turns off location during the active session

==unrelated but important==
- build script should delete all the html files after compressed & sent to production build

===DONE===
### 1. finish script + update production database
### 2. submit to production & test
### 3. Create new accounts to test (immediately go to later in the workflow).


===Varada screens===
- First time user workflow when they download the app
- Promo code?
- First time experience --> login / already have an account super subtle
- First time for everyone (high school parent, teacher, etc)
- Homepage when there is a request + courses
- Message empty state
- calendar views


===Samir Product===
Take a first pass on
- On guru homepage should their active sessions if possible424

===Business Model===
- guru
    - We take tips
    - work your way up to awesome rewards (give students the ability to instant book!)
    -
- student
    - business model mocks

- community average is this amount


===Flex todo===
--> https://github.com/postcss/autoprefixer
--> Gulp watch
--> look into flex grid

===Flex cool resources===
http://www.smashingmagazine.com/2015/03/02/harnessing-flexbox-for-todays-web-apps/




=== push notification resources ====