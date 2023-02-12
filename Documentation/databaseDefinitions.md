# Database Definitions!

Headers are root collections
Bold are subcollections
Bullets are data items

### Users
    - user_id
    - age
    - first
    - last
    - routines[]
    - active_routines[]

### Routines
    - routine_id
    - description
    - weeks[days[exercises[]]]
    - posted_by
    - **tags**
        - tag_name
### Reviews
    - routine_id
    - posted_by
    - rating
    - comments
### Exercises
    - exercise_id
    - name
    - muscle_group
    - difficulty
    - description
