# Product Hunt CLI - (WIP)

> Gather information from Product Hunt using their API

### Install

```
$ npm install -g ph
```

```
$ ph --help

    Usage:
        ph <endpoint> <options>

    Endpoints:
        me
            Display personal information about the user
        posts
            --day="2015-10-26"    Get posts from a specific day
            --days_ago="2"        Get posts from 2 days ago
        search
            category="games"      Get posts from the 'games' category
    Options:
        --token
            The users developer token for authentication
```

### To-Do

- Prompt user for their dev token and add it to the script
- Handle all the endpoints
    - Posts
    - Categories
    - Users
    - Me
    - Collections
    - Comments
    - Notifications
    - Live Events
- Handle different endpoint options
    - Day
    - Days ago
    - Search Category/URL
    - Order
    - Pagination

### License

MIT © [Kyle Brumm](http://kylebrumm.com)
