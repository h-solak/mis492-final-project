# MovieMate
WATCH, EXPLORE, MATCH
Review the movies you watch using MovieMate, discover your movie character and make new friends who love similar movies.

Live link: [https://moviemate492.netlify.app/](https://moviemate492.netlify.app/)


## Backend - Subcriteria Matrix
```
  const subcriteriaMatrix = {
    //---------------------------Romantic-------------Drama--------------Comedy--------------Mystery--------------Action--------
    /*  Romantic */ row1: [1                   , romanticDrama   , romanticComedy    , romanticMystery     , 1 / actionRomantic],
    /*  Drama    */ row2: [1 / romanticDrama   , 1               , 1 / comedyDrama   , 1 / mysteryDrama    , 1 / actionDrama   ],
    /*  Comedy   */ row3: [1 / romanticComedy  , comedyDrama     , 1                 , 1 / mysteryComedy   , 1 / actionComedy  ],
    /*  Mystery  */ row4: [1 / romanticMystery , mysteryDrama    , mysteryComedy     , 1                   , 1 / actionMystery ],
    /*  Action   */ row5: [actionRomantic      , actionDrama     , actionComedy      , actionMystery       , 1                 ],
  };
```
