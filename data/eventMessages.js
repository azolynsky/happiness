import EventMessage from '../models/eventMessage'

export default [
  // level 0
  new EventMessage("You've just been born! Congratulations, and welcome to the Pursuit of Happiness!", (state) => true),
  new EventMessage("You're not very happy. Try tapping that 0.", (state) => state.happiness === 0 && state.elapsedTime > 4),
  new EventMessage("You're becoming happier!", (state) => state.happiness > 0),
  new EventMessage("Look a pacifier! I bet that would make you really happy. You should buy it.", (state) => state.items[0]['pacifier'].owned === 0 && state.happiness >= state.items[0]['pacifier'].happinessCost),
  new EventMessage("The Pacifier is making you happy!", (state) => state.items[0]['pacifier'].owned === 1),
  new EventMessage("Your Blankie keeps you warm and snuggly. At night, it makes you so happy!", (state) => state.items[0]['blankie'].owned === 1),
  new EventMessage("You can almost afford a Bottle!", (state) => state.happiness > state.items[0]['bottle'].happinessCost / 2),
  new EventMessage("A Blankie! You would love that!", (state) => state.happiness >= state.items[0]['blankie'].happinessCost && state.items[0]['blankie'].owned === 0),
  new EventMessage("A Bottle! That will make you grow up faster!", (state) => state.happiness >= state.items[0]['bottle'].happinessCost && state.items[0]['bottle'].owned === 0),
  new EventMessage("Milk Bottles make you big and strong! You'll be a Big Kid in no time!", (state) => state.items[0]['bottle'].owned === 1),
  new EventMessage("You're a Big Kid now!  Get rid of that baby Pacifier and play with cool toys!", (state) => state.items[0]['bigKid'].owned === 1),

  // level 1
]

/*
TIMER
time is up in X.XX:XX
X.XX:XX until you die.
don't squander the life you have left.
you're almost dead.
you will die in X seconds.


EVENT FEED
you're not very happy. try tapping that 0
that did it! you're getting happier!
you're just a baby. so full of potential.
try to get as much happiness as you can before your time runs out!
you're doing great! you're getting so much happiness.
ooh I bet a pacifier would make you happy
that pacifier is making you so happy!
that milk bottle is making you even happier than the pacifier made you!
oh my gosh you're getting so happy. your life is going to be so great

you're a big kid now! you're excited to be able to do more fun things!

mmm candy. you love candy.

you got a bike??? wow! that's making you so happy!

your baseball mitt is making you happy!

comics! you love comics. you can get more comics and they'll make you even happier!

hm it looks like your friend Billy has a better bike than you... I bet a better bike would make you really really happy.
a new bike! it's a little better than your last one... it's actually not that different.

you're a teenager! you're young and attractive and you have your whole life ahead of you!

you fell in love! she's your best friend and makes you a better person.

you got your first job! it doesn't pay much, but you're so excited to get that paycheck, and you make lifelong friends!

you got married!

you're 30. it feels like your best years went by so fast...

you had your first child! a girl. she's perfect. you've never been so happy.
you had another baby! you start to worry about money a little bit. maybe you should get a new job.
you had another baby! the doctors advise you that your wife can't safely have children anymore. you're... mostly happy.

your wife is getting old... you start to think about the attractive waitress at Olga's. you only live once you know.
you did it. you divorced your wife and married for looks. you can't see your kids except on weekends.

you got a better job! it requires more hours, (and you don't see your kids as much : and it's a lot more responsibility), but it pays really well!

you're retired! you can do all the things you dreamed of when you (and your (first) wife) were young. you don't have a lot of energy anymore but that's ok.
you're in Bermuda! a lot of the people here are impoverished. you ignore it. your happiness rises!
you're in London! it's... really similar to home actually. this was an expensive trip.
you're running out of money for travel
you're in Paris! most people are really rude to you. you stay in the hotel most of the trip.
(your wife died. she always wanted to see [the remaining travel destination].)
you're in Mexico! you heard there are lots of gangs here so you pretty much stay on the resort. margaritas! (you think about your wife a lot.)
well I guess that's it. your retirement is running out.
you check into assisted living! you're happier than you were at home... too many memories in that house.
what's the point?
is this making you happy?
you should call your family.
it isn't really happiness.
I hope you're making the most of your life. you've been playing this game for a long time.
it's just a game. like, the number goes up and that's it.
you're going to die.


END
game over! you died! I guess you were kind of happy while you were alive...


TROPHIES
kept the same wife your whole life
had N kids
got the top job
*/
