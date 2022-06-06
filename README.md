# Daily-week-organizer
It's my own project. I made it from scratch. Live demo: [_here_](https://mateusz-ramotowski-poland.github.io/Daily-week-organizer/).

## Table of Contents
* [General Info](#general-information)
* [Technologies Used](#technologies-used)
* [Features](#features)
* [Project Status](#project-status)
* [Acknowledgements](#acknowledgements)
* [Contact](#contact)

## General Information
It is an application helpful in organizing the day. It's working well on all resolutions.

## Technologies Used
Project is created with:
* HTML5
* CSS3
* JS(ES6+)
* Local Storage as 'database'

I was using Chrome developer tools for testing my application.
## Features
Timer section:
- You can add/delete timer. You can have from 1 to 5 timers. 
- Click the start button to launch the timer.
- Click the reset button to cancel the timer. 
- When the timer will reach zero You will hear the song.
- You can edit the timer settings: time, description, and song/ringtone.

To-do-tasks section: 
- Add new tasks.
- You can delete every task.
- Tasks are saved after closing the browser (the app is using local storage for that).

## Project Status
The project is in progress. What I will do next:
- fix bugs.
- I am thinking about it...


## Acknowledgements
Thanks [_Jonas Schmedtmann_](https://www.udemy.com/course/the-complete-javascript-course/learn/lecture/22648683?start=420#overview)
 for the basics, which You taught me. Now I can create my own web apps.

## Contact
Created by Mateusz Ramotowski (mateusz.ramotowski.praca@gmail.com) - feel free to contact me!

<!-- WHAT I LEARNED?
Ideas: 
- to do list
- communication with weather api
- calculate how many hours I spent on programming per week - local storage or database
- help to organizing my workouts
- log in/log out

In the next project start work with (At the beginning it will take more time but it is easier after the app gets bigger and bigger)
1.V Good semantic HTML structure with proper tags.
2.V Create standards for CSS classes, and divide CSS selectors for a few CSS files - it is easier to change something.
3. Create standards for function names and variable names.
4. Divide your CSS code into a few js modules.
5. Refactor Your code from time to time and add comments in harder-to-understand parts of the code
6. Write good README.md file.
7. CONCENTRATE ON ONE TASK - DO THAT TASK AND MAKE COMMIT WITH GOOD DESCRIPTION OF WHAT YOU DONE. START NEXT TASK......
8. DIVIDE CODE INTO SMALL PIECE. wWRITE PIECE OF CODE. TEST IT WELL AND THEN GO TO WRITE NEXT PIECE OF CODE - MORE THINK FROM BEGINNING YOU WILL HAVE LESS BUGS AND FRUSTRATION LATER
9. Selectors in CSS files in alphabetically order - it looks nicer and it is easier to search
10. If your code is written well you don't need a comment. Comment should express knowledge that you can't express by your code. It is better to use meaningfull names for variables and functions than use comments
11. It is very good to know and use design patterns.
12. Uncle Bob encourages pair programming. Think if I can do it?


What should I fix, consider?

1. Czy przycisk start w edycji timera powinienem restartować timer(w trakcie edycji może grać muzyka), albo przynajmnniej wyłączyć ,uzykę jeśli gra alarm - czy rozwiąże to formularz, który pojawi się gdy Timer dojdzie do zera?
4. Zrób main__form--modal2 w index.html . Dodaj wydarzenia do tego modala - po tym jak timer doliczy do 0 to wtedy ma sie on pojawić. Ma działaś analogiznie jak przycisk reset button.
7. Czy warto mieć main__form--modal2 i main__form--modal1 -  dwie klasy z identycznym stylowaniem. POmysl o powiazaniem tego z dodawaniem wydarzenia JS.
10. Failed to load resource: the server responded with a status of 404 (). Webpage can't download songs! 
Uncaught (in promise) DOMException: The element has no supported sources - ten błąd wynika z niemożności załadowania piosenek. Dodaj obsługę błędów. Znajdź powód dlaczego to nie działa.
-->
